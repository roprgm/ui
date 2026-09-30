import { cn } from "cn";
import type { ComponentProps } from "react";

/** A native radio; radios that share a `name` choose one. `::before` draws the dot. */
export function Radio({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  return (
    <input
      type="radio"
      data-slot="radio"
      className={cn(
        "grid size-4 shrink-0 cursor-pointer appearance-none place-content-center rounded-full surface-sunken transition focus-ring dim-disabled checked:bg-primary",
        // The dot.
        "before:size-1.5 before:scale-0 before:rounded-full before:bg-on-primary before:transition checked:before:scale-100",
        className,
      )}
      {...props}
    />
  );
}
