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

/** A choice from a list, filtered as you type into its field; for long lists, such as fonts. */
export function Combobox<T extends string>({
  items,
  placeholder,
  empty = "No results",
  size,
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
      <Primitive.InputGroup className={cn("relative", className)}>
        <Primitive.Input
          aria-label={label}
          placeholder={placeholder}
          render={<Input size={size} className="pr-7" />}
        />
        {/* Its chevron lands where a Select's does, 10px from the edge. */}
        <Primitive.Trigger
          aria-label="Show options"
          className="absolute inset-y-0 right-0 flex w-7 cursor-pointer items-center justify-center text-muted"
        >
          <Chevron size="sm" />
        </Primitive.Trigger>
      </Primitive.InputGroup>
      <Primitive.Portal>
        <Primitive.Positioner sideOffset={4} className="z-50">
          <Primitive.Popup
            render={(props) => (
              <Popup {...props} list className="min-w-(--anchor-width)" />
            )}
          >
            <Primitive.Empty
              className={cn(popupItem, "text-muted empty:hidden")}
            >
              {empty}
            </Primitive.Empty>
            <Primitive.List className="flex flex-col gap-0.5">
              {(item: ComboboxItem<T>) => (
                <Primitive.Item
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                  className={cn(
                    popupItem,
                    "justify-between gap-4 data-selected:bg-raised",
                  )}
                >
                  {item.label}
                  <Primitive.ItemIndicator>
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
