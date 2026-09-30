"use client";

import { Select as Primitive } from "@base-ui/react/select";
import { cn } from "cn";
import { type ReactNode, useState } from "react";
import { Check } from "./check";
import { Chevron } from "./chevron";
import { Popup, popupItem } from "./popup";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import "./core.css";
import "./select.css";

export type SelectItem<T extends string> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};

/** A choice from a list; `multiple` keeps it open and lists the chosen labels. */
export function Select<T extends string, Multiple extends boolean = false>({
  items,
  placeholder,
  tooltip,
  variant = "field",
  size = "default",
  raised = false,
  className,
  "aria-label": label,
  onOpenChange,
  ...props
}: Omit<Primitive.Root.Props<T, Multiple>, "items"> & {
  items: readonly SelectItem<T>[];
  placeholder?: string;
  /** Shown on hover while the list is closed. */
  tooltip?: string;
  variant?: "field" | "pill";
  size?: "default" | "lg";
  /** Lifts its list a level more, for a select on a card. */
  raised?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  const [open, setOpen] = useState(false);
  const control = (
    <Primitive.Trigger
      data-slot="select-trigger"
      data-variant={variant}
      data-size={size}
      aria-label={label}
      className={cn("select-trigger", className)}
    >
      <Primitive.Value
        data-slot="select-value"
        placeholder={placeholder}
        className="select-value"
      />
      <Primitive.Icon
        data-slot="select-icon"
        render={(props, { open }) => (
          <span data-slot="select-label" {...props}>
            <Chevron
              data-slot="select-icon"
              direction={open ? "up" : "down"}
              size="sm"
              className="select-icon"
            />
          </span>
        )}
      />
    </Primitive.Trigger>
  );
  return (
    <Primitive.Root
      items={items}
      onOpenChange={(next, details) => {
        setOpen(next);
        onOpenChange?.(next, details);
      }}
      {...props}
    >
      {tooltip && (
        <Tooltip disabled={open}>
          <TooltipTrigger render={control} />
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      )}
      {!tooltip && control}
      <Primitive.Portal>
        <Primitive.Positioner
          data-slot="select-positioner"
          sideOffset={4}
          alignItemWithTrigger={false}
          className="select-positioner"
        >
          <Primitive.Popup
            data-slot="select-popup"
            render={(props) => (
              <Popup
                data-slot="select-popup"
                {...props}
                list
                raised={raised}
                className="select-popup"
              />
            )}
          >
            <Primitive.List data-slot="select-list" className="select-list">
              {items.map((item, index) => (
                <Primitive.Item
                  data-slot="select-item"
                  // Values can repeat.
                  key={`${item.value}-${index}`}
                  value={item.value}
                  disabled={item.disabled}
                  className={cn(popupItem, "select-item")}
                >
                  <Primitive.ItemText data-slot="select-item-text">
                    {item.label}
                  </Primitive.ItemText>
                  <Primitive.ItemIndicator data-slot="select-item-indicator">
                    <Check />
                  </Primitive.ItemIndicator>
                </Primitive.Item>
              ))}
            </Primitive.List>
          </Primitive.Popup>
        </Primitive.Positioner>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
