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

Or copy components into your app with the shadcn CLI. No package needed: each component brings its stylesheet, shared styles, the theme, and the components it uses.

```bash
npx shadcn@latest add https://ui.roprgm.com/r/button.json
```

The copied components resolve their own Tailwind references. To also use library tokens and core helpers in your app's Tailwind classes, reference the installed `core.css` from your CSS entry. Adjust the relative path for your app's layout:

```css
@import "tailwindcss";
@reference "./components/ui/core.css";
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

Each component imports `core.css` and its own stylesheet. `core.css` defines the tokens, surfaces, and shared control and popup helpers; overflow utilities and their animations live together in `overflow.css`, imported only by components that scroll. Component stylesheets use `@reference` for these definitions and `@apply` or native CSS for their rules. Importing Button and Select includes their dependency graph; it does not scan or load the rest of the library.

The npm package ships compiled CSS beside each JavaScript module. The shadcn registry copies the matching source CSS and its references beside the component, so your app's Tailwind compiler processes them. Neither installation needs an `@source` covering the library.

Component rules use Tailwind's standard `components` layer. App utilities override them through `className`. Themes set CSS variables for colors, radii, and surface edges, and can target public `data-slot`, `data-variant`, and `data-size` attributes with normal CSS. No provider is required.

`themes/default.css` registers the tokens with Tailwind, draws surface edges, and sets the page's rules: 13px text on a dark background, using Geist when your app loads it. To build your own primitives with utilities such as `surface-raised` or `overflow-fade-x`, opt into the shared helpers:

```css
@import "tailwindcss";
@import "@roprgm/ui/base.css";
@import "@roprgm/ui/themes/default.css";
```

`base.css` is an optional collection of foundations; it does not import component styles.

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

Load your CSS after the default theme. Redefine a token to restyle every component that uses it:

```css
:root {
  --color-primary: oklch(67% 0.16 252);
  --radius-md: 8px;
}
```

Surface edges are CSS variables too: set `--edge-raised`, `--edge-sunken`, `--edge-primary`, `--edge-card`, or `--edge-float` to a box shadow, or `none`. To change a specific component, select its public slot. These unlayered rules override the library's layered defaults, including components loaded later:

```css
[data-slot="button"][data-variant="primary"] {
  border-radius: 999px;
  background: var(--color-primary);
}
```

A surface of your own sets the fills of what sits on it and paints its own:

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

`bun run check` formats, lints, and type-checks. `bun run build` compiles each stylesheet module, the package, the registry, and the docs site. `bun run verify` builds isolated npm and registry consumers and checks that only their style dependencies are included. CI runs these checks.

Publishing a GitHub release publishes the package to npm. The release tag must match the version in `package.json`, such as `v0.6.0`.
