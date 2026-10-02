"use client";

import { Slider } from "@roprgm/ui/slider";
import { useState } from "react";

export default function SliderCompact() {
  const [angle, setAngle] = useState(0);
  return (
    <Slider
      label="Angle"
      value={angle}
      defaultValue={0}
      onChange={setAngle}
      min={-180}
      max={180}
      format={(v) => `${v}°`}
      variant="compact"
      className="w-64"
    />
  );
}
