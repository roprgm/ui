import { cn } from "cn";
import type { ComponentProps } from "react";

/** How a card's parts stack: in the order written, with a line between each. A Panel and a
    Popover hold the same parts. */
export const cardParts = "flex flex-col divide-y divide-line";

/**
 * A box of `CardHeader`, `CardSection`s, and `CardFooter`, stacked as `cardParts`. A card inside
 * a card rises to the elevated level on its own.
 */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        cardParts,
        "overflow-hidden rounded-xl layer-card surface-card",
        className,
      )}
      {...props}
    />
  );
}

/** A row of text, such as a `CardTitle` and a `CardAction`, 14px from the sides and 10px from the
    top and bottom, so a line makes a 40px row. */
export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-3 px-3.5 py-2.5",
        className,
      )}
      {...props}
    />
  );
}

/** The header's title, which takes the room left and scrolls when it doesn't fit. */
export function CardTitle({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      tabIndex={-1}
      className={cn(
        "flex-1 overflow-fade-x font-medium whitespace-nowrap text-foreground",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Ghost icon buttons at the header's end. Their box is air around the icon, so they reach past the
 * header's padding by it: each icon sits 12px from the end and the top, and the row stays 40px.
 */
export function CardAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("-my-1 -mr-2 flex shrink-0 items-center gap-1", className)}
      {...props}
    />
  );
}

/** A group of content, such as sliders or a card's details, padded as a header is. */
export function CardSection({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-3 px-3.5 py-2.5", className)}
      {...props}
    />
  );
}

/** The card's actions, such as Cancel and Export, with `justify-end`. They sit 10px from every edge:
    a button's box shows where text doesn't, so it sits 4px closer to the sides than text does. */
export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex shrink-0 items-center gap-1 p-2.5", className)}
      {...props}
    />
  );
}
