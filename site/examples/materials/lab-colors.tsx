import { Button } from "@roprgm/ui/button";

const accents = [
  "neutral",
  "violet",
  "blue",
  "green",
  "amber",
  "orange",
  "coral",
  "rose",
];

export default function LabColors() {
  return (
    <div className="flex flex-wrap justify-center gap-1.5">
      <Button>Default</Button>
      {accents.map((accent) => (
        <Button
          key={accent}
          data-accent={accent}
          className="bg-accent text-on-accent capitalize hover:bg-accent"
        >
          {accent}
        </Button>
      ))}
    </div>
  );
}
