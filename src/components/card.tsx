import { cn } from "cn";
import type { ComponentProps } from "react";

/** Sections stacked with a line between each, as in a card or popover. */
export const cardParts =
  "flex flex-col *:not-last:shadow-[inset_0_-1px_0_var(--color-line)]";

/** A box of `CardSection`s. The first of several reads as a header, and the last as a footer. */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        cardParts,
        "overflow-hidden rounded-xl surface-card",
        className,
      )}
      {...props}
    />
  );
}

/** A part of a card. Its content stacks; a header or a row of buttons is `flex-row`. */
export function CardSection({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-3 px-3.5 py-2.5", className)}
      {...props}
    />
  );
}

/** Ghost icon buttons at a header's end, reaching into its padding so each icon sits 12px in. */
export function CardAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("-my-1 -mr-2 flex shrink-0 items-center gap-1", className)}
      {...props}
    />
  );
}
