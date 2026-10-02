"use client";

import { DragToggle } from "@roprgm/ui/drag-toggle";
import { IconButton } from "@roprgm/ui/icon-button";
import { ListItem, ListItemAction } from "@roprgm/ui/list-item";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@/ui/icons";

const layers = ["Sky", "Subject", "Vignette", "Grain", "Image"];

export default function DragToggleButtons() {
  const [hidden, setHidden] = useState(["Grain"]);
  const toggle = (layer: string) =>
    setHidden((all) =>
      all.includes(layer)
        ? all.filter((other) => other !== layer)
        : [...all, layer],
    );
  return (
    <DragToggle className="w-56 overflow-hidden rounded-lg surface-float">
      {layers.map((layer) => {
        const visible = !hidden.includes(layer);
        return (
          <ListItem key={layer} muted={!visible}>
            <span className="flex-1">{layer}</span>
            <ListItemAction>
              <IconButton
                label="Visible"
                aria-pressed={visible}
                onClick={() => toggle(layer)}
              >
                {visible ? <EyeIcon /> : <EyeOffIcon />}
              </IconButton>
            </ListItemAction>
          </ListItem>
        );
      })}
    </DragToggle>
  );
}
