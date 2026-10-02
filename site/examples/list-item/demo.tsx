"use client";

import { IconButton } from "@roprgm/ui/icon-button";
import { ListItem, ListItemAction } from "@roprgm/ui/list-item";
import { useState } from "react";
import { EyeIcon } from "@/ui/icons";

const layers = ["Sky", "Subject", "Vignette", "Image"];

export default function ListItemDemo() {
  const [selected, setSelected] = useState("Sky");
  return (
    <div className="w-64 overflow-hidden rounded-lg material-float">
      {layers.map((layer) => (
        <ListItem
          key={layer}
          selected={layer === selected}
          onClick={() => setSelected(layer)}
        >
          <span className="size-7 rounded-md bg-linear-to-br from-sky-700 to-amber-600" />
          <span className="flex-1">{layer}</span>
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
