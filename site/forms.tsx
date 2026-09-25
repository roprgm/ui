import { useState } from "react";
import { Button } from "../src/button";
import { Checkbox } from "../src/checkbox";
import { Chip } from "../src/chip";
import { Field } from "../src/field";
import { IconButton } from "../src/icon-button";
import { Input } from "../src/input";
import { Select } from "../src/select";
import { Slider } from "../src/slider";
import { Switch } from "../src/switch";
import { Textarea } from "../src/textarea";
import { Toggle, ToggleGroup } from "../src/toggle-group";
import { CopyButton } from "./copy-button";
import { percent } from "./demos";
import { MoreIcon, UndoIcon } from "./icons";

const spaces = [
  { value: "srgb", label: "sRGB" },
  { value: "p3", label: "Display P3" },
  { value: "adobe", label: "Adobe RGB" },
];

const sorts = [
  { value: "recent", label: "Recent" },
  { value: "name", label: "Name" },
  { value: "rating", label: "Rating" },
];

/** Fields, buttons, and toggles side by side, to judge how their sizes and paddings sit together. */
export function FormsDemo() {
  const [quality, setQuality] = useState(90);
  return (
    <div className="grid items-start gap-6 p-6 md:grid-cols-2">
      <div className="layer-elevated rounded-xl shadow-raised">
        <div className="flex flex-col gap-3 p-3.5 pt-3">
          <h4 className="font-medium">Export</h4>
          <Field label="File name">
            <Input defaultValue="Lisbon sunset" />
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Width">
              <Input defaultValue="3840" />
            </Field>
            <Field label="Height">
              <Input defaultValue="2160" />
            </Field>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted">Format</span>
            <ToggleGroup>
              <Toggle name="format" value="jpeg" defaultChecked>
                JPEG
              </Toggle>
              <Toggle name="format" value="png">
                PNG
              </Toggle>
              <Toggle name="format" value="tiff">
                TIFF
              </Toggle>
            </ToggleGroup>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted">Color space</span>
            <Select
              aria-label="Color space"
              items={spaces}
              defaultValue="srgb"
              className="w-36"
            />
          </div>
          <Slider
            label="Quality"
            value={quality}
            onChange={setQuality}
            min={0}
            max={100}
            format={percent}
          />
          <label className="flex items-center gap-2">
            <Checkbox defaultChecked /> Include metadata
          </label>
          <label className="flex items-center gap-2">
            <Switch /> Open when done
          </label>
        </div>
        <div className="flex justify-end gap-2 p-3 pt-0">
          <Button>Cancel</Button>
          <Button variant="primary">Export</Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Input placeholder="Search presets" />
          <Button>Search</Button>
        </div>
        <div className="flex gap-2">
          <Input
            readOnly
            value="https://ui.roprgm.com/p/lisbon"
            aria-label="Link"
          />
          <CopyButton value="https://ui.roprgm.com/p/lisbon" />
        </div>
        <div className="flex gap-2">
          <Select
            aria-label="Sort by"
            items={sorts}
            defaultValue="recent"
            className="flex-1"
          />
          <IconButton label="More">
            <MoreIcon />
          </IconButton>
        </div>
        <div className="flex items-center gap-2">
          <ToggleGroup>
            <Toggle name="view" value="fit" defaultChecked>
              Fit
            </Toggle>
            <Toggle name="view" value="fill">
              Fill
            </Toggle>
          </ToggleGroup>
          <Select
            aria-label="Zoom"
            variant="pill"
            items={[
              { value: "50", label: "50%" },
              { value: "100", label: "100%" },
            ]}
            defaultValue="100"
          />
          <Chip aria-pressed>Overlay</Chip>
          <IconButton label="Undo" size="icon-sm" className="ml-auto">
            <UndoIcon />
          </IconButton>
        </div>
        <Textarea placeholder="Notes for this edit" />
        <div className="flex justify-end gap-2">
          <Button variant="ghost">Discard</Button>
          <Button variant="primary">Save</Button>
        </div>
      </div>
    </div>
  );
}
