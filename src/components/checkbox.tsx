import { cn } from "cn";
import type { ComponentProps } from "react";
import "./tokens.css";
import "./checkbox.css";

/** A native checkbox; `:checked` draws the mark in. */
export function Checkbox({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  return (
    <span data-slot="checkbox" className={cn("checkbox", className)}>
      <input
        data-slot="checkbox-input"
        type="checkbox"
        className="checkbox-input"
        {...props}
      />
      <svg
        data-slot="checkbox-indicator"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        // One dash the length of the stroke; its gap of 2 hides the round cap while erased.
        className="checkbox-indicator"
        aria-hidden
      >
        <path data-slot="checkbox-path" d="m5 13 4 4L19 7" pathLength={1} />
      </svg>
    </span>
  );
}
