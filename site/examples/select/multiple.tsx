import { Select } from "@roprgm/ui/select";

const albums = [
  { value: "favorites", label: "Favorites" },
  { value: "lisbon", label: "Lisbon 2025" },
  { value: "road-trip", label: "Road trip" },
  { value: "shared", label: "Shared by Ana", disabled: true },
];

export default function SelectMultiple() {
  return (
    <Select
      raised
      multiple
      aria-label="Albums"
      items={albums}
      placeholder="Add to albums"
      className="w-48"
    />
  );
}
