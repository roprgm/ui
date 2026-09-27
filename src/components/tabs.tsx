"use client";

import { Tabs as Primitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";
import { Button } from "./button";

/** Tabs and the panels they show; `orientation="vertical"` stacks the tabs in a column. */
export const Tabs = Primitive.Root;

const list = cva("flex data-[orientation=vertical]:flex-col", {
  variants: {
    variant: {
      default: "gap-1",
      // As a ToggleGroup: tabs a size smaller, 3px in, a pixel past the row. Icon tabs take `icon-sm`.
      segmented:
        "-my-px gap-0.5 rounded-lg surface-sunken p-0.75 *:h-6 *:rounded-sm",
    },
  },
  defaultVariants: { variant: "default" },
});

/** The tabs; the arrow keys move between them and select. `segmented` sets them into a sunken strip. */
export function TabList({
  variant,
  className,
  ...props
}: Primitive.List.Props & VariantProps<typeof list>) {
  return (
    <Primitive.List
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
      render={<Button variant="ghost" size={size} />}
      className={cn(
        "data-active:surface-raised data-active:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function TabPanel({ className, ...props }: Primitive.Panel.Props) {
  return (
    <Primitive.Panel
      className={cn("rounded-sm focus-ring", className)}
      {...props}
    />
  );
}
