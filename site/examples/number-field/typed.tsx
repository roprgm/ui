"use client";

import { Field } from "@roprgm/ui/field";
import { NumberField } from "@roprgm/ui/number-field";
import { useState } from "react";

export default function NumberFieldTyped() {
  const [year, setYear] = useState(2026);
  return (
    <Field label="Year taken" className="w-64">
      <NumberField
        value={year}
        onChange={setYear}
        min={1900}
        max={2100}
        scrub={false}
      />
    </Field>
  );
}
