import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";

/**
 * A row in a panel collection, such as a layer, with hover, selected, and muted states. `actions`
 * are ghost icon buttons at its end.
 */
export function ListItem({
  selected = false,
  muted = false,
  actions,
  className,
  children,
  ...props
}: ComponentProps<"div"> & {
  selected?: boolean;
  muted?: boolean;
  actions?: ReactNode;
}) {
  return (
    <div
      data-selected={selected}
      data-muted={muted}
      className={cn(
        "group relative flex h-row items-center gap-2 border-line border-b px-3.5 text-foreground data-[muted=true]:text-faint data-[selected=false]:hover:bg-hover data-[selected=true]:bg-raised",
        className,
      )}
      {...props}
    >
      {children}
      {actions && (
        // Past the row's padding by the air around their icons, so each icon sits 12px from the end.
        <div className="-mr-2 flex shrink-0 items-center gap-1">{actions}</div>
      )}
    </div>
  );
}
