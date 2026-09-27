"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog as Primitive } from "@base-ui/react/dialog";
import { cn } from "cn";
import { Popup } from "./popup";

/** A modal. An `alert` asks before what can't be undone: a click outside doesn't close it. */
export function Dialog({
  alert = false,
  ...props
}: AlertDialog.Root.Props & { alert?: boolean }) {
  if (alert) return <AlertDialog.Root {...props} />;
  return <Primitive.Root {...props} />;
}

export const DialogTrigger = Primitive.Trigger;

/** Closes its dialog: `<DialogClose render={<Button />}>Cancel</DialogClose>`. */
export const DialogClose = Primitive.Close;

/** `CardSection`s stacked without a line. */
export function DialogContent(props: Primitive.Popup.Props) {
  return (
    <Primitive.Portal>
      <Primitive.Backdrop className="fixed inset-0 z-50 bg-backdrop transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
      <Primitive.Popup
        render={(popup) => (
          <Popup
            {...popup}
            className={cn(
              "fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-sm -translate-1/2 flex-col duration-150 *:not-last:pb-0 data-ending-style:scale-95",
              popup.className,
            )}
          />
        )}
        {...props}
      />
    </Primitive.Portal>
  );
}

export function DialogTitle({ className, ...props }: Primitive.Title.Props) {
  return (
    <Primitive.Title className={cn("font-medium", className)} {...props} />
  );
}

export function DialogDescription({
  className,
  ...props
}: Primitive.Description.Props) {
  return (
    <Primitive.Description className={cn("text-muted", className)} {...props} />
  );
}
