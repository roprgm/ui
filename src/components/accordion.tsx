"use client";

import { Accordion as Primitive } from "@base-ui/react/accordion";
import { cn } from "cn";
import type { ComponentProps } from "react";
import {
  collapsiblePanel,
  collapsiblePanelContent,
  collapsibleSection,
  collapsibleTrigger,
  revealSection,
} from "./collapsible";
import { sections } from "./section";

/**
 * Collapsibles that open one at a time, or all of them with `multiple`. It counts as a section of
 * the card that holds it, and its items stack in it with a line between each.
 */
export function Accordion({
  className,
  ...props
}: Omit<ComponentProps<typeof Primitive.Root>, "className"> & {
  className?: string;
}) {
  return (
    <Primitive.Root
      data-slot="section"
      className={cn(sections(), collapsibleSection, className)}
      {...props}
    />
  );
}

/** A trigger and its panel. A chevron in the trigger turns with `group-data-open/collapsible:rotate-90`. */
export function AccordionItem({
  className,
  ...props
}: Omit<ComponentProps<typeof Primitive.Item>, "className"> & {
  className?: string;
}) {
  return (
    <Primitive.Item
      data-slot="section"
      className={cn("group/collapsible", collapsibleSection, className)}
      {...props}
    />
  );
}

/** A row in a heading that toggles its item's panel. */
export function AccordionTrigger({
  className,
  ...props
}: Omit<ComponentProps<typeof Primitive.Trigger>, "className"> & {
  className?: string;
}) {
  return (
    <Primitive.Header
      data-slot="accordion-header"
      className="rounded-[inherit]"
    >
      <Primitive.Trigger
        data-slot="accordion-trigger"
        className={cn(collapsibleTrigger, className)}
        {...props}
      />
    </Primitive.Header>
  );
}

/**
 * What the trigger shows, padded as a card is, under a line that folds away with it.
 * `className` styles the box that holds them, inside the part that slides.
 */
export function AccordionPanel({
  className,
  children,
  onTransitionEnd,
  ...props
}: Omit<ComponentProps<typeof Primitive.Panel>, "className"> & {
  className?: string;
}) {
  return (
    <Primitive.Panel
      data-slot="accordion-panel"
      hiddenUntilFound
      onTransitionEnd={(event) => {
        revealSection(event);
        onTransitionEnd?.(event);
      }}
      className={cn("h-(--accordion-panel-height)", collapsiblePanel)}
      {...props}
    >
      <div
        data-slot="accordion-panel-content"
        className={cn(collapsiblePanelContent, className)}
      >
        {children}
      </div>
    </Primitive.Panel>
  );
}
