import { CodeBlock } from "@roprgm/ui/code-block";
import { highlight } from "sugar-high";

const source = `<img src="/harbor.jpg" alt="The harbor at dusk, shot from the pier as the fog rolls in over the lighthouse" />`;

export default function CodeBlockWrap() {
  return (
    <CodeBlock
      wrap
      code={source}
      html={highlight(source)}
      className="w-full max-w-sm"
    />
  );
}
