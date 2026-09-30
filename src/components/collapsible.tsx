"use client";

import { Collapsible as Primitive } from "@base-ui/react/collapsible";
import { cn } from "cn";
import type { ComponentProps, TransitionEvent } from "react";

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
      className={cn("group/collapsible rounded-[inherit]", className)}
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
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 rounded-[inherit] px-3.5 py-2.5 text-left",
        "transition focus-ring -outline-offset-2 hover:bg-hover dim-disabled",
        // Square at the bottom while the panel shows under it.
        "data-panel-open:rounded-b-none",
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
      hiddenUntilFound
      onTransitionEnd={(event) => {
        revealSection(event);
        onTransitionEnd?.(event);
      }}
      data-slot="collapsible-panel"
      className={cn(
        "h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-200 ease-out motion-reduce:transition-none",
        "data-starting-style:h-0 data-starting-style:opacity-0 data-ending-style:h-0 data-ending-style:opacity-0",
      )}
      {...props}
    >
      <div
        className={cn(
          "sections shadow-[inset_0_1px_0_var(--color-line)]",
          className,
        )}
      >
        {children}
      </div>
    </Primitive.Panel>
  );
}
