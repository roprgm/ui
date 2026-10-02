"use client";

import { ScrubInput } from "@roprgm/ui/scrub-input";
import { useState } from "react";

export default function ScrubInputUnits() {
  const [exposure, setExposure] = useState(0.35);
  const [opacity, setOpacity] = useState(80);
  return (
    <>
      <span className="flex items-center gap-2 text-secondary">
        Exposure
        <ScrubInput
          aria-label="Exposure"
          value={exposure}
          onChange={setExposure}
          min={-5}
          max={5}
          step={0.05}
          format={(v) => `${v.toFixed(2)} EV`}
        />
      </span>
      <span className="flex items-center gap-2 text-secondary">
        Opacity
        <ScrubInput
          aria-label="Opacity"
          value={opacity}
          onChange={setOpacity}
          min={0}
          max={100}
          format={(v) => `${v}%`}
        />
      </span>
    </>
  );
}
