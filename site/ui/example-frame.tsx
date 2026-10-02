import { Card } from "@roprgm/ui/card";
import { Section } from "@roprgm/ui/section";
import { Tab, TabList, TabPanel, Tabs } from "@roprgm/ui/tabs";
import { cn } from "cn";
import type { ReactNode } from "react";

/**
 * A demo on a card, and its source a tab away. A block, a whole layout, sits instead on the page's
 * colors, as it would in an app, under a panel that heads it.
 */
export function ExampleFrame({
  file,
  preview,
  code,
  block = false,
}: {
  /** The example's file name, which heads the frame. */
  file: string;
  preview: ReactNode;
  code: ReactNode;
  block?: boolean;
}) {
  return (
    <Tabs
      defaultValue="preview"
      render={
        block ? (
          <div className="flex flex-col overflow-hidden rounded-xl ring-1 ring-border-subtle" />
        ) : (
          <Card className="p-0" />
        )
      }
    >
      <Section
        className={cn(
          "flex-row items-center py-2 pr-1.5",
          block &&
            "material-panel shadow-[inset_0_-1px_0_var(--color-border-subtle)]",
        )}
      >
        <span className="flex-1 text-muted">{file}</span>
        <TabList>
          <Tab value="preview" size="sm">
            Preview
          </Tab>
          <Tab value="code" size="sm">
            Code
          </Tab>
        </TabList>
      </Section>
      <TabPanel
        value="preview"
        className={
          block
            ? "@container"
            : "flex min-h-56 flex-wrap items-center justify-center-safe gap-3 p-8 sm:p-12"
        }
      >
        {preview}
      </TabPanel>
      <TabPanel value="code" className="p-1.5">
        {code}
      </TabPanel>
    </Tabs>
  );
}
