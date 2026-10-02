import { Separator } from "@roprgm/ui/separator";

export default function SeparatorDemo() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <div className="flex flex-col gap-1">
        <span>Harbor at dusk</span>
        <span className="text-secondary">Lisbon, 12 March</span>
      </div>
      <Separator />
      <span className="text-secondary">Canon EOS R5 · ƒ/2.8 · 1/250 s</span>
    </div>
  );
}
