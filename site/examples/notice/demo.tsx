"use client";

import { Button } from "@roprgm/ui/button";
import { Notice, NoticeClose } from "@roprgm/ui/notice";
import { Section, SectionAction } from "@roprgm/ui/section";
import { useState } from "react";

export default function NoticeDemo() {
  const [shown, setShown] = useState(true);
  if (!shown) {
    return <Button onClick={() => setShown(true)}>Show notice</Button>;
  }
  return (
    <Notice>
      <Section className="flex-row items-start">
        <p className="flex-1">
          An unsaved draft from yesterday can be restored.
        </p>
        <SectionAction>
          <NoticeClose onClick={() => setShown(false)} />
        </SectionAction>
      </Section>
      <Section className="flex-row gap-1.5 px-2.5">
        <Button size="sm">Restore</Button>
        <Button size="sm" variant="ghost">
          Forget
        </Button>
      </Section>
    </Notice>
  );
}
