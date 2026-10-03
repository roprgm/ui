"use client";

import { Progress as Primitive } from "@base-ui/react/progress";
import { cn } from "cn";
import type { ComponentProps } from "react";

/**
 * A task's progress, on a bar drawn as a Slider's, under its label and value. `value={null}` is
 * indeterminate, and the bar shimmers.
 */
export function Progress({
  value,
  label,
  format,
  className,
  ...props
}: Omit<
  ComponentProps<typeof Primitive.Root>,
  "format" | "children" | "className"
> & {
  label?: string;
  format?: (value: number) => string;
  className?: string;
}) {
  return (
    <Primitive.Root
      data-slot="progress"
      value={value}
      getAriaValueText={
        format && value !== null ? () => format(value) : undefined
      }
      className={cn("grid grid-cols-[1fr_auto] gap-x-3 gap-y-2", className)}
      {...props}
    >
      {label && (
        <Primitive.Label data-slot="progress-label" className="text-secondary">
          {label}
        </Primitive.Label>
      )}
      {format && value !== null && (
        <Primitive.Value
          data-slot="progress-value"
          className="col-start-2 tabular-nums"
        >
          {() => format(value)}
        </Primitive.Value>
      )}
      <Primitive.Track
        data-slot="progress-track"
        className="col-span-2 h-1 overflow-hidden rounded-full material-field data-indeterminate:shimmer"
      >
        <Primitive.Indicator
          data-slot="progress-indicator"
          className="h-full bg-secondary transition-[width] data-indeterminate:w-full"
        />
      </Primitive.Track>
    </Primitive.Root>
  );
}
