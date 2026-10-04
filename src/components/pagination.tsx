"use client";

import { cn } from "cn";
import type { ComponentProps } from "react";
import { Button } from "./button";
import { Chevron } from "./chevron";
import { IconButton } from "./icon-button";

/**
 * Every page up to seven, then always seven slots: the first, the last, and the current with its
 * neighbours, with `null` for each run of pages skipped.
 */
function slots(page: number, count: number) {
  if (count <= 7) return Array.from({ length: count }, (_, index) => index + 1);
  const start = Math.min(Math.max(page - 1, 3), count - 4);
  return [
    1,
    start === 3 ? 2 : null,
    start,
    start + 1,
    start + 2,
    start === count - 4 ? count - 1 : null,
    count,
  ];
}

/** Buttons that move through `count` pages, from 1, as in a table's footer or under a list. */
export function Pagination({
  page,
  count,
  onPageChange,
  className,
  ...props
}: ComponentProps<"nav"> & {
  page: number;
  count: number;
  onPageChange: (page: number) => void;
}) {
  // Every slot as wide as the longest page number, so paging moves none of them.
  const minWidth = `calc(${String(count).length}ch + 1.25rem)`;
  return (
    <nav
      data-slot="pagination"
      aria-label="Pagination"
      className={cn("flex items-center gap-1 tabular-nums", className)}
      {...props}
    >
      <IconButton
        label="Previous page"
        size="icon-sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <Chevron direction="left" />
      </IconButton>
      {slots(page, count).map((slot, index) =>
        slot === null ? (
          <span
            key={index === 1 ? "before" : "after"}
            data-slot="pagination-ellipsis"
            aria-hidden
            className="text-center text-secondary"
            style={{ minWidth }}
          >
            …
          </span>
        ) : (
          <Button
            key={slot}
            variant={slot === page ? "flat" : "ghost"}
            size="sm"
            style={{ minWidth }}
            aria-current={slot === page ? "page" : undefined}
            aria-label={`Page ${slot}`}
            onClick={() => onPageChange(slot)}
          >
            {slot}
          </Button>
        ),
      )}
      <IconButton
        label="Next page"
        size="icon-sm"
        disabled={page >= count}
        onClick={() => onPageChange(page + 1)}
      >
        <Chevron direction="right" />
      </IconButton>
    </nav>
  );
}
