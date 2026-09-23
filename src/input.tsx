import { cn } from "cn";
import type { ComponentProps } from "react";

/** A sunken text field. `aria-invalid` rings it red; `type="file"` styles the picker button. */
export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-8 w-full min-w-0 rounded-md bg-neutral-900 px-2.5 text-neutral-100 shadow-sunken transition focus-ring placeholder:text-neutral-500 disabled:opacity-40 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-400/60",
        // The picker button sits 4px inside the field, so its 2px corners nest in the field's 6px ones.
        "file:mt-1 file:mr-3 file:-ml-1.5 file:h-6 file:cursor-pointer file:rounded-xs file:border-0 file:bg-neutral-700 file:px-2 file:text-neutral-100 file:shadow-raised file:transition hover:file:bg-neutral-600",
        className,
      )}
      {...props}
    />
  );
}
