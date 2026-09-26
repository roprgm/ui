import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";

/** How a card's parts stack: in the order written, with a line between each. A Panel and a
    Popover hold the same parts. */
export const cardParts = "flex flex-col divide-y divide-line";

/**
 * A surface that holds `CardHeader`, `CardSection`s, and `CardFooter`, stacked as `cardParts`.
 * `layer` paints it; a card inside a card rises to `layer-elevated` on its own.
 */
export function Card({
  layer = "layer-card",
  className,
  ...props
}: ComponentProps<"div"> & { layer?: string }) {
  return (
    <div
      className={cn(
        cardParts,
        "overflow-hidden rounded-xl surface-card",
        layer,
        className,
      )}
      {...props}
    />
  );
}

// A row's control sits 6px from its top, bottom, and end, so its corner nests in a rounded card's.
const row = "flex min-h-row shrink-0 items-center gap-1 pr-pad-row pl-pad";

/** A title row with optional actions after it; without a title, the row holds what it's given. */
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
    <div className={cn(row, className)}>
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

/** A padded group, such as sliders or a card's details. */
export function CardSection({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-3 p-pad", className)} {...props} />
  );
}

/** A closing row, such as where a card's content came from and a menu of actions. */
export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn(row, className)} {...props} />;
}

/**
 * Buttons at the end of a card, such as Cancel and Export. They sit `--padding-optical` from its
 * edges, since a button's box shows where a ghost icon's doesn't; a ghost icon button goes in a
 * `CardFooter`. Under content that already ends in padding, as in a Dialog, drop its top: `pt-0`.
 */
export function CardActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex justify-end gap-1 p-pad-optical", className)}
      {...props}
    />
  );
}
