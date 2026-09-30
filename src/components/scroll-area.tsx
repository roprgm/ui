"use client";

import { ScrollArea as Primitive } from "@base-ui/react/scroll-area";
import { cn } from "cn";
import type { ComponentProps } from "react";
import "./core.css";
import "./scroll-area.css";
import "./overflow.css";

/** Scrolls vertically with a thin bar; `fade` shades an edge while more lies past it. */
export function ScrollArea({
  fade,
  className,
  children,
  ...props
}: ComponentProps<"div"> & { fade?: boolean }) {
  return (
    <Primitive.Root
      data-slot="scroll-area"
      data-fade={fade || undefined}
      className={cn("scroll-area", className)}
      {...props}
    >
      <Primitive.Viewport
        data-slot="scroll-area-viewport"
        className="scroll-area-viewport"
      >
        <Primitive.Content
          data-slot="scroll-area-content"
          className="scroll-area-content"
        >
          {children}
        </Primitive.Content>
      </Primitive.Viewport>
      <Primitive.Scrollbar
        data-slot="scroll-area-scrollbar"
        className="scroll-area-scrollbar"
      >
        <Primitive.Thumb
          data-slot="scroll-area-thumb"
          className="scroll-area-thumb"
        />
      </Primitive.Scrollbar>
    </Primitive.Root>
  );
}
