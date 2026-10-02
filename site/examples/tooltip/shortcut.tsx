import { Button } from "@roprgm/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@roprgm/ui/tooltip";

export default function TooltipWithShortcut() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button />}>Export</TooltipTrigger>
      <TooltipContent shortcut="Mod E">
        Saves a copy with your edits
      </TooltipContent>
    </Tooltip>
  );
}
