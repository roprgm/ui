import { CopyButton } from "@roprgm/ui/copy-button";
import { Input } from "@roprgm/ui/input";

const link = "https://ui.roprgm.com/p/lisbon";

export default function InputWithCopyButton() {
  return (
    <div className="relative w-64">
      <Input
        readOnly
        value={link}
        aria-label="Link"
        size="lg"
        className="pr-8"
      />
      <CopyButton
        value={link}
        size="icon-sm"
        className="absolute top-1 right-1 rounded-sm"
      />
    </div>
  );
}
