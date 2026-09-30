"use client";

import { ContextMenu as Primitive } from "@base-ui/react/context-menu";
import { cn } from "cn";
import styles from "./context-menu.module.css";

/** A menu at the pointer, opened by a right-click or long press. Its items are a Menu's. */
export const ContextMenu = Primitive.Root;
export const ContextMenuTrigger = Primitive.Trigger;

/** `raised` lifts it a level more, for a menu that opens over a card. */
export function ContextMenuContent({
  raised = false,
  className,
  ...props
}: Primitive.Popup.Props & { raised?: boolean }) {
  return (
    <Primitive.Portal>
      <Primitive.Positioner className={styles.positioner}>
        <Primitive.Popup
          data-slot="context-menu-content"
          data-raised={raised || undefined}
          className={cn("surface-float", styles.content, className)}
          {...props}
        />
      </Primitive.Positioner>
    </Primitive.Portal>
  );
}
