"use client";

import { cn } from "cn";
import { type ReactNode, useId } from "react";

/** A legend over a group of controls, such as checkboxes or radios, and a description or error. */
export function Fieldset({
  legend,
  description,
  error,
  className,
  children,
}: {
  legend: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const id = useId();
  const note = error ?? description;
  return (
    <fieldset
      data-slot="fieldset"
      aria-describedby={note ? `${id}-note` : undefined}
      className={cn("flex min-w-0 flex-col gap-1.5", className)}
    >
      {/* Floated, it lays out as the other children do. */}
      <legend data-slot="fieldset-legend" className="float-left text-secondary">
        {legend}
      </legend>
      {children}
      {note && (
        <p
          data-slot={error ? "fieldset-error" : "fieldset-description"}
          id={`${id}-note`}
          className={cn("text-secondary", error && "text-danger")}
        >
          {note}
        </p>
      )}
    </fieldset>
  );
}
