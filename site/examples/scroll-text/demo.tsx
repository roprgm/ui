import { ScrollText } from "@roprgm/ui/scroll-text";

const masks = [
  "Sky",
  "Golden hour warmth, lifted shadows",
  "Subject mask from the brush, feathered",
];

export default function ScrollTextDemo() {
  return (
    <div className="flex w-56 flex-col gap-2">
      {masks.map((mask) => (
        <div
          key={mask}
          className="flex h-control items-center rounded-md material-field px-2.5"
        >
          <ScrollText>{mask}</ScrollText>
        </div>
      ))}
    </div>
  );
}
