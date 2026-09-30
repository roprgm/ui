"use client";

import { cn } from "cn";
import { cloneElement, type ReactElement, type ReactNode, useId } from "react";
import styles from "./field.module.css";

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
    <div data-slot="field" className={cn(styles.field, className)}>
      <label htmlFor={id} className={styles.label}>
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
          data-error={error ? true : undefined}
          className={styles.note}
        >
          {note}
        </p>
      )}
    </div>
  );
}
