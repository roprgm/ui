import { Button } from "@roprgm/ui/button";
import { Input } from "@roprgm/ui/input";

export default function InputDemo() {
  return (
    <div className="flex w-72 gap-1.5">
      <Input placeholder="Album name" />
      <Button>Create</Button>
    </div>
  );
}
