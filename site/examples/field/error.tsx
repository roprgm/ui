import { Field } from "@roprgm/ui/field";
import { Input } from "@roprgm/ui/input";

export default function FieldError() {
  return (
    <Field label="Email" error="Enter an email address." className="w-64">
      <Input type="email" defaultValue="ana@" />
    </Field>
  );
}
