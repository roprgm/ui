import { Toggle, ToggleGroup } from "@roprgm/ui/toggle-group";

export default function ToggleGroupCheckboxes() {
  return (
    <ToggleGroup aria-label="Overlays">
      <Toggle type="checkbox" name="grid" defaultChecked>
        Grid
      </Toggle>
      <Toggle type="checkbox" name="guides" defaultChecked>
        Guides
      </Toggle>
      <Toggle type="checkbox" name="clipping">
        Clipping
      </Toggle>
    </ToggleGroup>
  );
}
