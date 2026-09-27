import { cn } from "cn";
import { useState } from "react";
import { Badge } from "../src/components/badge";
import { Button } from "../src/components/button";
import { Card, CardAction, CardSection } from "../src/components/card";
import { Checkbox } from "../src/components/checkbox";
import { Chevron } from "../src/components/chevron";
import { Chip } from "../src/components/chip";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "../src/components/collapsible";
import { Combobox } from "../src/components/combobox";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "../src/components/context-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../src/components/dialog";
import { Field } from "../src/components/field";
import { IconButton } from "../src/components/icon-button";
import { Input } from "../src/components/input";
import { Kbd } from "../src/components/kbd";
import { ListItem, ListItemAction } from "../src/components/list-item";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
  Submenu,
  SubmenuContent,
  SubmenuTrigger,
} from "../src/components/menu";
import { Notice, NoticeClose } from "../src/components/notice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../src/components/popover";
import { Radio } from "../src/components/radio";
import { ScrollArea } from "../src/components/scroll-area";
import { ScrollText } from "../src/components/scroll-text";
import { ScrubInput } from "../src/components/scrub-input";
import { Select } from "../src/components/select";
import { Slider } from "../src/components/slider";
import { Spinner } from "../src/components/spinner";
import { Switch } from "../src/components/switch";
import { Tab, TabList } from "../src/components/tabs";
import { Textarea } from "../src/components/textarea";
import { toast } from "../src/components/toast";
import { Toggle, ToggleGroup } from "../src/components/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../src/components/tooltip";
import { type TreeDrop, TreeList } from "../src/components/tree-list";
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
      {/* 4px in; concentric corners would be too sharp here. */}
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

