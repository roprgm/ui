import { cn } from "cn";
import type { ComponentProps } from "react";
import "./core.css";
import "./textarea.css";

/** A multi-line field that grows with its text. `aria-invalid` rings it red. */
export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn("textarea", className)}
      {...props}
    />
  );
}
