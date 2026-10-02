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

- Use `surface-card` for cards, `surface-control` for what you press, and `surface-field` for what you set. Dock a region in your layout with `surface-panel`. What floats is `surface-float`: a popup opens as a card on the page, and with `raised` a level up, for one that opens over a card.
- Use the theme's colors, such as `text-secondary`, `bg-field`, or `bg-level-3`, instead of Tailwind's palette.
- Build your own controls from the `surface-*` primitives rather than shadows or borders of your own, so they follow the theme.
- For content that may not fit, use `overflow-fade-x` or `overflow-fade-y`: it scrolls, and fades where more lies that way. For one line of text, use `ScrollText` rather than `truncate`: it fades at the end and scrolls to show the rest, without becoming a tab stop. Inside something you click, such as a button, keep `truncate`.

Components without JavaScript, such as `Button` and `Input`, render on the server.

Mount one `<Toaster />` near the root, then show a toast from anywhere, even outside React: `toast.add({ title: "Exported" })`.

## Components

| Section | Components |
| --- | --- |
| Actions | `Button`, `IconButton`, `CopyButton`, `Chip`, `Kbd`, `Badge` |
| Inputs | `Input`, `Textarea`, `Field`, `Checkbox`, `DragToggle`, `Radio`, `Switch`, `ToggleGroup`, `Select`, `Combobox`, `Slider`, `ScrubInput` |
| Containers | `Card`, `Separator`, with `Section` and `SectionAction` from `section`, and `sections()` for a panel docked at your app's side; the `surface-*` primitives; `Collapsible`, `ScrollArea`, `CodeBlock` |
| Navigation | `Tabs`, `ListItem`, `Tree` |
| Overlays | `Tooltip`, `Menu`, `ContextMenu`, `Popover`, `Dialog`, `Notice`, `Toast` |
| Effects | `Spinner`, `ScrollText`, and the `shimmer`, `overflow-fade-x`, and `overflow-fade-y` utilities |

Each one has a page with live examples, their code, and its install command on the [docs site](https://ui.roprgm.com/components).

## Theme

`base.css` holds the tokens with their defaults, the surfaces as plain as they can be, the utilities, and the page's rules: 13px text on a dark background. A theme imports it and sets again what it changes: `themes/default.css` draws the surfaces with light and shadow, lifts what sits on a card, and sets Geist when your app loads it. The comments in these files describe each token.

### Colors

| Token | Use |
| --- | --- |
| `level-0` to `level-12` | the palette: black, then darkest first in even steps of lightness; every fill is one of them |
| `background`, `surface` | the fill of the region you're in, and the fill a card gets there |
| `control`, `control-hover`, `field` | a control you press and its hover, and a field you set |
| `hover`, `selected` | a quiet fill, such as a ghost's hover or a well, and a highlighted or selected row |
| `foreground`, `secondary`, `muted`, `disabled` | text, strongest first: text and icons, supporting text, hints, and what is disabled |
| `border`, `border-subtle` | separators, and dividers inside a surface |
| `accent`, `on-accent` | what is on: checked controls and slider thumbs |
| `accent-text` | the accent as text, such as a link: the accent until a theme sets it apart |
| `primary`, `primary-hover`, `on-primary` | the main action, a primary button: the accent until a theme sets it apart |
| `success`, `warning`, `danger` | states, each with a label beside it |
| `pressed`, `focus`, `backdrop` | a pressed ghost, the focus ring, and the shade behind a dialog |
| `tooltip` | a tooltip's fill |

The first three rows are the colors of where you are: the page sets them, and each region sets them again for what sits on it, its own background too. Controls, fields, and selected rows take a card's fill until a theme sets them apart, as cards, inputs, and buttons share one.

### Accents

Set `data-accent` on the page, or on any part of it, to pick the accent: `violet`, `blue`, `green`, `amber`, `orange`, `coral`, or `rose`. Primary buttons take it too. Without it, the accent is the theme's own, near white in the default theme.

```html
<html data-accent="blue">
```

### Surfaces

A surface is a class that says what a box is: `base.css` paints the color of its name, and the theme draws the rest. The [docs site](https://ui.roprgm.com/fundamentals/tokens) lists every token, surface, and utility, with what each is for. Controls fill themselves from the roles of the region under them, so a region decides how the controls on it look:

| Surface | Fill | Used by |
| --- | --- | --- |
| `surface-card` | its `background`: the `surface` where it sits | cards |
| `surface-panel` | its `background`, which the theme sets | a region docked in your layout, such as a sidebar |
| `surface-float` | its `background`: the `surface` where it sits, a level up with `raised` | popups, dialogs, notices, anything dragged |
| `surface-control` | `control` | buttons, selects, selected tabs and toggles |
| `surface-field` | `field` | inputs, tracks, checkboxes, switches, segmented groups |
| `surface-accent` | `accent` | checked switches, slider thumbs |
| `surface-primary` | `primary` | primary buttons |

In the default theme, a field sits two levels below what it's on, and a card, a panel, or what floats lifts what sits on it two levels.

### Sizes

Controls are 28px tall (`h-control`), with 24px (`h-control-sm`) and 32px (`h-control-lg`) sizes, and list rows 40px. A theme can scale the three control heights through `--spacing-control`, `--spacing-control-sm`, and `--spacing-control-lg`; nothing but controls takes them. Spacing is Tailwind's own, so a control of your own takes the same classes.

### Customize

Redefine a token to restyle every component that uses it. A primary button takes the accent, so set its hover too:

```css
@theme {
  --color-accent: oklch(67% 0.16 252);
  --color-primary-hover: oklch(72% 0.15 252);
  --radius-md: 8px;
}
```

Every part a component renders carries a `data-slot`, and its variants a `data-variant` and `data-size`. Set tokens or roles on a slot to restyle one component, and every other stays as it is:

```css
[data-slot="button"][data-variant="default"] {
  --color-control: oklch(52% 0.14 150);
  --color-control-hover: oklch(58% 0.15 150);
  --radius-md: 9999px;
}
```

A theme of your own imports `base.css`, sets tokens again, and adds to a control's surface with a utility of the same name, or to a region with a rule on its class. A card's edge goes on its `::after`, a frame over its content, so a row with a fill can't cover it. For example:

```css
@import "@roprgm/ui/base.css";

@utility surface-control {
  box-shadow: inset 0 -1px 0 oklch(0% 0 0 / 0.3);
}

/* On a card, controls turn green. */
@layer components {
  .surface-card {
    --color-control: oklch(60% 0.17 150);
    --color-control-hover: oklch(66% 0.17 150);
  }
}
```

A region of your own sets the colors of where you are, its background too, and paints it:

```css
@utility surface-sidebar {
  --color-background: var(--color-level-1);
  --color-control: var(--color-level-4);
  --color-control-hover: var(--color-level-5);
  --color-field: var(--color-level-0);
  --color-hover: var(--color-level-2);
  --color-selected: var(--color-level-4);
  background-color: var(--color-background);
}
```

## Development

```bash
bun install
bun run dev
```

`bun run check` formats, lints, and type-checks. `bun run build` compiles the package, the registry, and the docs site.

Publishing a GitHub release publishes the package to npm. The release tag must match the version in `package.json`, such as `v0.6.0`.
