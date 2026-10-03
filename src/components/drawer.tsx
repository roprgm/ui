"use client";

import { Drawer as Primitive } from "@base-ui/react/drawer";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import { Popup } from "./popup";
import { sections } from "./section";

/** A panel that slides in from the side it swipes away to: `swipeDirection`, `right` unless set. */
export function Drawer({
  swipeDirection = "right",
  ...props
}: Primitive.Root.Props) {
  return <Primitive.Root swipeDirection={swipeDirection} {...props} />;
}

// An element it renders, such as a Button, keeps its own slot.
export function DrawerTrigger(props: Primitive.Trigger.Props) {
  return (
    <Primitive.Trigger
      {...(props.render ? {} : { "data-slot": "drawer-trigger" })}
      {...props}
    />
  );
}

/** Closes its drawer, drawn as the element it renders, which keeps its own slot. */
export function DrawerClose(props: Primitive.Close.Props) {
  return (
    <Primitive.Close
      {...(props.render ? {} : { "data-slot": "drawer-close" })}
      {...props}
    />
  );
}

// It follows the finger while swiped, and once let go, leaves as fast as it was thrown.
const drawer = cva(
  "max-h-full w-full translate-x-(--drawer-swipe-movement-x) translate-y-(--drawer-swipe-movement-y) transition-[opacity,translate] duration-200 ease-out data-ending-style:duration-[calc(var(--drawer-swipe-strength)*200ms)] data-swiping:duration-0",
  {
    variants: {
      side: {
        right:
          "ml-auto max-w-sm data-ending-style:translate-x-full data-starting-style:translate-x-full",
        left: "max-w-sm data-ending-style:-translate-x-full data-starting-style:-translate-x-full",
        down: "self-end data-ending-style:translate-y-full data-starting-style:translate-y-full",
        up: "self-start data-ending-style:-translate-y-full data-starting-style:-translate-y-full",
      },
    },
  },
);

/** Fills the side it docks to, and scrolls; its `Section`s stack without a line, as a dialog's do. */
export function DrawerContent(props: Primitive.Popup.Props) {
  return (
    <Primitive.Portal data-slot="drawer-portal">
      <Primitive.Backdrop
        data-slot="drawer-backdrop"
        className="fixed inset-0 z-50 backdrop opacity-[calc(1-var(--drawer-swipe-progress))] transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0"
      />
      <Primitive.Viewport
        data-slot="drawer-viewport"
        className="fixed inset-0 z-50 flex p-2"
      >
        <Primitive.Popup
          data-slot="drawer-content"
          render={(popup, state) => (
            <Popup
              {...popup}
              className={cn(
                sections({ lines: false }),
                drawer({ side: state.swipeDirection }),
                popup.className,
              )}
            />
          )}
          {...props}
        />
      </Primitive.Viewport>
    </Primitive.Portal>
  );
}

export function DrawerTitle({ className, ...props }: Primitive.Title.Props) {
  return (
    <Primitive.Title
      data-slot="drawer-title"
      className={cn("font-medium", className)}
      {...props}
    />
  );
}

export function DrawerDescription({
  className,
  ...props
}: Primitive.Description.Props) {
  return (
    <Primitive.Description
      data-slot="drawer-description"
      className={cn("text-secondary", className)}
      {...props}
    />
  );
}
