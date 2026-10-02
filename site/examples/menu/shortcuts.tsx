import { Button } from "@roprgm/ui/button";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@roprgm/ui/menu";

export default function MenuShortcuts() {
  return (
    <Menu>
      <MenuTrigger render={<Button />}>Edit</MenuTrigger>
      <MenuContent raised>
        <MenuItem shortcut="Mod Z">Undo</MenuItem>
        <MenuItem shortcut="Mod Shift Z">Redo</MenuItem>
        <MenuSeparator />
        <MenuItem shortcut="Mod C">Copy edits</MenuItem>
        <MenuItem shortcut="Mod V">Paste edits</MenuItem>
      </MenuContent>
    </Menu>
  );
}
