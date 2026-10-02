import { Toggle, ToggleGroup } from "@roprgm/ui/toggle-group";

export default function ToggleGroupDisabled() {
  return (
    <>
      <ToggleGroup aria-label="Format">
        <Toggle name="format" value="jpeg" defaultChecked>
          JPEG
        </Toggle>
        <Toggle name="format" value="png">
          PNG
        </Toggle>
        <Toggle name="format" value="heic" disabled>
          HEIC
        </Toggle>
      </ToggleGroup>
      <ToggleGroup disabled aria-label="Quality">
        <Toggle name="quality" value="high" defaultChecked>
          High
        </Toggle>
        <Toggle name="quality" value="low">
          Low
        </Toggle>
      </ToggleGroup>
    </>
  );
}
