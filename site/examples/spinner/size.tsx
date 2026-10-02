import { Spinner } from "@roprgm/ui/spinner";

export default function SpinnerSize() {
  return (
    <span className="flex items-center gap-2 text-secondary">
      <Spinner className="size-3 border" /> Decoding RAW…
    </span>
  );
}
