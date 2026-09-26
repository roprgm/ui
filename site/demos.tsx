import { cn } from "cn";
import { useState } from "react";
import { Button } from "../src/components/button";
import { Checkbox } from "../src/components/checkbox";
import { Chip } from "../src/components/chip";
import { Dialog, DialogClose } from "../src/components/dialog";
import { Field } from "../src/components/field";
import { IconButton } from "../src/components/icon-button";
import { Input } from "../src/components/input";
import { Kbd } from "../src/components/kbd";
import { ListItem } from "../src/components/list-item";
import { Menu, MenuItem, MenuSeparator, Submenu } from "../src/components/menu";
import { Notice } from "../src/components/notice";
import {
  Panel,
  PanelBody,
  PanelHeader,
  PanelSection,
} from "../src/components/panel";
import { Popover } from "../src/components/popover";
import { ScrollArea } from "../src/components/scroll-area";
import { ScrubInput } from "../src/components/scrub-input";
import { Select } from "../src/components/select";
import { Slider } from "../src/components/slider";
import { Spinner } from "../src/components/spinner";
import { Switch } from "../src/components/switch";
import { Tab, TabList } from "../src/components/tabs";
import { Textarea } from "../src/components/textarea";
import { Toggle, ToggleGroup } from "../src/components/toggle-group";
import { Tooltip } from "../src/components/tooltip";
import { type TreeDrop, TreeList } from "../src/components/tree-list";
import { VerticalSlider } from "../src/components/vertical-slider";
import { CopyButton } from "./copy-button";
import {
  AdjustIcon,
  BrushIcon,
  CropIcon,
  EyeIcon,
  HealIcon,
  MoreIcon,
  PlusIcon,
  UndoIcon,
} from "./icons";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "durian", label: "Durian", disabled: true },
];

export const percent = (value: number) => `${value}%`;

export function ButtonDemo() {
  return (
    <>
      <Button>Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="primary">
        <PlusIcon />
        Import
      </Button>
      <Button variant="ghost">Ghost</Button>
      <Button disabled>Disabled</Button>
      <Button variant="ghost" render={<a href="#icon-button" />}>
        Link
      </Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </>
  );
}

export function IconButtonDemo() {
  return (
    <>
      <IconButton label="Undo" shortcut="Mod Z">
        <UndoIcon />
      </IconButton>
      <IconButton label="More" size="icon-sm">
        <MoreIcon />
      </IconButton>
      <IconButton label="More" size="icon-lg">
        <MoreIcon />
      </IconButton>
    </>
  );
}

export function InputDemo() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <Input placeholder="Name" />
      <Input defaultValue="not an email" aria-invalid />
      <Input type="file" />
      <CopyInput value="https://ui.roprgm.com/r/input.json" />
    </div>
  );
}

function CopyInput({ value }: { value: string }) {
  return (
    <div className="relative">
      <Input
        readOnly
        value={value}
        aria-label="Link"
        size="lg"
        className="pr-8"
      />
      {/* 4px inside the field; concentric corners would be 2px, too sharp at this size. */}
      <CopyButton
        value={value}
        size="icon-sm"
        className="absolute top-1 right-1 rounded-sm"
      />
    </div>
  );
}

export function TextareaDemo() {
  return <Textarea placeholder="Notes" className="w-64" />;
}

export function FieldDemo() {
  return (
    <div className="flex w-64 flex-col gap-4">
      <Field label="Trip name" description="Shown on the itinerary.">
        <Input defaultValue="Lisbon" />
      </Field>
      <Field label="Email" error="Enter an email address.">
        <Input defaultValue="ana@" />
      </Field>
    </div>
  );
}

export function CheckboxDemo() {
  return (
    <>
      <label className="flex items-center gap-2">
        <Checkbox defaultChecked /> Show overlay
      </label>
      <label className="flex items-center gap-2">
        <Checkbox /> Auto mask
      </label>
    </>
  );
}

export function SwitchDemo() {
  return (
    <>
      <label className="flex items-center gap-2">
        <Switch defaultChecked /> Snap
      </label>
      <label className="flex items-center gap-2">
        <Switch /> Grid
      </label>
    </>
  );
}

