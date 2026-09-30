# @roprgm/ui

A minimal, dark UI library for React, styled with CSS modules. It works with Tailwind CSS v4 or without it.

Docs and live examples: [ui.roprgm.com](https://ui.roprgm.com)

## Install

Add the package, then import the theme in your CSS:

```bash
bun add @roprgm/ui
```

```css
@import "@roprgm/ui/themes/default.css";
```

With Tailwind, import the theme after it, and `tailwind.css` for utilities from the theme's tokens, such as `bg-raised` and `text-muted`:

```css
@import "tailwindcss";
@import "@roprgm/ui/themes/default.css";
@import "@roprgm/ui/tailwind.css";
```

Or copy components into your app with the shadcn CLI. No package needed: each component brings its CSS module, the theme, and the components it uses.

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

A card, popover, dialog, or notice pads its content as one section. To split it, put its parts in `Section`s: one reads the same as none, and several stack with a line between each, or, in a dialog or notice, without one. A `Collapsible` counts as a section. For content that runs edge to edge, such as a frame around an app, remove the padding:

```tsx
<Card>
  <Section className="flex-row items-center">Layers</Section>
  <Section>
    <Input placeholder="Name" />
  </Section>
</Card>
```

A `className` restyles a component: your utilities and your own CSS override its styles, since the library's sit in cascade layers under them. Each component's elements carry a `data-slot`, and its variants a `data-variant` or `data-size`, to select them from your CSS.

Components without JavaScript, such as `Button` and `Input`, render on the server.

Mount one `<Toaster />` near the root, then show a toast from anywhere, even outside React: `toast.add({ title: "Exported" })`.

## Parts

The theme brings the classes the components are built from, for controls of your own. They follow the theme like the components do.

| Part | Use |
| --- | --- |
| `surface-card`, `surface-panel`, `surface-float` | containers, which set the fills of what sits on them: a card rises two levels over what it sits on, even another card; a panel is a card docked in your layout, with no edge; what floats is a card drawn floating, a level up with `data-raised` |
| `surface-raised`, `surface-sunken`, `surface-primary` | controls: raised three levels up, sunken two down, or on |
| `segmented` | a strip of controls a size smaller, with `surface-sunken` |
| `separator` | a line between groups; size it 1px |
| `sections`, `sections-stacked` | a box padded as one section until it holds `Section`s, with a line between them or stacked without one |
| `focus-ring`, `dim-disabled` | a control's focus ring and its disabled look |
| `popup-motion` | a popup that grows from its trigger |
| `overflow-fade-x`, `overflow-fade-y` | content that may not fit: it scrolls, and fades where more lies that way |
| `shimmer` | a bright band across pending work |

For one line of text, use `ScrollText` rather than an ellipsis: it fades at the end and scrolls to show the rest, without becoming a tab stop. Inside something you click, such as a button, keep the ellipsis.

In a CSS module, compose a part: `composes: surface-raised focus-ring from global;`.

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

`base.css` holds the tokens, the parts, and the page's rules: 13px text on a dark background. `themes/default.css` imports it, draws the surfaces' edges with light and shadow, and sets Geist when your app loads it. The comments in both files describe each token.

### Colors

| Token | Use |
| --- | --- |
| `--color-level-0` to `--color-level-12` | the backgrounds of the interface: black, then darkest first in even steps of lightness; every fill is one of them |
| `--color-surface`, `-field`, `-raised`, `-raised-hover`, `-hover` | fills relative to the surface they sit on: its own, a field two levels below, a raised control three above and four on hover, and a ghost's hover one above |
| `--color-foreground`, `-muted`, `-faint`, `-disabled` | text, strongest first: `faint` for what should barely show, such as a disclaimer |
| `--color-primary`, `-primary-hover`, `-on-primary` | primary buttons, checked controls, and slider thumbs |
| `--color-pressed` | a translucent state for ghost buttons and chips |
| `--color-line`, `-separator`, `-focus`, `-backdrop` | the lines between a card's parts, a separator's translucent dark, the focus ring, and the shade behind a dialog |
| `--color-danger` | errors |

### Edges

A surface's edge is a box shadow the theme draws: `--edge-raised`, `--edge-sunken`, `--edge-primary`, `--edge-card`, and `--edge-float`, with `--color-separator-light` beside a separator's line. `base.css` draws none, so surfaces stand apart by their fills alone.

### Sizes

Controls are 28px tall, with 24px and 32px sizes, and list rows 40px. Radii are `--radius-xs` to `--radius-xl`.

### Customize

Set a token again to restyle every component that uses it, in CSS outside a layer, which overrides the theme's. With Tailwind, set it there rather than in `@theme`, which sits under the theme:

```css
:root {
  --color-primary: oklch(67% 0.16 252);
  --radius-md: 8px;
}
```

Set tokens on a part of the page to restyle only what's in it, or on a component's `data-slot` to restyle only it:

```css
[data-slot="button"] {
  --radius-md: 14px;
}
```

A theme of your own imports `base.css` and sets the tokens it changes, edges included, in the `theme` layer, so an app's CSS still overrides it:

```css
@import "@roprgm/ui/base.css";

@layer theme {
  :root {
    --edge-raised: inset 0 0 0 1px oklch(100% 0 0 / 0.08);
    --edge-card: inset 0 0 0 1px oklch(100% 0 0 / 0.08);
  }
}
```

A container of your own sets the fills of what sits on it and paints its own:

```css
.sidebar {
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

`bun run check` formats, lints, and type-checks. `bun run build` compiles the package, the registry, and the docs site.

Publishing a GitHub release publishes the package to npm. The release tag must match the version in `package.json`, such as `v0.6.0`.
