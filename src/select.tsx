import { Select as Primitive } from "@base-ui/react/select";
import { cn } from "cn";
import type { ReactNode } from "react";
import { Chevron } from "./chevron";
import { Surface } from "./surface";

export type SelectItem<T extends string> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};

/** A choice from a list; `multiple` keeps it open and lists the chosen labels. */
export function Select<T extends string, Multiple extends boolean = false>({
  items,
  placeholder,
  className,
  "aria-label": label,
  ...props
}: Omit<Primitive.Root.Props<T, Multiple>, "items"> & {
  items: readonly SelectItem<T>[];
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <Primitive.Root items={items} {...props}>
      <Primitive.Trigger
        aria-label={label}
        className={cn(
          "inline-flex h-8 min-w-0 cursor-pointer items-center justify-between gap-2 rounded-md bg-neutral-700 pr-2 pl-3 text-neutral-100 shadow-raised transition focus-ring hover:bg-neutral-600 data-disabled:pointer-events-none data-disabled:opacity-40",
          className,
        )}
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
              {items.map((item) => (
                <Primitive.Item
                  key={item.value}
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
