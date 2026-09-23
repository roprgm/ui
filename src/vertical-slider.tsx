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
  /** The thumb's color; neutral when omitted. */
  color?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative flex h-44 w-6 justify-center", className)}>
      <div
        className="pointer-events-none absolute inset-y-2 w-1 rounded-full bg-neutral-900 shadow-sunken"
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
        className="relative h-full w-full cursor-ns-resize touch-none appearance-none bg-transparent text-neutral-200 outline-none [direction:rtl] [writing-mode:vertical-lr] thumb:size-3.5 thumb:appearance-none thumb:rounded-full thumb:border-0 thumb:bg-current thumb:shadow-raised thumb:ring-1 thumb:ring-black/30 focus-visible:thumb:ring-2 focus-visible:thumb:ring-white/25"
        style={color ? { color } : undefined}
      />
    </div>
  );
}
