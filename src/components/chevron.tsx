import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const chevron = cva("shrink-0 transition-[rotate,color] duration-200", {
  variants: {
    direction: {
      right: "",
      down: "rotate-90",
      left: "rotate-180",
      up: "-rotate-90",
    },
    // The stroke is in viewBox units, so the smaller icon draws it thicker to match.
    size: { sm: "size-2 stroke-[2.5]", md: "size-2.5 stroke-2" },
  },
});

/** One right-pointing stroke turned to `direction`, so changing it animates the turn. */
export function Chevron({
  direction = "down",
  size = "md",
  className,
}: VariantProps<typeof chevron> & { className?: string }) {
  return (
    <svg
      data-slot="chevron"
      data-size={size}
      viewBox="5 5 14 14"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(chevron({ direction, size }), className)}
      aria-hidden
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
