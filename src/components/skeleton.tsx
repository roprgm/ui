import { cn } from "cn";
import type { ComponentProps } from "react";

/** A block standing in for content while it loads; `className` gives it a shape, such as `h-4 w-40`. */
export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn("rounded-md bg-hover shimmer", className)}
      {...props}
    />
  );
}
