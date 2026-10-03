"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import {
  type ComponentProps,
  type CSSProperties,
  Fragment,
  type KeyboardEvent,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Chevron } from "./chevron";
import { ListItem } from "./list-item";

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

const row = cva(
  "gap-1.5 outline-none select-none [-webkit-touch-callout:none] focus-visible:bg-hover focus-visible:ring-1 focus-visible:ring-focus focus-visible:ring-inset",
  {
    variants: {
      variant: {
        // As a popup's rows: no lines, a pixel apart so two filled rows don't merge. A group's
        // name reads above what it holds.
        default:
          "mb-px h-6.5 rounded-md px-2 text-secondary shadow-none before:left-2 hover:bg-hover hover:text-foreground aria-expanded:text-foreground aria-[expanded=false]:text-foreground data-[selected=true]:text-foreground",
        // As a panel's list, such as layers: a line between rows, each level set in.
        list: "pl-(--indent) before:left-(--indent)",
      },
    },
  },
);

// Only on rows that drag: the dragged row dims, and where it would land fills or draws a line.
const dropStyles = [
  "data-[dragging=true]:opacity-40",
  "data-[drop=inside]:bg-hover data-[drop=inside]:ring-1 data-[drop=inside]:ring-accent/60 data-[drop=inside]:ring-inset",
  "before:absolute before:right-2 before:z-10 before:h-0.5 before:rounded-full before:bg-accent before:opacity-0",
  "data-[drop=after]:before:-bottom-px data-[drop=before]:before:-top-px data-[drop=after]:before:opacity-100 data-[drop=before]:before:opacity-100",
].join(" ");

const toggleButton = cva(
  "grid shrink-0 place-items-center rounded-xs focus-ring hover:text-foreground",
  {
    variants: {
      variant: {
        // Centered over the line along its children.
        default: "size-4 text-muted",
        list: "-mr-0.5 -ml-2 size-5 text-secondary",
      },
    },
  },
);

const spacer = cva("shrink-0", {
  variants: {
    variant: { default: "w-4", list: "-mr-0.5 -ml-2 w-5" },
  },
});

const groupItems = cva("", {
  variants: {
    variant: {
      // A line along the children, where they sit in from their group, and half a row under the
      // last, so the next group stands apart.
      default: "mb-3 ml-4 pl-1.5 shadow-[inset_1px_0_0_var(--color-control)]",
      list: "",
    },
  },
});

/**
 * Rows that nest, whose groups open and close; with `onDrop`, they drag to reorder, and
 * `canDrop` adds rules. `list` draws them as a panel's list, such as layers, and `render` draws
 * a row as another element, such as a link.
 */
export function Tree<T extends TreeNode<T>>({
  items,
  label,
  children,
  selected,
  onSelect,
  render,
  variant = "default",
  canDrag = () => onDrop !== undefined,
  canDrop = () => true,
  onDrop,
  className,
  ...props
}: Omit<ComponentProps<"div">, "children" | "onSelect" | "onDrop"> &
  VariantProps<typeof row> & {
    items: readonly T[];
    /** Names the row for the drag preview and its toggle. */
    label: (item: T) => string;
    children: (item: T) => ReactNode;
    selected?: string;
    onSelect?: (id: string) => void;
    /** The element a row renders as, such as a link. */
    render?: (item: T) => ReactElement<{ className?: string }> | undefined;
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

  function onRowKeyDown(event: KeyboardEvent<HTMLElement>, id: string) {
    if (event.target !== event.currentTarget) return;
    const index = rows.findIndex((row) => row.item.id === id);
    const row = rows[index];
    const branch = Boolean(row.item.children?.length);
    // As a click: selects the row, opens or closes a group, and follows a row drawn as a link.
    const select = () => event.currentTarget.click();
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
      Enter: select,
      " ": select,
    };
    const action = keys[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  }

  // Closed groups still render, hidden, so they can animate and find-in-page can open them;
  // `rows` holds only the open ones.
  function renderItems(list: readonly T[], depth: number): ReactNode {
    // A row without children keeps a toggle's room where a sibling has one, so their names line up.
    const aligned =
      variant === "list" || list.some((item) => item.children?.length);
    return list.map((item) => {
      const branch = Boolean(item.children?.length);
      const expanded = branch && !collapsed.has(item.id);
      const indent = {
        "--indent": `calc(14px + ${depth}rem)`,
      } as CSSProperties;
      return (
        <Fragment key={item.id}>
          <ListItem
            render={render?.(item)}
            role="treeitem"
            aria-level={depth + 1}
            aria-selected={item.id === selected}
            aria-expanded={branch ? expanded : undefined}
            tabIndex={item.id === tabbable?.item.id ? 0 : -1}
            data-tree-id={item.id}
            data-dragging={item.id === dragging?.id}
            data-drop={drop?.target === item.id ? drop.position : undefined}
            selected={item.id === selected}
            style={indent}
            onFocus={() => setFocused(item.id)}
            onClick={(event) => {
              // Buttons and fields in the row act on their own.
              const target = event.target as Element;
              const control = target.closest(
                "button, a, input, textarea, select",
              );
              if (control && control !== event.currentTarget) return;
              onSelect?.(item.id);
              if (branch) toggle(item.id, !expanded);
            }}
            onKeyDown={(event) => onRowKeyDown(event, item.id)}
            className={cn(row({ variant }), onDrop && dropStyles)}
          >
            {branch && (
              <button
                data-slot="tree-toggle"
                type="button"
                tabIndex={-1}
                aria-label={`${expanded ? "Collapse" : "Expand"} ${label(item)}`}
                onClick={(event) => {
                  event.stopPropagation();
                  toggle(item.id, !expanded);
                }}
                className={toggleButton({ variant })}
              >
                <Chevron direction={expanded ? "down" : "right"} size="sm" />
              </button>
            )}
            {!branch && aligned && (
              <span data-slot="tree-spacer" className={spacer({ variant })} />
            )}
            {children(item)}
          </ListItem>
          {branch && (
            <Collapsible.Root
              data-slot="tree-group"
              open={expanded}
              onOpenChange={(open) => toggle(item.id, open)}
            >
              <Collapsible.Panel
                data-slot="tree-group-panel"
                role="group"
                hiddenUntilFound
                className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
              >
                <div
                  data-slot="tree-group-items"
                  className={groupItems({ variant })}
                >
                  {renderItems(item.children ?? [], depth + 1)}
                </div>
              </Collapsible.Panel>
            </Collapsible.Root>
          )}
        </Fragment>
      );
    });
  }

  const active = rows.find((row) => row.item.id === dragging?.id);
  return (
    <div
      data-slot="tree"
      data-variant={variant}
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
      className={cn(dragging && "cursor-grabbing", className)}
      {...props}
    >
      {renderItems(items, 0)}
      {dragging && active && (
        <div
          data-slot="tree-drag-preview"
          ref={ghost}
          tabIndex={-1}
          style={{ translate: `${dragging.x}px ${dragging.y}px` }}
          className="pointer-events-none fixed top-0 left-0 z-50 mt-3 ml-3 max-w-64 overflow-fade-x rounded-md whitespace-nowrap px-2.5 py-1 text-foreground material-float"
        >
          {label(active.item)}
        </div>
      )}
    </div>
  );
}
