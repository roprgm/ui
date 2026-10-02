import { Button } from "@roprgm/ui/button";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@roprgm/ui/menu";

export default function KbdInMenu() {
  return (
    <Menu>
      <MenuTrigger render={<Button />}>Edit</MenuTrigger>
      <MenuContent>
        <MenuItem shortcut="Mod Z">Undo</MenuItem>
        <MenuItem shortcut="Mod Shift Z">Redo</MenuItem>
        <MenuItem shortcut="Mod D">Duplicate</MenuItem>
      </MenuContent>
    </Menu>
  );
}