export function ToggleGroupDemo() {
  return (
    <ToggleGroup>
      <Toggle name="view" value="fit" defaultChecked>
        Fit
      </Toggle>
      <Toggle name="view" value="fill">
        Fill
      </Toggle>
      <Toggle name="view" value="actual">
        100%
      </Toggle>
    </ToggleGroup>
  );
}

export function SelectDemo() {
  return (
    <>
      <Select
        aria-label="Fruit"
        items={fruits}
        placeholder="Pick a fruit"
        className="w-40"
      />
      <Select
        aria-label="Fruits"
        items={fruits}
        placeholder="Pick fruits"
        className="w-40"
        multiple
      />
    </>
  );
}

export function ChipDemo() {
  const [overlay, setOverlay] = useState(true);
  const [erase, setErase] = useState(false);
  return (
    <div className="flex items-center gap-1 rounded-full bg-field/60 p-1">
      <Chip aria-pressed={overlay} onClick={() => setOverlay(!overlay)}>
        Overlay
      </Chip>
      <Chip aria-pressed={erase} onClick={() => setErase(!erase)}>
        Erase
      </Chip>
      <Chip>Reset</Chip>
    </div>
  );
}

export function ScrollTextDemo() {
  return (
    <div className="flex w-56 flex-col gap-2">
      {[
        "Sky",
        "Golden hour warmth, lifted shadows",
        "Subject mask from the brush, feathered",
      ].map((name) => (
        <div
          key={name}
          className="flex h-(--size-control) items-center gap-2 rounded-md surface-sunken px-2.5"
        >
          <span className="scroll-text">{name}</span>
        </div>
      ))}
    </div>
  );
}

export function SpinnerDemo() {
  return (
    <>
      <Spinner />
      <span className="flex items-center gap-2 text-muted">
        <Spinner className="size-3 border" /> Decoding RAW…
      </span>
    </>
  );
}

/** Each primitive with the fill the base gives it; the theme draws its edge. */
const surfaces = [
  { name: "surface-raised", className: "surface-raised" },
  { name: "surface-sunken", className: "surface-sunken" },
  { name: "surface-card", className: "layer-card surface-card" },
  { name: "surface-float", className: "layer-elevated surface-float" },
  { name: "surface-thumb", className: "surface-thumb rounded-full" },
] as const;

export function SurfacesDemo() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid grid-cols-3 gap-x-8 gap-y-6">
        {surfaces.map(({ name, className }) => (
          <div key={name} className="flex flex-col items-center gap-3">
            <div className={cn("size-16 rounded-lg", className)} />
            <span className="text-muted">{name}</span>
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col items-center gap-3">
        <div className="h-px w-48 separator" />
        <span className="text-muted">separator</span>
      </div>
    </div>
  );
}

export function ShimmerDemo() {
  return (
    <div className="flex w-64 flex-col gap-4">
      <span className="shimmer flex items-center gap-2 text-foreground">
        <BrushIcon /> Finding a source for the patch…
      </span>
      <div className="shimmer flex items-center gap-3">
        <span className="size-10 rounded-md bg-raised-hover" />
        <span className="flex flex-1 flex-col gap-2">
          <span className="h-2.5 w-3/4 rounded-full bg-raised-hover" />
          <span className="h-2.5 w-1/2 rounded-full bg-raised-hover" />
        </span>
      </div>
    </div>
  );
}

export function LayersDemo() {
  return (
    <div className="grid gap-2 sm:grid-cols-[1fr_2fr]">
      <Layer name="Page" className="py-6 pr-4" />
      {/* 16px corners less 8px of padding leave 8px for the card inside. */}
      <div className="layer-card grid gap-2 rounded-2xl p-2 surface-card sm:grid-cols-2">
        <Layer name="Card" className="p-4" />
        <Layer
          name="Elevated"
          className="layer-elevated rounded-lg p-4 surface-card"
        />
      </div>
    </div>
  );
}

function Layer({ name, className }: { name: string; className: string }) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <span className="text-faint">{name}</span>
      <LayerControls name={name} />
    </div>
  );
}

