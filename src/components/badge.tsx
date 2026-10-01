import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";

const badge = cva(
  // Flat, as a Chip is, and at least as wide as it is tall, so a one-digit count is round.
  "inline-flex shrink-0 items-center justify-center gap-1 rounded-full whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-pressed text-foreground",
        accent: "bg-accent text-on-accent",
        // A line in the text's color, so a state color sets both.
        outline: "text-secondary inset-ring inset-ring-current/40",
      },
      size: {
        default: "h-5.5 min-w-5.5 px-1.75",
        // A count beside a label, a step smaller than the text around it.
        sm: "h-5 min-w-5 px-1.5 text-[0.875em]",
      },
    },
  },
);

/** A short label, such as a status or a count. */
export function Badge({
  variant = "default",
  size = "default",
  className,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badge>) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      className={cn(badge({ variant, size }), className)}
      {...props}
    />
  );
}
