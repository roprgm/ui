"use client";

import { NumberField } from "@roprgm/ui/number-field";
import { useState } from "react";

export default function NumberFieldSizes() {
  const [value, setValue] = useState(2);
  return (
    <div className="flex w-24 flex-col gap-3">
      <NumberField
        value={value}
        onChange={setValue}
        min={0}
        max={10}
        aria-label="Default"
      />
      <NumberField
        value={value}
        onChange={setValue}
        min={0}
        max={10}
        size="lg"
        aria-label="Large"
      />
    </div>
  );
}
