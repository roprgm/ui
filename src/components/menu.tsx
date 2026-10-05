"use client";

import { Menu as Primitive } from "@base-ui/react/menu";
import { cn } from "cn";
import { type ComponentProps, createContext, useContext } from "react";
import { Check } from "./check";
import { Chevron } from "./chevron";
import { Kbd } from "./kbd";
import { Popup, popupItem } from "./popup";
import { Separator } from "./separator";

/** Commands, such as a row's actions. For settings, use a Popover. */
export const Menu = Primitive.Root;

// An element it renders, such as a Button, keeps its own slot.
export function MenuTrigger(props: Primitive.Trigger.Props) {
  return (
    <Primitive.Trigger
      {...(props.render ? {} : { "data-slot": "menu-trigger" })}
      {...props}
    />
  );
}

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
    <Primitive.Portal data-slot="menu-portal">
      <Primitive.Positioner
        data-slot="menu-positioner"
        sideOffset={4}
        align={align}
        alignOffset={alignOffset}
        className="z-50"
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
      className={cn(popupItem, "gap-2", className)}
      {...props}
    >
      {children}
      {shortcut && <Kbd className="ml-auto pl-4">{shortcut}</Kbd>}
    </Primitive.Item>
  );
}

/** A setting that turns on and off. Its check holds a column at the start, so the items' text lines up. */
export function MenuCheckboxItem({
  shortcut,
  className,
  children,
  ...props
}: Primitive.CheckboxItem.Props & { shortcut?: string }) {
  return (
    <Primitive.CheckboxItem
      data-slot="menu-checkbox-item"
      className={cn(popupItem, "gap-2", className)}
      {...props}
    >
      <Primitive.CheckboxItemIndicator
        data-slot="menu-checkbox-item-indicator"
        keepMounted
        className="data-unchecked:invisible"
        render={<Check />}
      />
      {children}
      {shortcut && <Kbd className="ml-auto pl-4">{shortcut}</Kbd>}
    </Primitive.CheckboxItem>
  );
}

/** Radio items that choose one `value`. */
export function MenuRadioGroup({
  className,
  ...props
}: Primitive.RadioGroup.Props) {
  return (
    <Primitive.RadioGroup
      data-slot="menu-radio-group"
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  );
}

/** One choice of a MenuRadioGroup, checked as a MenuCheckboxItem is. */
export function MenuRadioItem({
  className,
  children,
  ...props
}: Primitive.RadioItem.Props) {
  return (
    <Primitive.RadioItem
      data-slot="menu-radio-item"
      className={cn(popupItem, "gap-2", className)}
      {...props}
    >
      <Primitive.RadioItemIndicator
        data-slot="menu-radio-item-indicator"
        keepMounted
        className="data-unchecked:invisible"
        render={<Check />}
      />
      {children}
    </Primitive.RadioItem>
  );
}

/** Items under a MenuGroupLabel. */
export function MenuGroup({ className, ...props }: Primitive.Group.Props) {
  return (
    <Primitive.Group
      data-slot="menu-group"
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  );
}

export function MenuGroupLabel({
  className,
  ...props
}: Primitive.GroupLabel.Props) {
  return (
    <Primitive.GroupLabel
      data-slot="menu-group-label"
      className={cn(popupItem, "text-secondary", className)}
      {...props}
    />
  );
}

export function MenuSeparator() {
  return <Separator className="mx-1.5 my-0.5" />;
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
        "justify-between gap-4 data-popup-open:bg-control",
        className,
      )}
      {...props}
    >
      {children}
      <Chevron direction="right" size="sm" className="text-secondary" />
    </Primitive.SubmenuTrigger>
  );
}

/** Up by the list's padding, so its first item lines up with the trigger. */
export function SubmenuContent(props: ComponentProps<typeof MenuContent>) {
  const raised = useContext(Raised);
  return (
    <MenuContent
      data-slot="submenu-content"
      align="start"
      alignOffset={-4}
      raised={raised}
      {...props}
    />
  );
}
