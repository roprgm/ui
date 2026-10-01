import { cn } from "cn";
import type { ReactNode } from "react";
import { Card } from "../src/components/card";
import { Section } from "../src/components/section";
import { Code } from "./docs";

type Entry = { name: string; swatch?: string; use: ReactNode };
type Group = { title: string; entries: Entry[] };

const tokens: Group[] = [
  {
    title:
      "Where you are: the page sets them, and each region sets them again; these are a card's",
    entries: [
      {
        name: "background",
        swatch: "bg-background",
        use: "The fill of the region you're in: the page, a card, a panel, a popup.",
      },
      {
        name: "surface",
        swatch: "bg-surface",
        use: "The fill a card or popup gets where it sits.",
      },
      {
        name: "control",
        swatch: "bg-control",
        use: "What you press: buttons, selects, selected tabs and toggles.",
      },
      {
        name: "control-hover",
        swatch: "bg-control-hover",
        use: "A control under the pointer, or with its popup open.",
      },
      {
        name: "field",
        swatch: "bg-field",
        use: "Where you set a value: inputs, tracks, checkboxes, switches.",
      },
      {
        name: "hover",
        swatch: "bg-hover",
        use: "Quiet fills: a ghost's hover, a well.",
      },
      {
        name: "selected",
        swatch: "bg-selected",
        use: "A highlighted or selected row.",
      },
    ],
  },
  {
    title: "Text",
    entries: [
      {
        name: "foreground",
        swatch: "bg-foreground",
        use: "Primary text and icons.",
      },
      {
        name: "secondary",
        swatch: "bg-secondary",
        use: "Supporting text, descriptions, and placeholders.",
      },
      {
        name: "muted",
        swatch: "bg-muted",
        use: "Hints and metadata that should barely show, such as a disclaimer.",
      },
      {
        name: "disabled",
        swatch: "bg-disabled",
        use: "Rows and labels that can't be used.",
      },
    ],
  },
  {
    title: "Lines",
    entries: [
      {
        name: "border",
        swatch: "bg-border",
        use: "Separators between groups.",
      },
      {
        name: "border-subtle",
        swatch: "bg-border-subtle",
        use: "Dividers inside a surface, such as between a card's sections.",
      },
    ],
  },
  {
    title: "Accent: data-accent picks another",
    entries: [
      {
        name: "accent",
        swatch: "bg-accent",
        use: "What is on: a checked control, a slider's thumb, a badge that stands out.",
      },
      {
        name: "on-accent",
        swatch: "bg-on-accent",
        use: "Text and icons on the accent.",
      },
    ],
  },
  {
    title: "Primary: the accent, until a theme sets it apart",
    entries: [
      {
        name: "primary",
        swatch: "bg-primary",
        use: "The main action: a primary button.",
      },
      {
        name: "primary-hover",
        swatch: "bg-primary-hover",
        use: "A primary button under the pointer.",
      },
      {
        name: "on-primary",
        swatch: "bg-on-primary",
        use: "Text and icons on the primary.",
      },
    ],
  },
  {
    title: "States",
    entries: [
      {
        name: "success",
        swatch: "bg-success",
        use: "Completed and healthy states, with a label.",
      },
      {
        name: "warning",
        swatch: "bg-warning",
        use: "Needs attention soon, with a label.",
      },
      {
        name: "danger",
        swatch: "bg-danger",
        use: "Destructive actions and errors, with a label.",
      },
    ],
  },
  {
    title: "Translucent, over any fill",
    entries: [
      {
        name: "pressed",
        swatch: "bg-pressed",
        use: "A ghost button or chip held down, or on.",
      },
      { name: "focus", swatch: "bg-focus", use: "The focus ring." },
      {
        name: "backdrop",
        swatch: "bg-backdrop",
        use: "The shade behind a dialog.",
      },
    ],
  },
  {
    title: "The rest",
    entries: [
      { name: "tooltip", swatch: "bg-tooltip", use: "A tooltip's fill." },
      {
        name: "code-keyword, -string, -type, -property",
        swatch: "bg-code-keyword",
        use: "Code, as a highlighter marks it.",
      },
      {
        name: "level-0 to level-12",
        swatch: "bg-level-6",
        use: "The palette every fill is picked from, by a theme or a region. Components never use it.",
      },
    ],
  },
];

