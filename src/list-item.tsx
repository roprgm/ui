import { cn } from "cn";
import type { ComponentProps } from "react";

/** A row in a panel collection, such as a layer, with hover, selected, and muted states. */
export function ListItem({
  selected = false,
  muted = false,
  className,
  ...props
}: ComponentProps<"div"> & { selected?: boolean; muted?: boolean }) {
  return (
    <div
      data-selected={selected}
      data-muted={muted}
      className={cn(
        "group relative flex h-10 items-center gap-2 border-line border-b px-3 text-foreground data-[muted=true]:text-faint data-[selected=false]:hover:bg-hover data-[selected=true]:bg-raised",
        className,
      )}
      {...props}
    />
  );
}
