"use client";

import { ScrollArea as Primitive } from "@base-ui/react/scroll-area";
import { cn } from "cn";
import type { ComponentProps } from "react";

/**
 * Scrolls vertically with a thin overlay bar; `fade` shades an edge while content continues past it.
 * The fade's 30% color hint eases it: dense at the edge, a third of its strength halfway, a long soft tail.
 */
export function ScrollArea({
  fade,
  className,
  children,
  ...props
}: ComponentProps<"div"> & { fade?: boolean }) {
  return (
    <Primitive.Root
      className={cn("relative min-h-0 overflow-hidden", className)}
      {...props}
    >
      <Primitive.Viewport
        className={cn(
          "h-full overscroll-contain outline-none",
          fade && "scroll-fade",
        )}
      >
        <Primitive.Content className="min-w-0">{children}</Primitive.Content>
      </Primitive.Viewport>
      <Primitive.Scrollbar className="group z-10 my-1 mr-px flex w-1.5 justify-center opacity-0 transition-opacity data-hovering:opacity-100 data-scrolling:opacity-100">
        <Primitive.Thumb className="w-1 rounded-full bg-faint group-hover:bg-muted" />
      </Primitive.Scrollbar>
    </Primitive.Root>
  );
}
