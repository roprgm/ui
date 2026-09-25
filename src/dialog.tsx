"use client";

import { Dialog as Primitive } from "@base-ui/react/dialog";
import type { ReactElement, ReactNode } from "react";
import { Popup } from "./popup";

/**
 * A modal over the page, opened by `trigger` or by `open`. `actions` sit at the bottom right;
 * render one as a `DialogClose` to close it.
 */
export function Dialog({
  trigger,
  title,
  description,
  actions,
  children,
  open,
  onOpenChange,
}: {
  trigger?: ReactElement;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: Primitive.Root.Props["onOpenChange"];
}) {
  return (
    <Primitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Primitive.Trigger render={trigger} />}
      <Primitive.Portal>
        <Primitive.Backdrop className="fixed inset-0 z-50 bg-backdrop transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Primitive.Popup
          render={(props) => (
            <Popup
              {...props}
              layer="layer-card"
              className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-1/2 duration-150 data-ending-style:scale-95"
            />
          )}
        >
          {/* Like a Notice's text: 6px further in than the padding beside, and 4px above and below. */}
          <div className="flex flex-col gap-3 px-1.5 py-1">
            <div className="flex flex-col gap-1">
              <Primitive.Title className="font-medium">{title}</Primitive.Title>
              {description && (
                <Primitive.Description className="text-muted">
                  {description}
                </Primitive.Description>
              )}
            </div>
            {children}
            {actions && <div className="flex justify-end gap-2">{actions}</div>}
          </div>
        </Primitive.Popup>
      </Primitive.Portal>
    </Primitive.Root>
  );
}

/** Closes its dialog; render a Button as one: `<DialogClose render={<Button>Cancel</Button>} />`. */
export const DialogClose = Primitive.Close;
