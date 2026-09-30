import { cn } from "cn";
import type { ComponentProps } from "react";
import { IconButton } from "./icon-button";
import { popup } from "./popup";

/**
 * A message that floats without blocking the app, padded as its content needs; its `Section`s
 * stack without a line. An `alert` is red and interrupts assistive technology; a `status` waits
 * its turn.
 */
export function Notice({
  tone = "status",
  className,
  ...props
}: ComponentProps<"div"> & { tone?: "status" | "alert" }) {
  return (
    <div
      role={tone}
      data-slot="notice"
      data-tone={tone}
      className={cn(
        popup,
        "sections-stacked max-w-sm data-[tone=alert]:text-danger",
        className,
      )}
      {...props}
    />
  );
}

/** Dismisses a notice, from a `SectionAction` beside its message. */
export function NoticeClose(
  props: Omit<ComponentProps<typeof IconButton>, "label">,
) {
  return (
    <IconButton label="Dismiss" {...props}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        className="size-4"
        aria-hidden
      >
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </IconButton>
  );
}
