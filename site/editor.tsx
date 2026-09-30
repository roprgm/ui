import { type CSSProperties, useState } from "react";
import { Chip } from "../src/components/chip";
import { IconButton } from "../src/components/icon-button";
import { ListItem, ListItemAction } from "../src/components/list-item";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "../src/components/menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../src/components/popover";
import { ScrollArea } from "../src/components/scroll-area";
import { Section, SectionAction } from "../src/components/section";
import { Slider } from "../src/components/slider";
import { percent, ToolRail } from "./demos";
import { EyeIcon, MoreIcon, PlusIcon } from "./icons";

const layers = ["Sky", "Subject", "Image"];

/** OpenLight's layout from the library alone. */
export function EditorDemo() {
  const [tool, setTool] = useState("adjust");
  const [width, setWidth] = useState(280);
  const [layer, setLayer] = useState("Image");
  const [exposure, setExposure] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [warmth, setWarmth] = useState(0);
  const [overlay, setOverlay] = useState(false);
  const [size, setSize] = useState(60);

  const filter = [
    `brightness(${2 ** exposure})`,
    `contrast(${1 + contrast / 100})`,
    `saturate(${1 + saturation / 100})`,
    `sepia(${Math.max(0, warmth) / 200})`,
    `hue-rotate(${Math.min(0, warmth) / 5}deg)`,
  ].join(" ");

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] bg-level-1 @2xl:flex @2xl:h-[560px]">
      <div className="border-line border-r p-1.5 surface-panel">
        <ToolRail selected={tool} onSelect={setTool} />
      </div>
      <div className="relative grid min-h-64 min-w-0 flex-1 place-items-center p-4 @2xl:p-10">
        <div
          className="aspect-[3/2] w-full max-w-lg rounded-sm bg-[linear-gradient(to_bottom,#3b6ea5_0%,#f0a868_45%,#f7d59c_52%,#2e4a3a_56%,#16261d_100%)] surface-float"
          style={{ filter }}
        />
        {tool === "brush" && (
          <div className="absolute top-3 right-2 left-2 flex flex-wrap items-center justify-center gap-1 @2xl:right-auto @2xl:left-auto rounded-full p-1.25 pl-3.5 surface-float">
            <Slider
              label="Size"
              value={size}
              onChange={setSize}
              min={1}
              max={500}
              format={(v) => `${v}px`}
              valueWidth={3}
              variant="toolbar"
            />
            <Popover>
              <PopoverTrigger render={<Chip />}>More</PopoverTrigger>
              <PopoverContent raised align="center" className="w-56">
                <Section>
                  <Slider
                    label="Size"
                    value={size}
                    onChange={setSize}
                    min={1}
                    max={500}
                    format={(v) => `${v}px`}
                  />
                </Section>
              </PopoverContent>
            </Popover>
            <Chip aria-pressed={overlay} onClick={() => setOverlay(!overlay)}>
              Overlay
            </Chip>
          </div>
        )}
      </div>
      {/* A panel docked beside the canvas, or under it in a narrow frame. */}
      <aside
        className="sections relative col-span-2 min-h-0 w-(--width) shrink-0 surface-panel @max-2xl:w-full"
        style={{ "--width": `${width}px` } as CSSProperties}
      >
        <ResizeEdge width={width} onWidthChange={setWidth} />
        <Section className="flex-row items-center">
          <h2 className="flex-1 font-medium">{layer}</h2>
          <SectionAction>
            <Menu>
              <MenuTrigger render={<IconButton label="Layer actions" />}>
                <MoreIcon />
              </MenuTrigger>
              <MenuContent raised>
                <MenuItem>Duplicate</MenuItem>
                <MenuItem>Rename</MenuItem>
                <MenuSeparator />
                <MenuItem className="text-danger">Delete</MenuItem>
              </MenuContent>
            </Menu>
          </SectionAction>
        </Section>
        <ScrollArea fade className="flex-1">
          <Section>
            <Slider
              label="Exposure"
              value={exposure}
              defaultValue={0}
              onChange={setExposure}
              min={-3}
              max={3}
              step={0.05}
              format={(v) => `${v.toFixed(2)} EV`}
            />
            <Slider
              label="Contrast"
              value={contrast}
              defaultValue={0}
              onChange={setContrast}
              min={-100}
              max={100}
            />
            <Slider
              label="Saturation"
              value={saturation}
              defaultValue={0}
              onChange={setSaturation}
              min={-100}
              max={100}
            />
            <Slider
              label="Warmth"
              value={warmth}
              defaultValue={0}
              onChange={setWarmth}
              min={-100}
              max={100}
            />
            <Slider
              label="Opacity"
              value={100}
              onChange={() => {}}
              min={0}
              max={100}
              format={percent}
              variant="compact"
            />
          </Section>
        </ScrollArea>
        <Section className="flex-row items-center">
          <h2 className="flex-1 font-medium">Layers</h2>
          <SectionAction>
            <IconButton label="Add mask">
              <PlusIcon />
            </IconButton>
          </SectionAction>
        </Section>
        <div>
          {layers.map((name) => (
            <ListItem
              key={name}
              selected={name === layer}
              onClick={() => setLayer(name)}
            >
              <span className="size-7 rounded-md bg-linear-to-b from-[#3b6ea5] via-[#f0a868] to-[#16261d]" />
              <span className="flex-1">{name}</span>
              <ListItemAction>
                <IconButton
                  label="Hide"
                  className="opacity-0 in-[[data-slot=list-item]:hover]:opacity-100"
                >
                  <EyeIcon />
                </IconButton>
              </ListItemAction>
            </ListItem>
          ))}
        </div>
      </aside>
    </div>
  );
}

/** The panel's edge, which drags to resize it between 240px and 360px. */
function ResizeEdge({
  width,
  onWidthChange,
}: {
  width: number;
  onWidthChange: (width: number) => void;
}) {
  return (
    <div
      className="absolute inset-y-0 -left-1 z-20 w-2 cursor-col-resize touch-none after:absolute after:inset-y-0 after:left-1 after:w-px after:transition-colors hover:after:bg-raised @max-2xl:hidden"
      onPointerDown={(event) =>
        event.currentTarget.setPointerCapture(event.pointerId)
      }
      onPointerMove={(event) => {
        if (event.buttons !== 1) return;
        onWidthChange(Math.min(360, Math.max(240, width - event.movementX)));
      }}
    />
  );
}
