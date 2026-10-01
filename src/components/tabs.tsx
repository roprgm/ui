"use client";

import { Tabs as Primitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";
import { Button } from "./button";

/** Tabs and the panels they show; `orientation="vertical"` stacks the tabs in a column. */
export function Tabs(props: Primitive.Root.Props) {
  return <Primitive.Root data-slot="tabs" {...props} />;
}

const list = cva("flex data-[orientation=vertical]:flex-col", {
  variants: {
    variant: {
      default: "gap-1",
      // As a ToggleGroup: tabs a size smaller. Icon tabs take `icon-sm`.
      segmented: "segmented surface-field *:h-6",
    },
  },
});

/** The tabs; the arrow keys move between them and select. `segmented` sets them into a sunken strip. */
export function TabList({
  variant = "default",
  className,
  ...props
}: Primitive.List.Props & VariantProps<typeof list>) {
  return (
    <Primitive.List
      data-slot="tab-list"
      data-variant={variant}
      activateOnFocus
      className={cn(list({ variant }), className)}
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
      className={cn(
        "data-active:surface-control data-active:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function TabPanel({ className, ...props }: Primitive.Panel.Props) {
  return (
    <Primitive.Panel
      data-slot="tab-panel"
      className={cn("rounded-sm focus-ring", className)}
      {...props}
    />
  );
}
