import { CopyButton } from "@roprgm/ui/copy-button";

export default function CopyButtonLabel() {
  return (
    <>
      <CopyButton value="https://ui.roprgm.com/p/lisbon">Copy link</CopyButton>
      <CopyButton value="https://ui.roprgm.com/p/lisbon" variant="flat">
        Copy link
      </CopyButton>
    </>
  );
}
