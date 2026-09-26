"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog as Primitive } from "@base-ui/react/dialog";
import { cn } from "cn";
import type { ReactElement, ReactNode } from "react";
import { CardFooter } from "./card";
import { Popup } from "./popup";

/**
 * A modal over the page, opened by `trigger` or by `open`. `actions` sit at the bottom right;
 * render one as a `DialogClose` to close it. An `alert` asks before something that can't be
 * undone, such as a delete: a click outside doesn't close it, so it waits for an answer.
 */
export function Dialog({
  alert = false,
  trigger,
  title,
  description,
  actions,
  children,
  open,
  onOpenChange,
}: {
  alert?: boolean;
  trigger?: ReactElement;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: Primitive.Root.Props["onOpenChange"];
}) {
  // An alert dialog differs only in its root and trigger; the parts inside are the same.
  const Root = alert ? AlertDialog.Root : Primitive.Root;
  const Trigger = alert ? AlertDialog.Trigger : Primitive.Trigger;
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Trigger render={trigger} />}
      <Primitive.Portal>
        <Primitive.Backdrop className="fixed inset-0 z-50 bg-backdrop transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Primitive.Popup
          render={(props) => (
            <Popup
              {...props}
              layer="layer-card"
              className="fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-sm -translate-1/2 duration-150 data-ending-style:scale-95"
            />
          )}
        >
          <div
            className={cn(
              "flex flex-col gap-3 px-pad py-pad-optical",
              actions && "pb-0",
            )}
          >
            <div className="flex flex-col gap-1">
              <Primitive.Title className="font-medium">{title}</Primitive.Title>
              {description && (
                <Primitive.Description className="text-muted">
                  {description}
                </Primitive.Description>
              )}
            </div>
            {children}
          </div>
          {actions && (
            <CardFooter className="justify-end">{actions}</CardFooter>
          )}
        </Primitive.Popup>
      </Primitive.Portal>
    </Root>
  );
}

/** Closes its dialog; render a Button as one: `<DialogClose render={<Button>Cancel</Button>} />`. */
export const DialogClose = Primitive.Close;
