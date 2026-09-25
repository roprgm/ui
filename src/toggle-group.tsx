import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";

const group = cva(
  "inline-flex gap-0.5 rounded-lg surface-sunken p-(--padding-xs)",
  {
    variants: {
      // The eye sizes a group by its raised toggle, so it stands 4px taller than the buttons it goes
      // with: `default` beside a default Button, `lg` beside a large one. It sizes its toggles,
      // since a fieldset doesn't stretch its children.
      size: {
        default:
          "[--size-toggle:calc(var(--size-control-lg)-2*var(--padding-xs))]",
        lg: "[--size-toggle:calc(var(--size-control-lg)+4px-2*var(--padding-xs))]",
      },
    },
    defaultVariants: { size: "default" },
  },
);

/** Segmented toggles. Give each `Toggle` the same `name` to choose one. */
export function ToggleGroup({
  size,
  className,
  ...props
}: ComponentProps<"fieldset"> & VariantProps<typeof group>) {
  return <fieldset className={cn(group({ size }), className)} {...props} />;
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
        "inline-flex h-(--size-toggle) cursor-pointer items-center rounded-md px-3 text-muted transition focus-ring hover:text-foreground has-checked:surface-raised has-checked:text-foreground dim-disabled",
        className,
      )}
    >
      <input type="radio" className="sr-only" {...props} />
      {children}
    </label>
  );
}
