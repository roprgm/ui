import { cn } from "cn";
import type { ComponentProps } from "react";
import "./core.css";
import "./list-item.css";

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
      className={cn("list-row group", className)}
      {...props}
    />
  );
}

/** Ghost icon buttons at the row's end, reaching into its padding so each icon sits 12px in. */
export function ListItemAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="list-item-action"
      className={cn("list-item-action", className)}
      {...props}
    />
  );
}
