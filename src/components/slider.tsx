"use client";

import { Slider as Primitive } from "@base-ui/react/slider";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import { useRef } from "react";
import { ScrubInput } from "./scrub-input";

// Upright, the bar stands alone and the layouts' grids don't apply.
const root = cva("", {
  variants: {
    orientation: {
      horizontal: "grid items-center",
      vertical: "flex h-44 w-8 justify-center",
    },
    variant: {
      panel: "grid-cols-[1fr_auto] gap-x-3 gap-y-0.5",
      toolbar: "grid-cols-[auto_4rem_auto] gap-x-2",
      compact: "grid-cols-[1fr_auto] gap-x-2",
    },
  },
});

// Above the bar's hit area, which reaches into its row. In a panel, the digits end where the
// bar does.
const digits = cva("z-10", {
  variants: {
    variant: { panel: "-mr-1", toolbar: "col-start-3", compact: "-mr-1" },
  },
});

// As thick as the thumb, with a hit area reaching 10px past it on either side.
const bar = cva(
  "relative flex cursor-pointer touch-none select-none before:absolute",
  {
    variants: {
      orientation: {
        horizontal: "h-thumb items-center before:inset-x-0 before:-inset-y-2.5",
        vertical: "w-thumb justify-center before:-inset-x-2.5 before:inset-y-0",
      },
      variant: {
        panel: "col-span-2",
        toolbar: "col-start-2 row-start-1",
        compact: "",
      },
    },
  },
);

const track = cva("rounded-full surface-sunken", {
  variants: {
    orientation: { horizontal: "h-1 w-full", vertical: "h-full w-1" },
  },
});

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
      value={value}
      onValueChange={onChange}
      min={min}
      max={max}
      step={step}
      largeStep={step * 10}
      orientation={orientation}
      thumbAlignment="edge"
      className={cn(root({ orientation, variant }), className)}
    >
      {!vertical && (
        <>
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
            className={digits({ variant })}
          />
        </>
      )}
      {(vertical || variant !== "compact") && (
        <Primitive.Control
          onPointerDown={() => edit(true)}
          onPointerUp={() => edit(false)}
          onPointerCancel={() => edit(false)}
          onDoubleClick={() =>
            defaultValue !== undefined && onChange(defaultValue)
          }
          className={bar({ orientation, variant })}
        >
          <Primitive.Track
            data-slot="slider-track"
            className={track({ orientation })}
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
              aria-label={label}
              getAriaValueText={format && ((_, next) => format(next))}
              onKeyDown={() => edit(true)}
              onKeyUp={() => edit(false)}
              onBlur={() => edit(false)}
              className="size-thumb rounded-full surface-thumb has-focus-visible:ring-2 has-focus-visible:ring-focus"
              style={{ backgroundColor: color }}
            />
          </Primitive.Track>
        </Primitive.Control>
      )}
    </Primitive.Root>
  );
}
