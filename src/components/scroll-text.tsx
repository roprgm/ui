import { cn } from "cn";
import type { ComponentProps } from "react";

/**
 * One line of text that neither wraps nor ends in an ellipsis: when it doesn't fit, it fades out
 * at the end and scrolls sideways to show the rest, with no scrollbar. In a flex row it shrinks
 * like any `min-w-0` child.
 */
export function ScrollText({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "block min-w-0 overflow-x-auto whitespace-nowrap scroll-fade-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      {...props}
    />
  );
}
