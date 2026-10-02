import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@roprgm/ui/context-menu";
import { MenuItem, MenuSeparator } from "@roprgm/ui/menu";

export default function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-lg surface-field text-secondary select-none">
        Right-click or long-press
      </ContextMenuTrigger>
      <ContextMenuContent raised>
        <MenuItem shortcut="Mod C">Copy edits</MenuItem>
        <MenuItem shortcut="Mod V">Paste edits</MenuItem>
        <MenuItem shortcut="Mod D">Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem shortcut="⌫" className="text-danger">
          Delete
        </MenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
