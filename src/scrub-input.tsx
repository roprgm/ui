"use client";

import { cn } from "cn";
import {
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  useRef,
  useState,
} from "react";
import { Chevron } from "./chevron";

type Drag = { x: number; dx: number; value: number; moved: boolean };

// Chevrons shown on hover to hint that the value drags sideways; hidden while typing.
const hint =
  "pointer-events-none absolute size-[9px] text-neutral-500 opacity-0 transition-opacity group-[:hover:not(:focus-within)]:opacity-100";

/**
 * A number shown as text that scrubs on horizontal drag, types on click or focus,
 * and steps with the arrow keys. `format` writes the text; whatever follows its last
 * digit reads as the unit, e.g. `(v) => `${v}px`` or `Intl.NumberFormat(…).format`.
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
  className,
  "aria-label": label,
}: {
  value: number;
  onChange: (value: number) => void;
  /** Reports a drag or typing session, so a caller can group its changes into one edit. */
  onEditingChange?: (editing: boolean) => void;
  min: number;
  max: number;
  step?: number;
  /** Restored by double-clicking the value. */
  defaultValue?: number;
  format?: (value: number) => string;
  /** Minimum width of the digits in characters, so a value whose digit count changes doesn't shift its row. */
  minChars?: number;
  className?: string;
  "aria-label"?: string;
}) {
  const [draft, setDraft] = useState<string>();
  const input = useRef<HTMLInputElement>(null);
  const drag = useRef<Drag>(undefined);
  const decimals = `${step}`.split(".")[1]?.length ?? 0;
  const fixed = value.toFixed(decimals);
  const text = format?.(Number(fixed)) ?? fixed;
  const [, number = text, unit] = text.match(/^(.*\d)(.*)$/s) ?? [];

  const set = (next: number) => {
    const snapped = Math.round(next / step) * step;
    onChange(Math.min(max, Math.max(min, Number(snapped.toFixed(decimals)))));
  };

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

  const start = (event: PointerEvent<HTMLElement>) => {
    if (document.activeElement === input.current) return;
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
      onEditingChange?.(true);
      // Hides the cursor so the drag isn't stopped by the screen edge.
      Promise.resolve(event.currentTarget.requestPointerLock()).catch(() => {});
    }
    // Every range sweeps end to end in about 250px.
    if (state.moved) set(state.value + (state.dx * (max - min)) / 250);
  };

  const end = () => {
    const state = drag.current;
    drag.current = undefined;
    if (state?.moved) {
      document.exitPointerLock();
      onEditingChange?.(false);
    } else if (state) {
      input.current?.focus();
    }
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
    // The field inside stays focusable and typeable, with the formatted text over it until then;
    // dragging is a pointer shortcut on top of it, which the keyboard gets through the arrow keys.
    // biome-ignore lint/a11y/noStaticElementInteractions: the input inside is the accessible control.
    <span
      className={cn(
        "group relative inline-flex h-6 cursor-ew-resize items-center rounded-sm px-1 tabular-nums transition focus-within:cursor-text focus-within:bg-black/25",
        className,
      )}
      onDoubleClick={reset}
      onPointerDown={start}
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={() => {
        drag.current = undefined;
      }}
    >
      <Chevron direction="left" className={cn(hint, "right-full -mr-0.75")} />
      <span className="grid text-right *:[grid-area:1/1]">
        <span className="text-neutral-100 group-focus-within:invisible">
          {/* Sized in whole characters, as tabular digits can differ from `ch` by a fraction of a pixel. */}
          <span
            className="inline-block"
            style={
              minChars
                ? { width: `${Math.max(minChars, number.length)}ch` }
                : undefined
            }
          >
            {number}
          </span>
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
        <input
          ref={input}
          aria-label={label}
          inputMode="decimal"
          className="w-12 min-w-full cursor-[inherit] bg-transparent text-right text-transparent text-shadow-none outline-none field-sizing-content selection:bg-white/20 focus:text-neutral-100 focus:[text-shadow:inherit] supports-[field-sizing:content]:w-auto"
          value={draft ?? fixed}
          onFocus={focus}
          onChange={(event) => setDraft(event.currentTarget.value)}
          onBlur={commit}
          onKeyDown={key}
        />
      </span>
      <Chevron direction="right" className={cn(hint, "left-full -ml-0.75")} />
    </span>
  );
}
