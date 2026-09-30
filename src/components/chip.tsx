import { cn } from "cn";
import type { ComponentProps } from "react";
import styles from "./chip.module.css";

/** A pill button for bars over a canvas; `aria-pressed` shows it on. */
export function Chip({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="chip"
      className={cn(styles.chip, className)}
      {...props}
    />
  );
}
