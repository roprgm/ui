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
          <Primitive.Popup className="flex max-w-64 origin-(--transform-origin) items-center gap-2 rounded-md surface-callout px-2 py-1 text-foreground transition-[opacity,scale] duration-100 data-ending-style:opacity-0 data-instant:transition-none data-starting-style:scale-95 data-starting-style:opacity-0">
            {content}
            {shortcut && <Kbd>{shortcut}</Kbd>}
            {/* A square keeps Base UI's centering right on every side; the clip draws the half outside. */}
            <Primitive.Arrow className="size-3 bg-tooltip data-[side=bottom]:bottom-full data-[side=bottom]:[clip-path:polygon(0_100%,50%_50%,100%_100%)] data-[side=left]:left-full data-[side=left]:[clip-path:polygon(0_0,50%_50%,0_100%)] data-[side=right]:right-full data-[side=right]:[clip-path:polygon(100%_0,50%_50%,100%_100%)] data-[side=top]:top-full data-[side=top]:[clip-path:polygon(0_0,50%_50%,100%_0)]" />
          </Primitive.Popup>
        </Primitive.Positioner>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
