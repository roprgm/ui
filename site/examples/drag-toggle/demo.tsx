import { Checkbox } from "@roprgm/ui/checkbox";
import { DragToggle } from "@roprgm/ui/drag-toggle";
import { ListItem } from "@roprgm/ui/list-item";

const photos = ["Harbor", "Lighthouse", "Dunes", "Pier", "Tide pools"];

export default function DragToggleDemo() {
  return (
    <DragToggle className="w-56 overflow-hidden rounded-lg material-float">
      {photos.map((photo) => (
        <ListItem key={photo}>
          <label className="flex flex-1 items-center gap-2.5 self-stretch">
            <Checkbox defaultChecked={photo === "Dunes"} />
            {photo}
          </label>
        </ListItem>
      ))}
    </DragToggle>
  );
}
