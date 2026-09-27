import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";

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

/** A row of text, such as a title, 14px from the sides; a line of it makes a 40px row. `actions`
    are ghost icon buttons at its end. */
export function CardHeader({
  title,
  actions,
  className,
  children,
}: {
  title?: ReactNode;
  actions?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-3 px-3.5 py-2.5",
        className,
      )}
    >
      {title && (
        <h2
          tabIndex={-1}
          className="flex-1 overflow-fade-x font-medium whitespace-nowrap text-foreground"
        >
          {title}
        </h2>
      )}
      {children}
      {actions && (
        // A ghost's box is air around its icon, so the actions reach past the row's padding by it:
        // each icon sits 12px from the end and the top, and the row stays 40px.
        <div className="-my-1 -mr-2 flex shrink-0 items-center gap-1">
          {actions}
        </div>
      )}
    </div>
  );
}

/** A group of content, such as sliders or a card's details, 14px from the sides and 12px from the
    top and bottom. */
export function CardSection({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-3 px-3.5 py-3", className)}
      {...props}
    />
  );
}

/** The card's actions, such as Cancel and Export, with `justify-end`. A button's box shows where
    text doesn't, so it sits closer to the edges than text does: 12px from each. */
export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex shrink-0 items-center gap-1 p-3", className)}
      {...props}
    />
  );
}
