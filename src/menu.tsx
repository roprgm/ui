"use client";

import { Menu as Primitive } from "@base-ui/react/menu";
import { cn } from "cn";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import { Chevron } from "./chevron";
import { Kbd } from "./kbd";
import { Popup } from "./popup";

/** Commands opened from `trigger`, such as an IconButton. For settings, use a Popover. */
export function Menu({
  trigger,
  align = "end",
  children,
}: {
  trigger: ReactElement;
  align?: "start" | "center" | "end";
  children: ReactNode;
}) {
  return (
    <Primitive.Root>
      <Primitive.Trigger render={trigger} />
      <Primitive.Portal>
        <Primitive.Positioner sideOffset={4} align={align} className="z-50">
          <Primitive.Popup
            render={(props) => (
              <Popup
                {...props}
                className="flex flex-col gap-0.5 rounded-lg p-(--padding-sm)"
              />
            )}
          >
            {children}
          </Primitive.Popup>
        </Primitive.Positioner>
      </Primitive.Portal>
    </Primitive.Root>
  );
}

/** A command; `shortcut`, written as `Mod Z`, shows at the end. */
export function MenuItem({
  shortcut,
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.Item> & { shortcut?: string }) {
  return (
    <Primitive.Item className={cn("menu-item gap-2", className)} {...props}>
      {children}
      {shortcut && <Kbd className="ml-auto pl-4">{shortcut}</Kbd>}
    </Primitive.Item>
  );
}

export function MenuSeparator() {
  return (
    <Primitive.Separator className="mx-1.5 my-0.5 h-px bg-line shadow-divider" />
  );
}

/** An item that opens a nested list of commands beside the menu. */
export function Submenu({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <Primitive.SubmenuRoot>
      <Primitive.SubmenuTrigger className="menu-item justify-between gap-4 data-popup-open:bg-raised">
        {label}
        <Chevron direction="right" size="sm" className="text-muted" />
      </Primitive.SubmenuTrigger>
      <Primitive.Portal>
        {/* Up by the list's padding, `--padding-sm`, so the first item lines up with its trigger. */}
        <Primitive.Positioner sideOffset={4} alignOffset={-5} className="z-50">
          <Primitive.Popup
            render={(props) => (
              <Popup
                {...props}
                className="flex flex-col gap-0.5 rounded-lg p-(--padding-sm)"
              />
            )}
          >
            {children}
          </Primitive.Popup>
        </Primitive.Positioner>
      </Primitive.Portal>
    </Primitive.SubmenuRoot>
  );
}
