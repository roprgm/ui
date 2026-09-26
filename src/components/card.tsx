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

// A row holds a control and `--padding-row` above and below it; `row-ends` places what's at its ends.
const row =
  "flex min-h-row shrink-0 items-center gap-1 pr-pad-optical pl-pad row-ends";

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

/** A padded group, such as sliders or a card's details. Its sides are a row's, `--padding`, and its
    top and bottom `--padding-optical`, which a line of text needs for its own air. */
export function CardSection({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-3 px-pad py-pad-optical", className)}
      {...props}
    />
  );
}

/** A closing row: where a card's content came from and a menu, or buttons such as Cancel and
    Export, with `justify-end`. */
export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn(row, className)} {...props} />;
}
