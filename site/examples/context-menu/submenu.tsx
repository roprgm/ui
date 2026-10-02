import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@roprgm/ui/context-menu";
import {
  MenuItem,
  Submenu,
  SubmenuContent,
  SubmenuTrigger,
} from "@roprgm/ui/menu";

export default function ContextMenuSubmenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-lg material-field text-secondary select-none">
        Right-click or long-press
      </ContextMenuTrigger>
      <ContextMenuContent raised>
        <MenuItem>Duplicate</MenuItem>
        <Submenu>
          <SubmenuTrigger>Rotate</SubmenuTrigger>
          <SubmenuContent>
            <MenuItem>Left</MenuItem>
            <MenuItem>Right</MenuItem>
            <MenuItem>Upside down</MenuItem>
          </SubmenuContent>
        </Submenu>
        <MenuItem>Rename</MenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
