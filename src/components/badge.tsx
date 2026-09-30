import { cn } from "cn";
import type { ComponentProps } from "react";
import styles from "./badge.module.css";

/** A short label, such as a status or a count. */
export function Badge({
  variant = "default",
  className,
  ...props
}: ComponentProps<"span"> & { variant?: "default" | "primary" }) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(styles.badge, className)}
      {...props}
    />
  );
}
