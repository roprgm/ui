import { cn } from "cn";
import type { ComponentProps } from "react";
import "./tokens.css";
import "./radio.css";

/** A native radio; radios that share a `name` choose one. `::before` draws the dot. */
export function Radio({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  return (
    <input
      data-slot="radio"
      type="radio"
      className={cn("radio", className)}
      {...props}
    />
  );
}
