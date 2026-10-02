import { Button } from "@roprgm/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@roprgm/ui/tooltip";

export default function TooltipDemo() {
  return (
    <>
      <Tooltip>
        <TooltipTrigger render={<Button />}>Auto</TooltipTrigger>
        <TooltipContent>Balances exposure and color</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button />}>Revert</TooltipTrigger>
        <TooltipContent>Goes back to the original</TooltipContent>
      </Tooltip>
    </>
  );
}
