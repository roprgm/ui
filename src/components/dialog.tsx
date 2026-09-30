"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog as Primitive } from "@base-ui/react/dialog";
import { cn } from "cn";
import { popup } from "./popup";

/** A modal. An `alert` asks before what can't be undone: a click outside doesn't close it. */
export function Dialog(
  props:
    | (Primitive.Root.Props & { alert?: false })
    | (AlertDialog.Root.Props & { alert: true }),
) {
  if (props.alert) {
    const { alert, ...rest } = props;
    return <AlertDialog.Root {...rest} />;
  }
  const { alert, ...rest } = props;
  return <Primitive.Root {...rest} />;
}

export const DialogTrigger = Primitive.Trigger;

/** Closes its dialog: `<DialogClose render={<Button />}>Cancel</DialogClose>`. */
export const DialogClose = Primitive.Close;

/** Padded as its content needs; its `Section`s stack without a line, and the last of several sits apart. */
export function DialogContent({ className, ...props }: Primitive.Popup.Props) {
  return (
    <Primitive.Portal>
      <Primitive.Backdrop
        data-slot="dialog-backdrop"
        className="fixed inset-0 z-50 bg-backdrop transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0"
      />
      <Primitive.Popup
        data-slot="dialog-content"
        className={cn(
          popup,
          "sections-stacked fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-sm -translate-1/2 duration-150 data-ending-style:scale-95",
          // The last of several sections sits 16px below the rest.
          "*:data-[slot=section]:not-first:last:pt-4",
          className,
        )}
        {...props}
      />
    </Primitive.Portal>
  );
}

export function DialogTitle({ className, ...props }: Primitive.Title.Props) {
  return (
    <Primitive.Title
      data-slot="dialog-title"
      className={cn("font-medium", className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: Primitive.Description.Props) {
  return (
    <Primitive.Description
      data-slot="dialog-description"
      className={cn("text-muted", className)}
      {...props}
    />
  );
}
