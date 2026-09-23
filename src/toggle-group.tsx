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
        "inline-flex gap-0.5 rounded-lg bg-field p-0.5 shadow-sunken",
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
        "inline-flex h-7 cursor-pointer items-center rounded-md px-3 text-muted transition focus-ring hover:text-foreground has-checked:bg-raised has-checked:text-foreground has-checked:shadow-raised has-disabled:pointer-events-none has-disabled:opacity-40",
        className,
      )}
    >
      <input type="radio" className="sr-only" {...props} />
      {children}
    </label>
  );
}
