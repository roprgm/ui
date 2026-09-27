"use client";

import { Toast as Primitive } from "@base-ui/react/toast";
import { Button } from "./button";
import { Notice, NoticeClose } from "./notice";
import { Section, SectionAction } from "./section";

/**
 * Shows notices in a corner from anywhere, once a `Toaster` is mounted:
 * `toast.add({ title: "Exported", description: "portrait.jpg" })`. `actionProps` adds a button,
 * and `priority: "high"` makes it an alert.
 */
export const toast = Primitive.createToastManager();

/** Where `toast` notices appear. Mount it once, anywhere. */
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
      // Past the provider's limit, older toasts wait hidden until newer ones go.
      className="translate-x-(--toast-swipe-movement-x) data-limited:hidden"
      render={<Notice tone={item.priority === "high" ? "alert" : "status"} />}
    >
      <Section className="flex-row items-start">
        <div className="flex flex-1 flex-col gap-0.5">
          <Primitive.Title className="font-medium" />
          <Primitive.Description />
        </div>
        <SectionAction>
          <NoticeClose onClick={() => toast.close(item.id)} />
        </SectionAction>
      </Section>
      {item.actionProps && (
        <Section className="flex-row gap-1 px-2.5">
          <Primitive.Action render={<Button size="sm" />} />
        </Section>
      )}
    </Primitive.Root>
  ));
}