function LayerControls({ name }: { name: string }) {
  const [exposure, setExposure] = useState(0.35);
  return (
    <>
      <Input placeholder="Name" />
      <div className="flex gap-2">
        <Button className="flex-1">Cancel</Button>
        <Button variant="primary" className="flex-1">
          Save
        </Button>
      </div>
      <Select aria-label="Fruit" items={fruits} placeholder="Pick a fruit" />
      <ToggleGroup>
        <Toggle name={`${name}-view`} value="fit" defaultChecked>
          Fit
        </Toggle>
        <Toggle name={`${name}-view`} value="fill">
          Fill
        </Toggle>
      </ToggleGroup>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <Switch defaultChecked /> Snap
        </label>
        <label className="flex items-center gap-2">
          <Checkbox defaultChecked /> Grid
        </label>
      </div>
      <Slider
        label="Exposure"
        value={exposure}
        defaultValue={0}
        onChange={setExposure}
        min={-5}
        max={5}
        step={0.05}
      />
    </>
  );
}

export function TooltipDemo() {
  return (["top", "right", "bottom", "left"] as const).map((side) => (
    <Tooltip
      key={side}
      side={side}
      content="Saves the document"
      shortcut="Mod S"
    >
      <Button className="capitalize">{side}</Button>
    </Tooltip>
  ));
}

export function KbdDemo() {
  return (
    <>
      <Kbd>Mod Z</Kbd>
      <Kbd>Mod Shift Z</Kbd>
      <Kbd>B</Kbd>
    </>
  );
}

export function MenuDemo() {
  return (
    <Menu
      trigger={
        <IconButton label="Layer actions">
          <MoreIcon />
        </IconButton>
      }
    >
      <MenuItem shortcut="Mod D">Duplicate</MenuItem>
      <MenuItem shortcut="F2">Rename</MenuItem>
      <Submenu label="Move to">
        <MenuItem>Top</MenuItem>
        <MenuItem>Bottom</MenuItem>
      </Submenu>
      <MenuSeparator />
      <MenuItem shortcut="⌫" className="text-danger">
        Delete
      </MenuItem>
    </Menu>
  );
}

export function DialogDemo() {
  return (
    <Dialog
      trigger={<Button>Export…</Button>}
      title="Export image"
      description="Saves a copy with your edits. The original stays as it is."
      actions={
        <>
          <DialogClose render={<Button variant="ghost">Cancel</Button>} />
          <DialogClose render={<Button variant="primary">Export</Button>} />
        </>
      }
    >
      <Input defaultValue="portrait-edit.jpg" aria-label="File name" />
    </Dialog>
  );
}

export function PopoverDemo() {
  const [size, setSize] = useState(40);
  const [feather, setFeather] = useState(50);
  return (
    <Popover
      align="center"
      trigger={
        <Chip>
          <BrushIcon /> Brush
        </Chip>
      }
    >
      <div className="flex w-56 flex-col gap-3">
        <Slider
          label="Size"
          value={size}
          onChange={setSize}
          min={1}
          max={500}
          format={(v) => `${v}px`}
        />
        <Slider
          label="Feather"
          value={feather}
          defaultValue={50}
          onChange={setFeather}
          min={0}
          max={100}
          format={percent}
        />
      </div>
    </Popover>
  );
}

export function NoticeDemo() {
  const [shown, setShown] = useState(true);
  if (!shown) {
    return <Button onClick={() => setShown(true)}>Show notice</Button>;
  }
  return (
    <Notice
      onDismiss={() => setShown(false)}
      actions={
        <>
          <Button variant="primary">Restore</Button>
          <Button variant="ghost">Forget</Button>
        </>
      }
    >
      An unsaved draft from yesterday can be restored.
    </Notice>
  );
}

export function PanelDemo() {
  const [grain, setGrain] = useState(20);
  const [size, setSize] = useState(35);
  return (
    <Panel className="h-80 w-64 overflow-hidden rounded-xl surface-float">
      <PanelHeader title="Effects">
        <IconButton label="Add effect" size="icon">
          <PlusIcon />
        </IconButton>
      </PanelHeader>
      <PanelSection>
        <Slider
          label="Grain"
          value={grain}
          defaultValue={0}
          onChange={setGrain}
          min={0}
          max={100}
          format={percent}
        />
        <Slider
          label="Size"
          value={size}
          onChange={setSize}
          min={0}
          max={100}
          format={percent}
          variant="compact"
        />
      </PanelSection>
      <PanelBody>
        {["Vignette", "Grain", "Clarity", "Dehaze", "Sharpen", "Noise"].map(
          (name) => (
            <ListItem key={name}>{name}</ListItem>
          ),
        )}
      </PanelBody>
    </Panel>
  );
}

