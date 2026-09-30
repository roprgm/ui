"use client";

import { Popover as Primitive } from "@base-ui/react/popover";
import { cn } from "cn";
import styles from "./popover.module.css";

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
  className,
  ...props
}: Primitive.Popup.Props &
  Pick<Primitive.Positioner.Props, "align"> & { raised?: boolean }) {
  return (
    <Primitive.Portal>
      <Primitive.Positioner
        sideOffset={4}
        align={align}
        className={styles.positioner}
      >
        <Primitive.Popup
          // A click leaves focus on the trigger, so no field starts typing.
          initialFocus={(type) => type === "keyboard"}
          data-slot="popover-content"
          data-raised={raised || undefined}
          className={cn(styles.content, className)}
          {...props}
        />
      </Primitive.Positioner>
    </Primitive.Portal>
  );
}
