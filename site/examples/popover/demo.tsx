"use client";

import { Chip } from "@roprgm/ui/chip";
import { Popover, PopoverContent, PopoverTrigger } from "@roprgm/ui/popover";
import { Section } from "@roprgm/ui/section";
import { Slider } from "@roprgm/ui/slider";
import { useState } from "react";
import { BrushIcon } from "@/ui/icons";

export default function PopoverDemo() {
  const [size, setSize] = useState(40);
  const [feather, setFeather] = useState(50);
  return (
    <Popover>
      <PopoverTrigger render={<Chip />}>
        <BrushIcon /> Brush
      </PopoverTrigger>
      <PopoverContent raised align="center" className="w-64">
        <Section>
          <Slider
            label="Size"
            value={size}
            onChange={setSize}
            min={1}
            max={500}
            format={(value) => `${value}px`}
          />
          <Slider
            label="Feather"
            value={feather}
            defaultValue={50}
            onChange={setFeather}
            min={0}
            max={100}
            format={(value) => `${value}%`}
          />
        </Section>
      </PopoverContent>
    </Popover>
  );
}
