import { cn } from "cn";
import type { ComponentProps } from "react";

/** A native checkbox with the switch role; `::before` draws the thumb. */
export function Switch({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  return (
    <input
      type="checkbox"
      // biome-ignore lint/a11y/useAriaPropsForRole: a native checkbox exposes its checked state.
      role="switch"
      className={cn(
        // Sized by its content, so a theme's border grows the track rather than squeezing the knob.
        // The knob changes the thumb's fill, so it says so with `!`.
        "box-content h-4 w-8 shrink-0 cursor-pointer appearance-none rounded-full surface-sunken p-0.5 transition focus-ring before:block before:size-4 before:rounded-full before:surface-thumb before:bg-muted! before:transition checked:bg-primary checked:before:translate-x-4 checked:before:bg-on-primary! dim-disabled",
        className,
      )}
      {...props}
    />
  );
}
