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
import "./core.css";
import "./scrub-input.css";

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
  "data-slot": slot = "scrub-input",
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
  "data-slot"?: string;
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
    const from = value;
    let x = event.clientX;
    let dx = 0;
    let moved = false;

    function move(event: globalThis.PointerEvent) {
      if (event.pointerId !== pointer) return;
      // Under pointer lock clientX freezes, so deltas come from movementX.
      const locked = document.pointerLockElement === target;
      dx += locked ? event.movementX : event.clientX - x;
      x = event.clientX;
      if (!moved && Math.abs(dx) > 2) {
        moved = true;
        latest.current.onEditingChange?.(true);
        // Hides the cursor so the drag isn't stopped by the screen edge.
        if (mouse) Promise.resolve(target.requestPointerLock()).catch(() => {});
      }
      // Every range sweeps end to end in about 250px.
      if (moved) latest.current.set(from + (dx * (max - min)) / 250);
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
      data-slot={slot}
      className={cn("scrub-input", className)}
      onDoubleClick={reset}
      onPointerDown={start}
    >
      {chevrons && (
        <Chevron
          data-slot="scrub-input-hint-left"
          direction="left"
          className="scrub-input-hint scrub-input-hint-left"
        />
      )}
      <span data-slot="scrub-input-content" className="scrub-input-content">
        <span data-slot="scrub-input-value" className="scrub-input-value">
          <span
            data-slot="scrub-input-digits"
            className="scrub-input-digits"
            style={{ width: digitsWidth(number, minChars) }}
          >
            {number}
          </span>
          {/* A unit flush against the digits, such as %, gets a hair of space. */}
          <span
            data-slot="scrub-input-unit"
            data-spaced={/^\S/.test(unit ?? "") || undefined}
            className="scrub-input-unit"
          >
            {unit}
          </span>
        </span>
        <input
          data-slot="scrub-input-input"
          ref={input}
          aria-label={label}
          inputMode="decimal"
          className="scrub-input-input"
          value={draft ?? fixed}
          onFocus={focus}
          onChange={(event) => setDraft(event.currentTarget.value)}
          onBlur={commit}
          onKeyDown={key}
        />
      </span>
      {chevrons && (
        <Chevron
          data-slot="scrub-input-hint-right"
          direction="right"
          className="scrub-input-hint scrub-input-hint-right"
        />
      )}
    </span>
  );
}
