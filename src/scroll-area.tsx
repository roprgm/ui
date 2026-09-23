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
          fade &&
            "before:pointer-events-none before:sticky before:top-0 before:z-10 before:-mb-6 before:block before:h-6 before:bg-[linear-gradient(to_bottom,rgb(0_0_0/0.2),30%,transparent)] before:opacity-0 before:transition-opacity data-overflow-y-start:before:opacity-100 after:pointer-events-none after:sticky after:bottom-0 after:z-10 after:-mt-6 after:block after:h-6 after:bg-[linear-gradient(to_top,rgb(0_0_0/0.2),30%,transparent)] after:opacity-0 after:transition-opacity data-overflow-y-end:after:opacity-100",
        )}
      >
        <Primitive.Content className="min-w-0">{children}</Primitive.Content>
      </Primitive.Viewport>
      <Primitive.Scrollbar className="group z-10 my-1 mr-px flex w-1.5 justify-center opacity-0 transition-opacity data-hovering:opacity-100 data-scrolling:opacity-100">
        <Primitive.Thumb className="w-1 rounded-full bg-neutral-500 group-hover:bg-neutral-400" />
      </Primitive.Scrollbar>
    </Primitive.Root>
  );
}
