"use client";

import { ScrubInput } from "@roprgm/ui/scrub-input";
import { useState } from "react";

export default function ScrubInputDemo() {
  const [size, setSize] = useState(24);
  return (
    <span className="flex items-center gap-2 text-secondary">
      Size
      <ScrubInput
        aria-label="Size"
        value={size}
        defaultValue={24}
        onChange={setSize}
        min={1}
        max={500}
        format={(v) => `${v}px`}
      />
    </span>
  );
}
