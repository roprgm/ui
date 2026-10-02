import { cn } from "cn";

type Entry = { name: string; swatch?: string; use: string };

/** Names and what each is for, as rows of text. */
export function Reference({ entries }: { entries: Entry[] }) {
  return (
    <dl className="flex flex-col">
      {entries.map((entry) => (
        <div
          key={entry.name}
          className="grid gap-x-6 gap-y-1 py-2.5 sm:grid-cols-[16rem_minmax(0,1fr)]"
        >
          <dt className="flex min-w-0 items-center gap-2.5">
            {entry.swatch && (
              <span
                className={cn("size-3.5 shrink-0 rounded-sm", entry.swatch)}
              />
            )}
            <code className="truncate font-mono text-xs">{entry.name}</code>
          </dt>
          <dd className="text-secondary">{entry.use}</dd>
        </div>
      ))}
    </dl>
  );
}

export const tokens = {
  where: [
    {
      name: "--color-background",
      swatch: "bg-background",
      use: "The fill of where you are: the page, or the card, panel, or popup you're in.",
    },
    {
      name: "--color-hover",
      swatch: "bg-hover",
      use: "A quiet fill on it: a ghost's hover, a well.",
    },
  ],
  text: [
    {
      name: "--color-foreground",
      swatch: "bg-foreground",
      use: "Primary text and icons.",
    },
    {
      name: "--color-secondary",
      swatch: "bg-secondary",
      use: "Supporting text, descriptions, and placeholders.",
    },
    {
      name: "--color-muted",
      swatch: "bg-muted",
      use: "Hints and metadata that should barely show, such as a disclaimer.",
    },
    {
      name: "--color-disabled",
      swatch: "bg-disabled",
      use: "Rows and labels that can't be used.",
    },
  ],
  lines: [
    {
      name: "--color-border",
      swatch: "bg-border",
      use: "Separators between groups.",
    },
    {
      name: "--color-border-subtle",
      swatch: "bg-border-subtle",
      use: "Dividers inside a material, such as between a card's sections.",
    },
  ],
  accent: [
    {
      name: "--color-accent",
      swatch: "bg-accent",
      use: "What is on: a checked control, a slider's thumb, a badge that stands out.",
    },
    {
      name: "--color-on-accent",
      swatch: "bg-on-accent",
      use: "Text and icons on the accent.",
    },
    {
      name: "--color-accent-text",
      swatch: "bg-accent-text",
      use: "The accent as text, such as a link. It is the accent until a theme sets it apart.",
    },
    {
      name: "--color-primary",
      swatch: "bg-primary",
      use: "The main action: a primary button. It is the accent until a theme sets it apart.",
    },
    {
      name: "--color-primary-hover",
      swatch: "bg-primary-hover",
      use: "A primary button under the pointer.",
    },
    {
      name: "--color-on-primary",
      swatch: "bg-on-primary",
      use: "Text and icons on the primary.",
    },
  ],
  states: [
    {
      name: "--color-success",
      swatch: "bg-success",
      use: "Completed and healthy states, with a label.",
    },
    {
      name: "--color-warning",
      swatch: "bg-warning",
      use: "Needs attention soon, with a label.",
    },
    {
      name: "--color-danger",
      swatch: "bg-danger",
      use: "Destructive actions and errors, with a label.",
    },
    {
      name: "--color-pressed",
      swatch: "bg-pressed",
      use: "A ghost button or chip held down, or on. Translucent, over any fill.",
    },
    {
      name: "--color-focus",
      swatch: "bg-focus",
      use: "The focus ring. Translucent, over any fill.",
    },
    {
      name: "--color-backdrop",
      swatch: "bg-backdrop",
      use: "The shade behind a dialog. Translucent, over any fill.",
    },
  ],
  rest: [
    {
      name: "--color-tooltip",
      swatch: "bg-tooltip",
      use: "A tooltip's fill.",
    },
    {
      name: "--color-code-*",
      swatch: "bg-code-keyword",
      use: "Code, as a highlighter marks it: keyword, string, type, and property.",
    },
    {
      name: "--color-level-0 … 12",
      swatch: "bg-level-6",
      use: "The palette every fill is picked from, by a theme or a container. Components never use it.",
    },
  ],
  sizes: [
    {
      name: "--spacing-control",
      use: "The height of controls, 28px, with --spacing-control-sm at 24px and --spacing-control-lg at 32px. Only controls take them, so a theme scales them alone.",
    },
    {
      name: "--spacing-thumb",
      use: "A slider's thumb, which its fill is placed by too.",
    },
    {
      name: "--font-weight-selected",
      use: "The weight of a selected tab. A tab is as wide either way.",
    },
  ],
} satisfies Record<string, Entry[]>;

export const materials = {
  containers: [
    {
      name: "material-card",
      swatch: "material-card",
      use: "Content that stands on the page. Its ::after is a frame over what it holds, where its inner edge is drawn.",
    },
    {
      name: "material-panel",
      swatch: "material-panel",
      use: "A container docked in a layout, such as a sidebar or a toolbar, with no edge.",
    },
    {
      name: "material-float",
      swatch: "material-float",
      use: "What floats: popups, dialogs, notices, anything dragged. With data-raised, one that opens over a card.",
    },
  ],
  inside: [
    {
      name: "material-control",
      swatch: "material-control",
      use: "What you press: buttons, selects, selected tabs and toggles, a slider's thumb.",
    },
    {
      name: "material-field",
      swatch: "material-field",
      use: "Where you set or hold something: inputs, textareas, tracks, checkboxes, switches, code.",
    },
  ],
  variables: [
    {
      name: "--color-card",
      swatch: "bg-card",
      use: "A card's fill.",
    },
    {
      name: "--color-panel",
      swatch: "bg-panel",
      use: "A panel's fill.",
    },
    {
      name: "--color-float",
      swatch: "bg-float",
      use: "The fill of what floats.",
    },
    {
      name: "--color-control",
      swatch: "bg-control",
      use: "A control's fill, and a selected row's.",
    },
    {
      name: "--color-control-hover",
      swatch: "bg-control-hover",
      use: "A control under the pointer, or with its popup open.",
    },
    {
      name: "--color-field",
      swatch: "bg-field",
      use: "A field's fill.",
    },
    {
      name: "--shadow-card",
      use: "A card's outer edge.",
    },
    {
      name: "--inset-shadow-card",
      use: "A card's inner edge, drawn on the frame over what it holds.",
    },
    {
      name: "--shadow-float",
      use: "The edge of what floats.",
    },
    {
      name: "--shadow-control",
      use: "A control's edge.",
    },
    {
      name: "--shadow-field",
      use: "A field's edge.",
    },
  ],
} satisfies Record<string, Entry[]>;

export const utilities: Entry[] = [
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
    use: "A strip of controls a size smaller than a Button; pair it with material-field.",
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
];
