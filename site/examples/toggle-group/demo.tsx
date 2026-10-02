import { Toggle, ToggleGroup } from "@roprgm/ui/toggle-group";

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup aria-label="Zoom">
      <Toggle name="zoom" value="fit" defaultChecked>
        Fit
      </Toggle>
      <Toggle name="zoom" value="fill">
        Fill
      </Toggle>
      <Toggle name="zoom" value="actual">
        100%
      </Toggle>
    </ToggleGroup>
  );
}
