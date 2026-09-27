import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";

const group = cva("inline-flex gap-0.5 rounded-lg surface-sunken p-1", {
  variants: {
    // Toggles a size smaller than the Button beside the group, so the group stands 4px taller.
    size: {
      default: "*:h-6",
      lg: "*:h-7",
    },
  },
  defaultVariants: { size: "default" },
});

/** Segmented toggles. Toggles that share a `name` choose one. */
export function ToggleGroup({
  size,
  className,
  ...props
}: ComponentProps<"fieldset"> & VariantProps<typeof group>) {
  return <fieldset className={cn(group({ size }), className)} {...props} />;
}

/** A label around a hidden radio, or a checkbox with `type="checkbox"`. */
export function Toggle({
  className,
  children,
  ...props
}: ComponentProps<"input">) {
  return (
    <label
      className={cn(
        // `relative` keeps the hidden radio inside, or it can widen the page.
        "relative inline-flex cursor-pointer items-center rounded-sm px-3 text-muted transition focus-ring hover:text-foreground has-checked:surface-raised has-checked:text-foreground dim-disabled",
        className,
      )}
    >
      <input type="radio" className="sr-only" {...props} />
      {children}
    </label>
  );
}
