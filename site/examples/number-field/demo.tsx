import { NumberField } from "@roprgm/ui/number-field";

export default function NumberFieldDemo() {
  return (
    <NumberField
      defaultValue={2}
      min={1}
      aria-label="Prints"
      className="w-24"
    />
  );
}
