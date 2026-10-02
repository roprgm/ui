import { Textarea } from "@roprgm/ui/textarea";

export default function TextareaInvalid() {
  return (
    <Textarea
      placeholder="Why are you cancelling?"
      aria-invalid
      className="w-64"
    />
  );
}
