import { Radio } from "@roprgm/ui/radio";

export default function RadioDemo() {
  return (
    <fieldset className="flex flex-col gap-2">
      <label className="flex items-center gap-2">
        <Radio name="export-size" value="original" defaultChecked /> Original
        size
      </label>
      <label className="flex items-center gap-2">
        <Radio name="export-size" value="web" /> Web, 2048px
      </label>
      <label className="flex items-center gap-2">
        <Radio name="export-size" value="thumbnail" /> Thumbnail
      </label>
    </fieldset>
  );
}
