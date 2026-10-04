import { Button } from "@roprgm/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@roprgm/ui/drawer";
import { IconButton } from "@roprgm/ui/icon-button";
import { Section, SectionAction } from "@roprgm/ui/section";
import { Switch } from "@roprgm/ui/switch";
import { CloseIcon } from "@/ui/icons";

const settings = [
  ["Show grid", true],
  ["Snap to guides", true],
  ["Show rulers", false],
  ["Keep every step", true],
] as const;

export default function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button />}>Settings</DrawerTrigger>
      <DrawerContent>
        <Section className="flex-row items-center">
          <DrawerTitle className="flex-1">Settings</DrawerTitle>
          <SectionAction>
            <DrawerClose
              render={
                <IconButton label="Close">
                  <CloseIcon />
                </IconButton>
              }
            />
          </SectionAction>
        </Section>
        <Section>
          <DrawerDescription>
            Applies to every photo you open. Swipe it away, or press Escape.
          </DrawerDescription>
        </Section>
        <Section>
          {settings.map(([name, on]) => (
            <label
              key={name}
              className="flex items-center justify-between gap-2"
            >
              {name} <Switch defaultChecked={on} />
            </label>
          ))}
        </Section>
      </DrawerContent>
    </Drawer>
  );
}
