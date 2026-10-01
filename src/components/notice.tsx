import { cva } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";
import { IconButton } from "./icon-button";
import { Popup } from "./popup";
import { sections } from "./section";

const notice = cva("max-w-sm", {
  variants: { tone: { status: "", alert: "text-danger" } },
});

/**
 * A message that floats without blocking the app, padded as its content needs; its `Section`s
 * stack without a line. An
 * `alert` is red and interrupts assistive technology; a `status` waits its turn.
 */
export function Notice({
  tone = "status",
  className,
  ...props
}: ComponentProps<"div"> & { tone?: "status" | "alert" }) {
  return (
    <Popup
      data-slot="notice"
      role={tone}
      className={cn(sections({ lines: false }), notice({ tone }), className)}
      {...props}
    />
  );
}

/** Dismisses a notice, from a `SectionAction` beside its message. */
export function NoticeClose(
  props: Omit<ComponentProps<typeof IconButton>, "label">,
) {
  return (
    <IconButton data-slot="notice-close" label="Dismiss" {...props}>
      <svg
        data-slot="notice-close-icon"
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
