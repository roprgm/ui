import { cn } from "cn";
import type { ComponentProps } from "react";
import styles from "./input.module.css";

/** A text field. `aria-invalid` rings it red. */
export function Input({
  size = "default",
  className,
  ...props
}: Omit<ComponentProps<"input">, "size"> & { size?: "default" | "lg" }) {
  return (
    <input
      data-slot="input"
      data-size={size}
      className={cn(styles.input, className)}
      {...props}
    />
  );
}
