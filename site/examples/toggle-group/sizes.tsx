import { Toggle, ToggleGroup } from "@roprgm/ui/toggle-group";

export default function ToggleGroupSizes() {
  return (
    <>
      <ToggleGroup aria-label="Library">
        <Toggle name="library" value="photos" defaultChecked>
          Photos
        </Toggle>
        <Toggle name="library" value="albums">
          Albums
        </Toggle>
      </ToggleGroup>
      <ToggleGroup size="lg" aria-label="Range">
        <Toggle name="range" value="day">
          Day
        </Toggle>
        <Toggle name="range" value="week" defaultChecked>
          Week
        </Toggle>
        <Toggle name="range" value="month">
          Month
        </Toggle>
      </ToggleGroup>
    </>
  );
}
