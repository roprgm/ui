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
        // A trailing small IconButton sits 6px from the end, as from the top and bottom.
        "group relative flex h-(--size-row) items-center gap-2 border-line border-b px-3.5 text-foreground has-[>button:last-child]:pr-1.5 data-[muted=true]:text-faint data-[selected=false]:hover:bg-hover data-[selected=true]:bg-raised",
        className,
      )}
      {...props}
    />
  );
}
