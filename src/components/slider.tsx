"use client";

import { Slider as Primitive } from "@base-ui/react/slider";
import { cn } from "cn";
import { useRef } from "react";
import { ScrubInput } from "./scrub-input";
import "./tokens.css";
import "./slider.css";

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
  side: "right" | "top",
  origin: number,
  value: number,
  stops?: readonly string[],
) {
  if (stops) return `linear-gradient(to ${side}, ${stops.join()})`;
  const start = fillEdge(Math.min(origin, value));
  const end = fillEdge(Math.max(origin, value));
  return `linear-gradient(to ${side}, transparent ${start}, var(--color-muted) ${start} ${end}, transparent ${end})`;
}

/**
 * A labeled number with a bar. `toolbar` fits a bar over a canvas and `compact` drops the bar;
 * `orientation="vertical"` stands the bar upright alone.
 */
/** The keys that move a thumb. */
const valueKeys = new Set([
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
]);

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
  color,
  valueWidth,
  variant = "panel",
  orientation = "horizontal",
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
  /** Restored by a double-click. */
  defaultValue?: number;
  /** Where the bar's fill starts: `defaultValue`, or else `min`. */
  origin?: number;
  format?: (value: number) => string;
  /** Colors painting the bar, in place of the fill. */
  stops?: readonly string[];
  /** The thumb's color. */
  color?: string;
  /** Minimum width of the digits, in characters. */
  valueWidth?: number;
  variant?: "panel" | "toolbar" | "compact";
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  const editing = useRef(false);
  const edit = (next: boolean) => {
    if (editing.current === next) return;
    editing.current = next;
    onEditingChange?.(next);
  };
  const fraction = (x: number) =>
    Math.min(1, Math.max(0, (x - min) / (max - min)));
  const vertical = orientation === "vertical";

  return (
    <Primitive.Root
      data-slot="slider"
      data-variant={variant}
      value={value}
      onValueChange={onChange}
      min={min}
      max={max}
      step={step}
      largeStep={step * 10}
      orientation={orientation}
      thumbAlignment="edge"
      className={cn("slider", className)}
    >
      {!vertical && (
        <>
          <span data-slot="slider-label" className="slider-label">
            {label}
          </span>
          <ScrubInput
            data-slot="slider-value"
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
            className="slider-value"
          />
        </>
      )}
      {(vertical || variant !== "compact") && (
        <Primitive.Control
          data-slot="slider-control"
          onPointerDown={(event) => event.button === 0 && edit(true)}
          onPointerUp={() => edit(false)}
          onPointerCancel={() => edit(false)}
          onDoubleClick={() =>
            defaultValue !== undefined && onChange(defaultValue)
          }
          className="slider-control"
        >
          <Primitive.Track
            data-slot="slider-track"
            className="slider-track"
            style={{
              backgroundImage: barBackground(
                vertical ? "top" : "right",
                fraction(origin),
                fraction(value),
                stops,
              ),
            }}
          >
            <Primitive.Thumb
              data-slot="slider-thumb"
              aria-label={label}
              getAriaValueText={format && ((_, next) => format(next))}
              onKeyDown={(event) => valueKeys.has(event.key) && edit(true)}
              onKeyUp={() => edit(false)}
              onBlur={() => edit(false)}
              className="slider-thumb"
              style={{ backgroundColor: color }}
            />
          </Primitive.Track>
        </Primitive.Control>
      )}
    </Primitive.Root>
  );
}
