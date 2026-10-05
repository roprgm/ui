"use client";

import { ScrubInput } from "@roprgm/ui/scrub-input";
import { useState } from "react";

export default function ScrubInputVertical() {
  const [exposure, setExposure] = useState(0);
  return (
    <span className="flex items-center gap-2 text-secondary">
      Exposure
      <ScrubInput
        aria-label="Exposure"
        value={exposure}
        defaultValue={0}
        onChange={setExposure}
        min={-5}
        max={5}
        step={0.1}
        scrub="vertical"
        chevrons
      />
    </span>
  );
}
