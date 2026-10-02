"use client";

import { Slider } from "@roprgm/ui/slider";
import { useState } from "react";

const hues = [
  { name: "Red", color: "#f55" },
  { name: "Orange", color: "#f93" },
  { name: "Yellow", color: "#fd4" },
  { name: "Green", color: "#5d6" },
  { name: "Blue", color: "#59f" },
];

export default function SliderVertical() {
  const [values, setValues] = useState(hues.map(() => 0));
  return (
    <div className="flex">
      {hues.map((hue, index) => (
        <Slider
          key={hue.name}
          orientation="vertical"
          label={`${hue.name} saturation`}
          value={values[index]}
          onChange={(value) =>
            setValues(values.map((old, at) => (at === index ? value : old)))
          }
          min={-100}
          max={100}
          defaultValue={0}
          // From a gray as light as the hue, to the hue.
          stops={[`oklch(from ${hue.color} l 0 h)`, hue.color]}
          color={hue.color}
        />
      ))}
    </div>
  );
}
