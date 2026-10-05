import { cn } from "cn";
import type { ComponentProps } from "react";
import { ScrubInput } from "./scrub-input";

const height = {
  default: "h-(--spacing-control)",
  lg: "h-(--spacing-control-lg)",
};

/**
 * A ScrubInput in a field as tall as an Input: the number drags sideways, types on click, and
 * steps with the arrow keys. `aria-invalid` rings it red.
 */
export function NumberField({
  size = "default",
  className,
  ...props
}: Omit<ComponentProps<typeof ScrubInput>, "chevrons"> & {
  size?: "default" | "lg";
}) {
  return (
    <ScrubInput
      data-slot="number-field"
      data-size={size}
      className={cn(
        "w-full rounded-md material-field px-2.5 py-0 focus-ring has-[[aria-invalid=true]]:ring-1 has-[[aria-invalid=true]]:ring-danger/60",
        height[size],
        className,
      )}
      {...props}
    />
  );
}
