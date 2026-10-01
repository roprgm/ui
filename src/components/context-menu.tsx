"use client";

import { ContextMenu as Primitive } from "@base-ui/react/context-menu";
import { Popup } from "./popup";

/** A menu at the pointer, opened by a right-click or long press. Its items are a Menu's. */
export const ContextMenu = Primitive.Root;

// An element it renders, such as a Button, keeps its own slot.
export function ContextMenuTrigger(props: Primitive.Trigger.Props) {
  return (
    <Primitive.Trigger
      {...(props.render ? {} : { "data-slot": "context-menu-trigger" })}
      {...props}
    />
  );
}

/** `raised` lifts it a level more, for a menu that opens over a card. */
export function ContextMenuContent({
  raised = false,
  ...props
}: Primitive.Popup.Props & { raised?: boolean }) {
  return (
    <Primitive.Portal data-slot="context-menu-portal">
      <Primitive.Positioner
        data-slot="context-menu-positioner"
        className="z-50"
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
