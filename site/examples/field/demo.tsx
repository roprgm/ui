import { Field } from "@roprgm/ui/field";
import { Input } from "@roprgm/ui/input";

export default function FieldDemo() {
  return (
    <Field
      label="Trip name"
      description="Shown on the itinerary."
      className="w-64"
    >
      <Input defaultValue="Lisbon" />
    </Field>
  );
}
