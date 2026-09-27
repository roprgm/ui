"use client";

import { Menu as Primitive } from "@base-ui/react/menu";
import { cn } from "cn";
import type { ComponentProps } from "react";
import { Chevron } from "./chevron";
import { Kbd } from "./kbd";
import { Popup, popupItem } from "./popup";
import { usePopupContainer, withTriggerSurface } from "./popup-surface";

/** Commands, such as a row's actions. For settings, use a Popover. */
export const Menu = withTriggerSurface(Primitive.Root);
export const MenuTrigger = Primitive.Trigger;

export function MenuContent({
  align = "end",
  alignOffset,
  ...props
}: Primitive.Popup.Props &
  Pick<Primitive.Positioner.Props, "align" | "alignOffset">) {
  return (
    <Primitive.Portal container={usePopupContainer()}>
      <Primitive.Positioner
        sideOffset={4}
        align={align}
        alignOffset={alignOffset}
        className="z-50"
      >
        <Primitive.Popup
          render={(popup) => <Popup {...popup} list />}
          {...props}
        />
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
    <Primitive.Item className={cn(popupItem, "gap-2", className)} {...props}>
      {children}
      {shortcut && <Kbd className="ml-auto pl-4">{shortcut}</Kbd>}
    </Primitive.Item>
  );
}

export function MenuSeparator() {
  return <Primitive.Separator className="mx-1.5 my-0.5 h-px separator" />;
}

export const Submenu = withTriggerSurface(Primitive.SubmenuRoot, {
  beside: true,
});

export function SubmenuTrigger({
  className,
  children,
  ...props
}: Primitive.SubmenuTrigger.Props) {
  return (
    <Primitive.SubmenuTrigger
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
  return <MenuContent align="start" alignOffset={-4} {...props} />;
}
