import { Switch } from "@roprgm/ui/switch";

export default function SwitchDisabled() {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2">
        <Switch defaultChecked disabled /> Sync to cloud
      </label>
      <label className="flex items-center gap-2">
        <Switch disabled /> Share location
      </label>
    </div>
  );
}
