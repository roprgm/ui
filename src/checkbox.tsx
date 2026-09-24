import { cn } from "cn";
import type { ComponentProps } from "react";

/** A native checkbox; the check mark is a sibling drawn in by `peer-checked`. */
export function Checkbox({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  return (
    <span className={cn("inline-grid shrink-0 *:[grid-area:1/1]", className)}>
      <input
        type="checkbox"
        className="peer size-4 cursor-pointer appearance-none rounded-sm bg-field shadow-sunken transition focus-ring checked:bg-primary checked:shadow-raised disabled:cursor-not-allowed disabled:opacity-40"
        {...props}
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        // The path inherits the dash offset, so checking draws the stroke in and unchecking erases it.
        // pathLength 1 makes the dash the whole stroke; the gap of 2 hides the round cap while it's erased.
        className="pointer-events-none size-4 p-0.5 text-on-primary transition-[stroke-dashoffset] duration-100 ease-in [stroke-dasharray:1_2] [stroke-dashoffset:1] peer-checked:delay-50 peer-checked:duration-200 peer-checked:ease-out peer-checked:[stroke-dashoffset:0]"
        aria-hidden
      >
        <path d="m5 13 4 4L19 7" pathLength={1} />
      </svg>
    </span>
  );
}
