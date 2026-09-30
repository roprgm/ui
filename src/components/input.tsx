import { cn } from "cn";
import type { ComponentProps } from "react";
import "./core.css";
import "./input.css";

/** A text field. `aria-invalid` rings it red. */
export function Input({
  size = "default",
  className,
  ...props
}: Omit<ComponentProps<"input">, "size"> & { size?: "default" | "lg" | null }) {
  return (
    <input
      data-slot="input"
      data-size={size ?? undefined}
      className={cn("input", className)}
      {...props}
    />
  );
}
