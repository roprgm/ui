import { CodeBlock } from "@roprgm/ui/code-block";
import { highlight } from "sugar-high";

const source = `type Trip = { city: string; country: string; nights: number };

const trips: Trip[] = [
  { city: "Lisbon", country: "Portugal", nights: 4 },
  { city: "Porto", country: "Portugal", nights: 2 },
  { city: "Kyoto", country: "Japan", nights: 5 },
  { city: "Tokyo", country: "Japan", nights: 3 },
  { city: "Reykjavik", country: "Iceland", nights: 4 },
  { city: "Oaxaca", country: "Mexico", nights: 6 },
  { city: "Mexico City", country: "Mexico", nights: 3 },
  { city: "Marrakesh", country: "Morocco", nights: 4 },
];

/** Nights per country, most first. */
function byCountry(list: Trip[]) {
  const totals = new Map<string, number>();
  for (const trip of list) {
    totals.set(trip.country, (totals.get(trip.country) ?? 0) + trip.nights);
  }
  return [...totals].sort(([, a], [, b]) => b - a);
}

export function Summary() {
  const nights = trips.reduce((sum, trip) => sum + trip.nights, 0);
  return (
    <section>
      <h2>{trips.length} cities, {nights} nights</h2>
      <ul>
        {byCountry(trips).map(([country, total]) => (
          <li key={country}>
            {country}: {total} nights
          </li>
        ))}
      </ul>
    </section>
  );
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
