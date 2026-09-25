import { cn } from "cn";
import type { ComponentProps } from "react";

/** A sunken text field. `aria-invalid` rings it red; `type="file"` styles the picker button. */
export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-(--size-control) w-full min-w-0 rounded-md surface-sunken px-2.5 text-foreground transition focus-ring placeholder:text-faint dim-disabled aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-danger/60",
        // The picker button sits 4px inside the field, so its 2px corners nest in the field's 6px ones.
        "file:mt-1 file:mr-3 file:-ml-1.5 file:h-(--size-control-xs) file:cursor-pointer file:rounded-sm file:border-0 file:surface-raised file:px-2 file:text-foreground file:transition hover:file:bg-raised-hover",
        className,
      )}
      {...props}
    />
  );
}
