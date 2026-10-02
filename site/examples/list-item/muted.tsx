"use client";

import { IconButton } from "@roprgm/ui/icon-button";
import { ListItem, ListItemAction } from "@roprgm/ui/list-item";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@/ui/icons";

const layers = ["Sky", "Subject", "Vignette", "Image"];

export default function ListItemMuted() {
  const [hidden, setHidden] = useState(["Vignette"]);
  const toggle = (layer: string) =>
    setHidden(
      hidden.includes(layer)
        ? hidden.filter((name) => name !== layer)
        : [...hidden, layer],
    );
  return (
    <div className="w-64 overflow-hidden rounded-lg surface-float">
      {layers.map((layer) => (
        <ListItem key={layer} muted={hidden.includes(layer)}>
          <span className="flex-1">{layer}</span>
          <ListItemAction>
            <IconButton
              label="Visible"
              aria-pressed={!hidden.includes(layer)}
              onClick={() => toggle(layer)}
            >
              {hidden.includes(layer) ? <EyeOffIcon /> : <EyeIcon />}
            </IconButton>
          </ListItemAction>
        </ListItem>
      ))}
    </div>
  );
}
