"use client";

import { Tree } from "@roprgm/ui/tree";
import { useState } from "react";

type Album = { id: string; name: string; photos: number; children?: Album[] };

const albums: Album[] = [
  {
    id: "japan",
    name: "Japan",
    photos: 412,
    children: [
      { id: "kyoto", name: "Kyoto", photos: 236 },
      { id: "tokyo", name: "Tokyo", photos: 176 },
    ],
  },
  {
    id: "portugal",
    name: "Portugal",
    photos: 158,
    children: [
      { id: "lisbon", name: "Lisbon", photos: 97 },
      { id: "porto", name: "Porto", photos: 61 },
    ],
  },
  { id: "iceland", name: "Iceland", photos: 84 },
];

export default function TreeDemo() {
  const [selected, setSelected] = useState("kyoto");
  return (
    <Tree
      aria-label="Albums"
      items={albums}
      label={(album) => album.name}
      selected={selected}
      onSelect={setSelected}
      className="w-56"
    >
      {(album) => (
        <>
          <span className="flex-1">{album.name}</span>
          <span className="text-muted tabular-nums">{album.photos}</span>
        </>
      )}
    </Tree>
  );
}
