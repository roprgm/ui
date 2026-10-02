"use client";

import { Slider } from "@roprgm/ui/slider";
import { useState } from "react";

const bars = [
  { label: "Whites" },
  { label: "Temp", stops: ["#4a6fd0", "#8f959c", "#d8cf3c"] },
  { label: "Tint", stops: ["#3fb24a", "#8f8f8f", "#c03fd0"] },
  { label: "Saturation", stops: ["#7a7a7a", "#7fa35a", "#d6b347", "#d0603f"] },
];

function Bar({ label, stops }: { label: string; stops?: string[] }) {
  const [value, setValue] = useState(0);
  return (
    <Slider
      label={label}
      value={value}
      onChange={setValue}
      defaultValue={0}
      min={-100}
      max={100}
      stops={stops}
    />
  );
}

function Column({ title, className }: { title: string; className?: string }) {
  return (
    <div className={className}>
      <p className="mb-3 text-muted">{title}</p>
      <div className="flex w-48 flex-col gap-4">
        {bars.map((bar) => (
          <Bar key={bar.label} {...bar} />
        ))}
      </div>
    </div>
  );
}

export default function LabSlider() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      <Column
        title="A · prominent, as in production"
        className="lab-prominent"
      />
      <Column title="B · control on accent" />
      <Column title="C · float on accent" className="lab-float" />
    </div>
  );
}
