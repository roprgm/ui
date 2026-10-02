import { Field } from "@roprgm/ui/field";
import { Textarea } from "@roprgm/ui/textarea";

export default function FieldWithTextarea() {
  return (
    <Field label="Notes" description="Only you can see them." className="w-64">
      <Textarea placeholder="Where to eat, what to book" />
    </Field>
  );
}
