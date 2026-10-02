import { cn } from "cn";
import type { ComponentProps } from "react";

/** A multi-line field that grows with its text. `aria-invalid` rings it red. */
export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-20 w-full min-w-0 resize-y rounded-md material-field px-2.5 py-1.5 text-foreground transition field-sizing-content focus-ring placeholder:text-secondary dim-disabled aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-danger/60",
        className,
      )}
      {...props}
    />
  );
}
