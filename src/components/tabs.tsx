"use client";

import { Tabs as Primitive } from "@base-ui/react/tabs";
import { cn } from "cn";
import type { ComponentProps } from "react";
import { Button } from "./button";
import "./tokens.css";
import "./tabs.css";

/** Tabs and the panels they show; `orientation="vertical"` stacks the tabs in a column. */
export const Tabs = Primitive.Root;

/** The tabs; the arrow keys move between them and select. `segmented` sets them into a sunken strip. */
export function TabList({
  variant = "default",
  className,
  ...props
}: Primitive.List.Props & { variant?: "default" | "segmented" | null }) {
  return (
    <Primitive.List
      data-slot="tab-list"
      data-variant={variant ?? undefined}
      activateOnFocus
      className={cn("tab-list", className)}
      {...props}
    />
  );
}

/** A tab, drawn as a ghost Button of any size. */
export function Tab({
  size,
  className,
  ...props
}: Primitive.Tab.Props & Pick<ComponentProps<typeof Button>, "size">) {
  return (
    <Primitive.Tab
      data-slot="tab"
      render={<Button variant="ghost" size={size} />}
      className={cn("tab", className)}
      {...props}
    />
  );
}

export function TabPanel({ className, ...props }: Primitive.Panel.Props) {
  return (
    <Primitive.Panel
      data-slot="tab-panel"
      className={cn("tab-panel", className)}
      {...props}
    />
  );
}
