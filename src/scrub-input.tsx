import { cn } from "cn";
import { type KeyboardEvent, type PointerEvent, useRef, useState } from "react";
import { Chevron } from "./chevron";

type Drag = { x: number; dx: number; value: number; moved: boolean };

// Chevrons shown on hover to hint that the value drags sideways; hidden while typing.
const hint =
  "pointer-events-none absolute size-[9px] text-neutral-500 opacity-0 transition-opacity group-[:hover:not(:has(input))]:opacity-100";

/**
 * A number shown as text that scrubs on horizontal drag, types on click or focus,
 * and steps with the arrow keys. `format` writes the text; whatever follows its last
 * digit reads as the unit, e.g. `(v) => `${v}px`` or `Intl.NumberFormat(…).format`.
 */
export function ScrubInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  defaultValue,
  format,
  className,
  "aria-label": label,
}: {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  /** Restored by double-clicking the value. */
  defaultValue?: number;
  format?: (value: number) => string;
  className?: string;
  "aria-label"?: string;
}) {
  const [draft, setDraft] = useState<string>();
  const drag = useRef<Drag>(undefined);
  const decimals = `${step}`.split(".")[1]?.length ?? 0;
  const text = format?.(value) ?? value.toFixed(decimals);
  const [, number = text, unit] = text.match(/^(.*\d)(.*)$/s) ?? [];

  const set = (next: number) => {
    const snapped = Math.round(next / step) * step;
    onChange(Math.min(max, Math.max(min, Number(snapped.toFixed(decimals)))));
  };

  // An untouched draft commits nothing, so a double-click reset isn't undone as the field closes.
  const commit = () => {
    const typed = Number.parseFloat(draft ?? "");
    if (draft !== value.toFixed(decimals) && !Number.isNaN(typed)) set(typed);
    setDraft(undefined);
  };

  const reset = () => {
    if (defaultValue === undefined) return;
    setDraft(undefined);
    set(defaultValue);
  };

  const start = (event: PointerEvent<HTMLElement>) => {
    if (draft !== undefined) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, dx: 0, value, moved: false };
  };

  const move = (event: PointerEvent<HTMLElement>) => {
    const state = drag.current;
    if (!state) return;
    // Under pointer lock clientX freezes, so deltas come from movementX.
    const locked = document.pointerLockElement === event.currentTarget;
    state.dx += locked ? event.movementX : event.clientX - state.x;
    state.x = event.clientX;
    if (!state.moved && Math.abs(state.dx) > 2) {
      state.moved = true;
      // Hides the cursor so the drag isn't stopped by the screen edge.
      Promise.resolve(event.currentTarget.requestPointerLock()).catch(() => {});
    }
    // Every range sweeps end to end in about 250px.
    if (state.moved) set(state.value + (state.dx * (max - min)) / 250);
  };

  const end = () => {
    const state = drag.current;
    drag.current = undefined;
    if (state?.moved) document.exitPointerLock();
    else if (state) setDraft(value.toFixed(decimals));
  };

  const key = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") event.currentTarget.blur();
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const sign = event.key === "ArrowUp" ? 1 : -1;
    const next = value + sign * step * (event.shiftKey ? 10 : 1);
    set(next);
    setDraft(Math.min(max, Math.max(min, next)).toFixed(decimals));
  };

  return (
    <span
      role="spinbutton"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuetext={text}
      tabIndex={draft === undefined ? 0 : -1}
      className={cn(
        "group relative inline-flex h-6 cursor-ew-resize items-center rounded-sm px-1 tabular-nums outline-none transition has-[input]:cursor-text has-[input]:bg-black/25",
        className,
      )}
      onFocus={(event) => {
        // Only keyboard focus opens typing; a popup focusing it on open must not.
        const self = event.target === event.currentTarget;
        if (self && event.currentTarget.matches(":focus-visible"))
          setDraft(value.toFixed(decimals));
      }}
      onDoubleClick={reset}
      onPointerDown={start}
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={() => {
        drag.current = undefined;
      }}
    >
      <Chevron direction="left" className={cn(hint, "right-full -mr-0.75")} />
      {/* While typing, the text stays hidden under the field so the box keeps its width. */}
      <span className="grid *:[grid-area:1/1]">
        <span
          className={cn("text-neutral-100", draft !== undefined && "invisible")}
        >
          {number}
          {/* A unit set flush against the digits, like % or °, gets a hair of space. */}
          <span
            className={cn(
              "text-neutral-500",
              /^\S/.test(unit ?? "") && "ml-0.5",
            )}
          >
            {unit}
          </span>
        </span>
        {draft !== undefined && (
          <input
            // biome-ignore lint/a11y/noAutofocus: the field replaces the text the user just chose to edit.
            autoFocus
            aria-label={label}
            inputMode="decimal"
            className="w-12 min-w-full bg-transparent text-right text-neutral-100 outline-none field-sizing-content selection:bg-white/20 supports-[field-sizing:content]:w-auto"
            value={draft}
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) => setDraft(event.currentTarget.value)}
            onBlur={commit}
            onKeyDown={key}
          />
        )}
      </span>
      <Chevron direction="right" className={cn(hint, "left-full -ml-0.75")} />
    </span>
  );
}
