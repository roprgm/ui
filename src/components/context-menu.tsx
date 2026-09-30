"use client";

import { ContextMenu as Primitive } from "@base-ui/react/context-menu";
import { Popup } from "./popup";
import "./tokens.css";
import "./context-menu.css";

/** A menu at the pointer, opened by a right-click or long press. Its items are a Menu's. */
export const ContextMenu = Primitive.Root;
export const ContextMenuTrigger = Primitive.Trigger;

/** `raised` lifts it a level more, for a menu that opens over a card. */
export function ContextMenuContent({
  raised = false,
  ...props
}: Primitive.Popup.Props & { raised?: boolean }) {
  return (
    <Primitive.Portal>
      <Primitive.Positioner
        data-slot="context-menu-positioner"
        className="context-menu-positioner"
      >
        <Primitive.Popup
          data-slot="context-menu-content"
          render={(popup) => <Popup {...popup} list raised={raised} />}
          {...props}
        />
      </Primitive.Positioner>
    </Primitive.Portal>
  );
}
