import { cn } from "cn";
import { useState } from "react";
import { CardAction, CardSection, cardParts } from "../src/components/card";
import { Chip } from "../src/components/chip";
import { IconButton } from "../src/components/icon-button";
import { ListItem, ListItemAction } from "../src/components/list-item";
import { Menu, MenuItem, MenuSeparator } from "../src/components/menu";
import { Popover } from "../src/components/popover";
import { ScrollArea } from "../src/components/scroll-area";
import { Slider } from "../src/components/slider";
import { percent, ToolRail } from "./demos";
import { EyeIcon, MoreIcon, PlusIcon } from "./icons";

const layers = ["Sky", "Subject", "Image"];

/** Openlight's layout from the library alone; the sliders drive a CSS stand-in for the photo. */
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
    <div className="grid grid-cols-[auto_minmax(0,1fr)] bg-field @2xl:flex @2xl:h-[560px]">
      <div className="layer-card border-line border-r p-1.5">
        <ToolRail selected={tool} onSelect={setTool} />
      </div>
      <div className="relative grid min-h-64 min-w-0 flex-1 place-items-center p-4 @2xl:p-10">
        <div
          className="aspect-[3/2] w-full max-w-lg rounded-sm bg-[linear-gradient(to_bottom,#3b6ea5_0%,#f0a868_45%,#f7d59c_52%,#2e4a3a_56%,#16261d_100%)] surface-float"
          style={{ filter }}
        />
        {tool === "brush" && (
          <div className="layer-elevated absolute top-3 right-2 left-2 flex flex-wrap items-center justify-center gap-1 @2xl:right-auto @2xl:left-auto rounded-full p-1.25 pl-3.5 surface-float">
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
            <Popover
              align="center"
              trigger={<Chip>More</Chip>}
              className="w-56"
            >
              <CardSection>
                <Slider
                  label="Size"
                  value={size}
                  onChange={setSize}
                  min={1}
                  max={500}
                  format={(v) => `${v}px`}
                />
              </CardSection>
            </Popover>
            <Chip aria-pressed={overlay} onClick={() => setOverlay(!overlay)}>
              Overlay
            </Chip>
          </div>
        )}
      </div>
      {/* A card docked beside the canvas: its sections without a card's corners or edge. Under the
          canvas it spans the frame and its dragged width waits for a wider one. */}
      <aside
        className={cn(
          cardParts,
          "relative col-span-2 min-h-0 shrink-0 layer-card @max-2xl:w-full!",
        )}
        style={{ width }}
      >
        <ResizeEdge width={width} onWidthChange={setWidth} />
        <CardSection className="flex-row items-center">
          <h2 className="flex-1 font-medium">{layer}</h2>
          <CardAction>
            <Menu
              trigger={
                <IconButton label="Layer actions">
                  <MoreIcon />
                </IconButton>
              }
            >
              <MenuItem>Duplicate</MenuItem>
              <MenuItem>Rename</MenuItem>
              <MenuSeparator />
              <MenuItem className="text-danger">Delete</MenuItem>
            </Menu>
          </CardAction>
        </CardSection>
        <ScrollArea fade className="flex-1">
          <CardSection>
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
          </CardSection>
        </ScrollArea>
        <CardSection className="flex-row items-center">
          <h2 className="flex-1 font-medium">Layers</h2>
          <CardAction>
            <IconButton label="Add mask">
              <PlusIcon />
            </IconButton>
          </CardAction>
        </CardSection>
        <div>
          {layers.map((name) => (
            <ListItem
              key={name}
              selected={name === layer}
              onClick={() => setLayer(name)}
            >
              <span className="size-control rounded-md bg-linear-to-b from-[#3b6ea5] via-[#f0a868] to-[#16261d]" />
              <span className="flex-1">{name}</span>
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
      </aside>
    </div>
  );
}

/** The panel's edge facing the canvas, which drags to resize it between 240px and 360px. */
function ResizeEdge({
  width,
  onWidthChange,
}: {
  width: number;
  onWidthChange: (width: number) => void;
}) {
  return (
    <div
      className="absolute inset-y-0 -left-1 z-20 w-2 cursor-col-resize touch-none after:absolute after:inset-y-0 after:left-1 after:w-px after:transition-colors hover:after:bg-raised-hover @max-2xl:hidden"
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
