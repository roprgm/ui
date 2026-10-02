import { Switch } from "@roprgm/ui/switch";

export default function SwitchDemo() {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2">
        <Switch defaultChecked /> Snap
      </label>
      <label className="flex items-center gap-2">
        <Switch /> Grid
      </label>
    </div>
  );
}
