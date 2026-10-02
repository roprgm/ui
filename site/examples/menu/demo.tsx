import { IconButton } from "@roprgm/ui/icon-button";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@roprgm/ui/menu";
import { MoreIcon } from "@/ui/icons";

export default function MenuDemo() {
  return (
    <Menu>
      <MenuTrigger render={<IconButton label="Photo actions" />}>
        <MoreIcon />
      </MenuTrigger>
      <MenuContent raised>
        <MenuItem>Duplicate</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Set as cover</MenuItem>
        <MenuSeparator />
        <MenuItem className="text-danger">Delete</MenuItem>
      </MenuContent>
    </Menu>
  );
}
