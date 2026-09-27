import { cn } from "cn";
import type { ComponentProps } from "react";
import { sections } from "./section";

/** A box padded as its content needs; its `Section`s stack with a line between each. */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        sections(),
        "overflow-hidden rounded-xl surface-card",
        className,
      )}
      {...props}
    />
  );
}
