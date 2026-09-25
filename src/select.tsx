"use client";

import { Select as Primitive } from "@base-ui/react/select";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import { type ReactNode, useState } from "react";
import { Chevron } from "./chevron";
import { Popup, usePopupLayer } from "./popup";
import { Tooltip } from "./tooltip";

const trigger = cva(
  "inline-flex min-w-0 cursor-pointer items-center justify-between gap-2 text-foreground transition focus-ring dim-disabled",
  {
    variants: {
      /** "field" sits in a panel or form; "pill" sits in a bar over a canvas, beside Chips. */
      variant: {
        field:
          "rounded-md surface-raised hover:bg-raised-hover data-popup-open:bg-raised-hover",
        pill: "rounded-full bg-hover hover:bg-pressed data-popup-open:bg-pressed",
      },
      /** A Button's heights; `lg` goes with large buttons and a large ToggleGroup. */
      size: {
        default: "h-(--size-control) pr-2 pl-2.5",
        lg: "h-(--size-control-lg) pr-2.5 pl-3",
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
  const popup = usePopupLayer();
  const control = (
    <Primitive.Trigger
      ref={popup.trigger}
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
      onOpenChange={(next, details) => {
        setOpen(next);
        if (next) popup.measure();
        onOpenChange?.(next, details);
      }}
      {...props}
    >
      {tooltip ? (
        <Tooltip content={tooltip} disabled={open}>
          {control}
        </Tooltip>
      ) : (
        control
      )}
      <Primitive.Portal>
        <Primitive.Positioner
          sideOffset={4}
          alignItemWithTrigger={false}
          className="z-50"
        >
          <Primitive.Popup
            render={(props) => (
              <Popup
                {...props}
                layer={popup.layer}
                className="min-w-(--anchor-width) p-(--padding-sm)"
              />
            )}
          >
            <Primitive.List className="flex flex-col gap-0.5">
              {items.map((item, index) => (
                <Primitive.Item
                  // Two items may share a value, such as an "Original" ratio equal to a preset.
                  key={`${item.value}-${index}`}
                  value={item.value}
                  disabled={item.disabled}
                  className="flex cursor-default items-center justify-between gap-4 h-(--size-control) shrink-0 rounded-md px-(--padding-item) outline-none select-none data-disabled:text-disabled data-highlighted:bg-raised data-selected:bg-raised"
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

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
      aria-hidden
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}
