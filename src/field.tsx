"use client";

import { cn } from "cn";
import { cloneElement, type ReactElement, type ReactNode, useId } from "react";

type Control = ReactElement<{
  id?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}>;

/**
 * A label, one control such as an Input or Textarea, and a description or error under it.
 * It connects them: the label names the control, the text describes it, and an error marks it invalid.
 */
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
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-neutral-400">
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
          className={cn("text-neutral-500", error && "text-red-300")}
        >
          {note}
        </p>
      )}
    </div>
  );
}
