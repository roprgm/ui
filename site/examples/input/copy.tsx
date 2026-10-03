import { CopyButton } from "@roprgm/ui/copy-button";
import { Input, InputGroup, InputGroupAddon } from "@roprgm/ui/input";

const link = "https://ui.roprgm.com/p/lisbon";

export default function InputWithCopyButton() {
  return (
    <InputGroup className="w-64">
      <Input
        readOnly
        value={link}
        aria-label="Link"
        size="lg"
        className="pr-8"
      />
      <InputGroupAddon align="end">
        <CopyButton value={link} size="icon-sm" className="rounded-sm" />
      </InputGroupAddon>
    </InputGroup>
  );
}
