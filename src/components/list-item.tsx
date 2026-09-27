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
        "group relative flex h-row items-center gap-2 border-line border-b px-3.5 text-foreground data-[muted=true]:text-faint data-[selected=false]:hover:bg-hover data-[selected=true]:bg-raised",
        className,
      )}
      {...props}
    />
  );
}

/** Small ghost icon buttons at the row's end, 4px closer to it, as a card header's are. */
export function ListItemAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("-mr-1 flex shrink-0 items-center gap-1", className)}
      {...props}
    />
  );
}
