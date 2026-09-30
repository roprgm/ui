import { cn } from "cn";
import type { ComponentProps } from "react";
import "./tokens.css";
import "./spinner.css";

export function Spinner({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("spinner", className)}
      {...props}
    />
  );
}
