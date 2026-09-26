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
      className={cn(
        "flex max-w-sm items-start",
        tone === "alert" && "text-danger",
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 flex-col">
        <div
          className={cn(
            "flex flex-col gap-0.5 px-pad py-pad-optical",
            actions && "pb-0",
            onDismiss && "pr-0",
          )}
        >
          {children}
        </div>
        {actions && <CardFooter>{actions}</CardFooter>}
      </div>
      {onDismiss && (
        <IconButton
          label="Dismiss"
          size="icon-sm"
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
