import { CodeBlock } from "@roprgm/ui/code-block";
import { highlight } from "sugar-high";

const source = `const trips = [
  { city: "Lisbon", nights: 4 },
  { city: "Porto", nights: 2 },
  { city: "Kyoto", nights: 5 },
  { city: "Tokyo", nights: 3 },
  { city: "Reykjavik", nights: 4 },
  { city: "Oaxaca", nights: 6 },
];

const nights = trips.reduce((sum, trip) => sum + trip.nights, 0);

export function Summary() {
  return <p>{trips.length} cities, {nights} nights</p>;
}`;

export default function CodeBlockScroll() {
  return (
    <CodeBlock
      code={source}
      html={highlight(source)}
      className="max-h-48 w-full max-w-lg"
    />
  );
}
