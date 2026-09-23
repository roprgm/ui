import { cn } from "cn";
import type { ComponentProps } from "react";

/** A pill button for bars over a canvas; `aria-pressed` shows it on. */
export function Chip({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-2.5 whitespace-nowrap text-neutral-400 transition focus-ring hover:bg-white/10 hover:text-neutral-100 aria-pressed:bg-white/15 aria-pressed:text-neutral-100 data-popup-open:bg-white/15 data-popup-open:text-neutral-100 disabled:pointer-events-none disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}
