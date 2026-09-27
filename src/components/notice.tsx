import { cn } from "cn";
import type { ComponentProps } from "react";
import { IconButton } from "./icon-button";
import { Popup } from "./popup";

/**
 * A message that floats without blocking the app, as `CardSection`s stacked without a line. An
 * `alert` is red and interrupts assistive technology; a `status` waits its turn.
 */
export function Notice({
  tone = "status",
  className,
  ...props
}: ComponentProps<"div"> & { tone?: "status" | "alert" }) {
  return (
    <Popup
      role={tone}
      className={cn(
        "flex max-w-sm flex-col *:not-last:pb-0",
        tone === "alert" && "text-danger",
        className,
      )}
      {...props}
    />
  );
}

/** Dismisses a notice, from a `CardAction` beside its message. */
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
