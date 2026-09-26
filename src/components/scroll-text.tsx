import { cn } from "cn";
import type { ComponentProps } from "react";

/**
 * One line of text that fades at the end instead of an ellipsis when it doesn't fit, and
 * scrolls sideways to show the rest. It stays out of the tab order: a browser makes a box that
 * scrolls a tab stop when nothing in it is one, and this is text, not a control.
 */
export function ScrollText({ className, ...props }: ComponentProps<"span">) {
  return (
    <span tabIndex={-1} className={cn("scroll-text", className)} {...props} />
  );
}
