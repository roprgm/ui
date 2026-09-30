"use client";

import { Menu as Primitive } from "@base-ui/react/menu";
import { cn } from "cn";
import { type ComponentProps, createContext, useContext } from "react";
import { Chevron } from "./chevron";
import { Kbd } from "./kbd";
import { popupItem, popupList } from "./popup";

/** Commands, such as a row's actions. For settings, use a Popover. */
export const Menu = Primitive.Root;
export const MenuTrigger = Primitive.Trigger;

// A submenu opens as raised as the menu it opens from.
const Raised = createContext(false);

/** `raised` lifts it a level more, for a menu that opens over a card. */
export function MenuContent({
  align = "end",
  alignOffset,
  raised = false,
  className,
  ...props
}: Primitive.Popup.Props &
  Pick<Primitive.Positioner.Props, "align" | "alignOffset"> & {
    raised?: boolean;
  }) {
  return (
    <Primitive.Portal>
      <Primitive.Positioner
        sideOffset={4}
        align={align}
        alignOffset={alignOffset}
        className="z-50"
      >
        <Raised value={raised}>
          <Primitive.Popup
            data-slot="menu-content"
            data-raised={raised || undefined}
            className={cn(popupList, className)}
            {...props}
          />
        </Raised>
      </Primitive.Positioner>
    </Primitive.Portal>
  );
}

/** A command; `shortcut`, written as `Mod Z`, shows at the end. */
export function MenuItem({
  shortcut,
  className,
  children,
  ...props
}: Primitive.Item.Props & { shortcut?: string }) {
  return (
    <Primitive.Item
      data-slot="menu-item"
      className={cn(popupItem, "gap-2", className)}
      {...props}
    >
      {children}
      {shortcut && <Kbd className="ml-auto pl-4">{shortcut}</Kbd>}
    </Primitive.Item>
  );
}

export function MenuSeparator() {
  return (
    <Primitive.Separator
      data-slot="menu-separator"
      className="mx-1.5 my-0.5 h-px separator"
    />
  );
}

export const Submenu = Primitive.SubmenuRoot;

export function SubmenuTrigger({
  className,
  children,
  ...props
}: Primitive.SubmenuTrigger.Props) {
  return (
    <Primitive.SubmenuTrigger
      data-slot="submenu-trigger"
      className={cn(
        popupItem,
        "justify-between gap-4 data-popup-open:bg-raised",
        className,
      )}
      {...props}
    >
      {children}
      <Chevron direction="right" size="sm" className="text-muted" />
    </Primitive.SubmenuTrigger>
  );
}

/** Up by the list's padding, so its first item lines up with the trigger. */
export function SubmenuContent(props: ComponentProps<typeof MenuContent>) {
  const raised = useContext(Raised);
  return (
    <MenuContent align="start" alignOffset={-4} raised={raised} {...props} />
  );
}
