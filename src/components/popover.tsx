"use client";

import { Popover as Primitive } from "@base-ui/react/popover";
import { cn } from "cn";
import type { ReactElement, ReactNode } from "react";
import { Popup } from "./popup";

/**
 * Settings opened beside `trigger`, such as bar controls that no longer fit. Its content is a
 * card's parts, stacked with a line between each: a `CardSection` for a group of controls.
 * `className` sizes its box, such as a width its parts fill.
 */
export function Popover({
  trigger,
  align = "end",
  className,
  children,
}: {
  trigger: ReactElement;
  align?: "start" | "center" | "end";
  className?: string;
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
            render={(props) => (
              <Popup
                {...props}
                className={cn("flex flex-col divide-y divide-line", className)}
              />
            )}
          >
            {children}
          </Primitive.Popup>
        </Primitive.Positioner>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
