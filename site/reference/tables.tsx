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

export const sizes: Entry[] = [
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
];

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
