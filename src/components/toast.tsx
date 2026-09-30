"use client";

import { Toast as Primitive } from "@base-ui/react/toast";
import { Button } from "./button";
import { Notice, NoticeClose } from "./notice";
import { Section, SectionAction } from "./section";
import styles from "./toast.module.css";

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
        <Primitive.Viewport data-slot="toaster" className={styles.viewport}>
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
      className={styles.toast}
      render={<Notice tone={item.priority === "high" ? "alert" : "status"} />}
    >
      <Section className={styles.header}>
        <div className={styles.text}>
          <Primitive.Title className={styles.title} />
          <Primitive.Description />
        </div>
        <SectionAction>
          <NoticeClose onClick={() => toast.close(item.id)} />
        </SectionAction>
      </Section>
      {item.actionProps && (
        <Section className={styles.actions}>
          <Primitive.Action render={<Button size="sm" />} />
        </Section>
      )}
    </Primitive.Root>
  ));
}
