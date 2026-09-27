"use client";

import { Collapsible as Primitive } from "@base-ui/react/collapsible";
import { cn } from "cn";
import type { ComponentProps, TransitionEvent } from "react";
import { cardParts } from "./card";

/**
 * A trigger that shows and hides a panel. A chevron inside turns with
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

/** A row that toggles the panel; to hold buttons, render a div with `nativeButton={false}`. */
export function CollapsibleTrigger({
  className,
  ...props
}: Omit<ComponentProps<typeof Primitive.Trigger>, "className"> & {
  className?: string;
}) {
  return (
    <Primitive.Trigger
      className={cn(
        // Square at the bottom while the panel shows under it.
        "flex w-full cursor-pointer items-center gap-2 rounded-[inherit] px-3.5 py-2.5 text-left transition focus-ring hover:bg-hover data-panel-open:rounded-b-none dim-disabled",
        className,
      )}
      {...props}
    />
  );
}

/** Scrolls a section into view once it has opened. */
function revealSection(event: TransitionEvent<HTMLDivElement>) {
  const panel = event.currentTarget;
  if (event.target !== panel || event.propertyName !== "height") return;
  if (!panel.hasAttribute("data-open")) return;
  panel.parentElement?.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

/**
 * What the trigger shows: `CardSection`s, as in a card, under a line that folds away with them.
 * `className` styles the box that holds them, inside the part that slides.
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
      <div
        className={cn(
          cardParts,
          "shadow-[inset_0_1px_0_var(--color-line)]",
          className,
        )}
      >
        {children}
      </div>
    </Primitive.Panel>
  );
}
