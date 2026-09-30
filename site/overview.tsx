import { type ReactNode, useState } from "react";
import { version } from "../package.json";
import { Button } from "../src/components/button";
import { Code } from "./docs";
import { CopyIcon } from "./icons";

const prompt =
  "Use @roprgm/ui for this app's UI. Its README explains setup and usage: https://github.com/roprgm/ui#readme";

/** One way to use the library, from nothing to a component on screen. */
function Way({ title, children }: { title: string; children: ReactNode }) {
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
    // Both labels share one cell, so the width holds while they fade.
    <Button onClick={copy} data-copied={copied} className="group shrink-0">
      <span className="grid *:[grid-area:1/1]">
        <span className="flex items-center gap-2 transition-opacity duration-200 group-data-[copied=true]:opacity-0">
          <CopyIcon />
          Copy for agents
        </span>
        <span className="justify-self-center opacity-0 transition-opacity duration-200 group-data-[copied=true]:opacity-100">
          Copied
        </span>
      </span>
    </Button>
  );
}

/** What the library looks like, then how to start. */
export function Overview() {
  return (
    <div className="flex max-w-3xl flex-col gap-10">
      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-medium">@roprgm/ui</h1>
            <span className="text-muted">v{version}</span>
          </div>
          <p className="text-muted">
            The design library behind my apps: minimal, dark React components on
            Base UI, styled with CSS modules, with or without Tailwind CSS v4.
            Use it as a package, or copy its source into your app.
          </p>
        </div>
        <CopyForAgents />
      </header>
      <Way title="Install the package">
        <p className="text-muted">
          Add it, then import its theme in your CSS. With Tailwind, import the
          theme after it, and its utilities for the theme's tokens.
        </p>
        <Code>bun add @roprgm/ui</Code>
        <Code lang="css">{`@import "tailwindcss";
@import "@roprgm/ui/themes/default.css";
@import "@roprgm/ui/tailwind.css";`}</Code>
        <p className="text-muted">Each component imports from its own path.</p>
        <Code lang="tsx">{`import { Button } from "@roprgm/ui/button";

export function SaveButton() {
  return <Button variant="primary">Save</Button>;
}`}</Code>
      </Way>
      <Way title="Or copy the source">
        <p className="text-muted">
          In an app set up for shadcn, its CLI copies a component into
          components/ui, with the components it uses, and adds the theme to your
          CSS. The code is yours to change.
        </p>
        <Code>npx shadcn@latest add https://ui.roprgm.com/r/button.json</Code>
        <Code lang="tsx">{`import { Button } from "@/components/ui/button";

export function SaveButton() {
  return <Button variant="primary">Save</Button>;
}`}</Code>
      </Way>
      <p className="text-muted">
        Then browse the{" "}
        <a
          href="#button"
          className="rounded-sm text-foreground underline decoration-muted underline-offset-4 transition focus-ring hover:decoration-foreground"
        >
          components
        </a>
        .
      </p>
    </div>
  );
}
