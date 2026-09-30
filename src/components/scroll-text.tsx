import { cn } from "cn";
import type { ComponentProps } from "react";
import styles from "./scroll-text.module.css";

/** A line of text that fades and scrolls where it doesn't fit, instead of an ellipsis. */
export function ScrollText({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      tabIndex={-1}
      data-slot="scroll-text"
      className={cn("overflow-fade-x", styles.text, className)}
      {...props}
    />
  );
}
