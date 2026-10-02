import { Button } from "@roprgm/ui/button";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@roprgm/ui/menu";

export default function MenuDisabledItems() {
  return (
    <Menu>
      <MenuTrigger render={<Button />}>Edits</MenuTrigger>
      <MenuContent raised>
        <MenuItem>Copy edits</MenuItem>
        <MenuItem disabled>Paste edits</MenuItem>
        <MenuItem>Revert to original</MenuItem>
      </MenuContent>
    </Menu>
  );
}
