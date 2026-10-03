import { cn } from "cn";
import type { ComponentProps } from "react";

/**
 * A native table, whose columns scroll sideways where they don't fit. It counts as a section of
 * the card that holds it, without padding. `className` sizes the scroller; its rows are styled by
 * their slots in rows.css, since a table repeats them.
 */
export function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <div
      data-slot="section"
      tabIndex={-1}
      className={cn("overflow-fade-x", className)}
    >
      <table data-slot="table" className="w-full tabular-nums" {...props} />
    </div>
  );
}

export function TableHeader(props: ComponentProps<"thead">) {
  return <thead data-slot="table-header" {...props} />;
}

export function TableBody(props: ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" {...props} />;
}

export function TableFooter(props: ComponentProps<"tfoot">) {
  return <tfoot data-slot="table-footer" {...props} />;
}

/** A row; one with `data-selected`, true or false, is one you pick, and lights on hover. */
export function TableRow(props: ComponentProps<"tr">) {
  return <tr data-slot="table-row" {...props} />;
}

export function TableHead(props: ComponentProps<"th">) {
  return <th data-slot="table-head" {...props} />;
}

export function TableCell(props: ComponentProps<"td">) {
  return <td data-slot="table-cell" {...props} />;
}
