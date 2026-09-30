import { cn } from "cn";
import type { ComponentProps } from "react";
import "./core.css";
import "./badge.css";

/** A short label, such as a status or a count. */
export function Badge({
  variant = "default",
  className,
  ...props
}: ComponentProps<"span"> & { variant?: "default" | "primary" | null }) {
  return (
    <span
      data-slot="badge"
      data-variant={variant ?? undefined}
      className={cn("badge", className)}
      {...props}
    />
  );
}
