"use client";

import { cva } from "class-variance-authority";
import { cn } from "cn";
import type { PointerEvent } from "react";
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

/** The thumb's center at a fraction of the range. */
function position(fraction: number) {
  if (fraction <= 0) return "0%";
  if (fraction >= 1) return "100%";
  return `calc(var(--spacing-thumb) / 2 + (100% - var(--spacing-thumb)) * ${fraction})`;
}

/** The bar's color stops, or a fill from the origin to the value. */
function barBackground(
  origin: number,
  value: number,
  stops?: readonly string[],
) {
  if (stops) return `linear-gradient(to right, ${stops.join()})`;
  const start = position(Math.min(origin, value));
  const end = position(Math.max(origin, value));
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
  /** Brackets a gesture, so a caller can group its changes into one edit. */
  onEditingChange?: (editing: boolean) => void;
  min: number;
  max: number;
  step?: number;
  /** Restored by a double-click. */
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
  const fraction = (x: number) => (x - min) / (max - min);

  // A native range can lose a touch to scrolling, so touch sets the value itself.
  const changeFromTouch = (event: PointerEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const bounds = input.getBoundingClientRect();
    const style = getComputedStyle(input);
    const thumb = Number.parseFloat(style.getPropertyValue("--spacing-thumb"));
    const travel = bounds.width - thumb;
    if (travel <= 0) return;
    let progress = (event.clientX - bounds.left - thumb / 2) / travel;
    if (style.direction === "rtl") progress = 1 - progress;
    input.valueAsNumber = min + progress * (max - min);
    onChange(input.valueAsNumber);
  };

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
        // Room for the thumb, so the slider ends where it does.
        <div
          data-slot="slider-track"
          className={cn(
            "relative my-[calc(var(--spacing-thumb)/2-2px)] h-1 rounded-full surface-sunken",
            cells[variant].bar,
          )}
          style={{
            backgroundImage: barBackground(
              fraction(origin),
              fraction(value),
              stops,
            ),
          }}
        >
          <input
            type="range"
            aria-label={label}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(event) => onChange(event.currentTarget.valueAsNumber)}
            onDoubleClick={() =>
              defaultValue !== undefined && onChange(defaultValue)
            }
            onPointerDown={(event) => {
              if (event.pointerType === "touch") {
                event.preventDefault();
                event.currentTarget.focus({ preventScroll: true });
                event.currentTarget.setPointerCapture(event.pointerId);
                changeFromTouch(event);
              }
              onEditingChange?.(true);
            }}
            onPointerMove={(event) => {
              if (
                event.pointerType === "touch" &&
                event.currentTarget.hasPointerCapture(event.pointerId)
              ) {
                changeFromTouch(event);
              }
            }}
            onPointerUp={() => onEditingChange?.(false)}
            onPointerCancel={() => onEditingChange?.(false)}
            onFocus={() => onEditingChange?.(true)}
            onBlur={() => onEditingChange?.(false)}
            // A taller hit area that holds on to a drifting finger.
            className="absolute inset-x-0 top-1/2 h-8 w-full -translate-y-1/2 cursor-pointer touch-none range-thumb"
          />
        </div>
      )}
    </div>
  );
}
