"use client";

import { cn } from "cn";
import {
  type ComponentProps,
  type CSSProperties,
  Fragment,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Chevron } from "./chevron";
import { ListItem } from "./list-item";
import styles from "./tree-list.module.css";

export type TreeDrop = {
  id: string;
  target: string;
  position: "before" | "after" | "inside";
};
type TreeNode<T> = { id: string; children?: readonly T[] };
type Row<T> = { item: T; depth: number; parent?: string; expanded: boolean };
type Gesture = {
  id: string;
  pointerId: number;
  x: number;
  y: number;
  started: boolean;
  timer?: number;
  drop: TreeDrop | null;
};

function flatten<T extends TreeNode<T>>(
  items: readonly T[],
  collapsed: Set<string>,
  depth = 0,
  parent?: string,
): Row<T>[] {
  return items.flatMap((item) => {
    const expanded = Boolean(item.children?.length) && !collapsed.has(item.id);
    const row = { item, depth, parent, expanded };
    if (!expanded) return [row];
    return [
      row,
      ...flatten(item.children ?? [], collapsed, depth + 1, item.id),
    ];
  });
}

function contains<T extends TreeNode<T>>(item: T, id: string): boolean {
  return (
    item.id === id ||
    Boolean(item.children?.some((child) => contains(child, id)))
  );
}

/** Positions to try for a pointer at `fraction` of a row's height, best first. */
function positions(fraction: number): TreeDrop["position"][] {
  if (fraction < 0.25) return ["before"];
  if (fraction > 0.75) return ["after"];
  return ["inside", fraction < 0.5 ? "before" : "after"];
}

function preventScroll(event: TouchEvent) {
  event.preventDefault();
}

