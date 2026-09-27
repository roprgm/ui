import { cn } from "cn";
import type { ComponentProps } from "react";

/**
 * The box everything floating is drawn in: menus, selects, popovers, dialogs, and notices. It has
 * no padding of its own: a list of items takes `list`, and other content sits in `CardSection`s. Render a Base UI popup as one:
 * `<Menu.Popup render={(props) => <Popup {...props} />} />`. It floats, so it's elevated wherever
 * it opens.
 */
export function Popup({
  list = false,
  className,
  ...props
}: ComponentProps<"div"> & {
  /** Holds a column of `popupItem` rows, as a menu does: 4px around them, so its 9px corners nest
      around their 5px ones. A list inside it, as a select's, stacks its rows the same way. */
  list?: boolean;
}) {
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

/**
 * A row in a popup's list, as in a menu or select: 2px shorter than a control, so a list reads
 * dense, padded so its text lands 14px from the popup's edge past the list's 4px, and a flat
 * highlight under the pointer or keys.
 */
export const popupItem =
  "flex h-item shrink-0 cursor-default items-center rounded-sm px-2.5 outline-none select-none data-disabled:text-disabled data-highlighted:bg-raised";
