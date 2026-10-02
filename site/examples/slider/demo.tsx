"use client";

import { Slider } from "@roprgm/ui/slider";
import { useState } from "react";

export default function SliderDemo() {
  const [exposure, setExposure] = useState(0.35);
  const [opacity, setOpacity] = useState(80);
  return (
    <div className="flex w-64 flex-col gap-4">
      <Slider
        label="Exposure"
        value={exposure}
        defaultValue={0}
        onChange={setExposure}
        min={-5}
        max={5}
        step={0.05}
        format={(v) => `${v.toFixed(2)} EV`}
      />
      <Slider
        label="Opacity"
        value={opacity}
        defaultValue={100}
        origin={0}
        onChange={setOpacity}
        min={0}
        max={100}
        format={(v) => `${v}%`}
      />
    </div>
  );
}
