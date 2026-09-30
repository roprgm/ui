import { cn } from "cn";
import type { ComponentProps } from "react";
import "./tokens.css";
import "./chevron.css";

/** One right-pointing stroke turned to `direction`, so changing it animates the turn. */
export function Chevron({
  direction = "down",
  size = "md",
  className,
  ...props
}: ComponentProps<"svg"> & {
  direction?: "right" | "down" | "left" | "up" | null;
  size?: "sm" | "md" | null;
}) {
  return (
    <svg
      data-slot="chevron"
      data-direction={direction ?? undefined}
      data-size={size ?? undefined}
      viewBox="5 5 14 14"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("chevron", className)}
      aria-hidden
      {...props}
    >
      <path data-slot="chevron-path" d="m9 6 6 6-6 6" />
    </svg>
  );
}
