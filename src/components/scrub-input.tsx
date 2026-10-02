"use client";

import { cn } from "cn";
import {
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Chevron } from "./chevron";

const hint =
  "pointer-events-none absolute size-[9px] text-secondary opacity-0 transition-opacity group-[:hover:not(:focus-within)]/scrub-input:opacity-100";

/** Whole `ch`, since tabular digits can differ from it by a fraction of a pixel. */
function digitsWidth(digits: string, minChars?: number) {
  if (!minChars) return undefined;
  return `${Math.max(minChars, digits.length)}ch`;
}

/**
 * A number that drags sideways, types on click, and steps with the arrow keys. What `format`
 * writes after the last digit reads as the unit.
 */
export function ScrubInput({
  value,
  onChange,
  onEditingChange,
  min,
  max,
  step = 1,
  defaultValue,
  format,
  minChars,
  chevrons = false,
  className,
  "aria-label": label,
}: {
  value: number;
  onChange: (value: number) => void;
  /** Brackets a drag or typing, so a caller can group its changes into one edit. */
  onEditingChange?: (editing: boolean) => void;
  min: number;
  max: number;
  step?: number;
  /** Restored by a double-click. */
  defaultValue?: number;
  format?: (value: number) => string;
  /** Minimum width of the digits, in characters, so the row doesn't shift. */
  minChars?: number;
  /** Chevrons on hover, hinting that it drags. */
  chevrons?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  const [draft, setDraft] = useState<string>();
  const input = useRef<HTMLInputElement>(null);
  const stopDrag = useRef<() => void>(undefined);
  useEffect(() => () => stopDrag.current?.(), []);
  const decimals = `${step}`.split(".")[1]?.length ?? 0;
  const fixed = value.toFixed(decimals);
  const text = format?.(Number(fixed)) ?? fixed;
  const [, number = text, unit] = text.match(/^(.*\d)(.*)$/s) ?? [];

  const set = (next: number) => {
    const snapped = Math.round(next / step) * step;
    onChange(Math.min(max, Math.max(min, Number(snapped.toFixed(decimals)))));
  };

  // A drag's window listeners outlive the render that added them, so they read the latest props.
  const latest = useRef({ set, onEditingChange });
  useLayoutEffect(() => {
    latest.current = { set, onEditingChange };
  });

  const commit = () => {
    const typed = Number.parseFloat(draft ?? "");
    if (!Number.isNaN(typed)) set(typed);
    setDraft(undefined);
    onEditingChange?.(false);
  };

  const reset = () => {
    if (defaultValue === undefined) return;
    set(defaultValue);
    input.current?.blur();
  };

  // Follows the pointer on the window, so a drag holds once it leaves the value.
  const start = (event: PointerEvent<HTMLElement>) => {
    if (event.button !== 0 || document.activeElement === input.current) return;
    event.preventDefault();
    const target = event.currentTarget;
    const mouse = event.pointerType === "mouse";
    const pointer = event.pointerId;
    let x = event.clientX;
    let dx = 0;
    let moved = false;
    // Held within range, so a drag that turns back after passing either end moves the value at once.
    let reached = value;

    function move(event: globalThis.PointerEvent) {
      if (event.pointerId !== pointer) return;
      // Under pointer lock clientX freezes, so deltas come from movementX.
      const locked = document.pointerLockElement === target;
      const delta = locked ? event.movementX : event.clientX - x;
      x = event.clientX;
      dx += delta;
      // Every range sweeps end to end in about 250px.
      reached = Math.min(
        max,
        Math.max(min, reached + (delta * (max - min)) / 250),
      );
      if (!moved && Math.abs(dx) > 2) {
        moved = true;
        latest.current.onEditingChange?.(true);
        // Hides the cursor so the drag isn't stopped by the screen edge.
        if (mouse) Promise.resolve(target.requestPointerLock()).catch(() => {});
      }
      if (moved) latest.current.set(reached);
    }

    function end(event: globalThis.PointerEvent) {
      if (event.pointerId !== pointer) return;
      finish();
      if (!moved && event.type === "pointerup") input.current?.focus();
    }

    function finish() {
      stop();
      if (!moved) return;
      document.exitPointerLock();
      latest.current.onEditingChange?.(false);
    }

    function stop() {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      stopDrag.current = undefined;
    }

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    stopDrag.current = finish;
  };

  const key = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") event.currentTarget.blur();
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const sign = event.key === "ArrowUp" ? 1 : -1;
    set(value + sign * step * (event.shiftKey ? 10 : 1));
    setDraft(undefined);
  };

  const focus = (event: FocusEvent<HTMLInputElement>) => {
    event.currentTarget.select();
    onEditingChange?.(true);
  };

  return (
    // The input is the control; dragging is a pointer shortcut over it.
    // biome-ignore lint/a11y/noStaticElementInteractions: the input inside is the accessible control.
    <span
      data-slot="scrub-input"
      className={cn(
        "group/scrub-input relative inline-flex cursor-ew-resize touch-pan-y items-center rounded-sm px-1 py-0.5 whitespace-nowrap tabular-nums transition focus-within:cursor-text focus-within:bg-field",
        className,
      )}
      onDoubleClick={reset}
      onPointerDown={start}
    >
      {chevrons && (
        <Chevron direction="left" className={cn(hint, "right-full -mr-0.75")} />
      )}
      <span
        data-slot="scrub-input-value"
        className="grid text-right *:[grid-area:1/1]"
      >
        <span
          data-slot="scrub-input-text"
          className="text-foreground group-focus-within/scrub-input:invisible"
        >
          <span
            data-slot="scrub-input-number"
            className="inline-block"
            style={{ width: digitsWidth(number, minChars) }}
          >
            {number}
          </span>
          {/* A unit flush against the digits, such as %, gets a hair of space. */}
          <span
            data-slot="scrub-input-unit"
            className={cn("text-secondary", /^\S/.test(unit ?? "") && "ml-0.5")}
          >
            {unit}
          </span>
        </span>
        <input
          data-slot="scrub-input-control"
          ref={input}
          aria-label={label}
          inputMode="decimal"
          className="w-12 min-w-full cursor-[inherit] bg-transparent text-right text-transparent text-shadow-none outline-none field-sizing-content selection:bg-pressed focus:text-foreground focus:[text-shadow:inherit] supports-[field-sizing:content]:w-auto"
          value={draft ?? fixed}
          onFocus={focus}
          onChange={(event) => setDraft(event.currentTarget.value)}
          onBlur={commit}
          onKeyDown={key}
        />
      </span>
      {chevrons && (
        <Chevron direction="right" className={cn(hint, "left-full -ml-0.75")} />
      )}
    </span>
  );
}
