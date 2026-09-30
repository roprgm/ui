"use client";

import { cn } from "cn";
import { cloneElement, type ReactElement, type ReactNode, useId } from "react";

type Control = ReactElement<{
  id?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}>;

/** A label, one control, and a description or error, connected for assistive technology. */
export function Field({
  label,
  description,
  error,
  className,
  children,
}: {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  className?: string;
  children: Control;
}) {
  const id = useId();
  const note = error ?? description;
  return (
    <div data-slot="field" className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-muted">
        {label}
      </label>
      {cloneElement(children, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": note ? `${id}-note` : undefined,
      })}
      {note && (
        <p
          id={`${id}-note`}
          className={cn("text-muted", error && "text-danger")}
        >
          {note}
        </p>
      )}
    </div>
  );
}
