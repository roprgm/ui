"use client";

import { ScrollArea as Primitive } from "@base-ui/react/scroll-area";
import { cn } from "cn";
import type { ComponentProps } from "react";
import styles from "./scroll-area.module.css";

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
      className={cn(styles.area, className)}
      {...props}
    >
      <Primitive.Viewport
        className={cn(styles.viewport, fade && "overflow-fade-y")}
      >
        <Primitive.Content className={styles.content}>
          {children}
        </Primitive.Content>
      </Primitive.Viewport>
      <Primitive.Scrollbar className={styles.scrollbar}>
        <Primitive.Thumb className={styles.thumb} />
      </Primitive.Scrollbar>
    </Primitive.Root>
  );
}
