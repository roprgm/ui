"use client";

import { Popover as Primitive } from "@base-ui/react/popover";
import { cn } from "cn";
import { cardParts } from "./card";
import { Popup } from "./popup";

/** Settings beside their trigger, such as bar controls that no longer fit. */
export const Popover = Primitive.Root;
export const PopoverTrigger = Primitive.Trigger;

/** `CardSection`s with a line between each, as in a card. */
export function PopoverContent({
  align = "end",
  ...props
}: Primitive.Popup.Props & Pick<Primitive.Positioner.Props, "align">) {
  return (
    <Primitive.Portal>
      <Primitive.Positioner sideOffset={4} align={align} className="z-50">
        <Primitive.Popup
          // A click leaves focus on the trigger, so no field starts typing.
          initialFocus={(type) => type === "keyboard"}
          render={(popup) => (
            <Popup {...popup} className={cn(cardParts, popup.className)} />
          )}
          {...props}
        />
      </Primitive.Positioner>
    </Primitive.Portal>
  );
}
