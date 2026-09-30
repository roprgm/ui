import { cn } from "cn";
import type { ComponentProps } from "react";
import "./tokens.css";
import "./scroll-text.css";
import "./overflow-keyframes.css";

/** A line of text that fades and scrolls where it doesn't fit, instead of an ellipsis. */
export function ScrollText({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="scroll-text"
      tabIndex={-1}
      className={cn("scroll-text", className)}
      {...props}
    />
  );
}
