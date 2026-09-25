"use client";

import { cva } from "class-variance-authority";
import { cn } from "cn";
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

// Where the value and the bar sit in each layout's grid. In a panel the digits end with the bar,
// and the hover chevron reaches ~8px past it.
const cells = {
  panel: { value: "-mr-1", bar: "col-span-2" },
  toolbar: { value: "col-start-3", bar: "col-start-2 row-start-1" },
  compact: { value: "-mr-1", bar: "" },
};

/** Where the thumb's center sits at a fraction of the range: half a thumb in from either end, or the bar's ends. */
function position(fraction: number) {
  if (fraction <= 0) return "0%";
  if (fraction >= 1) return "100%";
  return `calc(var(--size-thumb) / 2 + (100% - var(--size-thumb)) * ${fraction})`;
}

/** The bar's paint: its color stops, or a fill between the origin and the value, in fractions of the range. */
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

/**
 * A labeled number with a bar. "panel" stacks the bar under its row, "toolbar" keeps one short
 * row for a bar over a canvas, and "compact" drops the bar and edits by dragging the value.
 */
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
  /** Reports a gesture on the bar or the value, so a caller can group its changes into one edit. */
  onEditingChange?: (editing: boolean) => void;
  min: number;
  max: number;
  step?: number;
  /** Restored by double-clicking the value or the bar. */
  defaultValue?: number;
  /** Where the bar's fill starts; the default value when there is one, otherwise the minimum. */
  origin?: number;
  format?: (value: number) => string;
  /** CSS colors painting the bar left to right, in place of the progress fill. */
  stops?: readonly string[];
  /** Minimum width of the value's digits in characters; the unit follows them. */
  valueWidth?: number;
  variant?: "panel" | "toolbar" | "compact";
  className?: string;
}) {
  const fraction = (x: number) => (x - min) / (max - min);

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
        // Above the bar, like the label, since the bar's taller target reaches into their row.
        className={cn("z-10", cells[variant].value)}
      />
      {variant !== "compact" && (
        // The margin makes room for the thumb, so the slider's box ends where the thumb does.
        <div
          className={cn(
            "relative my-[calc(var(--size-thumb)/2-2px)] h-1 ui-slider-track",
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
            onPointerDown={() => onEditingChange?.(true)}
            onPointerUp={() => onEditingChange?.(false)}
            onPointerCancel={() => onEditingChange?.(false)}
            onFocus={() => onEditingChange?.(true)}
            onBlur={() => onEditingChange?.(false)}
            className="absolute inset-x-0 top-1/2 h-8 w-full -translate-y-1/2 cursor-pointer touch-pan-y ui-range"
          />
        </div>
      )}
    </div>
  );
}
