import { Chip } from "@roprgm/ui/chip";

export default function ChipStates() {
  return (
    <>
      <Chip>Reset</Chip>
      <Chip aria-pressed>Overlay</Chip>
      <Chip disabled>Erase</Chip>
    </>
  );
}