/** Rows that nest and drag to reorder; `canDrop` adds rules and `onDrop` commits a move. */
export function TreeList<T extends TreeNode<T>>({
  items,
  label,
  children,
  selected,
  onSelect,
  canDrag = () => true,
  canDrop = () => true,
  onDrop,
  className,
  ...props
}: Omit<ComponentProps<"div">, "children" | "onSelect" | "onDrop"> & {
  items: readonly T[];
  /** Names the row for the drag preview. */
  label: (item: T) => string;
  children: (item: T) => ReactNode;
  selected?: string;
  onSelect?: (id: string) => void;
  canDrag?: (item: T) => boolean;
  canDrop?: (drop: TreeDrop) => boolean;
  onDrop?: (drop: TreeDrop) => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const ghost = useRef<HTMLDivElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const suppressClick = useRef(false);
  const [collapsed, setCollapsed] = useState(new Set<string>());
  const [focused, setFocused] = useState<string>();
  const [dragging, setDragging] = useState<{
    id: string;
    x: number;
    y: number;
  }>();
  const [drop, setDrop] = useState<TreeDrop | null>(null);
  const rows = flatten(items, collapsed);
  const tabbable =
    rows.find((row) => row.item.id === focused) ??
    rows.find((row) => row.item.id === selected) ??
    rows[0];

  useEffect(
    () => () => window.removeEventListener("touchmove", preventScroll),
    [],
  );

  function toggle(id: string, open: boolean) {
    setCollapsed((current) => {
      const next = new Set(current);
      if (open) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function allowed(next: TreeDrop) {
    const source = rows.find((row) => row.item.id === next.id);
    const target = rows.find((row) => row.item.id === next.target);
    if (!source || !target || contains(source.item, next.target)) return false;
    // A line under an open group would read as moving above its children.
    if (next.position === "after" && target.expanded) return false;
    return canDrop(next);
  }

  function locate(id: string, x: number, y: number): TreeDrop | null {
    const element = document
      .elementFromPoint(x, y)
      ?.closest<HTMLElement>("[data-tree-id]");
    const target = element?.dataset.treeId;
    if (!element || !target || !root.current?.contains(element)) return null;
    const rect = element.getBoundingClientRect();
    for (const position of positions((y - rect.top) / rect.height)) {
      const next = { id, target, position };
      if (allowed(next)) return next;
    }
    return null;
  }

  function start(current: Gesture) {
    current.started = true;
    root.current?.setPointerCapture(current.pointerId);
    window.addEventListener("touchmove", preventScroll, { passive: false });
    setDragging({ id: current.id, x: current.x, y: current.y });
  }

  function stop() {
    window.clearTimeout(gesture.current?.timer);
    window.removeEventListener("touchmove", preventScroll);
    gesture.current = null;
    setDragging(undefined);
    setDrop(null);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    suppressClick.current = false;
    const target = event.target;
    if (!(target instanceof Element)) return;
    const id = target.closest<HTMLElement>("[data-tree-id]")?.dataset.treeId;
    const row = rows.find((row) => row.item.id === id);
    if (event.button !== 0 || !row || !canDrag(row.item)) return;
    if (target.closest("input, textarea, [contenteditable]")) return;
    const current: Gesture = {
      id: row.item.id,
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      started: false,
      drop: null,
    };
    gesture.current = current;
    // A touch drags after a short hold, so a swipe still scrolls.
    if (event.pointerType === "touch") {
      current.timer = window.setTimeout(() => start(current), 200);
    }
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const current = gesture.current;
    if (!current || current.pointerId !== event.pointerId) return;
    if (!current.started) {
      const distance = Math.hypot(
        event.clientX - current.x,
        event.clientY - current.y,
      );
      if (event.pointerType === "touch" && distance > 6) stop();
      if (event.pointerType === "touch" || distance < 4) return;
      start(current);
    }
    ghost.current?.style.setProperty(
      "translate",
      `${event.clientX}px ${event.clientY}px`,
    );
    const next = locate(current.id, event.clientX, event.clientY);
    current.drop = next;
    setDrop((previous) => {
      const same =
        previous?.target === next?.target &&
        previous?.position === next?.position;
      if (same) return previous;
      return next;
    });
  }

  function onPointerUp() {
    const current = gesture.current;
    if (current?.started && current.drop) {
      onDrop?.(current.drop);
      if (current.drop.position === "inside") toggle(current.drop.target, true);
    }
    suppressClick.current = Boolean(current?.started);
    stop();
  }

  function focusRow(row: Row<T> | undefined) {
    if (!row) return;
    root.current
      ?.querySelector<HTMLElement>(
        `[data-tree-id="${CSS.escape(row.item.id)}"]`,
      )
      ?.focus();
  }

  function onRowKeyDown(event: KeyboardEvent<HTMLDivElement>, id: string) {
    if (event.target !== event.currentTarget) return;
    const index = rows.findIndex((row) => row.item.id === id);
    const row = rows[index];
    const branch = Boolean(row.item.children?.length);
    const keys: Record<string, () => void> = {
      ArrowDown: () => focusRow(rows[index + 1]),
      ArrowUp: () => focusRow(rows[index - 1]),
      Home: () => focusRow(rows[0]),
      End: () => focusRow(rows.at(-1)),
      ArrowRight: () => {
        if (row.expanded) focusRow(rows[index + 1]);
        else if (branch) toggle(row.item.id, true);
      },
      ArrowLeft: () => {
        if (row.expanded) toggle(row.item.id, false);
        else focusRow(rows.find((parent) => parent.item.id === row.parent));
      },
      Enter: () => onSelect?.(row.item.id),
      " ": () => onSelect?.(row.item.id),
    };
    const action = keys[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  }

  // Closed groups still render, inert, so they can animate; `rows` holds only the open ones.
  function renderItems(list: readonly T[], depth: number): ReactNode {
    return list.map((item) => {
      const branch = Boolean(item.children?.length);
      const expanded = branch && !collapsed.has(item.id);
      const indent = {
        "--indent": `calc(14px + ${depth}rem)`,
      } as CSSProperties;
      return (
        <Fragment key={item.id}>
          <ListItem
            role="treeitem"
            aria-level={depth + 1}
            aria-selected={item.id === selected}
            aria-expanded={branch ? expanded : undefined}
            tabIndex={item.id === tabbable?.item.id ? 0 : -1}
            data-tree-id={item.id}
            data-dragging={item.id === dragging?.id || undefined}
            data-drop={drop?.target === item.id ? drop.position : undefined}
            selected={item.id === selected}
            style={indent}
            onFocus={() => setFocused(item.id)}
            onClick={(event) => {
              // Buttons and fields in the row act on their own.
              const target = event.target as Element;
              if (target.closest("button, a, input, textarea, select")) return;
              onSelect?.(item.id);
              if (branch) toggle(item.id, !expanded);
            }}
            onKeyDown={(event) => onRowKeyDown(event, item.id)}
            className={styles.row}
          >
            {branch && (
              <button
                type="button"
                tabIndex={-1}
                aria-label={`${expanded ? "Collapse" : "Expand"} ${label(item)}`}
                onClick={(event) => {
                  event.stopPropagation();
                  toggle(item.id, !expanded);
                }}
                className={styles.toggle}
              >
                <Chevron direction={expanded ? "down" : "right"} size="sm" />
              </button>
            )}
            {!branch && <span className={styles.spacer} />}
            {children(item)}
          </ListItem>
          {branch && (
            // 0fr to 1fr animates the group's height.
            <div
              inert={!expanded}
              data-expanded={expanded || undefined}
              className={styles.group}
            >
              <div className={styles.children}>
                {renderItems(item.children ?? [], depth + 1)}
              </div>
            </div>
          )}
        </Fragment>
      );
    });
  }

  const active = rows.find((row) => row.item.id === dragging?.id);
  return (
    <div
      ref={root}
      role="tree"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={stop}
      onKeyDown={(event) => {
        if (event.key === "Escape" && gesture.current) stop();
      }}
      onClickCapture={(event) => {
        if (!suppressClick.current) return;
        suppressClick.current = false;
        event.stopPropagation();
      }}
      data-slot="tree-list"
      data-dragging={dragging ? true : undefined}
      className={cn(styles.tree, className)}
      {...props}
    >
      {renderItems(items, 0)}
      {dragging && active && (
        <div
          ref={ghost}
          tabIndex={-1}
          style={{ translate: `${dragging.x}px ${dragging.y}px` }}
          className={styles.ghost}
        >
          {label(active.item)}
        </div>
      )}
    </div>
  );
}