const tools = [
  { id: "adjust", label: "Adjust", key: "A", Icon: AdjustIcon },
  { id: "brush", label: "Brush", key: "B", Icon: BrushIcon },
  { id: "heal", label: "Healing", key: "H", Icon: HealIcon },
  { id: "crop", label: "Crop", key: "C", Icon: CropIcon },
];

/** Segmented icon tabs in a column, with their names and keys as tooltips; `onSelect` makes them live. */
export function ToolRail({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <TabList aria-label="Tools" variant="segmented" className="flex-col">
      {tools.map(({ id, label, key, Icon }) => (
        <Tooltip key={id} content={label} shortcut={key} side="right">
          <Tab
            selected={id === selected}
            size="icon"
            aria-label={label}
            onClick={() => onSelect(id)}
          >
            <Icon />
          </Tab>
        </Tooltip>
      ))}
    </TabList>
  );
}

export function TabsDemo() {
  const [tab, setTab] = useState("layers");
  const [tool, setTool] = useState("adjust");
  const [channel, setChannel] = useState("hue");
  return (
    <div className="flex items-start gap-10">
      <ToolRail selected={tool} onSelect={setTool} />
      <div className="flex flex-col items-start gap-6">
        <TabList aria-label="Sidebar">
          {["layers", "history", "info"].map((id) => (
            <Tab
              key={id}
              selected={id === tab}
              className="capitalize"
              onClick={() => setTab(id)}
            >
              {id}
            </Tab>
          ))}
        </TabList>
        <TabList aria-label="Channel" variant="segmented">
          {["hue", "saturation", "luminance"].map((id) => (
            <Tab
              key={id}
              selected={id === channel}
              className="capitalize"
              onClick={() => setChannel(id)}
            >
              {id}
            </Tab>
          ))}
        </TabList>
      </div>
    </div>
  );
}

export function ListItemDemo() {
  const [selected, setSelected] = useState("sky");
  const layers = [
    { id: "sky", name: "Sky" },
    { id: "subject", name: "Subject" },
    { id: "vignette", name: "Vignette", muted: true },
    { id: "image", name: "Image" },
  ];
  return (
    <div className="layer-elevated w-64 overflow-hidden rounded-lg surface-float">
      {layers.map((layer) => (
        <ListItem
          key={layer.id}
          selected={layer.id === selected}
          muted={layer.muted}
          onClick={() => setSelected(layer.id)}
        >
          <span className="size-(--size-control) rounded-md bg-linear-to-br from-sky-700 to-amber-600" />
          <span className="flex-1">{layer.name}</span>
          <IconButton
            label="Hide"
            size="icon"
            className="opacity-0 group-hover:opacity-100"
          >
            <EyeIcon />
          </IconButton>
        </ListItem>
      ))}
    </div>
  );
}

type Layer = { id: string; name: string; children?: Layer[] };

function findLayer(layers: Layer[], id: string): Layer | undefined {
  for (const layer of layers) {
    const found = layer.id === id ? layer : findLayer(layer.children ?? [], id);
    if (found) return found;
  }
}

function withoutLayer(layers: Layer[], id: string): Layer[] {
  return layers
    .filter((layer) => layer.id !== id)
    .map((layer) => {
      if (!layer.children) return layer;
      return { ...layer, children: withoutLayer(layer.children, id) };
    });
}

function placeLayer(layers: Layer[], moved: Layer, drop: TreeDrop): Layer[] {
  return layers.flatMap((layer) => {
    if (layer.id === drop.target) {
      if (drop.position === "before") return [moved, layer];
      if (drop.position === "after") return [layer, moved];
      return [{ ...layer, children: [...(layer.children ?? []), moved] }];
    }
    if (!layer.children) return [layer];
    return [{ ...layer, children: placeLayer(layer.children, moved, drop) }];
  });
}

