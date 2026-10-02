import { Radio } from "@roprgm/ui/radio";

export default function RadioWithLegend() {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-secondary">Sort photos by</legend>
      <label className="flex items-center gap-2">
        <Radio name="sort" value="date" defaultChecked /> Date taken
      </label>
      <label className="flex items-center gap-2">
        <Radio name="sort" value="place" /> Place
      </label>
    </fieldset>
  );
}
