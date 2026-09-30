import { cn } from "cn";
import type { ComponentProps } from "react";
import styles from "./toggle-group.module.css";

/** Segmented toggles. Toggles that share a `name` choose one. */
export function ToggleGroup({
  size = "default",
  className,
  ...props
}: ComponentProps<"fieldset"> & { size?: "default" | "lg" }) {
  return (
    <fieldset
      data-slot="toggle-group"
      data-size={size}
      className={cn(styles.group, className)}
      {...props}
    />
  );
}

/** A label around a hidden radio, or a checkbox with `type="checkbox"`. */
export function Toggle({
  className,
  children,
  ...props
}: ComponentProps<"input">) {
  return (
    <label data-slot="toggle" className={cn(styles.toggle, className)}>
      <input type="radio" className={styles.input} {...props} />
      {children}
    </label>
  );
}
