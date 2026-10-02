"use client";

import { Combobox as Primitive } from "@base-ui/react/combobox";
import { cn } from "cn";
import { type ReactNode, useMemo } from "react";
import { Check } from "./check";
import { Chevron } from "./chevron";
import { Input } from "./input";
import { Popup, popupItem } from "./popup";

export type ComboboxItem<T extends string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

/** A choice from a list filtered as you type, for long lists such as fonts. */
export function Combobox<T extends string>({
  items,
  placeholder,
  empty = "No results",
  size,
  raised = false,
  className,
  "aria-label": label,
  ...props
}: Omit<
  Primitive.Root.Props<T, false, ComboboxItem<T>>,
  "items" | "multiple"
> & {
  items: readonly ComboboxItem<T>[];
  placeholder?: string;
  /** Shown in the list when nothing matches. */
  empty?: ReactNode;
  size?: "default" | "lg";
  /** Lifts its list a level more, for a combobox on a card. */
  raised?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  const collection = useMemo(
    () =>
      Primitive.createItems(items, {
        getValue: (item) => item.value,
        getLabel: (item) => item.label,
      }),
    [items],
  );
  return (
    <Primitive.Root items={collection} {...props}>
      <Primitive.InputGroup
        data-slot="combobox"
        className={cn("relative", className)}
      >
        <Primitive.Input
          data-slot="combobox-input"
          aria-label={label}
          placeholder={placeholder}
          render={<Input size={size} className="pr-(--spacing-control)" />}
        />
        {/* Its chevron lands where a Select's does, 10px from the edge. */}
        <Primitive.Trigger
          data-slot="combobox-trigger"
          aria-label="Show options"
          className="absolute inset-y-0 right-0 flex w-(--spacing-control) cursor-pointer items-center justify-center text-secondary"
        >
          <Chevron size="sm" />
        </Primitive.Trigger>
      </Primitive.InputGroup>
      <Primitive.Portal data-slot="combobox-portal">
        <Primitive.Positioner
          data-slot="combobox-positioner"
          sideOffset={4}
          className="z-50"
        >
          <Primitive.Popup
            data-slot="combobox-content"
            render={(props) => (
              <Popup
                {...props}
                list
                raised={raised}
                className="min-w-(--anchor-width)"
              />
            )}
          >
            <Primitive.Empty
              data-slot="combobox-empty"
              className={cn(popupItem, "text-secondary empty:hidden")}
            >
              {empty}
            </Primitive.Empty>
            <Primitive.List
              data-slot="combobox-list"
              className="flex flex-col gap-0.5"
            >
              {(item: ComboboxItem<T>) => (
                <Primitive.Item
                  data-slot="combobox-item"
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                  className={cn(
                    popupItem,
                    "justify-between gap-4 data-selected:bg-control",
                  )}
                >
                  {item.label}
                  <Primitive.ItemIndicator data-slot="combobox-item-indicator">
                    <Check />
                  </Primitive.ItemIndicator>
                </Primitive.Item>
              )}
            </Primitive.List>
          </Primitive.Popup>
        </Primitive.Positioner>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
