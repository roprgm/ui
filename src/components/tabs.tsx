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
      // As a ToggleGroup: tabs a size smaller, 4px in.
      segmented:
        "gap-0.5 rounded-lg surface-sunken p-1 *:h-6 *:min-w-6 *:rounded-sm",
    },
  },
  defaultVariants: { variant: "default" },
});

/** Tabs in a row, or a column with `flex-col`. `segmented` sets them into a sunken strip. */
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
