import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import { CardFooter } from "./card";
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
      layer="layer-card"
      className={cn("max-w-sm", tone === "alert" && "text-danger", className)}
      {...props}
    >
      <div className="flex items-start gap-3 px-3.5 py-3 not-last:pb-0">
        <div className="flex flex-1 flex-col gap-0.5">{children}</div>
        {onDismiss && (
          // Past the padding by the air around its icon, so the icon sits 12px from the end and
          // centers on the message's first line.
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
      {actions && <CardFooter>{actions}</CardFooter>}
    </Popup>
  );
}
