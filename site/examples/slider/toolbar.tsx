"use client";

import { Chip } from "@roprgm/ui/chip";
import { Slider } from "@roprgm/ui/slider";
import { useState } from "react";

export default function SliderToolbar() {
  const [size, setSize] = useState(60);
  const [overlay, setOverlay] = useState(true);
  return (
    <div className="flex items-center gap-1 rounded-full p-1.25 pl-3.5 surface-float">
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
      <Chip aria-pressed={overlay} onClick={() => setOverlay(!overlay)}>
        Overlay
      </Chip>
    </div>
  );
}
