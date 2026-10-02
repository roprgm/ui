import { Select } from "@roprgm/ui/select";

const orders = [
  { value: "taken", label: "Date taken" },
  { value: "added", label: "Date added" },
  { value: "name", label: "Name" },
  { value: "size", label: "File size" },
];

export default function SelectDemo() {
  return (
    <Select
      raised
      aria-label="Sort by"
      items={orders}
      defaultValue="taken"
      className="w-40"
    />
  );
}
