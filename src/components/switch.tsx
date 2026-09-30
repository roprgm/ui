import { cn } from "cn";
import type { ComponentProps } from "react";
import styles from "./switch.module.css";

/** A native checkbox with the switch role; `::before` draws the thumb. */
export function Switch({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  return (
    <input
      type="checkbox"
      // biome-ignore lint/a11y/useAriaPropsForRole: a native checkbox exposes its checked state.
      role="switch"
      data-slot="switch"
      className={cn(styles.switch, className)}
      {...props}
    />
  );
}
