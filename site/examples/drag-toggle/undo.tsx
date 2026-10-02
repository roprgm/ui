"use client";

import { Button } from "@roprgm/ui/button";
import { Checkbox } from "@roprgm/ui/checkbox";
import { DragToggle } from "@roprgm/ui/drag-toggle";
import { ListItem } from "@roprgm/ui/list-item";
import { useRef, useState } from "react";
import { UndoIcon } from "@/ui/icons";

const photos = ["Harbor", "Lighthouse", "Dunes", "Pier", "Tide pools"];

export default function DragToggleUndo() {
  const [picked, setPicked] = useState<string[]>([]);
  const [history, setHistory] = useState<string[][]>([]);
  const dragging = useRef(false);
  const save = () => setHistory((past) => [...past, picked]);

  function undo() {
    setPicked(history[history.length - 1]);
    setHistory(history.slice(0, -1));
  }

  return (
    <div className="flex w-56 flex-col gap-3">
      <DragToggle
        onDraggingChange={(on) => {
          if (on) save();
          dragging.current = on;
        }}
        className="overflow-hidden rounded-lg material-float"
      >
        {photos.map((photo) => (
          <ListItem key={photo}>
            <label className="flex flex-1 items-center gap-2.5 self-stretch">
              <Checkbox
                checked={picked.includes(photo)}
                onChange={(event) => {
                  if (!dragging.current) save();
                  const on = event.target.checked;
                  setPicked((all) =>
                    on ? [...all, photo] : all.filter((p) => p !== photo),
                  );
                }}
              />
              {photo}
            </label>
          </ListItem>
        ))}
      </DragToggle>
      <Button disabled={!history.length} onClick={undo} className="self-start">
        <UndoIcon />
        Undo
      </Button>
    </div>
  );
}
