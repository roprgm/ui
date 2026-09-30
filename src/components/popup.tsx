import { cn } from "cn";
import type { ComponentProps } from "react";
import "./core.css";
import "./popup.css";

/**
 * The floating box of menus, selects, popovers, dialogs, and notices. `list` pads a column of
 * `popupItem` rows; other content goes in `Section`s. `raised` lifts it a level more, to stand
 * out where it opens over a card.
 */
export function Popup({
  list = false,
  raised = false,
  className,
  ...props
}: ComponentProps<"div"> & { list?: boolean; raised?: boolean }) {
  return (
    <div
      data-slot="popup"
      data-raised={raised || undefined}
      data-list={list || undefined}
      className={cn("popup surface-float", className)}
      {...props}
    />
  );
}

/** A row in a popup's list, as in a menu or select. */
export const popupItem = "popup-item";
