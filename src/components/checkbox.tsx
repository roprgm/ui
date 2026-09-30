import { cn } from "cn";
import type { ComponentProps } from "react";
import styles from "./checkbox.module.css";

/** A native checkbox; its mark draws in when checked. */
export function Checkbox({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  return (
    <span data-slot="checkbox" className={cn(styles.checkbox, className)}>
      <input type="checkbox" className={styles.input} {...props} />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.mark}
        aria-hidden
      >
        <path d="m5 13 4 4L19 7" pathLength={1} />
      </svg>
    </span>
  );
}
