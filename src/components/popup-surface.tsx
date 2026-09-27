"use client";

import {
  type ComponentType,
  createContext,
  type ReactNode,
  useContext,
  useState,
} from "react";

type OpenChange<Details> = (open: boolean, details: Details) => void;
type Details = { trigger?: Element | undefined; event?: Event | undefined };

const Container = createContext<HTMLElement | undefined>(undefined);

/** How many cards an element sits in. */
function depthOf(element: Element) {
  let depth = 0;
  for (let at = element.parentElement; at; at = at.parentElement) {
    if (at.matches(".surface-card, .surface-float")) depth++;
  }
  return depth;
}

/** A portal as deep in cards as `depth`, in boxes that take no room and draw nothing. */
function containerAt(depth: number) {
  let at = document.body;
  for (let step = 0; step < depth; step++) {
    let next = at.querySelector<HTMLElement>(":scope > [data-popup-depth]");
    if (!next) {
      next = document.createElement("div");
      next.className = "surface-card contents";
      next.dataset.popupDepth = "";
      at.append(next);
    }
    at = next;
  }
  return at;
}

/**
 * A popup's portal sits outside the cards around its trigger, so it would rise from the
 * page. This opens it as deep as its trigger, to rise from where the trigger is; `beside` keeps a
 * submenu level with the menu it opens from.
 */
export function useTriggerSurface<D extends Details>(
  onOpenChange: OpenChange<D> | undefined,
  { beside = false } = {},
) {
  const [container, setContainer] = useState<HTMLElement>();
  const handle: OpenChange<D> = (open, details) => {
    const from = details.trigger ?? details.event?.target;
    if (open && from instanceof Element) {
      setContainer(containerAt(Math.max(0, depthOf(from) - Number(beside))));
    }
    onOpenChange?.(open, details);
  };
  return { container, onOpenChange: handle };
}

/** An overlay's root that hands its trigger's depth to its content, for `usePopupContainer`. */
export function withTriggerSurface<Props extends { children?: ReactNode }>(
  Root: ComponentType<Props>,
  options?: { beside?: boolean },
) {
  return function SurfaceRoot(props: Props) {
    const { onOpenChange } = props as { onOpenChange?: OpenChange<Details> };
    const surface = useTriggerSurface(onOpenChange, options);
    return (
      <Root {...props} {...{ onOpenChange: surface.onOpenChange }}>
        <Container value={surface.container}>{props.children}</Container>
      </Root>
    );
  };
}

export const usePopupContainer = () => useContext(Container);
