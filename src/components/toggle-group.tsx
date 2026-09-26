import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";

const group = cva("inline-flex gap-0.5 rounded-lg surface-sunken p-1", {
  variants: {
    // The eye sizes a group by its raised toggle, so it stands 4px taller than the buttons it goes
    // with: its toggles are a size smaller, 4px in. `default` goes beside a default Button, with
    // small toggles; `lg` beside a large one, with default toggles.
    size: {
      default: "[--size-control:var(--size-control-sm)]",
      lg: "",
    },
  },
  defaultVariants: { size: "default" },
});

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
        // A control's height, which its group sets; its corners nest in the group's.
        // `relative` holds the hidden radio, which is absolute, inside it: otherwise the radio sits
        // outside any container that clips or scrolls the group and widens the page.
        "relative inline-flex h-control cursor-pointer items-center rounded-sm px-3 text-muted transition focus-ring hover:text-foreground has-checked:surface-raised has-checked:text-foreground dim-disabled",
        className,
      )}
    >
      <input type="radio" className="sr-only" {...props} />
      {children}
    </label>
  );
}
