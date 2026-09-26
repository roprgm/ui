"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps, KeyboardEvent } from "react";
import { Button } from "./button";

const steps: Record<string, number> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
};

const list = cva("flex", {
  variants: {
    variant: {
      default: "gap-1",
      // Set into a sunken strip like a ToggleGroup, and as tall: the tabs read a control height
      // that fits the strip, and their corners nest in its corners. Only default and `icon` tabs
      // follow it; the other sizes resolve at the root.
      segmented:
        "gap-0.5 rounded-lg surface-sunken p-(--padding-xs) [--size-control:calc(var(--size-control-lg)-2*var(--padding-xs))] *:rounded-[calc(var(--radius-lg)-var(--padding-xs))]",
    },
  },
  defaultVariants: { variant: "default" },
});

/**
 * Tabs in a row, or a column with `flex-col`; arrow keys in any direction move between them.
 * `segmented` sets them into a sunken strip, as a tool rail or a switch between views.
 */
export function TabList({
  variant,
  className,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof list>) {
  const selectNeighbor = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = steps[event.key];
    if (!step) return;
    event.preventDefault();
    const tabs = [
      ...event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]'),
    ];
    const index = tabs.findIndex(
      (tab) => tab.getAttribute("aria-selected") === "true",
    );
    const next = tabs.at((index + step) % tabs.length);
    next?.focus();
    next?.click();
  };
  return (
    <div
      role="tablist"
      onKeyDown={selectNeighbor}
      className={cn(list({ variant }), className)}
      {...props}
    />
  );
}

/** Only the selected tab is in the tab order; arrow keys reach the rest. */
export function Tab({
  selected,
  className,
  ...props
}: ComponentProps<typeof Button> & { selected: boolean }) {
  return (
    <Button
      variant="ghost"
      role="tab"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      className={cn(
        "aria-selected:surface-raised aria-selected:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
