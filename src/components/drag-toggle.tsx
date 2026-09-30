"use client";

import { cn } from "cn";
import {
  type ComponentProps,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const toggles =
  'input[type="checkbox"], [aria-pressed], [role="checkbox"], [role="switch"]';

type Gesture = {
  pointerId: number;
  items: HTMLElement[];
  start: number;
  /** Each item's state when the press began, and as the drag has left it. */
  initial: boolean[];
  current: boolean[];
  dragging: boolean;
};

function isOn(item: HTMLElement) {
  if (item instanceof HTMLInputElement) return item.checked;
  const state =
    item.getAttribute("aria-pressed") ?? item.getAttribute("aria-checked");
  return state === "true";
}

function distance(item: HTMLElement, x: number, y: number) {
  const rect = item.getBoundingClientRect();
  return Math.hypot(
    Math.max(rect.left - x, 0, x - rect.right),
    Math.max(rect.top - y, 0, y - rect.bottom),
  );
}

function preventScroll(event: TouchEvent) {
  event.preventDefault();
}

/**
 * Toggles checkboxes and pressed buttons by dragging across them. The one pressed flips, and so
 * does every one between it and the pointer; toggles the drag leaves go back. A drag can start on
 * a toggle's label. Only those that share its `name` join in, and each flips with a click, so its
 * own handlers run; `onDraggingChange` can group those clicks, such as into one undo.
 */
export function DragToggle({
  onDraggingChange,
  className,
  ...props
}: ComponentProps<"div"> & {
  onDraggingChange?: (dragging: boolean) => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);

  useEffect(
    () => () => window.removeEventListener("touchmove", preventScroll),
    [],
  );

  function stop() {
    window.removeEventListener("touchmove", preventScroll);
    if (gesture.current?.dragging) {
      setDragging(false);
      onDraggingChange?.(false);
    }
    gesture.current = null;
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    suppressClick.current = false;
    if (!(event.target instanceof Element) || event.button !== 0) return;
    const item =
      event.target.closest<HTMLElement>(toggles) ??
      event.target.closest("label")?.control;
    if (!item?.matches(toggles) || !root.current?.contains(item)) return;
    const name = item.getAttribute("name");
    const items = [
      ...root.current.querySelectorAll<HTMLElement>(toggles),
    ].filter(
      (other) =>
        other.getAttribute("name") === name &&
        !other.matches(':disabled, [aria-disabled="true"]'),
    );
    const start = items.indexOf(item);
    if (start < 0) return;
    const initial = items.map(isOn);
    gesture.current = {
      pointerId: event.pointerId,
      items,
      start,
      initial,
      current: [...initial],
      dragging: false,
    };
    // A drag that starts on a toggle toggles rather than scrolls.
    if (event.pointerType === "touch") {
      window.addEventListener("touchmove", preventScroll, { passive: false });
    }
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const current = gesture.current;
    if (!current || current.pointerId !== event.pointerId) return;
    if (event.buttons !== 1) return stop();
    const distances = current.items.map((item) =>
      distance(item, event.clientX, event.clientY),
    );
    const end = distances.indexOf(Math.min(...distances));
    if (!current.dragging) {
      if (end === current.start) return;
      current.dragging = true;
      root.current?.setPointerCapture(event.pointerId);
      getSelection()?.removeAllRanges();
      setDragging(true);
      onDraggingChange?.(true);
    }
    const from = Math.min(current.start, end);
    const to = Math.max(current.start, end);
    const on = !current.initial[current.start];
    current.items.forEach((item, index) => {
      const next = index >= from && index <= to ? on : current.initial[index];
      if (current.current[index] === next) return;
      current.current[index] = next;
      item.click();
    });
  }

  function onPointerUp() {
    suppressClick.current = Boolean(gesture.current?.dragging);
    stop();
  }

  return (
    <div
      ref={root}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={stop}
      onClickCapture={(event) => {
        if (!suppressClick.current) return;
        suppressClick.current = false;
        event.preventDefault();
        event.stopPropagation();
      }}
      data-slot="drag-toggle"
      className={cn(dragging && "select-none", className)}
      {...props}
    />
  );
}
