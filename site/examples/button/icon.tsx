import { Button } from "@roprgm/ui/button";
import { PlusIcon } from "@/ui/icons";

export default function ButtonWithIcon() {
  return (
    <Button variant="primary">
      <PlusIcon />
      Import
    </Button>
  );
}
