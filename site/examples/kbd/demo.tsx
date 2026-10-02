import { Kbd } from "@roprgm/ui/kbd";

export default function KbdDemo() {
  return (
    <dl className="grid w-48 grid-cols-[1fr_auto] gap-y-2">
      <dt>Undo</dt>
      <dd>
        <Kbd>Mod Z</Kbd>
      </dd>
      <dt>Redo</dt>
      <dd>
        <Kbd>Mod Shift Z</Kbd>
      </dd>
      <dt>Brush</dt>
      <dd>
        <Kbd>B</Kbd>
      </dd>
    </dl>
  );
}
