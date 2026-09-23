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
        "group relative flex h-10 items-center gap-2 border-black/40 border-b px-3 text-neutral-300 data-[muted=true]:text-neutral-500 data-[selected=false]:hover:bg-white/5 data-[selected=true]:bg-neutral-700 data-[selected=true]:text-neutral-100",
        className,
      )}
      {...props}
    />
  );
}
