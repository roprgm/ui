"use client";

import { Popover as Primitive } from "@base-ui/react/popover";
import type { ReactElement, ReactNode } from "react";
import { Surface } from "./surface";

/** Settings opened beside `trigger`, such as bar controls that no longer fit. */
export function Popover({
  trigger,
  align = "end",
  children,
}: {
  trigger: ReactElement;
  align?: "start" | "center" | "end";
  children: ReactNode;
}) {
  return (
    <Primitive.Root>
      <Primitive.Trigger render={trigger} />
      <Primitive.Portal>
        <Primitive.Positioner sideOffset={4} align={align} className="z-50">
          <Primitive.Popup
            // Keyboard users land inside; a click leaves focus on the trigger, so no field starts typing.
            initialFocus={(type) => type === "keyboard"}
            render={(props) => <Surface {...props} className="p-3" />}
          >
            {children}
          </Primitive.Popup>
        </Primitive.Positioner>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
