import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";

const badge = cva(
  // At least as wide as it is tall, so a one-digit count is round.
  "inline-flex h-5 min-w-5 shrink-0 items-center justify-center gap-1 rounded-full surface-sunken px-1.5 whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "text-muted",
        // Filled like a checked checkbox, since it marks what is on or new.
        primary:
          "bg-primary! text-on-primary text-shadow-(--text-shadow-subtle)",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

/** A short label that isn't a control, such as a status or a count; `primary` marks what is new. */
export function Badge({
  variant,
  className,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badge>) {
  return <span className={cn(badge({ variant }), className)} {...props} />;
}
