"use client";

import { NumberField } from "@roprgm/ui/number-field";
import { useState } from "react";

export default function NumberFieldDemo() {
  const [prints, setPrints] = useState(2);
  return (
    <NumberField
      value={prints}
      onChange={setPrints}
      min={1}
      max={50}
      defaultValue={1}
      aria-label="Prints"
      className="w-24"
    />
  );
}
