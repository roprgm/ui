import { cn } from "cn";
import { type ReactNode, useState } from "react";
import { Badge } from "../src/components/badge";
import { Button } from "../src/components/button";
import { Card } from "../src/components/card";
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
import { Section, SectionAction } from "../src/components/section";
import { Select } from "../src/components/select";
import { Slider } from "../src/components/slider";
import { Spinner } from "../src/components/spinner";
import { Switch } from "../src/components/switch";
import { Tab, TabList, TabPanel, Tabs } from "../src/components/tabs";
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
    <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
      <Frame label="Variants">
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
      </Frame>
      <Frame label="Sizes">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
      </Frame>
    </div>
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
    <div className="grid gap-3 sm:grid-cols-2">
      <Frame label="Field">
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
      </Frame>
      <Frame label="Pill">
        {/* A bar over a canvas, beside chips. */}
        <div className="flex items-center gap-1 rounded-full p-1 surface-float">
          <Chip>
            <BrushIcon /> Brush
          </Chip>
          <Select
            variant="pill"
            aria-label="Mask operation"
            items={operations}
            defaultValue="add"
          />
        </div>
      </Frame>
    </div>
  );
}

const operations = [
  { value: "add", label: "Add" },
  { value: "subtract", label: "Subtract" },
];

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

/** One variant of a demo in a card of its own, named in its header, to set beside another. */
function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Card>
      <Section>
        <span className="text-muted">{label}</span>
      </Section>
      <Section className="min-h-32 flex-1 flex-row flex-wrap items-center justify-center gap-3 p-6">
        {children}
      </Section>
    </Card>
  );
}

const levels = [
  "bg-level-0",
  "bg-level-1",
  "bg-level-2",
  "bg-level-3",
  "bg-level-4",
  "bg-level-5",
  "bg-level-6",
  "bg-level-7",
  "bg-level-8",
  "bg-level-9",
  "bg-level-10",
  "bg-level-11",
  "bg-level-12",
] as const;

// Where each fill sits by default, to read text on it.
const grounds = [
  { name: "Page", className: "bg-level-2" },
  { name: "Card", className: "bg-level-4" },
  { name: "Card in a card", className: "bg-level-6" },
] as const;

const accents = [
  { name: "primary", className: "bg-primary" },
  { name: "danger", className: "bg-danger" },
  { name: "focus", className: "bg-focus" },
  { name: "line", className: "bg-line" },
] as const;

export function ColorsDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Frame label="Levels">
        <div className="grid w-full grid-cols-13 rounded-xl bg-level-0 p-1.5">
          {levels.map((level, index) => (
            <div
              key={level}
              className={cn(
                "flex h-24 items-end justify-center pb-2 text-muted tabular-nums first:rounded-l-md last:rounded-r-md",
                level,
              )}
            >
              {index}
            </div>
          ))}
        </div>
      </Frame>
      <div className="grid gap-3 sm:grid-cols-[3fr_2fr]">
        <Frame label="Text">
          <div className="grid w-full grid-cols-3 gap-2">
            {grounds.map((ground) => (
              <div
                key={ground.name}
                className={cn(
                  "flex flex-col gap-1 rounded-lg p-3",
                  ground.className,
                )}
              >
                <span className="text-foreground">Foreground</span>
                <span className="text-muted">Muted</span>
                <span className="text-disabled">Disabled</span>
              </div>
            ))}
          </div>
        </Frame>
        <Frame label="Accents">
          <div className="grid grid-cols-4 gap-4">
            {accents.map((accent) => (
              <div
                key={accent.name}
                className="flex flex-col items-center gap-2"
              >
                <div className={cn("size-10 rounded-full", accent.className)} />
                <span className="text-muted">{accent.name}</span>
              </div>
            ))}
          </div>
        </Frame>
      </div>
    </div>
  );
}

const surfaces = [
  "surface-card",
  "surface-raised",
  "surface-sunken",
  "surface-primary",
  "surface-float",
  "separator",
] as const;

function Swatch({ name }: { name: (typeof surfaces)[number] }) {
  if (name === "separator") {
    return (
      <div className="flex size-16 items-center">
        <div className="h-px w-full separator" />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "size-16 rounded-lg",
        name,
        name === "surface-primary" && "rounded-full",
      )}
    />
  );
}