export function TreeListDemo() {
  const [selected, setSelected] = useState("sky");
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: "portrait",
      name: "Portrait",
      children: [
        { id: "skin", name: "Skin" },
        { id: "eyes", name: "Eyes" },
      ],
    },
    { id: "sky", name: "Sky" },
    { id: "background", name: "Background", children: [] },
    { id: "vignette", name: "Vignette" },
    { id: "image", name: "Image" },
  ]);
  return (
    <TreeList
      aria-label="Layers"
      items={layers}
      label={(layer) => layer.name}
      selected={selected}
      onSelect={setSelected}
      canDrag={(layer) => layer.id !== "image"}
      canDrop={({ target, position }) => {
        if (target === "image") return position === "before";
        return (
          position !== "inside" || Boolean(findLayer(layers, target)?.children)
        );
      }}
      onDrop={(drop) => {
        const moved = findLayer(layers, drop.id);
        if (!moved) return;
        setLayers(placeLayer(withoutLayer(layers, drop.id), moved, drop));
      }}
      className="layer-elevated w-64 overflow-hidden rounded-lg surface-float"
    >
      {(layer) => (
        <>
          <span className="size-(--size-control) shrink-0 rounded-md bg-linear-to-br from-sky-700 to-amber-600" />
          <span className="flex-1 scroll-text">{layer.name}</span>
          <IconButton
            label="Hide"
            size="icon"
            className="opacity-0 group-hover:opacity-100"
          >
            <EyeIcon />
          </IconButton>
        </>
      )}
    </TreeList>
  );
}

export function ScrollAreaDemo() {
  return (
    <ScrollArea fade className="h-48 w-64 rounded-lg bg-field/60">
      <ol className="flex flex-col gap-2 p-3 text-muted">
        {Array.from({ length: 24 }, (_, index) => (
          <li key={index}>Step {index + 1}: Exposure +0.1</li>
        ))}
      </ol>
    </ScrollArea>
  );
}

const degrees = new Intl.NumberFormat("en", {
  style: "unit",
  unit: "degree",
  unitDisplay: "narrow",
}).format;

export function SliderDemo() {
  const [exposure, setExposure] = useState(0.35);
  const [opacity, setOpacity] = useState(80);
  const [angle, setAngle] = useState(0);
  return (
    <div className="flex w-64 flex-col gap-4">
      <Slider
        label="Exposure"
        value={exposure}
        defaultValue={0}
        onChange={setExposure}
        min={-5}
        max={5}
        step={0.05}
        format={(v) => `${v.toFixed(2)} EV`}
      />
      <Slider
        label="Opacity"
        value={opacity}
        defaultValue={100}
        onChange={setOpacity}
        min={0}
        max={100}
        format={percent}
      />
      <Slider
        label="Angle"
        value={angle}
        defaultValue={0}
        onChange={setAngle}
        min={-180}
        max={180}
        format={degrees}
        variant="compact"
      />
    </div>
  );
}

export function ScrubInputDemo() {
  const [size, setSize] = useState(24);
  const [angle, setAngle] = useState(0);
  return (
    <>
      <span className="flex items-center gap-2 text-muted">
        Size
        <ScrubInput
          aria-label="Size"
          value={size}
          defaultValue={24}
          onChange={setSize}
          min={1}
          max={500}
          format={(v) => `${v}px`}
        />
      </span>
      <span className="flex items-center gap-2 text-muted">
        Angle
        <ScrubInput
          aria-label="Angle"
          value={angle}
          defaultValue={0}
          onChange={setAngle}
          min={-180}
          max={180}
          format={(v) => `${v}°`}
          chevrons
        />
      </span>
    </>
  );
}

const hues = [
  { name: "Red", color: "#f55" },
  { name: "Orange", color: "#f93" },
  { name: "Yellow", color: "#fd4" },
  { name: "Green", color: "#5d6" },
  { name: "Blue", color: "#59f" },
];

export function VerticalSliderDemo() {
  const [values, setValues] = useState(hues.map(() => 0));
  return (
    <div className="flex">
      {hues.map((hue, index) => (
        <VerticalSlider
          key={hue.name}
          label={`${hue.name} saturation`}
          value={values[index] ?? 0}
          onChange={(value) =>
            setValues(values.map((old, at) => (at === index ? value : old)))
          }
          min={-100}
          max={100}
          defaultValue={0}
          // From a gray as light as the hue, so the track neither darkens nor lightens toward it.
          stops={[`hsl(from ${hue.color} h 0% l)`, hue.color]}
          color={hue.color}
        />
      ))}
    </div>
  );
}
