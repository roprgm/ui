import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";

/**
 * A surface whose parts stack in the order written, with a line between each: `CardHeader`,
 * `CardSection`s, and `CardFooter`. A Panel, a Popover, and a Collapsible styled as a card hold
 * the same parts. `layer` paints it: `layer-elevated` for a card inside a card.
 */
export function Card({
  layer = "layer-card",
  className,
  ...props
}: ComponentProps<"div"> & { layer?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col divide-y divide-line overflow-hidden rounded-xl surface-card",
        layer,
        className,
      )}
      {...props}
    />
  );
}

// A row's control sits 6px from its top, bottom, and end, so its corner nests in a rounded card's.
const row =
  "flex min-h-(--size-row) shrink-0 items-center gap-1 pr-(--padding-row) pl-(--padding)";

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
          className="flex-1 scroll-text font-medium text-foreground"
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
    <div
      className={cn("flex flex-col gap-3 p-(--padding)", className)}
      {...props}
    />
  );
}

/** A closing row, such as where a card's content came from and a menu of actions. */
export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn(row, className)} {...props} />;
}
