import { Chip } from "@roprgm/ui/chip";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@roprgm/ui/menu";

export default function ChipMenu() {
  return (
    <Menu>
      <MenuTrigger render={<Chip />}>Export</MenuTrigger>
      <MenuContent>
        <MenuItem>JPEG</MenuItem>
        <MenuItem>PNG</MenuItem>
        <MenuItem>TIFF</MenuItem>
      </MenuContent>
    </Menu>
  );
}
