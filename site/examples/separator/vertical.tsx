import { Separator } from "@roprgm/ui/separator";

export default function SeparatorVertical() {
  return (
    <div className="flex h-5 items-center gap-3 text-secondary">
      <span>Crop</span>
      <Separator orientation="vertical" />
      <span>Rotate</span>
      <Separator orientation="vertical" />
      <span>Flip</span>
    </div>
  );
}
