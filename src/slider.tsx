import { cva } from "class-variance-authority";
import { cn } from "cn";
import { ScrubInput } from "./scrub-input";

const root = cva("grid items-center", {
  variants: {
    variant: {
      panel: "grid-cols-[1fr_auto] gap-x-3 gap-y-1",
      toolbar: "grid-cols-[auto_4rem_auto] gap-x-2",
      compact: "grid-cols-[1fr_auto] gap-x-3",
    },
  },
});

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
  format?: (value: number) => string;
  /** CSS colors painting the bar left to right, in place of the progress fill. */
  stops?: readonly string[];
  /** Minimum width of the value in characters. */
  valueWidth?: number;
  variant?: "panel" | "toolbar" | "compact";
  className?: string;
}) {
  // The thumb's center travels from 6px to 100% - 6px, so the fill follows it there.
  const progress = (value - min) / (max - min);
  const fill = stops
    ? `linear-gradient(to right, ${stops.join()})`
    : `linear-gradient(to right, var(--color-neutral-400) calc(0.375rem + (100% - 0.75rem) * ${progress}), transparent 0)`;

  return (
    <div className={cn(root({ variant }), className)}>
      <span className="text-neutral-400">{label}</span>
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
        // In a panel the digits end with the bar; the hover chevron reaches ~8px past it.
        className={variant === "toolbar" ? "col-start-3" : "-mr-1"}
      />
      {variant !== "compact" && (
        // The margin makes room for the thumb, so the slider's box ends where the thumb does.
        <div
          className={cn(
            "relative my-1 h-1 rounded-full bg-neutral-900 shadow-sunken",
            variant === "toolbar" ? "col-start-2 row-start-1" : "col-span-2",
          )}
          style={{ backgroundImage: fill }}
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
            className="absolute inset-x-0 top-1/2 h-4 w-full -translate-y-1/2 cursor-pointer touch-pan-y appearance-none bg-transparent outline-none thumb:size-3 thumb:appearance-none thumb:rounded-full thumb:border-0 thumb:bg-neutral-200 thumb:shadow-raised thumb:transition focus-visible:thumb:ring-2 focus-visible:thumb:ring-white/25"
          />
        </div>
      )}
    </div>
  );
}
