import { cn } from "cn";
import type { ComponentProps } from "react";

/** A native radio; radios that share a `name` choose one. `::before` draws the dot. */
export function Radio({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  return (
    <input
      data-slot="radio"
      type="radio"
      className={cn(
        "grid size-4 shrink-0 cursor-pointer appearance-none place-content-center rounded-full material-field transition focus-ring before:size-1.5 before:scale-0 before:rounded-full before:bg-on-accent before:transition checked:bg-accent checked:before:scale-100 dim-disabled",
        className,
      )}
      {...props}
    />
  );
}
