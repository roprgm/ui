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

/** A row of text, such as a title, with buttons after it. Its text sits 14px from the sides, and a
    line of it makes a 40px row. */
export function CardHeader({
  title,
  className,
  children,
}: {
  title?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-1 px-3.5 py-2.5 padded",
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
    </div>
  );
}

/** A group of content, such as sliders or a card's details, 14px from the sides and 12px from the
    top and bottom. */
export function CardSection({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-3 px-3.5 py-3 padded", className)}
      {...props}
    />
  );
}

/** A closing row, such as the card's actions, with `justify-end`; padded as a section is. */
export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-1 px-3.5 py-3 padded",
        className,
      )}
      {...props}
    />
  );
}
