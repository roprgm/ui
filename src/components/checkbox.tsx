import { cn } from "cn";
import type { ComponentProps } from "react";

/** A native checkbox; its mark draws itself in when checked. */
export function Checkbox({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  return (
    <span
      data-slot="checkbox"
      className={cn("inline-grid shrink-0 *:[grid-area:1/1]", className)}
    >
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
        className="pointer-events-none size-4 p-0.5 text-on-primary draw transition-[stroke-dashoffset] duration-100 ease-in peer-checked:drawn peer-checked:delay-50 peer-checked:duration-200 peer-checked:ease-out"
        aria-hidden
      >
        <path d="m5 13 4 4L19 7" pathLength={1} />
      </svg>
    </span>
  );
}
