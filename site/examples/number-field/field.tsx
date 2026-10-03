import { Field } from "@roprgm/ui/field";
import { NumberField } from "@roprgm/ui/number-field";

export default function NumberFieldInField() {
  return (
    <Field
      label="Upload limit"
      description="From 1 to 100 MB per photo."
      className="w-64"
    >
      <NumberField
        defaultValue={25}
        min={1}
        max={100}
        format={{ style: "unit", unit: "megabyte" }}
      />
    </Field>
  );
}
