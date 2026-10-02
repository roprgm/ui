import { IconButton } from "@roprgm/ui/icon-button";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@roprgm/ui/menu";
import { MoreIcon } from "@/ui/icons";

export default function IconButtonMenu() {
  return (
    <Menu>
      <MenuTrigger render={<IconButton label="Layer actions" />}>
        <MoreIcon />
      </MenuTrigger>
      <MenuContent>
        <MenuItem shortcut="Mod D">Duplicate</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Delete</MenuItem>
      </MenuContent>
    </Menu>
  );
}
