"use client";

import { Select as Primitive } from "@base-ui/react/select";
import { cn } from "cn";
import { type ReactNode, useState } from "react";
import { Check } from "./check";
import { Chevron } from "./chevron";
import styles from "./select.module.css";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

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
      aria-label={label}
      data-slot="select"
      data-variant={variant}
      data-size={size}
      className={cn(styles.trigger, className)}
    >
      <Primitive.Value placeholder={placeholder} className={styles.value} />
      <Primitive.Icon
        render={(props, { open }) => (
          <span {...props}>
            <Chevron
              direction={open ? "up" : "down"}
              size="sm"
              className={styles.chevron}
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
          sideOffset={4}
          alignItemWithTrigger={false}
          className={styles.positioner}
        >
          <Primitive.Popup
            data-slot="select-content"
            data-raised={raised || undefined}
            className={cn("surface-float", styles.content)}
          >
            <Primitive.List className={styles.list}>
              {items.map((item, index) => (
                <Primitive.Item
                  // Values can repeat.
                  key={`${item.value}-${index}`}
                  value={item.value}
                  disabled={item.disabled}
                  data-slot="select-item"
                  className={styles.item}
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
