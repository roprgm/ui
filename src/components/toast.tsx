"use client";

import { Toast as Primitive } from "@base-ui/react/toast";
import { Button } from "./button";
import { Notice } from "./notice";

/**
 * Shows notices in a corner of the screen from anywhere, in React or out, once a `Toaster` is
 * mounted: `toast.add({ title: "Exported", description: "portrait.jpg" })`. Each closes after
 * five seconds unless the pointer rests on it; `actionProps` adds a button, and `priority: "high"`
 * makes it an alert. `toast.close(id)`, `toast.update(id, …)`, and `toast.promise(…)` follow it.
 */
export const toast = Primitive.createToastManager();

/** Where `toast` notices appear, the newest nearest the corner. Mount it once, anywhere. */
export function Toaster() {
  return (
    <Primitive.Provider toastManager={toast}>
      <Primitive.Portal>
        <Primitive.Viewport className="fixed inset-x-3.5 bottom-3.5 z-50 flex flex-col-reverse gap-2 sm:left-auto sm:w-sm">
          <Toasts />
        </Primitive.Viewport>
      </Primitive.Portal>
    </Primitive.Provider>
  );
}

function Toasts() {
  const { toasts } = Primitive.useToastManager();
  return toasts.map((item) => (
    <Primitive.Root
      key={item.id}
      toast={item}
      swipeDirection="right"
      // Past the provider's limit, older toasts stay mounted but inert until the newer ones go.
      className="translate-x-(--toast-swipe-movement-x) data-limited:hidden"
      render={
        <Notice
          tone={item.priority === "high" ? "alert" : "status"}
          onDismiss={() => toast.close(item.id)}
          actions={
            item.actionProps && (
              <Primitive.Action render={<Button variant="primary" />} />
            )
          }
        />
      }
    >
      <Primitive.Title className="font-medium" />
      <Primitive.Description />
    </Primitive.Root>
  ));
}
