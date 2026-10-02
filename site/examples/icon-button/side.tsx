import { IconButton } from "@roprgm/ui/icon-button";
import { BrushIcon, CropIcon, HealIcon } from "@/ui/icons";

export default function IconButtonSide() {
  return (
    <div className="flex flex-col gap-1">
      <IconButton label="Crop" side="right">
        <CropIcon />
      </IconButton>
      <IconButton label="Heal" side="right">
        <HealIcon />
      </IconButton>
      <IconButton label="Brush" side="right">
        <BrushIcon />
      </IconButton>
    </div>
  );
}
