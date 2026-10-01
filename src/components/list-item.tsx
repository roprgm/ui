import { cn } from "cn";
import type { ComponentProps } from "react";

/** A row in a panel's list, such as a layer. */
export function ListItem({
  selected = false,
  muted = false,
  className,
  ...props
}: ComponentProps<"div"> & { selected?: boolean; muted?: boolean }) {
  return (
    <div
      data-slot="list-item"
      data-selected={selected}
      data-muted={muted}
      className={cn(
        "group relative flex h-10 items-center gap-2 px-3.5 text-foreground shadow-[inset_0_-1px_0_var(--color-border-subtle)] data-[muted=true]:text-secondary data-[selected=false]:hover:bg-hover data-[selected=true]:bg-selected",
        className,
      )}
      {...props}
    />
  );
}

/** Ghost icon buttons at the row's end, reaching into its padding so each icon sits 12px in. */
export function ListItemAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="list-item-action"
      className={cn("-mr-2 flex shrink-0 items-center gap-1", className)}
      {...props}
    />
  );
}
