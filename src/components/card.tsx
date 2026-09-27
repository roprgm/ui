import { cn } from "cn";
import type { ComponentProps } from "react";

/** How a card's sections stack: in the order written, with a line between each. The line is an
    inset shadow rather than a border, so it takes no room. A Popover stacks the same way, and so
    does a panel docked at an app's side: `surface-panel` and `cardParts` on an element of its
    own. */
export const cardParts =
  "flex flex-col *:not-last:shadow-[inset_0_-1px_0_var(--color-line)]";

/**
 * A box of `CardSection`s. One section has no line; the first of several reads as a header and the
 * last as a footer. A card inside a card rises to the elevated level on its own.
 */
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

/**
 * A part of a card, 14px from the sides and 10px from the top and bottom, so a line of text makes
 * a 40px section. Its content stacks; a header or a row of buttons is `flex-row`.
 */
export function CardSection({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-3 px-3.5 py-2.5", className)}
      {...props}
    />
  );
}

/**
 * Ghost icon buttons at the end of a section's row, such as a header's. Their box is air around
 * the icon, so they reach past the padding by it: each icon sits 12px from the end and the top,
 * and the row stays 40px.
 */
export function CardAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("-my-1 -mr-2 flex shrink-0 items-center gap-1", className)}
      {...props}
    />
  );
}
