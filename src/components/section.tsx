import { cva } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";

const padding = "flex flex-col gap-3 px-3.5 py-2.5";

/**
 * A box padded as one `Section`, which hands its padding to the `Section`s it holds: one reads
 * the same as none, and several stack with a line between each, or, without `lines`, sharing
 * the padding between them.
 */
export const sections = cva(
  [padding, "has-[>[data-slot=section]]:gap-0 has-[>[data-slot=section]]:p-0"],
  {
    variants: {
      lines: {
        // Once it holds sections, a line runs between all its parts, such as a list that scrolls.
        true: "has-[>[data-slot=section]]:*:not-last:shadow-[inset_0_-1px_0_var(--color-border-subtle)]",
        false: "*:data-[slot=section]:not-last:pb-0",
      },
    },
    defaultVariants: { lines: true },
  },
);

/** A part of a card, popover, dialog, or notice. Its content stacks; a header or a row of buttons is `flex-row`. */
export function Section({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="section" className={cn(padding, className)} {...props} />
  );
}

/** Ghost icon buttons at a header's end, reaching into its padding so each icon sits 12px in. */
export function SectionAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="section-action"
      className={cn("-my-1 -mr-2 flex shrink-0 items-center gap-1", className)}
      {...props}
    />
  );
}
