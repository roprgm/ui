import { cn } from "cn";
import type { ComponentProps } from "react";

/** A native checkbox; `peer-checked` draws the mark in. */
export function Checkbox({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  return (
    <span className={cn("inline-grid shrink-0 *:[grid-area:1/1]", className)}>
      <input
        type="checkbox"
        className="peer size-4 cursor-pointer appearance-none rounded-sm surface-sunken transition focus-ring checked:bg-primary dim-disabled"
        {...props}
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        // One dash the length of the stroke; its gap of 2 hides the round cap while erased.
        className="pointer-events-none size-4 p-0.5 text-on-primary transition-[stroke-dashoffset] duration-100 ease-in [stroke-dasharray:1_2] [stroke-dashoffset:1] peer-checked:delay-50 peer-checked:duration-200 peer-checked:ease-out peer-checked:[stroke-dashoffset:0]"
        aria-hidden
      >
        <path d="m5 13 4 4L19 7" pathLength={1} />
      </svg>
    </span>
  );
}
