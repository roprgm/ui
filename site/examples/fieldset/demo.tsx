import { Checkbox } from "@roprgm/ui/checkbox";
import { Fieldset } from "@roprgm/ui/fieldset";

export default function FieldsetDemo() {
  return (
    <Fieldset
      legend="Notify me when"
      description="By email and on this device."
    >
      <label className="flex items-center gap-2">
        <Checkbox defaultChecked /> Someone comments
      </label>
      <label className="flex items-center gap-2">
        <Checkbox defaultChecked /> An album is shared with me
      </label>
      <label className="flex items-center gap-2">
        <Checkbox /> An export finishes
      </label>
    </Fieldset>
  );
}
