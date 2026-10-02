import { Button } from "@roprgm/ui/button";
import { Input } from "@roprgm/ui/input";
import { Select } from "@roprgm/ui/select";
import { Switch } from "@roprgm/ui/switch";
import { Toggle, ToggleGroup } from "@roprgm/ui/toggle-group";

const formats = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "tiff", label: "TIFF" },
];

function Controls({ name, level }: { name: string; level: number }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-secondary">
        {name} <span className="text-disabled">at level {level}</span>
      </span>
      <div className="flex flex-wrap items-center gap-2">
        <Input placeholder="File name" className="w-36" />
        <Select
          raised={level > 2}
          aria-label="Format"
          items={formats}
          placeholder="Format"
          className="w-28"
        />
        <Button>Cancel</Button>
        <Button variant="primary">Export</Button>
        <ToggleGroup>
          <Toggle name={`${name}-view`} value="fit" defaultChecked>
            Fit
          </Toggle>
          <Toggle name={`${name}-view`} value="fill">
            Fill
          </Toggle>
        </ToggleGroup>
        <Switch aria-label="Snap" defaultChecked />
      </div>
    </div>
  );
}

/** The same controls on the page and on a card, to compare their contrast. */
export function Depth() {
  return (
    <div className="flex flex-col gap-6">
      <Controls name="Page" level={2} />
      <div className="rounded-xl p-5 material-card">
        <Controls name="Card" level={4} />
      </div>
    </div>
  );
}
