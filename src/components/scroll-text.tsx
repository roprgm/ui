import { cn } from "cn";
import type { ComponentProps } from "react";

/** A line of text that fades and scrolls where it doesn't fit, instead of an ellipsis. */
export function ScrollText({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="scroll-text"
      tabIndex={-1}
      className={cn("block overflow-fade-x whitespace-nowrap", className)}
      {...props}
    />
  );
}
