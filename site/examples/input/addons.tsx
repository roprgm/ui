import { Input, InputGroup, InputGroupAddon } from "@roprgm/ui/input";
import { SearchIcon } from "@/ui/icons";

export default function InputAddons() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <Input
          placeholder="Search photos"
          aria-label="Search photos"
          className="pl-(--spacing-control)"
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>https://</InputGroupAddon>
        <Input
          defaultValue="lisbon.photos"
          aria-label="Website"
          className="pl-14.5"
        />
      </InputGroup>
      <InputGroup>
        <Input
          defaultValue="1.8"
          aria-label="Weight"
          className="pr-(--spacing-control)"
        />
        <InputGroupAddon align="end">kg</InputGroupAddon>
      </InputGroup>
    </div>
  );
}
