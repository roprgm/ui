import { Chip } from "@roprgm/ui/chip";

const tags = [
  "Lisbon",
  "Sunset",
  "Harbor",
  "Film",
  "Portrait",
  "Street",
  "Blue hour",
];

export default function UtilitiesOverflowFade() {
  return (
    <div className="flex w-64 gap-1.5 overflow-fade-x">
      {tags.map((tag) => (
        <Chip key={tag}>{tag}</Chip>
      ))}
    </div>
  );
}
