import { Select } from "@roprgm/ui/select";

const qualities = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export default function SelectSizes() {
  return (
    <>
      <Select
        raised
        aria-label="Quality"
        items={qualities}
        defaultValue="high"
        className="w-32"
      />
      <Select
        raised
        size="lg"
        aria-label="Quality"
        items={qualities}
        defaultValue="high"
        className="w-36"
      />
    </>
  );
}
