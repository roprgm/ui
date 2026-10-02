import { Checkbox } from "@roprgm/ui/checkbox";

export default function CheckboxDisabled() {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2">
        <Checkbox defaultChecked disabled /> Keep originals
      </label>
      <label className="flex items-center gap-2">
        <Checkbox disabled /> Upload RAW files
      </label>
    </div>
  );
}
