"use client";

import { Combobox as Primitive } from "@base-ui/react/combobox";
import { cn } from "cn";
import { type ReactNode, useMemo } from "react";
import { Check } from "./check";
import { Chevron } from "./chevron";
import { Input } from "./input";
import { Popup, popupItem } from "./popup";
import "./core.css";
import "./combobox.css";

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
        className={cn("combobox", className)}
      >
        <Primitive.Input
          data-slot="combobox-input"
          aria-label={label}
          placeholder={placeholder}
          render={
            <Input
              data-slot="combobox-input"
              size={size}
              className="combobox-input"
            />
          }
        />
        {/* Its chevron lands where a Select's does, 10px from the edge. */}
        <Primitive.Trigger
          data-slot="combobox-trigger"
          aria-label="Show options"
          className="combobox-trigger"
        >
          <Chevron size="sm" />
        </Primitive.Trigger>
      </Primitive.InputGroup>
      <Primitive.Portal>
        <Primitive.Positioner
          data-slot="combobox-positioner"
          sideOffset={4}
          className="combobox-positioner"
        >
          <Primitive.Popup
            data-slot="combobox-popup"
            render={(props) => (
              <Popup
                data-slot="combobox-popup"
                {...props}
                list
                raised={raised}
                className="combobox-popup"
              />
            )}
          >
            <Primitive.Empty
              data-slot="combobox-empty"
              className={cn(popupItem, "combobox-empty")}
            >
              {empty}
            </Primitive.Empty>
            <Primitive.List data-slot="combobox-list" className="combobox-list">
              {(item: ComboboxItem<T>) => (
                <Primitive.Item
                  data-slot="combobox-item"
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                  className={cn(popupItem, "combobox-item")}
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
