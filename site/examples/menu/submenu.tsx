import { IconButton } from "@roprgm/ui/icon-button";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Submenu,
  SubmenuContent,
  SubmenuTrigger,
} from "@roprgm/ui/menu";
import { MoreIcon } from "@/ui/icons";

export default function MenuSubmenu() {
  return (
    <Menu>
      <MenuTrigger render={<IconButton label="Photo actions" />}>
        <MoreIcon />
      </MenuTrigger>
      <MenuContent raised>
        <MenuItem>Duplicate</MenuItem>
        <Submenu>
          <SubmenuTrigger>Add to album</SubmenuTrigger>
          <SubmenuContent>
            <MenuItem>Lisbon</MenuItem>
            <MenuItem>Kyoto</MenuItem>
            <MenuItem>Favorites</MenuItem>
          </SubmenuContent>
        </Submenu>
        <MenuItem>Rename</MenuItem>
      </MenuContent>
    </Menu>
  );
}
