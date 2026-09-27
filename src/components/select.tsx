"use client";

import { Select as Primitive } from "@base-ui/react/select";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import { type ReactNode, useState } from "react";
import { Check } from "./check";
import { Chevron } from "./chevron";
import { Popup, popupItem } from "./popup";
import { useTriggerSurface } from "./popup-surface";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const trigger = cva(
  "inline-flex min-w-0 cursor-pointer items-center justify-between gap-2 text-foreground transition focus-ring dim-disabled",
  {
    variants: {
      /** `pill` goes in a bar over a canvas, beside Chips. */
      variant: {
        field:
          "rounded-md surface-raised hover:bg-raised-hover data-popup-open:bg-raised-hover",
        pill: "rounded-full bg-hover hover:bg-pressed data-popup-open:bg-pressed",
      },
      /** A Button's, 2px less on the chevron's side. */
      size: {
        default: "h-7 pr-2.5 pl-3",
        lg: "h-8 pr-3 pl-3.5",
      },
    },
    defaultVariants: { size: "default" },
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
  variant = "field",
  size,
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
  className?: string;
  "aria-label"?: string;
}) {
  const [open, setOpen] = useState(false);
  const surface = useTriggerSurface(
    (next: boolean, details: Primitive.Root.ChangeEventDetails) => {
      setOpen(next);
      onOpenChange?.(next, details);
    },
  );
  const control = (
    <Primitive.Trigger
      aria-label={label}
      className={cn(trigger({ variant, size }), className)}
    >
      <Primitive.Value
        placeholder={placeholder}
        className="truncate data-placeholder:text-muted"
      />
      <Primitive.Icon
        render={(props, { open }) => (
          <span {...props}>
            <Chevron
              direction={open ? "up" : "down"}
              size="sm"
              className="text-muted"
            />
          </span>
        )}
      />
    </Primitive.Trigger>
  );
  return (
    <Primitive.Root
      items={items}
      onOpenChange={surface.onOpenChange}
      {...props}
    >
      {tooltip && (
        <Tooltip disabled={open}>
          <TooltipTrigger render={control} />
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      )}
      {!tooltip && control}
      <Primitive.Portal container={surface.container}>
        <Primitive.Positioner
          sideOffset={4}
          alignItemWithTrigger={false}
          className="z-50"
        >
          <Primitive.Popup
            render={(props) => (
              <Popup {...props} list className="min-w-(--anchor-width)" />
            )}
          >
            <Primitive.List className="flex flex-col gap-0.5">
              {items.map((item, index) => (
                <Primitive.Item
                  // Values can repeat.
                  key={`${item.value}-${index}`}
                  value={item.value}
                  disabled={item.disabled}
                  className={cn(
                    popupItem,
                    "justify-between gap-4 data-selected:bg-raised",
                  )}
                >
                  <Primitive.ItemText>{item.label}</Primitive.ItemText>
                  <Primitive.ItemIndicator>
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
