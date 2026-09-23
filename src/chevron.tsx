import { cn } from "cn";

const rotation = {
  right: "",
  down: "rotate-90",
  left: "rotate-180",
  up: "-rotate-90",
};
// The stroke is in viewBox units, so the smaller icon draws it thicker to match.
const sizes = { sm: "size-2 stroke-[2.5]", md: "size-2.5 stroke-2" };

/** One right-pointing stroke turned to `direction`, so changing it animates the turn. */
export function Chevron({
  direction = "down",
  size = "md",
  className,
}: {
  direction?: keyof typeof rotation;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <svg
      viewBox="5 5 14 14"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "shrink-0 transition-[rotate,color] duration-200",
        rotation[direction],
        sizes[size],
        className,
      )}
      aria-hidden
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
