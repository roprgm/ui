import { cn } from "cn";
import type { ComponentProps } from "react";

/** A row in a panel collection, such as a layer, with hover, selected, and muted states. Its line
    is an inset shadow, as a card's are, so it takes no room from the row. */
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
        "group relative flex h-row items-center gap-2 px-3.5 text-foreground shadow-[inset_0_-1px_0_var(--color-line)] data-[muted=true]:text-faint data-[selected=false]:hover:bg-hover data-[selected=true]:bg-raised",
        className,
      )}
      {...props}
    />
  );
}

/** Ghost icon buttons at the row's end, reaching past its padding as a card header's do, so each
    icon sits 12px from the end. */
export function ListItemAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("-mr-2 flex shrink-0 items-center gap-1", className)}
      {...props}
    />
  );
}
