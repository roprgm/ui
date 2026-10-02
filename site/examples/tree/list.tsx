"use client";

import { IconButton } from "@roprgm/ui/icon-button";
import { ListItemAction } from "@roprgm/ui/list-item";
import { ScrollText } from "@roprgm/ui/scroll-text";
import { Tree, type TreeDrop } from "@roprgm/ui/tree";
import { useState } from "react";
import { EyeIcon } from "@/ui/icons";

type Layer = { id: string; name: string; children?: Layer[] };

function find(layers: Layer[], id: string): Layer | undefined {
  for (const layer of layers) {
    const found = layer.id === id ? layer : find(layer.children ?? [], id);
    if (found) return found;
  }
}

function remove(layers: Layer[], id: string): Layer[] {
  return layers
    .filter((layer) => layer.id !== id)
    .map((layer) =>
      layer.children
        ? { ...layer, children: remove(layer.children, id) }
        : layer,
    );
}

function place(layers: Layer[], moved: Layer, drop: TreeDrop): Layer[] {
  return layers.flatMap((layer) => {
    if (layer.id === drop.target) {
      if (drop.position === "before") return [moved, layer];
      if (drop.position === "after") return [layer, moved];
      return [{ ...layer, children: [...(layer.children ?? []), moved] }];
    }
    if (!layer.children) return [layer];
    return [{ ...layer, children: place(layer.children, moved, drop) }];
  });
}

export default function TreeLayers() {
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
    <Tree
      variant="list"
      aria-label="Layers"
      items={layers}
      label={(layer) => layer.name}
      selected={selected}
      onSelect={setSelected}
      canDrag={(layer) => layer.id !== "image"}
      canDrop={({ target, position }) => {
        if (target === "image") return position === "before";
        return position !== "inside" || Boolean(find(layers, target)?.children);
      }}
      onDrop={(drop) => {
        const moved = find(layers, drop.id);
        if (moved) setLayers(place(remove(layers, drop.id), moved, drop));
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
    </Tree>
  );
}
