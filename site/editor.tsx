import { useState } from "react";
import { Chip } from "../src/chip";
import { IconButton } from "../src/icon-button";
import { ListItem } from "../src/list-item";
import { Menu, MenuItem, MenuSeparator } from "../src/menu";
import { Panel, PanelBody, PanelHeader, PanelSection } from "../src/panel";
import { Popover } from "../src/popover";
import { Slider } from "../src/slider";
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
    <div className="flex h-[560px] bg-field">
      <div className="layer-card border-line border-r p-1.5">
        <ToolRail selected={tool} onSelect={setTool} />
      </div>
      <div className="relative grid min-w-0 flex-1 place-items-center p-10">
        <div
          className="aspect-[3/2] w-full max-w-lg rounded-sm bg-[linear-gradient(to_bottom,#3b6ea5_0%,#f0a868_45%,#f7d59c_52%,#2e4a3a_56%,#16261d_100%)] shadow-float"
          style={{ filter }}
        />
        {tool === "brush" && (
          <div className="layer-elevated absolute top-3 flex items-center gap-1 rounded-full p-(--padding-sm) pl-(--padding) shadow-float">
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
            <Popover align="center" trigger={<Chip>More</Chip>}>
              <div className="w-48">
                <Slider
                  label="Size"
                  value={size}
                  onChange={setSize}
                  min={1}
                  max={500}
                  format={(v) => `${v}px`}
                />
              </div>
            </Popover>
            <Chip aria-pressed={overlay} onClick={() => setOverlay(!overlay)}>
              Overlay
            </Chip>
          </div>
        )}
      </div>
      <Panel width={width} onWidthChange={setWidth} min={240} max={360}>
        <PanelHeader title={layer}>
          <Menu
            trigger={
              <IconButton label="Layer actions" size="icon">
                <MoreIcon />
              </IconButton>
            }
          >
            <MenuItem>Duplicate</MenuItem>
            <MenuItem>Rename</MenuItem>
            <MenuSeparator />
            <MenuItem className="text-danger">Delete</MenuItem>
          </Menu>
        </PanelHeader>
        <PanelBody>
          <PanelSection>
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
          </PanelSection>
        </PanelBody>
        <PanelHeader title="Layers">
          <IconButton label="Add mask" size="icon">
            <PlusIcon />
          </IconButton>
        </PanelHeader>
        <div>
          {layers.map((name) => (
            <ListItem
              key={name}
              selected={name === layer}
              onClick={() => setLayer(name)}
            >
              <span className="size-(--size-control) rounded-md bg-linear-to-b from-[#3b6ea5] via-[#f0a868] to-[#16261d]" />
              <span className="flex-1">{name}</span>
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
      </Panel>
    </div>
  );
}
