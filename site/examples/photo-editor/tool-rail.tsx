"use client";

import { Tab, TabList, Tabs } from "@roprgm/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@roprgm/ui/tooltip";
import { AdjustIcon, BrushIcon, CropIcon, HealIcon } from "@/ui/icons";

const tools = [
  { id: "adjust", label: "Adjust", key: "A", Icon: AdjustIcon },
  { id: "brush", label: "Brush", key: "B", Icon: BrushIcon },
  { id: "heal", label: "Healing", key: "H", Icon: HealIcon },
  { id: "crop", label: "Crop", key: "C", Icon: CropIcon },
];

/** Icon tabs in a column, with their names and keys as tooltips. */
export function ToolRail({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Tabs value={selected} onValueChange={onSelect} orientation="vertical">
      <TabList aria-label="Tools" variant="segmented">
        {tools.map(({ id, label, key, Icon }) => (
          <Tooltip key={id}>
            <TooltipTrigger
              render={<Tab value={id} size="icon-sm" aria-label={label} />}
            >
              <Icon />
            </TooltipTrigger>
            <TooltipContent side="right" shortcut={key}>
              {label}
            </TooltipContent>
          </Tooltip>
        ))}
      </TabList>
    </Tabs>
  );
}
