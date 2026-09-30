import { cn } from "cn";
import type { ComponentProps } from "react";

/**
 * A part of a card, popover, dialog, or notice, which pads its content as one section until it
 * holds sections: the theme's `sections` and `sections-stacked`. Its content stacks; a header or
 * a row of buttons is `flex-row`.
 */
export function Section({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="section"
      className={cn("flex flex-col gap-3 px-3.5 py-2.5", className)}
      {...props}
    />
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
