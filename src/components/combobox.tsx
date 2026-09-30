"use client";

import { Combobox as Primitive } from "@base-ui/react/combobox";
import { cn } from "cn";
import { type ReactNode, useMemo } from "react";
import { Check } from "./check";
import { Chevron } from "./chevron";
import styles from "./combobox.module.css";
import { Input } from "./input";

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
        className={cn(styles.group, className)}
      >
        <Primitive.Input
          aria-label={label}
          placeholder={placeholder}
          render={<Input size={size} className={styles.input} />}
        />
        {/* Its chevron lands where a Select's does, 10px from the edge. */}
        <Primitive.Trigger aria-label="Show options" className={styles.trigger}>
          <Chevron size="sm" />
        </Primitive.Trigger>
      </Primitive.InputGroup>
      <Primitive.Portal>
        <Primitive.Positioner sideOffset={4} className={styles.positioner}>
          <Primitive.Popup
            data-slot="combobox-content"
            data-raised={raised || undefined}
            className={cn("surface-float", styles.content)}
          >
            <Primitive.Empty className={styles.empty}>{empty}</Primitive.Empty>
            <Primitive.List className={styles.list}>
              {(item: ComboboxItem<T>) => (
                <Primitive.Item
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                  data-slot="combobox-item"
                  className={styles.item}
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
