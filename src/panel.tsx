"use client";

import { cn } from "cn";
import type { ComponentProps, PointerEvent, ReactNode } from "react";
import { ScrollArea } from "./scroll-area";

/**
 * A side panel whose sections stack in the order written, with a divider between each.
 * Passing `onWidthChange` adds a drag handle on its `edge`, the side facing the content.
 */
export function Panel({
  width,
  onWidthChange,
  min = 240,
  max = 400,
  edge = "left",
  className,
  style,
  children,
  ...props
}: ComponentProps<"aside"> & {
  width?: number;
  onWidthChange?: (width: number) => void;
  min?: number;
  max?: number;
  edge?: "left" | "right";
}) {
  const resize = (event: PointerEvent) => {
    if (event.buttons !== 1 || width === undefined) return;
    const delta = edge === "left" ? -event.movementX : event.movementX;
    onWidthChange?.(Math.min(max, Math.max(min, width + delta)));
  };

  return (
    <aside
      className={cn(
        "layer-card relative flex min-h-0 shrink-0 flex-col divide-y divide-line",
        className,
      )}
      style={{ width, ...style }}
      {...props}
    >
      {onWidthChange && (
        <div
          className={cn(
            "absolute inset-y-0 z-20 w-2 cursor-col-resize touch-none after:absolute after:inset-y-0 after:left-1 after:w-px after:transition-colors hover:after:bg-raised-hover",
            edge === "left" ? "-left-1" : "-right-1",
          )}
          onPointerDown={(event) =>
            event.currentTarget.setPointerCapture(event.pointerId)
          }
          onPointerMove={resize}
        />
      )}
      {children}
    </aside>
  );
}

/** A title row with optional actions after it. */
export function PanelHeader({
  title,
  className,
  children,
}: {
  title: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    // A small IconButton sits 6px from the top, bottom, and end, so its corner nests in a rounded panel's.
    <div
      className={cn(
        "flex h-(--size-row) shrink-0 items-center gap-1 pr-1.5 pl-3.5",
        className,
      )}
    >
      <h2 className="flex-1 truncate font-medium text-foreground">{title}</h2>
      {children}
    </div>
  );
}

/** A padded group of controls, such as sliders. */
export function PanelSection({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-3 p-3.5", className)} {...props} />
  );
}

/** The section that takes the remaining height and scrolls. */
export function PanelBody(props: ComponentProps<typeof ScrollArea>) {
  return <ScrollArea fade className="flex-1" {...props} />;
}
