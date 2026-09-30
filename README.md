# @roprgm/ui

A minimal, dark UI library for React and Tailwind CSS v4.

Docs and live examples: [ui.roprgm.com](https://ui.roprgm.com)

## Install

Add the package, then import the theme after Tailwind in your CSS. Each component brings its own CSS, so importing one styles it, and your app ships the CSS of only what it imports:

```bash
bun add @roprgm/ui
```

```css
@import "tailwindcss";
@import "@roprgm/ui/themes/default.css";
```

Or copy components into your app with the shadcn CLI. No package needed: each component brings the theme and the components it uses.

```bash
npx shadcn@latest add https://ui.roprgm.com/r/button.json
```

## Use

Import each component from its own path:

```tsx
import { Button } from "@roprgm/ui/button";

<Button variant="primary">Export</Button>;
```

Components compose from their parts. An overlay's trigger renders your own element:

```tsx
<Menu>
  <MenuTrigger render={<Button />}>Edit</MenuTrigger>
  <MenuContent>
    <MenuItem>Duplicate</MenuItem>
  </MenuContent>
</Menu>
```

Put groups of controls on a card. Controls take their fills from the surface they sit on, so they keep the same contrast everywhere:

```tsx
<Card>
  <Input placeholder="Name" />
</Card>
```

A card, popover, dialog, or notice pads its content as one section. To split it, put its parts in `Section`s: one reads the same as none, and several stack with a line between each, or, in a dialog or notice, without one. A `Collapsible` counts as a section. For content that runs edge to edge, such as a frame around an app, remove the padding with `p-0`:

```tsx
<Card>
  <Section className="flex-row items-center">Layers</Section>
  <Section>
    <Input placeholder="Name" />
  </Section>
</Card>
```

Every element a component renders carries a `data-slot`, and a component's variants a `data-variant` or `data-size`, to select it from CSS, a theme, or a Tailwind variant such as `in-data-[slot=card]:`.

Components without JavaScript, such as `Button` and `Input`, render on the server.

Mount one `<Toaster />` near the root, then show a toast from anywhere, even outside React: `toast.add({ title: "Exported" })`.

## Parts

The components are built from a few parts, which build yours too, so they follow the theme. Use the theme's colors, such as `text-muted`, `bg-field`, or `bg-level-3`, instead of Tailwind's palette, and the parts rather than shadows or borders of your own.

Classes to put on an element, always in the theme:

| Part | Use |
| --- | --- |
| `surface-card`, `surface-panel`, `surface-float` | containers, which set the fills of what sits on them: a card rises two levels over what it sits on, even another card; a panel is a card docked in your layout, with no edge; what floats is a card drawn floating, a level up with `data-raised` for one that opens over a card |
| `sections`, `sections-stacked` | a box padded as one section until it holds `Section`s, with a line between them, or stacked without one as in a dialog |
| `overflow-fade-x`, `overflow-fade-y` | content that may not fit: it scrolls, and fades where more lies that way |
| `shimmer` | a band across pending work |

For one line of text, use `ScrollText` rather than `truncate`: it fades at the end and scrolls to show the rest, without becoming a tab stop. Inside something you click, such as a button, keep `truncate`.

Utilities, to use with any variant, such as `checked:surface-primary`, or to `@apply` in a CSS module:

| Part | Use |
| --- | --- |
| `surface-raised`, `surface-sunken`, `surface-primary` | controls: raised three levels up, sunken two down, or on |
| `segmented`, `separator` | a strip of controls a size smaller, with `surface-sunken`, and a line between groups |
| `focus-ring`, `dim-disabled` | a control's focus ring and its disabled look |
| `field` | what you type into: sunken, with a muted placeholder, ringed red when invalid |
| `popup`, `popup-list`, `popup-item` | the box of an overlay on a `surface-float`, one that pads a column of rows, and a row |
| `popup-motion`, `draw` and `drawn` | a popup growing from its trigger, and a stroke that draws itself in |

A component of your own can take its styles from a CSS module, as the library's do, referencing your CSS for the theme:

```css
@reference "../app.css";

.trigger {
  @apply inline-flex h-7 items-center rounded-md px-3 surface-raised focus-ring hover:bg-raised-hover;
}
```

## Components

| Section | Components |
| --- | --- |
| Actions | `Button`, `IconButton`, `CopyButton`, `Chip`, `Kbd`, `Badge` |
| Inputs | `Input`, `Textarea`, `Field`, `Checkbox`, `DragToggle`, `Radio`, `Switch`, `ToggleGroup`, `Select`, `Combobox`, `Slider`, `ScrubInput` |
| Containers | `Card`, with `Section` and `SectionAction` from `section`; `Collapsible`, `ScrollArea`, `CodeBlock` |
| Navigation | `Tabs`, `ListItem`, `TreeList` |
| Overlays | `Tooltip`, `Menu`, `ContextMenu`, `Popover`, `Dialog`, `Notice`, `Toast` |
| Effects | `Spinner`, `ScrollText` |

Each one has a live demo and its install command on the [docs site](https://ui.roprgm.com).

## Theme

`base.css` holds the tokens, the parts, and the page's rules: 13px text on a dark background. `themes/default.css` imports it, sets the edges that draw surfaces with light and shadow, and sets Geist when your app loads it. The comments in both files describe each token.

### Colors

| Token | Use |
| --- | --- |
| `level-0` to `level-12` | the backgrounds of the interface: black, then darkest first in even steps of lightness; every fill is one of them |
| `surface`, `field`, `raised`, `raised-hover`, `hover` | fills relative to the surface they sit on: its own, a field two levels below, a raised control three above and four on hover, and a ghost's hover one above |
| `foreground`, `muted`, `faint`, `disabled` | text, strongest first: `faint` for what should barely show, such as a disclaimer |
| `primary`, `primary-hover`, `on-primary` | primary buttons, checked controls, and slider thumbs |
| `pressed` | a translucent state for ghost buttons and chips |
| `line`, `separator`, `focus`, `backdrop` | the lines between a card's parts, a separator's translucent dark, the focus ring, and the shade behind a dialog |
| `danger` | errors |

### Surfaces

A surface is what a box is filled with and how it stands against what's under it; the theme draws its edge. A raised surface fills itself two levels over where it sits and sets the fills of what sits on it, so everything keeps its contrast at any depth and every color is one of the palette's:

| Surface | Fill | Used by |
| --- | --- | --- |
| `surface-card` | two levels up from what it sits on | cards |
| `surface-panel` | a card's, with no edge | a card docked in your layout, such as a sidebar |
| `surface-float` | a card's, drawn floating; with `raised`, a level up | popups, dialogs, notices, anything dragged |
| `surface-raised` | three levels up from what it sits on | buttons, selects, selected tabs and toggles |
| `surface-sunken` | two levels down from what it sits on | fields, tracks, checkboxes, switches, groups |
| `surface-primary` | the primary color | primary buttons, checked switches, slider thumbs |
| `separator` | a line | a menu's separators |

### Edges

A surface's edge is a box shadow from a token: `--edge-raised`, `--edge-sunken`, `--edge-primary`, `--edge-card`, and `--edge-float`, with `--color-separator-light` beside a separator's line. `base.css` draws none, so surfaces stand apart by their fills alone; `themes/default.css` sets them.

### Sizes

Controls are 28px tall (`h-7`), with 24px and 32px sizes, and list rows 40px. Heights and spacing are Tailwind's own, so a control of your own takes the same classes.

### Customize

Set a token again to restyle every component that uses it, edges too. Set it in `@theme static`, since a plain `@theme` writes a token only when your own classes use it, and components bring their CSS apart from yours:

```css
@theme static {
  --color-primary: oklch(67% 0.16 252);
  --radius-md: 8px;
  --edge-raised: inset 0 0 0 1px oklch(100% 0 0 / 0.08);
}
```

A theme is only tokens: it imports `base.css` and sets again the ones it changes. For one component's part, set tokens on its `data-slot`, as `themes/lines.css` flattens a slider's track with `[data-slot="slider-track"] { --edge-sunken: none; }`. A surface of your own sets the fills of what sits on it and paints its own:

```css
@utility surface-sidebar {
  --color-surface: var(--color-level-1);
  --color-field: var(--color-level-0);
  --color-raised: var(--color-level-4);
  --color-raised-hover: var(--color-level-5);
  --color-hover: var(--color-level-2);
  background-color: var(--color-surface);
}
```

## Development

```bash
bun install
bun run dev
```

`bun run check` formats, lints, and type-checks. `bun run build` compiles the package, each component's CSS module with Tailwind into plain CSS beside its JavaScript, the registry, and the docs site.

Publishing a GitHub release publishes the package to npm. The release tag must match the version in `package.json`, such as `v0.6.0`.
