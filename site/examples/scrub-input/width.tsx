"use client";

import { ScrubInput } from "@roprgm/ui/scrub-input";
import { useState } from "react";

export default function ScrubInputWidth() {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  return (
    <span className="flex items-center gap-1 text-secondary">
      <ScrubInput
        aria-label="Width"
        value={width}
        onChange={setWidth}
        min={1}
        max={8000}
        minChars={4}
      />
      ×
      <ScrubInput
        aria-label="Height"
        value={height}
        onChange={setHeight}
        min={1}
        max={8000}
        minChars={4}
      />
    </span>
  );
}
