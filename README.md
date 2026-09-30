# @roprgm/ui

A minimal, dark UI library for React and Tailwind CSS v4.

Docs and live examples: [ui.roprgm.com](https://ui.roprgm.com)

## Install

Add the package, then import the theme after Tailwind in your CSS:

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

- Use `surface-card` for cards, which rise two levels over what they sit on, even another card, and `surface-raised` for controls, three levels up. Dock a card in your layout with `surface-panel`, which has no edge. What floats is `surface-float`, a card drawn floating: a popup opens as a card on the page, and with `raised`, a level up, for one that opens over a card.
- Use the theme's colors, such as `text-muted`, `bg-field`, or `bg-level-3`, instead of Tailwind's palette.
- Build your own controls from the `surface-*` primitives rather than shadows or borders of your own, so they follow the theme.
- For content that may not fit, use `overflow-fade-x` or `overflow-fade-y`: it scrolls, and fades where more lies that way. For one line of text, use `ScrollText` rather than `truncate`: it fades at the end and scrolls to show the rest, without becoming a tab stop. Inside something you click, such as a button, keep `truncate`.

Components without JavaScript, such as `Button` and `Input`, render on the server.

Mount one `<Toaster />` near the root, then show a toast from anywhere, even outside React: `toast.add({ title: "Exported" })`.

## Components

| Section | Components |
| --- | --- |
| Actions | `Button`, `IconButton`, `CopyButton`, `Chip`, `Kbd`, `Badge` |
| Inputs | `Input`, `Textarea`, `Field`, `Checkbox`, `DragToggle`, `Radio`, `Switch`, `ToggleGroup`, `Select`, `Combobox`, `Slider`, `ScrubInput` |
| Containers | `Card`, with `Section` and `SectionAction` from `section`, and `sections()` for a panel docked at your app's side; the `surface-*` primitives; `Collapsible`, `ScrollArea`, `CodeBlock` |
| Navigation | `Tabs`, `ListItem`, `TreeList` |
| Overlays | `Tooltip`, `Menu`, `ContextMenu`, `Popover`, `Dialog`, `Notice`, `Toast` |
| Effects | `Spinner`, `ScrollText`, and the `shimmer`, `overflow-fade-x`, and `overflow-fade-y` utilities |

Each one has a live demo and its install command on the [docs site](https://ui.roprgm.com).

## Theme

`base.css` holds the tokens, the primitives the components are built from, and the page's rules: 13px text on a dark background. `themes/default.css` imports it, draws the primitives with light and shadow, and sets Geist when your app loads it. The comments in both files describe each token.

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

### Sizes

Controls are 28px tall (`h-7`), with 24px and 32px sizes, and list rows 40px. Heights and spacing are Tailwind's own, so a control of your own takes the same classes.

### Customize

Redefine a token to restyle every component that uses it:

```css
@theme {
  --color-primary: oklch(67% 0.16 252);
  --radius-md: 8px;
}
```

A theme changes what a surface is by setting its fills again, at each depth, in its own `@utility surface-card`. A surface of your own sets the fills of what sits on it and paints its own:

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

`bun run check` formats, lints, and type-checks. `bun run build` compiles the package, the registry, and the docs site.

Publishing a GitHub release publishes the package to npm. The release tag must match the version in `package.json`, such as `v0.6.0`.
