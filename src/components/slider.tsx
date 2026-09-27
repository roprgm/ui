"use client";

import { cva } from "class-variance-authority";
import { cn } from "cn";
import { type PointerEvent, useEffect, useRef } from "react";
import { ScrubInput } from "./scrub-input";

const root = cva("grid items-center", {
  variants: {
    variant: {
      panel: "grid-cols-[1fr_auto] gap-x-3 gap-y-0.5",
      toolbar: "grid-cols-[auto_4rem_auto] gap-x-2",
      compact: "grid-cols-[1fr_auto] gap-x-2",
    },
  },
});

// In a panel, the digits end where the bar does.
const cells = {
  panel: { value: "-mr-1", bar: "col-span-2" },
  toolbar: { value: "col-start-3", bar: "col-start-2 row-start-1" },
  compact: { value: "-mr-1", bar: "" },
};

/** The thumb's center at a fraction of the range: its edge meets the bar's end at either end. */
function thumbCenter(fraction: number) {
  return `calc(var(--spacing-thumb) / 2 + (100% - var(--spacing-thumb)) * ${fraction})`;
}

/** Where the fill ends: under the thumb's center, or at the bar's end at either end of the range. */
function fillEdge(fraction: number) {
  if (fraction <= 0) return "0%";
  if (fraction >= 1) return "100%";
  return thumbCenter(fraction);
}

/** The bar's color stops, or a fill from the origin to the value. */
function barBackground(
  origin: number,
  value: number,
  stops?: readonly string[],
) {
  if (stops) return `linear-gradient(to right, ${stops.join()})`;
  const start = fillEdge(Math.min(origin, value));
  const end = fillEdge(Math.max(origin, value));
  return `linear-gradient(to right, transparent ${start}, var(--color-muted) ${start} ${end}, transparent ${end})`;
}

/** A labeled number with a bar. `toolbar` fits a bar over a canvas; `compact` drops the bar. */
export function Slider({
  label,
  value,
  onChange,
  onEditingChange,
  min,
  max,
  step = 1,
  defaultValue,
  origin = defaultValue ?? min,
  format,
  stops,
  valueWidth,
  variant = "panel",
  className,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  /** True while a pointer or key is down on it, so a caller can group its changes into one edit. */
  onEditingChange?: (editing: boolean) => void;
  min: number;
  max: number;
  step?: number;
  /** Restored by a double-click or double-tap. */
  defaultValue?: number;
  /** Where the bar's fill starts: `defaultValue`, or else `min`. */
  origin?: number;
  format?: (value: number) => string;
  /** Colors painting the bar, in place of the fill. */
  stops?: readonly string[];
  /** Minimum width of the digits, in characters. */
  valueWidth?: number;
  variant?: "panel" | "toolbar" | "compact";
  className?: string;
}) {
  const bar = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const editing = useRef(false);
  const lastTap = useRef<{ time: number; x: number }>(undefined);
  const stopDrag = useRef<() => void>(undefined);
  useEffect(() => () => stopDrag.current?.(), []);

  const fraction = (x: number) =>
    Math.min(1, Math.max(0, (x - min) / (max - min)));
  const decimals = `${step}`.split(".")[1]?.length ?? 0;
  const snap = (next: number) => {
    const stepped = min + Math.round((next - min) / step) * step;
    return Number(Math.min(max, Math.max(min, stepped)).toFixed(decimals));
  };

  function edit(next: boolean) {
    if (editing.current === next) return;
    editing.current = next;
    onEditingChange?.(next);
  }

  // A mouse moves the value as it presses, jumping to the pointer unless it grabs the thumb. A
  // touch waits to tell a gesture apart: a tap jumps, a sideways drag moves the value from where
  // it is, and an upward or downward one scrolls the page.
  function press(event: PointerEvent<HTMLDivElement>) {
    const tap = lastTap.current;
    lastTap.current = undefined;
    if (event.button !== 0 || !bar.current || !thumb.current) return;
    const mouse = event.pointerType === "mouse";
    if (mouse) event.preventDefault();

    if (
      defaultValue !== undefined &&
      tap &&
      event.timeStamp - tap.time < 300 &&
      Math.abs(event.clientX - tap.x) < 8
    ) {
      edit(true);
      onChange(defaultValue);
      edit(false);
      return;
    }

    const { left, width } = bar.current.getBoundingClientRect();
    const size = thumb.current.offsetWidth;
    const scale = (max - min) / (width - size);
    const valueAt = (x: number) => min + (x - left - size / 2) * scale;
    const onThumb = event.target === thumb.current;
    const pointer = event.pointerId;
    let x0 = event.clientX;
    let moved = false;
    let last = value;
    const from = mouse && !onThumb ? valueAt(x0) : value;

    function change(next: number) {
      const snapped = snap(next);
      if (snapped === last) return;
      last = snapped;
      onChange(snapped);
    }

    function begin() {
      edit(true);
      input.current?.focus({ preventScroll: true });
    }

    function move(event: globalThis.PointerEvent) {
      if (event.pointerId !== pointer) return;
      if (mouse && event.buttons === 0) return end(event);
      if (!moved && Math.abs(event.clientX - x0) >= 4) {
        moved = true;
        // A touch drags from here, so the value doesn't jump by the distance it took to tell.
        if (!mouse) {
          x0 = event.clientX;
          begin();
        }
      }
      if (mouse || moved) change(from + (event.clientX - x0) * scale);
    }

    function end(event: globalThis.PointerEvent) {
      if (event.pointerId !== pointer) return;
      stop();
      if (event.type === "pointerup" && !moved) {
        lastTap.current = { time: event.timeStamp, x: x0 };
        if (!mouse && !onThumb) {
          begin();
          change(valueAt(x0));
        }
      }
      edit(false);
    }

    function stop() {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      stopDrag.current = undefined;
    }

    if (mouse) {
      begin();
      change(from);
    }
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    stopDrag.current = stop;
  }

  return (
    <div className={cn(root({ variant }), className)}>
      <span className="relative z-10 text-muted">{label}</span>
      <ScrubInput
        aria-label={label}
        value={value}
        onChange={onChange}
        onEditingChange={onEditingChange}
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        format={format}
        minChars={valueWidth}
        // Above the bar's hit area, which reaches into their row.
        className={cn("z-10", cells[variant].value)}
      />
      {variant !== "compact" && (
        // As tall as the thumb, with a hit area reaching 10px above and below. It scrolls the page
        // on an upward or downward swipe, and hands a sideways one to `press`.
        <div
          ref={bar}
          onPointerDown={press}
          className={cn(
            "relative h-thumb cursor-pointer touch-pan-y before:absolute before:inset-x-0 before:-inset-y-2.5",
            cells[variant].bar,
          )}
        >
          <div
            data-slot="slider-track"
            className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full surface-sunken"
            style={{
              backgroundImage: barBackground(
                fraction(origin),
                fraction(value),
                stops,
              ),
            }}
          />
          {/* The keys and assistive technology use a native range; the pointer uses the bar. */}
          <input
            ref={input}
            type="range"
            aria-label={label}
            aria-valuetext={format?.(value)}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(event) => {
              edit(true);
              onChange(event.currentTarget.valueAsNumber);
            }}
            onKeyUp={() => edit(false)}
            onBlur={() => edit(false)}
            className="peer sr-only"
          />
          <span
            ref={thumb}
            className="absolute top-0 size-thumb -translate-x-1/2 rounded-full surface-thumb transition-shadow peer-focus-visible:ring-2 peer-focus-visible:ring-focus"
            style={{ left: thumbCenter(fraction(value)) }}
          />
        </div>
      )}
    </div>
  );
}
