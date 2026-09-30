"use client";

import { Collapsible as Primitive } from "@base-ui/react/collapsible";
import { cn } from "cn";
import type { ComponentProps, TransitionEvent } from "react";
import styles from "./collapsible.module.css";

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
      className={cn("group/collapsible", styles.collapsible, className)}
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
      className={cn(styles.trigger, className)}
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
      className={styles.panel}
      {...props}
    >
      <div className={cn("sections", styles.content, className)}>
        {children}
      </div>
    </Primitive.Panel>
  );
}
