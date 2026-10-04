import type { ComponentType } from "react";
import { Code } from "./code";
import { ExampleFrame } from "./example-frame";

const demos = import.meta.glob<{ default: ComponentType }>(
  "../examples/**/*.tsx",
  { eager: true },
);

const sources = import.meta.glob<string>("../examples/**/*.tsx", {
  eager: true,
  query: "?raw",
  import: "default",
});

/** The example in `examples/{name}.tsx`, running, with its source. */
export function Example({
  name,
  block,
  flush,
}: {
  name: string;
  block?: boolean;
  flush?: boolean;
}) {
  const file = `../examples/${name}.tsx`;
  const { default: Demo } = demos[file];
  return (
    <ExampleFrame
      file={`${name.split("/").pop()}.tsx`}
      block={block}
      flush={flush}
      preview={<Demo />}
      code={
        <Code lang="tsx" className="max-h-120 rounded-md">
          {sources[file].trim()}
        </Code>
      }
    />
  );
}
