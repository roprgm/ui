import { Button } from "@roprgm/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@roprgm/ui/popover";

const aligns = ["start", "center", "end"] as const;

export default function PopoverAlign() {
  return aligns.map((align) => (
    <Popover key={align}>
      <PopoverTrigger render={<Button className="capitalize" />}>
        {align}
      </PopoverTrigger>
      <PopoverContent raised align={align} className="w-56 text-secondary">
        Edits sync to your other devices when they are online.
      </PopoverContent>
    </Popover>
  ));
}
