import { cn } from "cn";
import type { ComponentProps } from "react";

/** Segmented toggles. Give each `Toggle` the same `name` to choose one. */
export function ToggleGroup({
  className,
  ...props
}: ComponentProps<"fieldset">) {
  return (
    <fieldset
      className={cn(
        "inline-flex gap-0.5 rounded-lg surface-sunken p-0.5",
        className,
      )}
      {...props}
    />
  );
}

/** A label around a hidden radio (or `type="checkbox"`), styled by its checked state. */
export function Toggle({
  className,
  children,
  ...props
}: ComponentProps<"input">) {
  return (
    <label
      className={cn(
        "inline-flex h-(--size-control-sm) cursor-pointer items-center rounded-md px-3 text-muted transition focus-ring hover:text-foreground has-checked:surface-raised has-checked:text-foreground dim-disabled",
        className,
      )}
    >
      <input type="radio" className="sr-only" {...props} />
      {children}
    </label>
  );
}
