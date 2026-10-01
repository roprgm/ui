import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";

const badge = cva(
  // Flat, as a Chip is, and at least as wide as it is tall, so a one-digit count is round.
  "inline-flex h-5.5 min-w-5.5 shrink-0 items-center justify-center gap-1 rounded-full px-1.75 whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-pressed text-foreground",
        accent: "bg-accent text-on-accent",
      },
    },
  },
);

/** A short label, such as a status or a count. */
export function Badge({
  variant = "default",
  className,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badge>) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(badge({ variant }), className)}
      {...props}
    />
  );
}
