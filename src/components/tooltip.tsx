"use client";

import { Tooltip as Primitive } from "@base-ui/react/tooltip";
import { cn } from "cn";
import { Kbd } from "./kbd";
import "./tokens.css";
import "./tooltip.css";

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
      <Primitive.Positioner
        data-slot="tooltip-positioner"
        side={side}
        sideOffset={8}
        className="tooltip-positioner"
      >
        <Primitive.Popup
          data-slot="tooltip-content"
          className={cn("tooltip-content", className)}
          {...props}
        >
          {children}
          {shortcut && <Kbd>{shortcut}</Kbd>}
          {/* A square keeps Base UI's centering right; the clip draws its outer half. */}
          <Primitive.Arrow
            data-slot="tooltip-arrow"
            className="tooltip-arrow"
          />
        </Primitive.Popup>
      </Primitive.Positioner>
    </Primitive.Portal>
  );
}
