import { Button } from "@roprgm/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@roprgm/ui/drawer";
import { Section } from "@roprgm/ui/section";

export default function DrawerBottom() {
  return (
    <Drawer swipeDirection="down">
      <DrawerTrigger render={<Button />}>Share…</DrawerTrigger>
      <DrawerContent>
        <Section>
          <DrawerTitle>Share “Golden hour”</DrawerTitle>
        </Section>
        <Section className="gap-1.5">
          <DrawerClose render={<Button />}>Copy link</DrawerClose>
          <DrawerClose render={<Button />}>Save to photos</DrawerClose>
          <DrawerClose render={<Button variant="ghost" />}>Cancel</DrawerClose>
        </Section>
      </DrawerContent>
    </Drawer>
  );
}
