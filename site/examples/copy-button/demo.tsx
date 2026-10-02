import { CopyButton } from "@roprgm/ui/copy-button";

export default function CopyButtonDemo() {
  return (
    <div className="flex items-center gap-1">
      <span className="text-secondary">ui.roprgm.com/p/lisbon</span>
      <CopyButton value="https://ui.roprgm.com/p/lisbon" />
    </div>
  );
}
