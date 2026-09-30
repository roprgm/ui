import { cn } from "cn";
import type { ComponentProps } from "react";
import "./core.css";
import "./toggle-group.css";

/** Segmented toggles. Toggles that share a `name` choose one. */
export function ToggleGroup({
  size = "default",
  className,
  ...props
}: ComponentProps<"fieldset"> & { size?: "default" | "lg" | null }) {
  return (
    <fieldset
      data-slot="toggle-group"
      data-size={size ?? undefined}
      className={cn("toggle-group", className)}
      {...props}
    />
  );
}

/** A label around a hidden radio, or a checkbox with `type="checkbox"`. */
export function Toggle({
  className,
  children,
  ...props
}: ComponentProps<"input">) {
  return (
    <label data-slot="toggle" className={cn("toggle", className)}>
      <input
        data-slot="toggle-input"
        type="radio"
        className="toggle-input"
        {...props}
      />
      {children}
    </label>
  );
}
