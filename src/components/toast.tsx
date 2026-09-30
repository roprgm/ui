"use client";

import { Toast as Primitive } from "@base-ui/react/toast";
import { Button } from "./button";
import { Notice, NoticeClose } from "./notice";
import { Section, SectionAction } from "./section";
import "./tokens.css";
import "./toast.css";

/**
 * Shows notices in a corner from anywhere, once a `Toaster` is mounted:
 * `toast.add({ title: "Exported", description: "portrait.jpg" })`. `actionProps` adds a button,
 * and `priority: "high"` makes it an alert.
 */
export const toast = Primitive.createToastManager();

/** Where `toast` notices appear. Mount it once, anywhere. */
export function Toaster() {
  return (
    <Primitive.Provider data-slot="toaster-provider" toastManager={toast}>
      <Primitive.Portal>
        <Primitive.Viewport data-slot="toaster" className="toaster">
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
      data-slot="toast"
      key={item.id}
      toast={item}
      swipeDirection="right"
      // Past the provider's limit, older toasts wait hidden until newer ones go.
      className="toast"
      render={<Notice tone={item.priority === "high" ? "alert" : "status"} />}
    >
      <Section data-slot="toast-header" className="toast-header">
        <div data-slot="toast-content" className="toast-content">
          <Primitive.Title data-slot="toast-title" className="toast-title" />
          <Primitive.Description data-slot="toast-description" />
        </div>
        <SectionAction>
          <NoticeClose onClick={() => toast.close(item.id)} />
        </SectionAction>
      </Section>
      {item.actionProps && (
        <Section data-slot="toast-actions" className="toast-actions">
          <Primitive.Action
            data-slot="toast-action"
            render={<Button size="sm" />}
          />
        </Section>
      )}
    </Primitive.Root>
  ));
}
