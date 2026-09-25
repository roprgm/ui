import { cn } from "cn";
import type { ComponentProps } from "react";

export function Spinner({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "size-4 animate-spin rounded-full border-2 border-disabled border-t-foreground",
        className,
      )}
      {...props}
    />
  );
}
