import { cn } from "cn";
import type { ComponentProps } from "react";

/**
 * The box everything floating is drawn in: menus, selects, popovers, dialogs, and notices. It has
 * no padding of its own: a list of items takes `list`, and other content sits in card parts, such
 * as `CardSection`. Render a Base UI popup as one:
 * `<Menu.Popup render={(props) => <Popup {...props} />} />`. `layer` paints it: popups are
 * elevated wherever they open, and dialogs and notices are cards.
 */
export function Popup({
  layer = "layer-elevated",
  list = false,
  className,
  ...props
}: ComponentProps<"div"> & {
  layer?: string;
  /** Holds a list of `popupItem` rows, as a menu or select does: padded by `--padding-sm`, with
      its corners nested around the rows'. */
  list?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-h-(--available-height) min-w-40 overflow-x-hidden overflow-y-auto rounded-xl text-foreground surface-float outline-none popup-motion",
        list && "rounded-lg p-pad-sm",
        layer,
        className,
      )}
      {...props}
    />
  );
}

/**
 * A row in a popup's list, as in a menu or select: 2px shorter than a control, so a list reads
 * dense, padded so its text lands `--padding` from the popup's edge past the list's own padding,
 * and a flat highlight under the pointer or keys. The rows sit in a column: `popupRows`.
 */
export const popupItem =
  "flex h-item shrink-0 cursor-default items-center rounded-sm px-pad-item outline-none select-none data-disabled:text-disabled data-highlighted:bg-raised";

/** The column a popup's rows stack in, 2px apart: the Popup itself, or a list inside it. */
export const popupRows = "flex flex-col gap-0.5";
