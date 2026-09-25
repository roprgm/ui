import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import { IconButton } from "./icon-button";
import { Popup } from "./popup";

/**
 * A message that floats without blocking the app; the caller positions it. An `alert` is red
 * and interrupts assistive technology; a `status` waits its turn.
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
      className={cn(
        "flex max-w-sm items-start",
        tone === "alert" && "text-danger",
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 flex-col">
        <p className={cn("p-3.5 pt-3", actions && "pb-2", onDismiss && "pr-0")}>
          {children}
        </p>
        {actions && <div className="flex gap-2 p-3 pt-0">{actions}</div>}
      </div>
      {onDismiss && (
        <IconButton
          label="Dismiss"
          size="icon-xs"
          onClick={onDismiss}
          className="m-2"
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
    </Popup>
  );
}
