import { Card } from "@roprgm/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@roprgm/ui/context-menu";
import { ListItem } from "@roprgm/ui/list-item";
import { MenuItem } from "@roprgm/ui/menu";

const layers = ["Sky", "Subject", "Vignette", "Image"];

export default function ContextMenuOnRows() {
  return (
    <Card className="w-64 p-0">
      {layers.map((layer) => (
        <ContextMenu key={layer}>
          <ContextMenuTrigger render={<ListItem />}>{layer}</ContextMenuTrigger>
          <ContextMenuContent raised>
            <MenuItem>Rename</MenuItem>
            <MenuItem>Duplicate</MenuItem>
            <MenuItem className="text-danger">Delete</MenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </Card>
  );
}
