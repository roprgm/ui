import { cn } from "cn";
import type { ComponentProps } from "react";
import "./core.css";
import "./section.css";

/**
 * A box padded as one `Section`, which hands its padding to the `Section`s it holds: one reads
 * the same as none, and several stack with a line between each, or, without `lines`, sharing
 * the padding between them.
 */
export function sections({
  lines = true,
  class: extraClass,
  className,
}: {
  lines?: boolean | null;
  class?: Parameters<typeof cn>[number];
  className?: Parameters<typeof cn>[number];
} = {}) {
  return cn(
    "sections",
    lines && "sections-lined",
    lines === false && "sections-stacked",
    extraClass,
    className,
  );
}

/** A part of a card, popover, dialog, or notice. Its content stacks; a header or a row of buttons is `flex-row`. */
export function Section({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="section" className={cn("section", className)} {...props} />
  );
}

/** Ghost icon buttons at a header's end, reaching into its padding so each icon sits 12px in. */
export function SectionAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="section-action"
      className={cn("section-action", className)}
      {...props}
    />
  );
}
