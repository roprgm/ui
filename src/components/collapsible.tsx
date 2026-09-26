"use client";

import { Collapsible as Primitive } from "@base-ui/react/collapsible";
import { cn } from "cn";
import type { ComponentProps, TransitionEvent } from "react";

/**
 * A section whose trigger shows and hides its panel, such as a card that opens to its details.
 * It sets `data-open` while open, so a chevron inside turns with
 * `group-data-open/collapsible:rotate-90`.
 */
export function Collapsible({
  className,
  ...props
}: Omit<ComponentProps<typeof Primitive.Root>, "className"> & {
  className?: string;
}) {
  return (
    <Primitive.Root className={cn("group/collapsible", className)} {...props} />
  );
}

/**
 * The row that opens and closes the panel, padded like a list row. It is a button; to hold
 * buttons of its own, such as a copy button, render it as a div:
 * `<CollapsibleTrigger nativeButton={false} render={<div />}>`.
 */
export function CollapsibleTrigger({
  className,
  ...props
}: Omit<ComponentProps<typeof Primitive.Trigger>, "className"> & {
  className?: string;
}) {
  return (
    <Primitive.Trigger
      className={cn(
        // Its corners follow the section's, square at the bottom while the panel shows under it.
        "flex w-full cursor-pointer items-center gap-2 rounded-[inherit] px-(--padding) py-2.5 text-left transition focus-ring hover:bg-hover data-panel-open:rounded-b-none dim-disabled",
        className,
      )}
      {...props}
    />
  );
}

/** Scrolls an opened section into view, as little as it can, once it has finished opening. */
function revealSection(event: TransitionEvent<HTMLDivElement>) {
  const panel = event.currentTarget;
  if (event.target !== panel || event.propertyName !== "height") return;
  if (!panel.hasAttribute("data-open")) return;
  panel.parentElement?.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

/**
 * What the trigger shows. It slides and fades open and closed, and stays in the page while
 * closed, so the browser's find-in-page reaches it and opens it. `className` styles a box inside
 * the part that slides, so padding and borders fold away with it.
 */
export function CollapsiblePanel({
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof Primitive.Panel>, "className"> & {
  className?: string;
}) {
  return (
    <Primitive.Panel
      hiddenUntilFound
      onTransitionEnd={revealSection}
      className="h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-200 ease-out data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0 motion-reduce:transition-none"
      {...props}
    >
      <div className={className}>{children}</div>
    </Primitive.Panel>
  );
}
