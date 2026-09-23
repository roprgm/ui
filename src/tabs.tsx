"use client";

import { cn } from "cn";
import type { ComponentProps, KeyboardEvent } from "react";
import { Button } from "./button";

const steps: Record<string, number> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
};

/** Tabs in a row, or a column with `flex-col`; arrow keys in any direction move between them. */
export function TabList({ className, ...props }: ComponentProps<"div">) {
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
      className={cn("flex gap-1", className)}
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
        "aria-selected:bg-neutral-700 aria-selected:text-neutral-100 aria-selected:shadow-raised",
        className,
      )}
      {...props}
    />
  );
}