export function SurfacesDemo() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
      {surfaces.map((name) => (
        <div key={name} className="flex flex-col items-center gap-3">
          <Swatch name={name} />
          <span className="text-muted">{name}</span>
        </div>
      ))}
    </div>
  );
}

export function DepthDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Depth name="Page" level={2} />
      {/* 16px corners less 8px of padding leave 8px for the card inside. */}
      <div className="flex flex-col gap-2 rounded-2xl p-2 surface-card">
        <div className="p-3">
          <Depth name="Card" level={4} />
        </div>
        <div className="rounded-lg p-5 surface-card">
          <Depth name="Card in a card" level={6} />
        </div>
      </div>
    </div>
  );
}

function Depth({ name, level }: { name: string; level: number }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-muted">
        {name} <span className="text-disabled">· level {level}</span>
      </span>
      <div className="flex flex-wrap items-center gap-2">
        <Input placeholder="Name" className="w-36" />
        <Select
          aria-label="Fruit"
          items={fruits}
          placeholder="Pick a fruit"
          className="w-36"
        />
        <Button>Cancel</Button>
        <Button variant="primary">Save</Button>
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

export function SizesDemo() {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-6 gap-y-4">
      <span className="text-muted tabular-nums">24px</span>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Small</Button>
        <IconButton label="More" size="icon-sm">
          <MoreIcon />
        </IconButton>
      </div>
      <span className="text-muted tabular-nums">28px</span>
      <div className="flex flex-wrap items-center gap-2">
        <Button>Default</Button>
        <IconButton label="More">
          <MoreIcon />
        </IconButton>
        <Input placeholder="Name" className="w-32" />
        <Select
          aria-label="Fruit"
          items={fruits}
          placeholder="Fruit"
          className="w-32"
        />
      </div>
      <span className="text-muted tabular-nums">32px</span>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="lg">Large</Button>
        <IconButton label="More" size="icon-lg">
          <MoreIcon />
        </IconButton>
        <Input size="lg" placeholder="Name" className="w-32" />
        <Select
          size="lg"
          aria-label="Fruit"
          items={fruits}
          placeholder="Fruit"
          className="w-32"
        />
      </div>
      <span className="text-muted tabular-nums">40px</span>
      <div className="w-64 max-w-full overflow-hidden rounded-lg surface-float">
        <ListItem>Sky</ListItem>
        <ListItem>Subject</ListItem>
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
        <span className="size-10 rounded-md bg-raised" />
        <span className="flex flex-1 flex-col gap-2">
          <span className="h-2.5 w-3/4 rounded-full bg-raised" />
          <span className="h-2.5 w-1/2 rounded-full bg-raised" />
        </span>
      </div>
    </div>
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
        <Section className="gap-1">
          <DialogTitle>Export image</DialogTitle>
          <DialogDescription>
            Saves a copy with your edits. The original stays as it is.
          </DialogDescription>
        </Section>
        <Section>
          <Input defaultValue="portrait-edit.jpg" aria-label="File name" />
        </Section>
        <Section className="flex-row justify-end gap-1 px-2.5">
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <DialogClose render={<Button />}>Export</DialogClose>
        </Section>
      </DialogContent>
    </Dialog>
  );
}

