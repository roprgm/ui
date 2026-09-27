"use client";

import { Tooltip as Primitive } from "@base-ui/react/tooltip";
import { cn } from "cn";
import { Kbd } from "./kbd";

/** Shares hover timing, so moving between triggers shows their tips without waiting again. */
export const TooltipProvider = Primitive.Provider;

/** A short hint on hover or focus. It names nothing; the trigger keeps its own label. */
export const Tooltip = Primitive.Root;
export const TooltipTrigger = Primitive.Trigger;

/** `shortcut`, written as `Mod Z`, shows after the text. */
export function TooltipContent({
  side = "top",
  shortcut,
  className,
  children,
  ...props
}: Primitive.Popup.Props &
  Pick<Primitive.Positioner.Props, "side"> & { shortcut?: string }) {
  return (
    <Primitive.Portal>
      <Primitive.Positioner side={side} sideOffset={8} className="z-50">
        <Primitive.Popup
          className={cn(
            "flex max-w-64 items-center gap-2 rounded-md bg-level-1 px-2 py-1 text-foreground popup-motion data-instant:transition-none",
            className,
          )}
          {...props}
        >
          {children}
          {shortcut && <Kbd>{shortcut}</Kbd>}
          {/* A square keeps Base UI's centering right; the clip draws its outer half. */}
          <Primitive.Arrow className="size-3 bg-level-1 data-[side=bottom]:bottom-full data-[side=bottom]:[clip-path:polygon(0_100%,50%_50%,100%_100%)] data-[side=left]:left-full data-[side=left]:[clip-path:polygon(0_0,50%_50%,0_100%)] data-[side=right]:right-full data-[side=right]:[clip-path:polygon(100%_0,50%_50%,100%_100%)] data-[side=top]:top-full data-[side=top]:[clip-path:polygon(0_0,50%_50%,100%_0)]" />
        </Primitive.Popup>
      </Primitive.Positioner>
    </Primitive.Portal>
  );
}