export function RadioDemo() {
  return (
    <fieldset className="flex flex-col gap-2">
      <label className="flex items-center gap-2">
        <Radio name="export-size" value="original" defaultChecked /> Original
        size
      </label>
      <label className="flex items-center gap-2">
        <Radio name="export-size" value="web" /> Web, 2048px
      </label>
      <label className="flex items-center gap-2">
        <Radio name="export-size" value="thumbnail" disabled /> Thumbnail
      </label>
    </fieldset>
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

const fonts = [
  "Geist",
  "Geist Mono",
  "Helvetica Neue",
  "IBM Plex Sans",
  "Inter",
  "JetBrains Mono",
  "Söhne",
  "SF Pro",
].map((font) => ({ value: font, label: font }));

export function ComboboxDemo() {
  return (
    <Combobox
      aria-label="Font"
      items={fonts}
      placeholder="Search fonts"
      defaultValue="Geist"
      className="w-48"
    />
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
          className="flex h-7 items-center gap-2 rounded-md surface-sunken px-2.5"
        >
          <ScrollText>{name}</ScrollText>
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

const surfaces = [
  "surface-raised",
  "surface-sunken",
  "surface-thumb",
  "surface-card",
  "surface-panel",
  "surface-float",
] as const;

export function SurfacesDemo() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid grid-cols-3 gap-x-8 gap-y-6">
        {surfaces.map((name) => (
          <div key={name} className="flex flex-col items-center gap-3">
            <div
              className={cn(
                "size-16 rounded-lg",
                name,
                name === "surface-thumb" && "rounded-full",
              )}
            />
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
      <div className="grid gap-2 rounded-2xl p-2 surface-card sm:grid-cols-2">
        <Layer name="Card" className="p-4" />
        <Layer name="Card in a card" className="rounded-lg p-4 surface-card" />
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
    <Tooltip key={side}>
      <TooltipTrigger render={<Button className="capitalize" />}>
        {side}
      </TooltipTrigger>
      <TooltipContent side={side} shortcut="Mod S">
        Saves the document
      </TooltipContent>
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

export function BadgeDemo() {
  return (
    <>
      <Badge>Draft</Badge>
      <Badge variant="primary">New</Badge>
      <span className="flex items-center gap-2">
        Comments <Badge>3</Badge>
      </span>
    </>
  );
}

export function MenuDemo() {
  return (
    <Menu>
      <MenuTrigger render={<IconButton label="Layer actions" />}>
        <MoreIcon />
      </MenuTrigger>
      <MenuContent>
        <MenuItem shortcut="Mod D">Duplicate</MenuItem>
        <MenuItem shortcut="F2">Rename</MenuItem>
        <Submenu>
          <SubmenuTrigger>Move to</SubmenuTrigger>
          <SubmenuContent>
            <MenuItem>Top</MenuItem>
            <MenuItem>Bottom</MenuItem>
          </SubmenuContent>
        </Submenu>
        <MenuSeparator />
        <MenuItem shortcut="⌫" className="text-danger">
          Delete
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}

export function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-lg surface-sunken text-muted select-none">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <MenuItem shortcut="Mod C">Copy</MenuItem>
        <MenuItem shortcut="Mod V">Paste</MenuItem>
        <Submenu>
          <SubmenuTrigger>Arrange</SubmenuTrigger>
          <SubmenuContent>
            <MenuItem>Bring to front</MenuItem>
            <MenuItem>Send to back</MenuItem>
          </SubmenuContent>
        </Submenu>
        <MenuSeparator />
        <MenuItem shortcut="⌫" className="text-danger">
          Delete
        </MenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Export…</DialogTrigger>
      <DialogContent>
        <CardSection className="gap-1">
          <DialogTitle>Export image</DialogTitle>
          <DialogDescription>
            Saves a copy with your edits. The original stays as it is.
          </DialogDescription>
        </CardSection>
        <CardSection>
          <Input defaultValue="portrait-edit.jpg" aria-label="File name" />
        </CardSection>
        <CardSection className="flex-row justify-end gap-1 px-2.5">
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <DialogClose render={<Button variant="primary" />}>
            Export
          </DialogClose>
        </CardSection>
      </DialogContent>
    </Dialog>
  );
}

export function AlertDialogDemo() {
  return (
    <Dialog alert>
      <DialogTrigger render={<Button />}>Delete layer…</DialogTrigger>
      <DialogContent>
        <CardSection className="gap-1">
          <DialogTitle>Delete “Sky”?</DialogTitle>
          <DialogDescription>
            Its mask and adjustments go with it.
          </DialogDescription>
        </CardSection>
        <CardSection className="flex-row justify-end gap-1 px-2.5">
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <DialogClose render={<Button className="text-danger" />}>
            Delete
          </DialogClose>
        </CardSection>
      </DialogContent>
    </Dialog>
  );
}

export function PopoverDemo() {
  const [size, setSize] = useState(40);
  const [feather, setFeather] = useState(50);
  return (
    <Popover>
      <PopoverTrigger render={<Chip />}>
        <BrushIcon /> Brush
      </PopoverTrigger>
      <PopoverContent align="center" className="w-64">
        <CardSection>
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
        </CardSection>
      </PopoverContent>
    </Popover>
  );
}

export function NoticeDemo() {
  const [shown, setShown] = useState(true);
  if (!shown) {
    return <Button onClick={() => setShown(true)}>Show notice</Button>;
  }
  return (
    <Notice>
      <CardSection className="flex-row items-start">
        <p className="flex-1">
          An unsaved draft from yesterday can be restored.
        </p>
        <CardAction>
          <NoticeClose onClick={() => setShown(false)} />
        </CardAction>
      </CardSection>
      <CardSection className="flex-row gap-1 px-2.5">
        <Button variant="primary">Restore</Button>
        <Button variant="ghost">Forget</Button>
      </CardSection>
    </Notice>
  );
}

export function ToastDemo() {
  return (
    <>
      <Button
        onClick={() =>
          toast.add({ title: "Exported", description: "portrait-edit.jpg" })
        }
      >
        Export
      </Button>
      <Button
        onClick={() =>
          toast.add({
            description: "Layer deleted.",
            actionProps: { children: "Undo" },
          })
        }
      >
        Delete layer
      </Button>
      <Button
        onClick={() =>
          toast.add({
            title: "Export failed",
            description: "The disk is full.",
            priority: "high",
          })
        }
      >
        Fail
      </Button>
    </>
  );
}

const tools = [
  { id: "adjust", label: "Adjust", key: "A", Icon: AdjustIcon },
  { id: "brush", label: "Brush", key: "B", Icon: BrushIcon },
  { id: "heal", label: "Healing", key: "H", Icon: HealIcon },
  { id: "crop", label: "Crop", key: "C", Icon: CropIcon },
];

/** Icon tabs in a column, with their names and keys as tooltips. */
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
        <Tooltip key={id}>
          <TooltipTrigger
            render={
              <Tab
                selected={id === selected}
                size="icon"
                aria-label={label}
                onClick={() => onSelect(id)}
              />
            }
          >
            <Icon />
          </TooltipTrigger>
          <TooltipContent side="right" shortcut={key}>
            {label}
          </TooltipContent>
        </Tooltip>
      ))}
    </TabList>
  );
}

const panels = [
  "Basic",
  "Tone curve",
  "Color mixer",
  "Color grading",
  "Detail",
  "Lens",
  "Geometry",
  "Effects",
];

export function TabsDemo() {
  const [tab, setTab] = useState("layers");
  const [tool, setTool] = useState("adjust");
  const [channel, setChannel] = useState("hue");
  const [section, setSection] = useState(panels[0]);
  return (
    <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-6">
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
        <TabList aria-label="Panels" className="max-w-64 overflow-fade-x">
          {panels.map((panel) => (
            <Tab
              key={panel}
              selected={panel === section}
              onClick={() => setSection(panel)}
            >
              {panel}
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
    <div className="w-64 overflow-hidden rounded-lg surface-float">
      {layers.map((layer) => (
        <ListItem
          key={layer.id}
          selected={layer.id === selected}
          muted={layer.muted}
          onClick={() => setSelected(layer.id)}
        >
          <span className="size-7 rounded-md bg-linear-to-br from-sky-700 to-amber-600" />
          <span className="flex-1">{layer.name}</span>
          <ListItemAction>
            <IconButton
              label="Hide"
              className="opacity-0 group-hover:opacity-100"
            >
              <EyeIcon />
            </IconButton>
          </ListItemAction>
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
      className="w-64 overflow-hidden rounded-lg surface-float"
    >
      {(layer) => (
        <>
          <span className="size-7 shrink-0 rounded-md bg-linear-to-br from-sky-700 to-amber-600" />
          <ScrollText className="flex-1">{layer.name}</ScrollText>
          <ListItemAction>
            <IconButton
              label="Hide"
              className="opacity-0 group-hover:opacity-100"
            >
              <EyeIcon />
            </IconButton>
          </ListItemAction>
        </>
      )}
    </TreeList>
  );
}

const edits = [
  {
    title: "Golden hour",
    when: "2 min ago",
    steps: ["Exposure +0.35", "Temperature +12", "Shadows +20"],
  },
  { title: "Crop", when: "5 min ago", steps: ["Aspect 3:2", "Angle 1.5°"] },
];

const presets = [
  { name: "Golden hour", tint: "from-amber-500 to-rose-700" },
  { name: "Blue hour", tint: "from-sky-500 to-indigo-800" },
  { name: "Matte", tint: "from-stone-400 to-stone-700" },
  { name: "Portra", tint: "from-orange-300 to-teal-700" },
  { name: "Noir", tint: "from-neutral-300 to-neutral-900" },
  { name: "Fjord", tint: "from-cyan-300 to-slate-700" },
];

export function CardDemo() {
  return (
    <>
      <EditCard />
      <PresetsCard />
      <EffectsCard />
    </>
  );
}

/** A fixed-height card whose list takes the room left and scrolls. */
function EffectsCard() {
  const [grain, setGrain] = useState(20);
  const [size, setSize] = useState(35);
  return (
    <Card className="h-80 w-64 max-w-full">
      <CardSection className="flex-row items-center">
        <h2 className="flex-1 font-medium">Effects</h2>
        <CardAction>
          <IconButton label="Add effect">
            <PlusIcon />
          </IconButton>
        </CardAction>
      </CardSection>
      <CardSection>
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
      </CardSection>
      <ScrollArea fade className="flex-1">
        {["Vignette", "Grain", "Clarity", "Dehaze", "Sharpen", "Noise"].map(
          (name) => (
            <ListItem key={name}>{name}</ListItem>
          ),
        )}
      </ScrollArea>
    </Card>
  );
}

function PresetsCard() {
  return (
    <Card className="w-72 max-w-full">
      <CardSection>
        <h2 className="font-medium">Presets</h2>
      </CardSection>
      {/* The row runs to the card's edges, so it fades there. */}
      <CardSection className="px-0">
        <div className="flex gap-2 overflow-fade-x px-3.5">
          {presets.map((preset) => (
            <button
              key={preset.name}
              type="button"
              className="flex w-16 shrink-0 cursor-pointer flex-col gap-1.5 rounded-md text-muted focus-ring hover:text-foreground"
            >
              <span
                className={cn(
                  "aspect-square rounded-md bg-linear-to-br",
                  preset.tint,
                )}
              />
              <span className="truncate">{preset.name}</span>
            </button>
          ))}
        </div>
      </CardSection>
      <CardSection className="text-faint">
        <ScrollText>
          Canon EOS R5 · RF 24–70mm F2.8 · ƒ/2.8 · 1/250 s · ISO 100 · 8192 ×
          5464
        </ScrollText>
      </CardSection>
    </Card>
  );
}

function EditCard() {
  return (
    <Card className="w-72 max-w-full">
      <CardSection className="flex-row items-center">
        <h2 className="flex-1 font-medium">Golden hour</h2>
        <CardAction>
          <IconButton label="Add adjustment">
            <PlusIcon />
          </IconButton>
          <IconButton label="More">
            <MoreIcon />
          </IconButton>
        </CardAction>
      </CardSection>
      <CardSection className="gap-1 text-muted">
        <span>Exposure +0.35</span>
        <span>Temperature +12</span>
        <span>Shadows +20</span>
        <span className="text-faint">Edited 2 min ago</span>
      </CardSection>
      <CardSection className="flex-row justify-end gap-1 px-2.5">
        <Button variant="ghost">Revert</Button>
        <Button variant="primary">Apply</Button>
      </CardSection>
    </Card>
  );
}

export function CollapsibleDemo() {
  return (
    <div className="flex w-72 flex-col gap-2">
      {edits.map((edit) => (
        <Card key={edit.title} className="rounded-lg">
          <Collapsible>
            <CollapsibleTrigger>
              <Chevron
                direction="right"
                className="text-muted group-data-open/collapsible:rotate-90"
              />
              <span className="flex-1">{edit.title}</span>
              <span className="text-faint">{edit.when}</span>
            </CollapsibleTrigger>
            <CollapsiblePanel>
              <ol className="flex flex-col gap-1 px-3.5 py-2.5 text-muted shadow-[inset_0_1px_0_var(--color-line)]">
                {edit.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </CollapsiblePanel>
          </Collapsible>
        </Card>
      ))}
    </div>
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
    <>
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
      <HueSliders />
    </>
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

function HueSliders() {
  const [values, setValues] = useState(hues.map(() => 0));
  return (
    <div className="flex">
      {hues.map((hue, index) => (
        <Slider
          key={hue.name}
          orientation="vertical"
          label={`${hue.name} saturation`}
          value={values[index] ?? 0}
          onChange={(value) =>
            setValues(values.map((old, at) => (at === index ? value : old)))
          }
          min={-100}
          max={100}
          defaultValue={0}
          // From a gray as light as the hue.
          stops={[`hsl(from ${hue.color} h 0% l)`, hue.color]}
          color={hue.color}
        />
      ))}
    </div>
  );
}
