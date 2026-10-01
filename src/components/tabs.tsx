"use client";

import { Tabs as Primitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import {
  Children,
  type ComponentProps,
  createContext,
  useContext,
} from "react";
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
      segmented: "segmented surface-field *:h-(--spacing-control-sm)",
      // Over a line, which the selected tab marks.
      underline:
        "gap-1 pb-1.5 shadow-[inset_0_-1px_0_var(--color-border-subtle)]",
    },
  },
});

type Variant = NonNullable<VariantProps<typeof list>["variant"]>;

const ListVariant = createContext<Variant>("default");

/**
 * The tabs; the arrow keys move between them and select. `segmented` sets them into a sunken
 * strip, and `underline` lines them over a rule.
 */
export function TabList({
  variant = "default",
  className,
  ...props
}: Primitive.List.Props & VariantProps<typeof list>) {
  return (
    <ListVariant value={variant ?? "default"}>
      <Primitive.List
        data-slot="tab-list"
        data-variant={variant}
        activateOnFocus
        className={cn(list({ variant }), className)}
        {...props}
      />
    </ListVariant>
  );
}

const tab = cva("data-active:font-selected data-active:text-foreground", {
  variants: {
    variant: {
      default: "data-active:surface-control",
      segmented: "data-active:surface-control",
      underline:
        "relative after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:rounded-full data-active:after:bg-accent",
    },
  },
});

/**
 * A tab, drawn as a ghost Button of any size. Its text also renders hidden in the selected
 * weight, so a tab is as wide either way and selecting one doesn't move the rest; elements, such
 * as an icon, render once.
 */
export function Tab({
  size,
  className,
  children,
  ...props
}: Primitive.Tab.Props & Pick<ComponentProps<typeof Button>, "size">) {
  const variant = useContext(ListVariant);
  return (
    <Primitive.Tab
      data-slot="tab"
      render={<Button variant="ghost" size={size} />}
      className={cn(tab({ variant }), className)}
      {...props}
    >
      {Children.map(children, (child) =>
        typeof child === "string" || typeof child === "number" ? (
          <span
            data-slot="tab-label"
            className="grid *:col-start-1 *:row-start-1"
          >
            <span>{child}</span>
            <span aria-hidden className="invisible font-selected">
              {child}
            </span>
          </span>
        ) : (
          child
        ),
      )}
    </Primitive.Tab>
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
