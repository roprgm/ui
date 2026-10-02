"use client";

import { ScrubInput } from "@roprgm/ui/scrub-input";
import { useState } from "react";

export default function ScrubInputChevrons() {
  const [angle, setAngle] = useState(0);
  return (
    <span className="flex items-center gap-2 text-secondary">
      Angle
      <ScrubInput
        aria-label="Angle"
        value={angle}
        defaultValue={0}
        onChange={setAngle}
        min={-180}
        max={180}
        format={(v) => `${v}°`}
        chevrons
      />
    </span>
  );
}
