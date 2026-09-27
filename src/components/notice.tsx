import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import { CardSection } from "./card";
import { IconButton } from "./icon-button";
import { Popup } from "./popup";

/**
 * A message that floats without blocking the app; the caller positions it, or `toast` shows one
 * in a corner. An `alert` is red and interrupts assistive technology; a `status` waits its turn.
 */
export function Notice({
  tone = "status",
  actions,
  onDismiss,
  className,
  children,
  ...props
}: ComponentProps<"div"> & {
  tone?: "status" | "alert";
  /** Buttons shown under the message. */
  actions?: ReactNode;
  onDismiss?: () => void;
}) {
  return (
    <Popup
      role={tone}
      className={cn("max-w-sm", tone === "alert" && "text-danger", className)}
      {...props}
    >
      <div className="flex items-start gap-3 px-3.5 py-2.5 not-last:pb-0">
        <div className="flex flex-1 flex-col gap-0.5">{children}</div>
        {onDismiss && (
          // As a card header's actions: its icon 12px from the end, centered on the first line.
          <IconButton
            label="Dismiss"
            onClick={onDismiss}
            className="-my-1 -mr-2"
          >
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
        )}
      </div>
      {actions && (
        // Buttons sit 10px from every edge, 4px closer to the sides than text.
        <CardSection className="flex-row gap-1 px-2.5">{actions}</CardSection>
      )}
    </Popup>
  );
}
