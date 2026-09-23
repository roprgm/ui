import { cn } from "cn";
import { ScrubInput } from "./scrub-input";

/** A labeled number with a bar under it; `compact` drops the bar and edits by dragging the field. */
export function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  defaultValue,
  format,
  compact,
  className,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  /** Restored by double-clicking the value or the bar. */
  defaultValue?: number;
  format?: (value: number) => string;
  compact?: boolean;
  className?: string;
}) {
  // The thumb's center travels from 6px to 100% - 6px, so the fill follows it there.
  const progress = (value - min) / (max - min);
  const fill = `linear-gradient(to right, var(--color-neutral-400) calc(0.375rem + (100% - 0.75rem) * ${progress}), transparent 0)`;

  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1",
        className,
      )}
    >
      <span className="text-neutral-400">{label}</span>
      <ScrubInput
        aria-label={label}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        format={format}
        // The digits end with the bar; the hover chevron reaches ~8px past it into the container's padding.
        className="-mr-1"
      />
      {!compact && (
        // The margin makes room for the thumb, so the slider's box ends where the thumb does.
        <div
          className="relative col-span-2 my-1 h-1 rounded-full bg-neutral-900 shadow-sunken"
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
            className="absolute inset-x-0 top-1/2 h-4 w-full -translate-y-1/2 cursor-pointer touch-pan-y appearance-none bg-transparent outline-none thumb:size-3 thumb:appearance-none thumb:rounded-full thumb:border-0 thumb:bg-neutral-200 thumb:shadow-raised thumb:transition focus-visible:thumb:ring-2 focus-visible:thumb:ring-white/25"
          />
        </div>
      )}
    </div>
  );
}
