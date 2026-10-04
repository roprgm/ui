"use client";

import { Collapsible as Primitive } from "@base-ui/react/collapsible";
import { cn } from "cn";
import type { ComponentProps, TransitionEvent } from "react";
import { sections } from "./section";

// Shared with Accordion, whose items look and move as a Collapsible does.

// A section rounded only where it meets the card's corners, so a line between two stays straight.
export const collapsibleSection =
  "first:rounded-t-[inherit] last:rounded-b-[inherit]";

// Square at the bottom while the panel shows under it. Closed, its fill covers its section's line,
// so it draws that line again.
export const collapsibleTrigger =
  "flex w-full cursor-pointer items-center gap-2 rounded-[inherit] px-3.5 py-2.5 text-left transition focus-ring -outline-offset-2 hover:bg-hover hover:not-data-panel-open:shadow-[inherit] data-panel-open:rounded-b-none dim-disabled";

// Each primitive names the variable for its height.
export const collapsiblePanel =
  "overflow-hidden transition-[height,opacity] duration-200 ease-out data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0 motion-reduce:transition-none";

export const collapsiblePanelContent = cn(
  sections(),
  "shadow-[inset_0_1px_0_var(--color-border-subtle)]",
);

/** Scrolls a section into view once it has opened. */
export function revealSection(event: TransitionEvent<HTMLDivElement>) {
  const panel = event.currentTarget;
  if (event.target !== panel || event.propertyName !== "height") return;
  if (!panel.hasAttribute("data-open")) return;
  panel.parentElement?.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

/**
 * A trigger that shows and hides a panel. A chevron inside turns with
 * `group-data-open/collapsible:rotate-90`. It counts as a section of the card that holds it.
 */
export function Collapsible({
  className,
  ...props
}: Omit<ComponentProps<typeof Primitive.Root>, "className"> & {
  className?: string;
}) {
  return (
    <Primitive.Root
      data-slot="section"
      className={cn("group/collapsible", collapsibleSection, className)}
      {...props}
    />
  );
}

/** A row that toggles the panel; to hold buttons, render a div with `nativeButton={false}`. */
export function CollapsibleTrigger({
  className,
  ...props
}: Omit<ComponentProps<typeof Primitive.Trigger>, "className"> & {
  className?: string;
}) {
  return (
    <Primitive.Trigger
      data-slot="collapsible-trigger"
      className={cn(collapsibleTrigger, className)}
      {...props}
    />
  );
}

/**
 * What the trigger shows, padded as a card is, under a line that folds away with it.
 * `className` styles the box that holds them, inside the part that slides.
 */
export function CollapsiblePanel({
  className,
  children,
  onTransitionEnd,
  ...props
}: Omit<ComponentProps<typeof Primitive.Panel>, "className"> & {
  className?: string;
}) {
  return (
    <Primitive.Panel
      data-slot="collapsible-panel"
      hiddenUntilFound
      onTransitionEnd={(event) => {
        revealSection(event);
        onTransitionEnd?.(event);
      }}
      className={cn("h-(--collapsible-panel-height)", collapsiblePanel)}
      {...props}
    >
      <div
        data-slot="collapsible-panel-content"
        className={cn(collapsiblePanelContent, className)}
      >
        {children}
      </div>
    </Primitive.Panel>
  );
}
