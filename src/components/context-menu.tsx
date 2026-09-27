"use client";

import { ContextMenu as Primitive } from "@base-ui/react/context-menu";
import { Popup } from "./popup";

/** A menu at the pointer, opened by a right-click or long press. Its items are a Menu's. */
export const ContextMenu = Primitive.Root;
export const ContextMenuTrigger = Primitive.Trigger;

export function ContextMenuContent(props: Primitive.Popup.Props) {
  return (
    <Primitive.Portal>
      <Primitive.Positioner className="z-50">
        <Primitive.Popup
          render={(popup) => <Popup {...popup} list />}
          {...props}
        />
      </Primitive.Positioner>
    </Primitive.Portal>
  );
}
