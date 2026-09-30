import { cn } from "cn";
import type { ComponentProps } from "react";
import "./tokens.css";
import "./switch.css";

/** A native checkbox with the switch role; `::before` draws the thumb. */
export function Switch({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  return (
    <input
      data-slot="switch"
      type="checkbox"
      // biome-ignore lint/a11y/useAriaPropsForRole: a native checkbox exposes its checked state.
      role="switch"
      className={cn(
        // Sized by its content, so a theme's border grows the track rather than squeezing the knob.
        "switch",
        className,
      )}
      {...props}
    />
  );
}