export function AlertDialogDemo() {
  return (
    <Dialog alert>
      <DialogTrigger render={<Button />}>Delete layer…</DialogTrigger>
      <DialogContent>
        <Section className="gap-1">
          <DialogTitle>Delete “Sky”?</DialogTitle>
          <DialogDescription>
            Its mask and adjustments go with it.
          </DialogDescription>
        </Section>
        <Section className="flex-row justify-end gap-1 px-2.5">
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <DialogClose render={<Button className="text-danger" />}>
            Delete
          </DialogClose>
        </Section>
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
        <Section>
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
        </Section>
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
      <Section className="flex-row items-start">
        <p className="flex-1">
          An unsaved draft from yesterday can be restored.
        </p>
        <SectionAction>
          <NoticeClose onClick={() => setShown(false)} />
        </SectionAction>
      </Section>
      <Section className="flex-row gap-1 px-2.5">
        <Button size="sm">Restore</Button>
        <Button size="sm" variant="ghost">
          Forget
        </Button>
      </Section>
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
    <Tabs value={selected} onValueChange={onSelect} orientation="vertical">
      <TabList aria-label="Tools" variant="segmented">
        {tools.map(({ id, label, key, Icon }) => (
          <Tooltip key={id}>
            <TooltipTrigger
              render={<Tab value={id} size="icon-sm" aria-label={label} />}
            >
              <Icon />
            </TooltipTrigger>
            <TooltipContent side="right" shortcut={key}>
              {label}
            </TooltipContent>
          </Tooltip>
        ))}
      </TabList>
    </Tabs>
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

const sidebar = [
  { id: "layers", text: "Sky, Subject, and Image." },
  { id: "history", text: "Three edits since the import." },
  { id: "info", text: "Canon EOS R5, 1/250 s at ƒ/2.8." },
];

export function TabsDemo() {
  const [tool, setTool] = useState("adjust");
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
      <Frame label="Default">
        <div className="flex w-full max-w-64 flex-col gap-6">
          <Tabs defaultValue="layers" className="flex flex-col gap-3">
            <TabList aria-label="Sidebar">
              {sidebar.map(({ id }) => (
                <Tab key={id} value={id} className="capitalize">
                  {id}
                </Tab>
              ))}
            </TabList>
            {sidebar.map(({ id, text }) => (
              <TabPanel key={id} value={id} className="px-3 text-muted">
                {text}
              </TabPanel>
            ))}
          </Tabs>
          <Tabs defaultValue={panels[0]}>
            <TabList aria-label="Panels" className="overflow-fade-x">
              {panels.map((panel) => (
                <Tab key={panel} value={panel}>
                  {panel}
                </Tab>
              ))}
            </TabList>
          </Tabs>
        </div>
      </Frame>
      <Frame label="Segmented">
        <Tabs defaultValue="hue">
          <TabList aria-label="Channel" variant="segmented">
            {["hue", "saturation", "luminance"].map((id) => (
              <Tab key={id} value={id} className="capitalize">
                {id}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </Frame>
      <Frame label="Vertical">
        <ToolRail selected={tool} onSelect={setTool} />
      </Frame>
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
      <Section className="flex-row items-center">
        <h2 className="flex-1 font-medium">Effects</h2>
        <SectionAction>
          <IconButton label="Add effect">
            <PlusIcon />
          </IconButton>
        </SectionAction>
      </Section>
      <Section>
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
      </Section>
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
      <Section>
        <h2 className="font-medium">Presets</h2>
      </Section>
      {/* The row runs to the card's edges, so it fades there. */}
      <Section className="px-0">
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
      </Section>
      <Section className="text-muted">
        <ScrollText>
          Canon EOS R5 · RF 24–70mm F2.8 · ƒ/2.8 · 1/250 s · ISO 100 · 8192 ×
          5464
        </ScrollText>
      </Section>
    </Card>
  );
}

function EditCard() {
  return (
    <Card className="w-72 max-w-full">
      <Section className="flex-row items-center">
        <h2 className="flex-1 font-medium">Golden hour</h2>
        <SectionAction>
          <IconButton label="Add adjustment">
            <PlusIcon />
          </IconButton>
          <IconButton label="More">
            <MoreIcon />
          </IconButton>
        </SectionAction>
      </Section>
      <Section className="gap-1 text-muted">
        <span>Exposure +0.35</span>
        <span>Temperature +12</span>
        <span>Shadows +20</span>
        <span className="text-muted">Edited 2 min ago</span>
      </Section>
      <Section className="flex-row justify-end gap-1 px-2.5">
        <Button variant="ghost">Revert</Button>
        <Button variant="primary">Apply</Button>
      </Section>
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
              <span className="text-muted">{edit.when}</span>
            </CollapsibleTrigger>
            <CollapsiblePanel>
              <Section>
                <ol className="flex flex-col gap-1 text-muted">
                  {edit.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </Section>
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
    <div className="grid gap-3 sm:grid-cols-2">
      <Frame label="Horizontal">
        <div className="flex w-64 max-w-full flex-col gap-4">
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
      </Frame>
      <Frame label="Vertical">
        <HueSliders />
      </Frame>
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
          // From a gray as light as the hue, to the eye.
          stops={[`oklch(from ${hue.color} l 0 h)`, hue.color]}
          color={hue.color}
        />
      ))}
    </div>
  );
}
