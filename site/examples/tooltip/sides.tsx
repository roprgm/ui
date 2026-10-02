import { Button } from "@roprgm/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@roprgm/ui/tooltip";

const sides = ["top", "right", "bottom", "left"] as const;

export default function TooltipSides() {
  return sides.map((side) => (
    <Tooltip key={side}>
      <TooltipTrigger render={<Button className="capitalize" />}>
        {side}
      </TooltipTrigger>
      <TooltipContent side={side}>Saves a copy</TooltipContent>
    </Tooltip>
  ));
}
