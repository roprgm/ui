import { cn } from "cn";
import type { ComponentProps } from "react";
import { Check } from "./check";

/** A native checkbox; `peer-checked` draws the mark in. */
export function Checkbox({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  return (
    <span
      data-slot="checkbox-root"
      className={cn("inline-grid shrink-0 *:[grid-area:1/1]", className)}
    >
      <input
        data-slot="checkbox"
        type="checkbox"
        className="peer size-4 cursor-pointer appearance-none rounded-sm material-field transition focus-ring checked:bg-accent dim-disabled"
        {...props}
      />
      <Check
        data-slot="checkbox-mark"
        className="pointer-events-none size-4 stroke-3 p-0.5 text-on-accent draw transition-[stroke-dashoffset] duration-100 ease-in peer-checked:drawn peer-checked:delay-50 peer-checked:duration-200 peer-checked:ease-out"
      />
    </span>
  );
}
