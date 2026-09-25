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
  return <div className={cn("ui-popup", layer, className)} {...props} />;
}
