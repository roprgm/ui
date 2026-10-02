import { IconButton } from "@roprgm/ui/icon-button";
import { RedoIcon, UndoIcon } from "@/ui/icons";

export default function IconButtonShortcut() {
  return (
    <div className="flex gap-1">
      <IconButton label="Undo" shortcut="Mod Z">
        <UndoIcon />
      </IconButton>
      <IconButton label="Redo" shortcut="Mod Shift Z">
        <RedoIcon />
      </IconButton>
    </div>
  );
}
