import type { ComponentType } from "react";
import { Code } from "./code";
import { ExampleFrame } from "./example-frame";
import { readSource } from "./source";

/** The example in `examples/{name}.tsx`, running, with its source. */
export async function Example({
  name,
  block,
}: {
  name: string;
  block?: boolean;
}) {
  const [{ default: Demo }, source]: [{ default: ComponentType }, string] =
    await Promise.all([
      import(`@/examples/${name}.tsx`),
      readSource(`site/examples/${name}.tsx`),
    ]);
  return (
    <ExampleFrame
      file={`${name.split("/").pop()}.tsx`}
      block={block}
      preview={<Demo />}
      code={
        <Code lang="tsx" className="max-h-120 rounded-md">
          {source.trim()}
        </Code>
      }
    />
  );
}
