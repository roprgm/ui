import { Input } from "@roprgm/ui/input";

export default function InputSizes() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <Input placeholder="Default" />
      <Input size="lg" placeholder="Large" />
    </div>
  );
}
