import { cn } from "cn";
import type { ComponentProps } from "react";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-8 w-full min-w-0 rounded-md bg-neutral-900 px-2.5 text-neutral-100 shadow-sunken transition focus-ring placeholder:text-neutral-500 disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}
