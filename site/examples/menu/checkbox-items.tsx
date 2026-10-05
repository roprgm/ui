import { Button } from "@roprgm/ui/button";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuTrigger,
} from "@roprgm/ui/menu";

export default function MenuCheckboxItems() {
  return (
    <Menu>
      <MenuTrigger render={<Button />}>View</MenuTrigger>
      <MenuContent raised>
        <MenuCheckboxItem defaultChecked shortcut="Mod G">
          Grid
        </MenuCheckboxItem>
        <MenuCheckboxItem defaultChecked>File names</MenuCheckboxItem>
        <MenuCheckboxItem>Ratings</MenuCheckboxItem>
      </MenuContent>
    </Menu>
  );
}
