import { CopyButton } from "@roprgm/ui/copy-button";

export default function CopyButtonSmall() {
  return (
    <div className="flex items-center gap-1">
      <code className="text-secondary">bun add @roprgm/ui</code>
      <CopyButton value="bun add @roprgm/ui" size="icon-sm" />
    </div>
  );
}
