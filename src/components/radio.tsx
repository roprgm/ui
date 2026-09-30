import { cn } from "cn";
import type { ComponentProps } from "react";
import styles from "./radio.module.css";

/** A native radio; radios that share a `name` choose one. `::before` draws the dot. */
export function Radio({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  return (
    <input
      type="radio"
      data-slot="radio"
      className={cn(styles.radio, className)}
      {...props}
    />
  );
}
