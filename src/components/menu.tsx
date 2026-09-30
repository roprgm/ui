"use client";

import { Menu as Primitive } from "@base-ui/react/menu";
import { cn } from "cn";
import { type ComponentProps, createContext, useContext } from "react";
import { Chevron } from "./chevron";
import { Kbd } from "./kbd";
import { Popup, popupItem } from "./popup";
import "./core.css";
import "./menu.css";

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
  ...props
}: Primitive.Popup.Props &
  Pick<Primitive.Positioner.Props, "align" | "alignOffset"> & {
    raised?: boolean;
  }) {
  return (
    <Primitive.Portal>
      <Primitive.Positioner
        data-slot="menu-positioner"
        sideOffset={4}
        align={align}
        alignOffset={alignOffset}
        className="menu-positioner"
      >
        <Raised value={raised}>
          <Primitive.Popup
            data-slot="menu-content"
            render={(popup) => <Popup {...popup} list raised={raised} />}
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
      className={cn(popupItem, "menu-item", className)}
      {...props}
    >
      {children}
      {shortcut && (
        <Kbd data-slot="menu-shortcut" className="menu-shortcut">
          {shortcut}
        </Kbd>
      )}
    </Primitive.Item>
  );
}

export function MenuSeparator() {
  return (
    <Primitive.Separator
      data-slot="menu-separator"
      className="menu-separator"
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
      className={cn(popupItem, "submenu-trigger", className)}
      {...props}
    >
      {children}
      <Chevron
        data-slot="submenu-icon"
        direction="right"
        size="sm"
        className="submenu-icon"
      />
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
