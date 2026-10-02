"use client";

import { Select as Primitive } from "@base-ui/react/select";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import { type ReactNode, useState } from "react";
import { Check } from "./check";
import { Chevron } from "./chevron";
import { Popup, popupItem } from "./popup";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const trigger = cva(
  "inline-flex min-w-0 cursor-pointer items-center justify-between gap-2 text-foreground transition focus-ring dim-disabled",
  {
    variants: {
      /** `pill` goes in a bar over a canvas, beside Chips. */
      variant: {
        default:
          "rounded-md material-control hover:bg-control-hover data-popup-open:bg-control-hover",
        pill: "rounded-full bg-hover hover:bg-pressed data-popup-open:bg-pressed",
      },
      /** A Button's, 2px less on the chevron's side. */
      size: {
        default: "h-(--spacing-control) pr-2.5 pl-3",
        lg: "h-(--spacing-control-lg) pr-3 pl-3.5",
      },
    },
  },
);

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
  variant = "default",
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
  variant?: "default" | "pill";
  size?: "default" | "lg";
  /** Lifts its list a level more, for a select on a card. */
  raised?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  const [open, setOpen] = useState(false);
  const control = (
    <Primitive.Trigger
      data-slot="select"
      data-variant={variant}
      data-size={size}
      aria-label={label}
      className={cn(trigger({ variant, size }), className)}
    >
      <Primitive.Value
        data-slot="select-value"
        placeholder={placeholder}
        className="truncate data-placeholder:text-secondary"
      />
      <Primitive.Icon
        data-slot="select-icon"
        render={(props, { open }) => (
          <span {...props}>
            <Chevron
              direction={open ? "up" : "down"}
              size="sm"
              className="text-secondary"
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
      <Primitive.Portal data-slot="select-portal">
        <Primitive.Positioner
          data-slot="select-positioner"
          sideOffset={4}
          alignItemWithTrigger={false}
          className="z-50"
        >
          <Primitive.Popup
            data-slot="select-content"
            render={(props) => (
              <Popup
                {...props}
                list
                raised={raised}
                className="min-w-(--anchor-width)"
              />
            )}
          >
            <Primitive.List
              data-slot="select-list"
              className="flex flex-col gap-0.5"
            >
              {items.map((item, index) => (
                <Primitive.Item
                  data-slot="select-item"
                  // Values can repeat.
                  key={`${item.value}-${index}`}
                  value={item.value}
                  disabled={item.disabled}
                  className={cn(
                    popupItem,
                    "justify-between gap-4 data-selected:bg-control",
                  )}
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
