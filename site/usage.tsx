import { type ReactNode, useState } from "react";
import { Tab, TabList } from "../src/tabs";
import { Code } from "./docs";

const prompt = `Build this app's interface with @roprgm/ui, a minimal dark UI library for React and Tailwind CSS v4.

- Install it with \`bun add @roprgm/ui\`, and import the theme after Tailwind in the main CSS file:
  @import "tailwindcss";
  @import "@roprgm/ui/theme.css";
- Import each component from its own path, such as \`import { Button } from "@roprgm/ui/button"\`. Components: Button, IconButton, Chip, Input, Textarea, Field, Checkbox, Switch, ToggleGroup, Select, Slider, ScrubInput, VerticalSlider, Panel, ScrollArea, TabList, ListItem, TreeList, Tooltip, Menu, Popover, Notice, Spinner.
- Put groups of controls on a card with \`layer-card\`, and a card inside a card with \`layer-elevated\`, instead of a background color. Controls take their fills from the card they sit on.
- Use the theme's colors (\`text-muted\`, \`text-faint\`, \`bg-field\`, \`border-line\`) instead of Tailwind's palette, and \`shadow-raised\`, \`shadow-sunken\`, or \`shadow-float\` instead of borders.
- See every component and its props at https://ui.roprgm.com.`;

const ways = {
  package: {
    label: "Package",
    content: (
      <>
        <Step text="Install it, then import the theme in your CSS.">
          <Code>bun add @roprgm/ui</Code>
          <Code lang="css">{`@import "tailwindcss";
@import "@roprgm/ui/theme.css";`}</Code>
        </Step>
        <Step text="Import each component from its own path.">
          <Code lang="tsx">{`import { Button } from "@roprgm/ui/button";

<Button variant="primary">Export</Button>`}</Code>
        </Step>
      </>
    ),
  },
  shadcn: {
    label: "shadcn",
    content: (
      <>
        <Step text="No package needed: the shadcn CLI copies a component's code into your app, with the theme.">
          <Code>npx shadcn@latest add https://ui.roprgm.com/r/button.json</Code>
        </Step>
        <Step text="Import it from your components folder. The code is yours to change.">
          <Code lang="tsx">{`import { Button } from "@/components/ui/button";

<Button variant="primary">Export</Button>`}</Code>
        </Step>
      </>
    ),
  },
  agents: {
    label: "Agents",
    content: (
      <Step text="Paste this into your coding agent, and it builds with the library.">
        <Code lang="text">{prompt}</Code>
      </Step>
    ),
  },
};

type Way = keyof typeof ways;

function Step({ text, children }: { text: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <p className="text-muted">{text}</p>
      {children}
    </section>
  );
}

/** The docs' opening page: three ways to add the library, then how cards work. */
export function Usage() {
  const [way, setWay] = useState<Way>("package");
  return (
    <div className="flex max-w-3xl flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium">@roprgm/ui</h1>
        <p className="text-muted">A minimal, dark UI library for React.</p>
      </header>
      <div className="flex flex-col gap-6">
        <TabList aria-label="How to add it">
          {(Object.keys(ways) as Way[]).map((key) => (
            <Tab key={key} selected={key === way} onClick={() => setWay(key)}>
              {ways[key].label}
            </Tab>
          ))}
        </TabList>
        {ways[way].content}
      </div>
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-medium">Put controls on cards</h2>
        <p className="text-muted">Controls adapt to the card they sit on.</p>
        <Code lang="tsx">{`<div className="layer-card rounded-xl p-3 shadow-raised">
  <Input placeholder="Name" />
</div>`}</Code>
      </section>
    </div>
  );
}
