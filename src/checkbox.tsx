import { cn } from "cn";
import type { ComponentProps } from "react";

/** A native checkbox; the check mark is a sibling shown by `peer-checked`. */
export function Checkbox({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  return (
    <span className={cn("inline-grid shrink-0 *:[grid-area:1/1]", className)}>
      <input
        type="checkbox"
        className="peer size-4 cursor-pointer appearance-none rounded bg-field shadow-sunken transition focus-ring checked:bg-accent checked:shadow-raised disabled:cursor-not-allowed disabled:opacity-40"
        {...props}
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none invisible size-4 p-0.5 text-on-accent peer-checked:visible"
        aria-hidden
      >
        <path d="m5 12 4 4L19 6" />
      </svg>
    </span>
  );
}
