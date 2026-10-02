import { CodeBlock } from "@roprgm/ui/code-block";
import { highlight } from "sugar-high";

const source = `import { Button } from "@roprgm/ui/button";

export function SaveButton() {
  return <Button variant="primary">Save</Button>;
}`;

export default function CodeBlockDemo() {
  return (
    <CodeBlock
      code={source}
      html={highlight(source)}
      className="w-full max-w-lg"
    />
  );
}
