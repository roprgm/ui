import { cn } from "cn";
import type { ComponentProps } from "react";
import { field } from "./input";

/** A multi-line field that grows with its text. `aria-invalid` rings it red. */
export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        field,
        "min-h-20 resize-y py-1.5 field-sizing-content",
        className,
      )}
      {...props}
    />
  );
}
