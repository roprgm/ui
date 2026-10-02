"use client";

import { Button } from "@roprgm/ui/button";
import { Card } from "@roprgm/ui/card";
import { Checkbox } from "@roprgm/ui/checkbox";
import { Chip } from "@roprgm/ui/chip";
import { CopyButton } from "@roprgm/ui/copy-button";
import { Field } from "@roprgm/ui/field";
import { IconButton } from "@roprgm/ui/icon-button";
import { Input } from "@roprgm/ui/input";
import { Section } from "@roprgm/ui/section";
import { Select } from "@roprgm/ui/select";
import { Slider } from "@roprgm/ui/slider";
import { Switch } from "@roprgm/ui/switch";
import { Textarea } from "@roprgm/ui/textarea";
import { Toggle, ToggleGroup } from "@roprgm/ui/toggle-group";
import { useState } from "react";
import { MoreIcon, UndoIcon } from "@/ui/icons";

const percent = (value: number) => `${value}%`;

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

/** Controls side by side, to judge their sizes together. */
export default function Forms() {
  const [quality, setQuality] = useState(90);
  return (
    <div className="grid min-w-0 grid-cols-1 items-start gap-6 p-3 @sm:p-6 @2xl:grid-cols-2">
      <Card>
        <Section>
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
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-secondary">Format</span>
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
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-secondary">Color space</span>
            <Select
              raised
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
          <label className="flex flex-wrap items-center gap-2">
            <Checkbox defaultChecked /> Include metadata
          </label>
          <label className="flex flex-wrap items-center gap-2">
            <Switch /> Open when done
          </label>
        </Section>
        <Section className="flex-row justify-end gap-1.5 px-2.5">
          <Button>Cancel</Button>
          <Button variant="primary">Export</Button>
        </Section>
      </Card>

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
            raised
            aria-label="Sort by"
            items={sorts}
            defaultValue="recent"
            className="flex-1"
          />
          <IconButton label="More">
            <MoreIcon />
          </IconButton>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ToggleGroup>
            <Toggle name="view" value="fit" defaultChecked>
              Fit
            </Toggle>
            <Toggle name="view" value="fill">
              Fill
            </Toggle>
          </ToggleGroup>
          <Select
            raised
            aria-label="Zoom"
            variant="pill"
            items={[
              { value: "50", label: "50%" },
              { value: "100", label: "100%" },
            ]}
            defaultValue="100"
          />
          <Chip aria-pressed>Overlay</Chip>
          <IconButton label="Undo" className="ml-auto">
            <UndoIcon />
          </IconButton>
        </div>
        <Textarea placeholder="Notes for this edit" />
        <div className="flex justify-end gap-2">
          <Button variant="ghost">Discard</Button>
          <Button variant="primary">Save</Button>
        </div>
      </div>

      {/* To judge which heights read as equal. */}
      <div className="flex flex-col gap-3 @2xl:col-span-2">
        <div className="flex flex-wrap items-center gap-2">
          <ToggleGroup>
            <Toggle name="align" value="left" defaultChecked>
              Left
            </Toggle>
            <Toggle name="align" value="center">
              Center
            </Toggle>
            <Toggle name="align" value="right">
              Right
            </Toggle>
          </ToggleGroup>
          <Button>Default</Button>
          <Button variant="primary">Apply</Button>
          <Select
            raised
            aria-label="Spacing"
            items={sorts}
            defaultValue="recent"
            className="w-32"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ToggleGroup size="lg">
            <Toggle name="align-lg" value="left" defaultChecked>
              Left
            </Toggle>
            <Toggle name="align-lg" value="center">
              Center
            </Toggle>
            <Toggle name="align-lg" value="right">
              Right
            </Toggle>
          </ToggleGroup>
          <Button size="lg">Large</Button>
          <Button size="lg" variant="primary">
            Apply
          </Button>
          <Select
            raised
            aria-label="Spacing"
            items={sorts}
            defaultValue="recent"
            size="lg"
            className="w-32"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Input placeholder="Preset name" className="w-60 max-w-full" />
          <Button>Default</Button>
          <Button variant="primary">Save</Button>
          <Select
            raised
            aria-label="Folder"
            items={sorts}
            defaultValue="recent"
            className="w-32"
          />
        </div>
      </div>
    </div>
  );
}
