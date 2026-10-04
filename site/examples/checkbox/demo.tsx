import { Checkbox } from "@roprgm/ui/checkbox";
import { DragToggle } from "@roprgm/ui/drag-toggle";

export default function CheckboxDemo() {
  return (
    <DragToggle className="flex flex-col gap-2">
      <label className="flex items-center gap-2">
        <Checkbox defaultChecked /> Show overlay
      </label>
      <label className="flex items-center gap-2">
        <Checkbox /> Auto mask
      </label>
    </DragToggle>
  );
}