const surfaces: Group[] = [
  {
    title:
      "Regions: they hold content, paint their background, and set the colors of what sits on them",
    entries: [
      {
        name: "surface-card",
        swatch: "surface-card",
        use: "A card: content that stands on the page. Its background is the surface where it sits, and its ::after a frame over its content, for its edge.",
      },
      {
        name: "surface-panel",
        swatch: "surface-panel",
        use: "A panel docked in a layout, such as a sidebar or a toolbar, with a background of its own.",
      },
      {
        name: "surface-float",
        swatch: "surface-float",
        use: "What floats: popups, dialogs, notices, anything dragged. With data-raised, one that opens over a card.",
      },
    ],
  },
  {
    title: "Controls: utilities, so variants apply",
    entries: [
      {
        name: "surface-control",
        swatch: "surface-control",
        use: "What you press: buttons, selects, selected tabs and toggles. Paints control.",
      },
      {
        name: "surface-field",
        swatch: "surface-field",
        use: "Where you set a value: inputs, tracks, checkboxes, switches, segmented groups. Paints field.",
      },
      {
        name: "surface-accent",
        swatch: "surface-accent",
        use: "What is on: a checked switch, a slider's thumb. Paints accent.",
      },
      {
        name: "surface-primary",
        swatch: "surface-primary",
        use: "The main action: a primary button. Paints primary.",
      },
    ],
  },
];

const utilities: Group[] = [
  {
    title: "Behaviors",
    entries: [
      {
        name: "focus-ring",
        use: "On every control: an outline with a gap, on keyboard focus.",
      },
      {
        name: "dim-disabled",
        use: "On every control: fades it while disabled.",
      },
      {
        name: "popup-motion",
        use: "On every popup: grows from its trigger as it fades in.",
      },
      {
        name: "segmented",
        use: "A strip of controls a size smaller than a Button; pair it with surface-field.",
      },
      {
        name: "overflow-fade-x",
        use: "A row that may not fit: scrolls, and fades where more lies that way.",
      },
      {
        name: "overflow-fade-y",
        use: "A column that may not fit, the same way.",
      },
      { name: "shimmer", use: "Text, icons, or blocks while work is pending." },
    ],
  },
];

/** A reference table: what each name is for, with its current value where it has one. */
function Reference({ groups, head }: { groups: Group[]; head: string }) {
  return (
    <Card>
      <Section className={cn(row, "text-secondary")}>
        <span>{head}</span>
        <span>Use it for</span>
      </Section>
      {groups.flatMap((group) => [
        <Section
          key={group.title}
          className={cn(body, "pt-5 pb-1.5 text-muted")}
        >
          {group.title}
        </Section>,
        ...group.entries.map((entry) => (
          <Section key={entry.name} className={cn(row, body, "items-center")}>
            <span className="flex min-w-0 items-center gap-3">
              {entry.swatch && (
                <span
                  className={cn(
                    "size-5 shrink-0 rounded-sm shadow-[inset_0_0_0_1px_var(--color-border-subtle)]",
                    entry.swatch,
                  )}
                />
              )}
              <code className="truncate font-mono text-[12px]">
                {entry.name}
              </code>
            </span>
            <span className="text-secondary">{entry.use}</span>
          </Section>
        )),
      ])}
    </Card>
  );
}

const row = "grid grid-cols-[minmax(0,16rem)_1fr] gap-4";

// The rows sit a level under the card, so its head reads as one.
const body = "bg-level-3";

export function TokensTable() {
  return <Reference groups={tokens} head="Token" />;
}

export function SurfacesTable() {
  return <Reference groups={surfaces} head="Surface" />;
}

export function UtilitiesTable() {
  return <Reference groups={utilities} head="Utility" />;
}

const theme = `@import "tailwindcss";
@import "@roprgm/ui/base.css";

/* Colors, on the page. */
@theme {
  --color-control: var(--color-level-5);
  --color-field: var(--color-level-0);
  --color-accent: oklch(67% 0.16 252);
  --color-primary-hover: oklch(72% 0.15 252);
}

@layer components {
  /* Colors, on each region: what sits on a card. */
  .surface-card {
    --color-control: var(--color-level-7);
    --color-field: var(--color-level-2);
  }

  /* A panel, with a background of its own. */
  .surface-panel {
    --color-background: var(--color-level-3);
    --color-control: var(--color-level-6);
  }

  /* Effects, on what each thing is; a card's edge on its frame. */
  .surface-card {
    box-shadow: 0 1px 1px oklch(0% 0 0 / 0.28);
  }

  .surface-card::after {
    border: 1px solid oklch(100% 0 0 / 0.08);
  }

  /* One component, through its slot. */
  [data-slot="button"] {
    --radius-md: 9999px;
  }
}

/* A control: added to the base's surface of the same name. */
@utility surface-control {
  box-shadow: inset 0 1px 0 oklch(95% 0 0 / 0.08);
}`;

export function ThemeExample() {
  return <Code lang="css">{theme}</Code>;
}
