import { useState } from "react";
import { Button, IconButton } from "../src/button";
import { Checkbox } from "../src/checkbox";
import { Chip } from "../src/chip";
import { Input } from "../src/input";
import { ListItem } from "../src/list-item";
import { Menu, MenuItem, MenuSeparator, Submenu } from "../src/menu";
import { Notice } from "../src/notice";
import { Panel, PanelBody, PanelHeader, PanelSection } from "../src/panel";
import { Popover } from "../src/popover";
import { ScrollArea } from "../src/scroll-area";
import { ScrubInput } from "../src/scrub-input";
import { Select } from "../src/select";
import { Slider } from "../src/slider";
import { Spinner } from "../src/spinner";
import { Switch } from "../src/switch";
import { Tab, TabList } from "../src/tabs";
import { Toggle, ToggleGroup } from "../src/toggle-group";
import { Tooltip } from "../src/tooltip";
import { VerticalSlider } from "../src/vertical-slider";
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
      <Button variant="ghost">Ghost</Button>
      <Button disabled>Disabled</Button>
      <IconButton label="Undo" shortcut="Mod Z">
        <UndoIcon />
      </IconButton>
    </>
  );
}

export function InputDemo() {
  return <Input placeholder="Name" className="w-56" />;
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
    <div className="flex items-center gap-1 rounded-full bg-neutral-900/60 p-1">
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

export function SpinnerDemo() {
  return (
    <>
      <Spinner />
      <span className="flex items-center gap-2 text-neutral-400">
        <Spinner className="size-3 border" /> Decoding RAW…
      </span>
    </>
  );
}

export function ShimmerDemo() {
  return (
    <div className="flex w-64 flex-col gap-4">
      <span className="shimmer flex items-center gap-2 text-neutral-300">
        <BrushIcon /> Finding a source for the patch…
      </span>
      <div className="flex items-center gap-3">
        <span className="shimmer size-10 rounded-md bg-neutral-600" />
        <span className="shimmer flex flex-1 flex-col gap-2">
          <span className="h-2.5 w-3/4 rounded-full bg-neutral-600" />
          <span className="h-2.5 w-1/2 rounded-full bg-neutral-600" />
        </span>
      </div>
    </div>
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

export function MenuDemo() {
  return (
    <Menu
      trigger={
        <IconButton label="Layer actions">
          <MoreIcon />
        </IconButton>
      }
    >
      <MenuItem>Duplicate</MenuItem>
      <MenuItem>Rename</MenuItem>
      <Submenu label="Move to">
        <MenuItem>Top</MenuItem>
        <MenuItem>Bottom</MenuItem>
      </Submenu>
      <MenuSeparator />
      <MenuItem className="text-red-300">Delete</MenuItem>
    </Menu>
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
    <Panel className="h-80 w-64 overflow-hidden rounded-xl shadow-float">
      <PanelHeader title="Effects">
        <IconButton label="Add effect" size="icon-sm">
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
          compact
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

/** Icon tabs in a column with their names and keys as tooltips; `onSelect` makes them live. */
export function ToolRail({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <TabList aria-label="Tools" className="flex-col">
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
  return (
    <div className="flex items-start gap-10">
      <div className="rounded-xl bg-neutral-900/60 p-1.5">
        <ToolRail selected={tool} onSelect={setTool} />
      </div>
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
    <div className="w-64 overflow-hidden rounded-lg bg-neutral-800 shadow-float">
      {layers.map((layer) => (
        <ListItem
          key={layer.id}
          selected={layer.id === selected}
          muted={layer.muted}
          onClick={() => setSelected(layer.id)}
        >
          <span className="size-6 rounded-sm bg-linear-to-br from-sky-700 to-amber-600" />
          <span className="flex-1">{layer.name}</span>
          <IconButton
            label="Hide"
            size="icon-sm"
            className="opacity-0 group-hover:opacity-100"
          >
            <EyeIcon />
          </IconButton>
        </ListItem>
      ))}
    </div>
  );
}

export function ScrollAreaDemo() {
  return (
    <ScrollArea fade className="h-48 w-64 rounded-lg bg-neutral-900/60">
      <ol className="flex flex-col gap-2 p-3 text-neutral-400">
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
        compact
      />
    </div>
  );
}

export function ScrubInputDemo() {
  const [size, setSize] = useState(24);
  return (
    <span className="flex items-center gap-2 text-neutral-400">
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
    <div className="flex gap-3">
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
          stops={["#777", hue.color]}
          color={hue.color}
        />
      ))}
    </div>
  );
}
