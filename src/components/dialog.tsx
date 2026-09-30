"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog as Primitive } from "@base-ui/react/dialog";
import { cn } from "cn";
import styles from "./dialog.module.css";

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
        className={styles.backdrop}
      />
      <Primitive.Popup
        data-slot="dialog-content"
        className={cn(
          "surface-float sections-stacked",
          styles.content,
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
      className={cn(styles.title, className)}
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
      className={cn(styles.description, className)}
      {...props}
    />
  );
}
