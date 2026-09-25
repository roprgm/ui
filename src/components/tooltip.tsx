"use client";

import { Tooltip as Primitive } from "@base-ui/react/tooltip";
import type { ReactElement, ReactNode } from "react";
import { Kbd } from "./kbd";

/** Shares hover timing, so moving between triggers shows their tips without waiting again. */
export const TooltipProvider = Primitive.Provider;

/**
 * A short hint on hover or focus, with an optional shortcut written as `Mod Z` (⌘ or Ctrl).
 * It names nothing; the trigger keeps its own label.
 */
export function Tooltip({
  content,
  shortcut,
  side = "top",
  disabled,
  children,
}: {
  content: ReactNode;
  shortcut?: string;
  side?: "top" | "right" | "bottom" | "left";
  disabled?: boolean;
  children: ReactElement;
}) {
  return (
    <Primitive.Root disabled={disabled}>
      <Primitive.Trigger render={children} />
      <Primitive.Portal>
        <Primitive.Positioner side={side} sideOffset={8} className="z-50">
          <Primitive.Popup className="ui-tooltip flex max-w-64 items-center gap-2">
            {content}
            {shortcut && <Kbd>{shortcut}</Kbd>}
            <Primitive.Arrow className="ui-tooltip-arrow" />
          </Primitive.Popup>
        </Primitive.Positioner>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
