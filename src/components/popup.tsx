import { cn } from "cn";
import type { ComponentProps } from "react";

/**
 * The floating box of menus, selects, popovers, dialogs, and notices. `list` pads a column of
 * `popupItem` rows; other content goes in `CardSection`s.
 */
export function Popup({
  list = false,
  className,
  ...props
}: ComponentProps<"div"> & { list?: boolean }) {
  return (
    <div
      className={cn(
        "max-h-(--available-height) min-w-40 overflow-x-hidden overflow-y-auto rounded-xl text-foreground surface-float outline-none popup-motion",
        list && "flex flex-col gap-0.5 rounded-lg p-1",
        className,
      )}
      {...props}
    />
  );
}

/** A row in a popup's list, as in a menu or select. */
export const popupItem =
  "flex h-6.5 shrink-0 cursor-default items-center rounded-sm px-2.5 outline-none select-none data-disabled:text-disabled data-highlighted:bg-raised";
