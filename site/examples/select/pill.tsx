import { Chip } from "@roprgm/ui/chip";
import { Select } from "@roprgm/ui/select";
import { BrushIcon } from "@/ui/icons";

const operations = [
  { value: "add", label: "Add" },
  { value: "subtract", label: "Subtract" },
];

export default function SelectPill() {
  return (
    <div className="flex items-center gap-1 rounded-full p-1 surface-float">
      <Chip>
        <BrushIcon /> Brush
      </Chip>
      <Select
        raised
        variant="pill"
        aria-label="Mask operation"
        tooltip="Mask operation"
        items={operations}
        defaultValue="add"
      />
    </div>
  );
}
