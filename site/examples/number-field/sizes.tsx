import { NumberField } from "@roprgm/ui/number-field";

export default function NumberFieldSizes() {
  return (
    <div className="flex w-24 flex-col gap-3">
      <NumberField defaultValue={2} aria-label="Default" />
      <NumberField defaultValue={2} size="lg" aria-label="Large" />
    </div>
  );
}
