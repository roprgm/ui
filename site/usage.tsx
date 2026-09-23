import { type ReactNode, useState } from "react";
import { Button } from "../src/button";
import { Code } from "./docs";
import { CopyIcon } from "./icons";

const prompt =
  "Use @roprgm/ui for this app's UI. Its README explains setup and usage: https://github.com/roprgm/ui#readme";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-base font-medium">{title}</h2>
      {children}
    </section>
  );
}

function CopyForAgents() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <Button onClick={copy} className="shrink-0">
      <CopyIcon />
      {copied ? "Copied" : "Copy for agents"}
    </Button>
  );
}

/** The docs' opening page: how to add the library, and how cards work. */
export function Usage() {
  return (
    <div className="flex max-w-3xl flex-col gap-10">
      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium">@roprgm/ui</h1>
          <p className="text-muted">A minimal, dark UI library for React.</p>
        </div>
        <CopyForAgents />
      </header>
      <Section title="Install the package">
        <p className="text-muted">Then import the theme in your CSS.</p>
        <Code>bun add @roprgm/ui</Code>
        <Code lang="css">{`@import "tailwindcss";
@import "@roprgm/ui/theme.css";`}</Code>
        <Code lang="tsx">{`import { Button } from "@roprgm/ui/button";`}</Code>
      </Section>
      <Section title="Or copy the source">
        <p className="text-muted">
          No package needed: shadcn adds a component's code to your app.
        </p>
        <Code>npx shadcn@latest add https://ui.roprgm.com/r/button.json</Code>
      </Section>
      <Section title="Put controls on cards">
        <p className="text-muted">Controls adapt to the card they sit on.</p>
        <Code lang="tsx">{`<div className="layer-card rounded-xl p-3 shadow-raised">
  <Input placeholder="Name" />
</div>`}</Code>
      </Section>
    </div>
  );
}
