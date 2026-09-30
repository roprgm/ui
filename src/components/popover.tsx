"use client";

import { Popover as Primitive } from "@base-ui/react/popover";
import { cn } from "cn";
import { Popup } from "./popup";
import { sections } from "./section";
import "./tokens.css";
import "./popover.css";

/** Settings beside their trigger, such as bar controls that no longer fit. */
export const Popover = Primitive.Root;
export const PopoverTrigger = Primitive.Trigger;

/**
 * Padded as its content needs; its `Section`s stack with a line between each, as in a card.
 * `raised` lifts it a level more, for a popover that opens over a card.
 */
export function PopoverContent({
  align = "end",
  raised = false,
  ...props
}: Primitive.Popup.Props &
  Pick<Primitive.Positioner.Props, "align"> & { raised?: boolean }) {
  return (
    <Primitive.Portal>
      <Primitive.Positioner
        data-slot="popover-positioner"
        sideOffset={4}
        align={align}
        className="popover-positioner"
      >
        <Primitive.Popup
          data-slot="popover-popup"
          // A click leaves focus on the trigger, so no field starts typing.
          initialFocus={(type) => type === "keyboard"}
          render={(popup) => (
            <Popup
              data-slot="popover-content"
              {...popup}
              raised={raised}
              className={cn(sections(), popup.className)}
            />
          )}
          {...props}
        />
      </Primitive.Positioner>
    </Primitive.Portal>
  );
}
