import { Button } from "@roprgm/ui/button";
import { IconButton } from "@roprgm/ui/icon-button";
import { Popover, PopoverContent, PopoverTrigger } from "@roprgm/ui/popover";
import { Section, SectionAction } from "@roprgm/ui/section";
import { Switch } from "@roprgm/ui/switch";
import { UndoIcon } from "@/ui/icons";

export default function PopoverSections() {
  return (
    <Popover>
      <PopoverTrigger render={<Button />}>View</PopoverTrigger>
      <PopoverContent raised className="w-56">
        <Section className="flex-row items-center">
          <h2 className="flex-1 font-medium">View</h2>
          <SectionAction>
            <IconButton label="Reset">
              <UndoIcon />
            </IconButton>
          </SectionAction>
        </Section>
        <Section>
          <label className="flex items-center justify-between">
            Grid
            <Switch defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            Clipping
            <Switch />
          </label>
        </Section>
      </PopoverContent>
    </Popover>
  );
}
