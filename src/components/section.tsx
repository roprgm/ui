import { cn } from "cn";
import type { ComponentProps } from "react";
import styles from "./section.module.css";

/**
 * A part of a card, popover, dialog, or notice, which pads its content as one section until it
 * holds sections. Its content stacks; a header or a row of buttons is a row.
 */
export function Section({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="section"
      className={cn(styles.section, className)}
      {...props}
    />
  );
}

/** Ghost icon buttons at a header's end, reaching into its padding so each icon sits 12px in. */
export function SectionAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="section-action"
      className={cn(styles.action, className)}
      {...props}
    />
  );
}
