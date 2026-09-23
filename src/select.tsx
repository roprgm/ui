"use client";

import { Select as Primitive } from "@base-ui/react/select";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import { type ReactNode, useState } from "react";
import { Chevron } from "./chevron";
import { Surface } from "./surface";
import { Tooltip } from "./tooltip";

const trigger = cva(
  "inline-flex min-w-0 cursor-pointer items-center justify-between gap-2 text-neutral-100 transition focus-ring data-disabled:pointer-events-none data-disabled:opacity-40",
  {
    variants: {
      /** "field" sits in a panel or form; "pill" sits in a bar over a canvas, beside Chips. */
      variant: {
        field:
          "h-8 rounded-md bg-neutral-700 pr-2 pl-3 shadow-raised hover:bg-neutral-600",
        pill: "h-7 rounded-full bg-white/10 pr-2 pl-3 hover:bg-white/15 data-popup-open:bg-white/15",
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
  variant = "field",
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
  className?: string;
  "aria-label"?: string;
}) {
  const [open, setOpen] = useState(false);
  const control = (
    <Primitive.Trigger
      aria-label={label}
      className={cn(trigger({ variant }), className)}
    >
      <Primitive.Value
        placeholder={placeholder}
        className="truncate data-placeholder:text-neutral-400"
      />
      <Primitive.Icon
        render={(props, { open }) => (
          <span {...props}>
            <Chevron
              direction={open ? "up" : "down"}
              size="sm"
              className="text-neutral-400"
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
              <Surface {...props} className="min-w-(--anchor-width)" />
            )}
          >
            <Primitive.List>
              {items.map((item, index) => (
                <Primitive.Item
                  // Two items may share a value, such as an "Original" ratio equal to a preset.
                  key={`${item.value}-${index}`}
                  value={item.value}
                  disabled={item.disabled}
                  className="flex cursor-default items-center justify-between gap-4 rounded-sm px-2.5 py-1.5 outline-none select-none data-disabled:text-neutral-600 data-highlighted:bg-white/8"
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
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}
