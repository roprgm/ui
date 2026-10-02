import { Switch } from "@roprgm/ui/switch";

export default function SwitchSettings() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <label className="flex items-center justify-between gap-2">
        Show flights on the calendar <Switch defaultChecked />
      </label>
      <label className="flex items-center justify-between gap-2">
        Email me before each trip <Switch />
      </label>
    </div>
  );
}
