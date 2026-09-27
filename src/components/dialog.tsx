"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog as Primitive } from "@base-ui/react/dialog";
import { cn } from "cn";
import { Popup } from "./popup";
import { sections } from "./section";

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
export function DialogContent(props: Primitive.Popup.Props) {
  return (
    <Primitive.Portal>
      <Primitive.Backdrop className="fixed inset-0 z-50 bg-backdrop transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
      <Primitive.Popup
        render={(popup) => (
          <Popup
            {...popup}
            className={cn(
              sections({ lines: false }),
              "fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-sm -translate-1/2 duration-150 *:data-[slot=section]:not-first:last:pt-4 data-ending-style:scale-95",
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
