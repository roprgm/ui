"use client";

import { cn } from "cn";
import {
  type ComponentProps,
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

// Each way a drag can go: its cursor, the touch scrolling it leaves alone, and its hints.
const axes = {
  horizontal: {
    drag: "cursor-ew-resize touch-pan-y",
    less: ["left", "right-full -mr-0.75"],
    more: ["right", "left-full -ml-0.75"],
  },
  vertical: {
    drag: "cursor-ns-resize touch-pan-x",
    less: ["down", "top-full -mt-0.75 left-1/2 -translate-x-1/2"],
    more: ["up", "bottom-full -mb-0.75 left-1/2 -translate-x-1/2"],
  },
} as const;

/** Whole `ch`, since tabular digits can differ from it by a fraction of a pixel. */
function digitsWidth(digits: string, minChars?: number) {
  if (!minChars) return undefined;
  return `${Math.max(minChars, digits.length)}ch`;
}

/**
 * A number that drags sideways, or up and down with `scrub="vertical"`, types on click, and steps
 * with the arrow keys; `scrub={false}` only types and steps. What `format` writes after the last
 * digit reads as the unit.
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
  scrub = "horizontal",
  className,
  id,
  "aria-label": label,
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  ...props
}: Omit<
  ComponentProps<"span">,
  "onChange" | "defaultValue" | "children" | `aria-${string}`
> & {
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
  /** The way a drag moves the value, up for more when vertical, or `false` for none. */
  scrub?: keyof typeof axes | false;
  /** The input's, with its label and description, as a Field gives them. */
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
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
    if (event.button !== 0) return;
    // While typing, a press beside the digits keeps the focus there.
    if (document.activeElement === input.current) {
      if (event.target !== input.current) event.preventDefault();
      return;
    }
    event.preventDefault();
    const target = event.currentTarget;
    const mouse = event.pointerType === "mouse";
    const pointer = event.pointerId;
    const vertical = scrub === "vertical";
    // Up is more, so a vertical drag reads the pointer upside down.
    const at = (event: globalThis.PointerEvent | PointerEvent<HTMLElement>) =>
      vertical ? -event.clientY : event.clientX;
    let x = at(event);
    let dx = 0;
    let moved = false;
    // Held within range, so a drag that turns back after passing either end moves the value at once.
    let reached = value;

    function move(event: globalThis.PointerEvent) {
      if (event.pointerId !== pointer || !scrub) return;
      // Under pointer lock the pointer's position freezes, so deltas come from its movement.
      const locked = document.pointerLockElement === target;
      const movement = vertical ? -event.movementY : event.movementX;
      const delta = locked ? movement : at(event) - x;
      x = at(event);
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

  const axis = scrub && axes[scrub];
  return (
    // The input is the control; dragging is a pointer shortcut over it.
    // biome-ignore lint/a11y/noStaticElementInteractions: the input inside is the accessible control.
    <span
      data-slot="scrub-input"
      className={cn(
        "group/scrub-input relative inline-flex items-center rounded-sm px-1 py-0.5 whitespace-nowrap tabular-nums transition focus-within:cursor-text focus-within:bg-field",
        axis ? axis.drag : "cursor-text",
        className,
      )}
      onDoubleClick={reset}
      onPointerDown={start}
      {...props}
    >
      {chevrons && axis && (
        <Chevron direction={axis.less[0]} className={cn(hint, axis.less[1])} />
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
          id={id}
          aria-label={label}
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          inputMode="decimal"
          className="w-12 min-w-full cursor-[inherit] bg-transparent text-right text-transparent text-shadow-none outline-none field-sizing-content selection:bg-pressed focus:text-foreground focus:[text-shadow:inherit] supports-[field-sizing:content]:w-auto"
          value={draft ?? fixed}
          onFocus={focus}
          onChange={(event) => setDraft(event.currentTarget.value)}
          onBlur={commit}
          onKeyDown={key}
        />
      </span>
      {chevrons && axis && (
        <Chevron direction={axis.more[0]} className={cn(hint, axis.more[1])} />
      )}
    </span>
  );
}
