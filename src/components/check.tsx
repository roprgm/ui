import { cn } from "cn";
import type { ComponentProps } from "react";
import "./core.css";
import "./check.css";

/** A check mark, as on the chosen rows of a select or combobox. */
export function Check({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      data-slot="check"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("check", className)}
      aria-hidden
      {...props}
    >
      <path data-slot="check-path" d="m5 13 4 4L19 7" />
    </svg>
  );
}
