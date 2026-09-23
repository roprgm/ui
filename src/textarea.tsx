import { cn } from "cn";
import type { ComponentProps } from "react";

/** A sunken multi-line field that grows with its text. `aria-invalid` rings it red. */
export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-20 w-full min-w-0 resize-y rounded-md bg-neutral-900 px-2.5 py-1.5 text-neutral-100 shadow-sunken transition field-sizing-content focus-ring placeholder:text-neutral-500 disabled:opacity-40 aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-red-400/60",
        className,
      )}
      {...props}
    />
  );
}
