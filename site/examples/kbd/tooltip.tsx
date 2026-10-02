import { Button } from "@roprgm/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@roprgm/ui/tooltip";

export default function KbdInTooltip() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button />}>Export</TooltipTrigger>
      <TooltipContent shortcut="Mod Shift E">
        Exports the selected photos
      </TooltipContent>
    </Tooltip>
  );
}
