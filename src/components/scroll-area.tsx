"use client";

import { ScrollArea as Primitive } from "@base-ui/react/scroll-area";
import { cn } from "cn";
import type { ComponentProps } from "react";

/**
 * Scrolls vertically with a thin bar; `fade` fades the content at an edge while more lies past it.
 * Give it a height, or a max height to grow until it scrolls.
 */
export function ScrollArea({
  fade,
  className,
  children,
  ...props
}: ComponentProps<"div"> & { fade?: boolean }) {
  return (
    <Primitive.Root
      data-slot="scroll-area"
      className={cn("relative min-h-0 overflow-hidden", className)}
      {...props}
    >
      <Primitive.Viewport
        data-slot="scroll-area-viewport"
        className={cn(
          "h-full max-h-[inherit] overscroll-contain outline-none",
          fade && "overflow-fade-y",
        )}
      >
        {/* Base UI fits it to its widest child; here it keeps the viewport's width, so a wide child,
            such as code, scrolls sideways on its own. */}
        <Primitive.Content
          data-slot="scroll-area-content"
          style={{ minWidth: 0 }}
        >
          {children}
        </Primitive.Content>
      </Primitive.Viewport>
      <Primitive.Scrollbar
        data-slot="scroll-area-scrollbar"
        className="group z-10 my-1 mr-px flex w-1.5 justify-center opacity-0 transition-opacity data-hovering:opacity-100 data-scrolling:opacity-100"
      >
        <Primitive.Thumb
          data-slot="scroll-area-thumb"
          className="w-1 rounded-full bg-disabled group-hover:bg-secondary"
        />
      </Primitive.Scrollbar>
    </Primitive.Root>
  );
}
