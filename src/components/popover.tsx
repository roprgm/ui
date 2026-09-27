"use client";

import { Popover as Primitive } from "@base-ui/react/popover";
import { cn } from "cn";
import { Popup } from "./popup";
import { sections } from "./section";

/** Settings beside their trigger, such as bar controls that no longer fit. */
export const Popover = Primitive.Root;
export const PopoverTrigger = Primitive.Trigger;

/** Padded as its content needs; its `Section`s stack with a line between each, as in a card. */
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
            <Popup {...popup} className={cn(sections(), popup.className)} />
          )}
          {...props}
        />
      </Primitive.Positioner>
    </Primitive.Portal>
  );
}
