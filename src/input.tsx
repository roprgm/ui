import { cn } from "cn";
import type { ComponentProps } from "react";

/** A sunken text field. `aria-invalid` rings it red; `type="file"` styles the picker button. */
export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-(--size-control) w-full min-w-0 rounded-md surface-sunken px-3 text-foreground transition focus-ring placeholder:text-faint dim-disabled aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-danger/60",
        // The picker button is set into the field by the inset, as a toggle is into its group.
        "file:mt-(--inset) file:mr-3 file:-ml-[calc(12px-var(--inset))] file:h-(--size-control-inset) file:cursor-pointer file:rounded-sm file:border-0 file:surface-raised file:px-2 file:text-foreground file:transition hover:file:bg-raised-hover",
        className,
      )}
      {...props}
    />
  );
}
