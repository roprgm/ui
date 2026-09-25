"use client";

import { cn } from "cn";

/** A native range standing upright: up increases. `stops` paint the track bottom to top. */
export function VerticalSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  defaultValue,
  stops,
  color,
  className,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  /** Restored by double-clicking. */
  defaultValue?: number;
  stops?: readonly string[];
  /** The thumb's color; the primary color when omitted. */
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-44 w-6 justify-center pointer-coarse:w-11",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-y-2 w-1 rounded-full surface-sunken"
        style={
          stops && { background: `linear-gradient(to top, ${stops.join()})` }
        }
      />
      <input
        type="range"
        aria-label={label}
        aria-orientation="vertical"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(event.currentTarget.valueAsNumber)}
        onDoubleClick={() =>
          defaultValue !== undefined && onChange(defaultValue)
        }
        className={cn(
          "relative h-full w-full cursor-ns-resize touch-none range-thumb [direction:rtl] [writing-mode:vertical-lr]",
          color && "thumb:bg-current",
        )}
        style={{ color }}
      />
    </div>
  );
}
