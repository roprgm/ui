"use client";

import { Field } from "@roprgm/ui/field";
import { NumberField } from "@roprgm/ui/number-field";
import { useState } from "react";

export default function NumberFieldInField() {
  const [limit, setLimit] = useState(25);
  return (
    <Field
      label="Upload limit"
      description="From 1 to 100 MB per photo."
      className="w-64"
    >
      <NumberField
        value={limit}
        onChange={setLimit}
        min={1}
        max={100}
        format={(value) => `${value} MB`}
      />
    </Field>
  );
}
