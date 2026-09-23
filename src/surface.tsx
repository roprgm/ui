"use client";

import { cn } from "cn";
import { type ComponentProps, useRef, useState } from "react";

/**
 * The floating panel under menus, selects, and popovers. Its 12px corners less 6px of padding
 * leave 6px (`rounded-md`) for the items inside. Render a Base UI popup as one:
 * `<Menu.Popup render={(props) => <Surface {...props} />} />`. `layer` paints it, one above
 * its trigger's from `usePopupLayer`.
 */
export function Surface({
  layer = "layer-elevated",
  className,
  ...props
}: ComponentProps<"div"> & { layer?: string }) {
  return (
    <div
      className={cn(
        "max-h-(--available-height) min-w-40 origin-(--transform-origin) overflow-y-auto rounded-xl p-1.5 text-foreground shadow-float outline-none transition-[opacity,scale] duration-100 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
        layer,
        className,
      )}
      {...props}
    />
  );
}

/** The layer a popup takes, by the layer its trigger sits on. */
const above: Record<string, string> = {
  page: "layer-card",
  card: "layer-elevated",
  elevated: "layer-top",
  top: "layer-top",
};

/**
 * A popup renders in a portal, away from its trigger's layer, so it reads the trigger's
 * `--layer-name` when it opens. Pass `trigger` as the trigger's ref, call `measure` when the
 * popup opens, and give the Surface `layer`.
 */
export function usePopupLayer() {
  const element = useRef<Element>(null);
  const [layer, setLayer] = useState(above.card);
  const trigger = (node: Element | null) => {
    element.current = node;
  };
  const measure = () => {
    if (!element.current) return;
    const name = getComputedStyle(element.current)
      .getPropertyValue("--layer-name")
      .trim();
    setLayer(above[name] ?? above.card);
  };
  return { trigger, layer, measure };
}
