import { Radio } from "@roprgm/ui/radio";

export default function RadioDisabled() {
  return (
    <fieldset className="flex flex-col gap-2">
      <label className="flex items-center gap-2">
        <Radio name="format" value="jpeg" defaultChecked /> JPEG
      </label>
      <label className="flex items-center gap-2">
        <Radio name="format" value="png" /> PNG
      </label>
      <label className="flex items-center gap-2">
        <Radio name="format" value="raw" disabled /> RAW
      </label>
    </fieldset>
  );
}
