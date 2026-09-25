import { cn } from "cn";
import type { ComponentProps } from "react";

/** A pill button for bars over a canvas; `aria-pressed` shows it on. */
export function Chip({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-(--size-control) shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-2.5 whitespace-nowrap text-muted transition focus-ring hover:bg-hover hover:text-foreground aria-pressed:bg-pressed aria-pressed:text-foreground data-popup-open:bg-pressed data-popup-open:text-foreground dim-disabled",
        className,
      )}
      {...props}
    />
  );
}
