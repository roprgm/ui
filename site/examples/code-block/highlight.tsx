import { CodeBlock } from "@roprgm/ui/code-block";
import { highlight } from "sugar-high";

const source = `import { CodeBlock } from "@roprgm/ui/code-block";
import { highlight } from "sugar-high";

export function Snippet({ code }: { code: string }) {
  return <CodeBlock code={code} html={highlight(code)} />;
}`;

export default function CodeBlockHighlight() {
  return (
    <CodeBlock
      code={source}
      html={highlight(source)}
      className="w-full max-w-lg"
    />
  );
}
