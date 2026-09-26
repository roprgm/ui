"use client";

import { ContextMenu as Primitive } from "@base-ui/react/context-menu";
import type { ReactElement, ReactNode } from "react";
import { Popup } from "./popup";

/**
 * Commands opened at the pointer by a right-click or long press on `trigger`, such as a row. Its
 * items are a Menu's: `MenuItem`, `MenuSeparator`, and `Submenu`.
 */
export function ContextMenu({
  trigger,
  children,
}: {
  trigger: ReactElement;
  children: ReactNode;
}) {
  return (
    <Primitive.Root>
      <Primitive.Trigger render={trigger} />
      <Primitive.Portal>
        <Primitive.Positioner className="z-50">
          <Primitive.Popup
            render={(props) => (
              <Popup {...props} list className="flex flex-col gap-0.5" />
            )}
          >
            {children}
          </Primitive.Popup>
        </Primitive.Positioner>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
