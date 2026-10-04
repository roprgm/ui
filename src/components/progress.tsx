"use client";

import { Progress as Primitive } from "@base-ui/react/progress";
import { cn } from "cn";
import type { ComponentProps } from "react";

/**
 * A task's progress, on a bar drawn as a Slider's, under its label and value. `value={null}` is
 * indeterminate, and the bar shimmers.
 */
export function Progress({
  label,
  className,
  ...props
}: Omit<ComponentProps<typeof Primitive.Root>, "children" | "className"> & {
  label?: string;
  className?: string;
}) {
  return (
    <Primitive.Root
      data-slot="progress"
      className={cn("grid grid-cols-[1fr_auto] gap-x-3 gap-y-2", className)}
      {...props}
    >
      {label && (
        <>
          <Primitive.Label
            data-slot="progress-label"
            className="text-secondary"
          >
            {label}
          </Primitive.Label>
          <Primitive.Value
            data-slot="progress-value"
            className="tabular-nums"
          />
        </>
      )}
      <Primitive.Track
        data-slot="progress-track"
        // The field's edge on a frame over the fill, which would cover it.
        className="relative col-span-2 h-1 overflow-hidden rounded-full material-field after:absolute after:inset-0 after:rounded-[inherit] after:shadow-field data-indeterminate:shimmer"
      >
        <Primitive.Indicator
          data-slot="progress-indicator"
          className="h-full bg-secondary transition-[width] data-indeterminate:w-full"
        />
      </Primitive.Track>
    </Primitive.Root>
  );
}
