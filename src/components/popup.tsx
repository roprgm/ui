import { cn } from "cn";
import type { ComponentProps } from "react";

/**
 * The box everything floating is drawn in: menus, selects, popovers, dialogs, and notices. It has
 * no padding of its own: a list of items takes `p-(--padding-sm)` and `rounded-lg` on it, and other
 * content sits in `p-(--padding)` sections. Render a Base UI popup as one:
 * `<Menu.Popup render={(props) => <Popup {...props} />} />`. `layer` paints it: popups are
 * elevated wherever they open, and dialogs and notices are cards.
 */
export function Popup({
  layer = "layer-elevated",
  className,
  ...props
}: ComponentProps<"div"> & { layer?: string }) {
  return (
    <div
      className={cn(
        "max-h-(--available-height) min-w-40 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-xl text-foreground surface-float outline-none transition-[opacity,scale] duration-100 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
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
 * and a flat highlight under the pointer or keys.
 */
export const popupItem =
  "flex h-[calc(var(--size-control)-2px)] shrink-0 cursor-default items-center rounded-sm px-[calc(var(--padding)-var(--padding-sm))] outline-none select-none data-disabled:text-disabled data-highlighted:bg-raised";
