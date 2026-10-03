import { IconButton } from "@roprgm/ui/icon-button";
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@roprgm/ui/menu";
import { MoreIcon } from "@/ui/icons";

export default function MenuGroups() {
  return (
    <Menu>
      <MenuTrigger render={<IconButton label="Album actions" />}>
        <MoreIcon />
      </MenuTrigger>
      <MenuContent raised>
        <MenuGroup>
          <MenuGroupLabel>Share</MenuGroupLabel>
          <MenuItem>Copy link</MenuItem>
          <MenuItem>Invite people</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>Export</MenuGroupLabel>
          <MenuItem>Original files</MenuItem>
          <MenuItem>Web size</MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
