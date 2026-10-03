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

Put groups of controls on a card. A card sets how the materials inside it look, so controls keep the same contrast everywhere:

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

- Use `material-card` for cards, `material-control` for what you press, and `material-field` for what you set. Dock a container in your layout with `material-panel`. What floats is `material-float`: a popup opens as a card on the page, and with `raised` a level up, for one that opens over a card.
- Use the theme's colors, such as `text-secondary`, `bg-field`, or `bg-level-3`, instead of Tailwind's palette.
- Build your own controls from the `material-*` primitives rather than shadows or borders of your own, so they follow the theme and every scope.
- For content that may not fit, use `overflow-fade-x` or `overflow-fade-y`: it scrolls, and fades where more lies that way. For one line of text, use `ScrollText` rather than `truncate`: it fades at the end and scrolls to show the rest, without becoming a tab stop. Inside something you click, such as a button, keep `truncate`.

Components without JavaScript, such as `Button` and `Input`, render on the server.

Mount one `<Toaster />` near the root, then show a toast from anywhere, even outside React: `toast.add({ title: "Exported" })`.

## Components

| Section | Components |
| --- | --- |
| Actions | `Button`, `IconButton`, `CopyButton`, `Chip`, `Kbd`, `Badge` |
| Inputs | `Input`, with `InputGroup` and `InputGroupAddon`, `Textarea`, `Field`, `Fieldset`, `Checkbox`, `DragToggle`, `Radio`, `Switch`, `ToggleGroup`, `Select`, `Combobox`, `Slider`, `ScrubInput` |
| Containers | `Card`, `Separator`, with `Section` and `SectionAction` from `section`, and `sections()` for a panel docked at your app's side; the `material-*` primitives; `Collapsible`, `ScrollArea`, `CodeBlock` |
| Navigation | `Tabs`, `ListItem`, `Tree` |
| Overlays | `Tooltip`, `Menu`, `ContextMenu`, `Popover`, `Dialog`, `Notice`, `Toast` |
| Effects | `Spinner`, `ScrollText`, and the `shimmer`, `overflow-fade-x`, `overflow-fade-y`, and `backdrop` utilities |

Each one has a page with live examples, their code, and its install command on the [docs site](https://ui.roprgm.com/components).

## Theme

`base.css` holds the tokens with their defaults, the materials as plain as they can be, the utilities, and the page's rules: 13px text on a dark background. A theme imports it and sets again what it changes: `themes/default.css` draws the materials with light and shadow, lifts what sits on a card, and sets Geist when your app loads it. The comments in these files describe each token.

### Colors

| Token | Use |
| --- | --- |
| `level-0` to `level-12` | the palette: black, then darkest first in even steps of lightness; every fill is one of them |
| `background`, `hover` | the fill of where you are, and a quiet fill on it, such as a ghost's hover or a well |
| `control`, `control-hover`, `field` | the fills of what you press and where you type: see [Materials](#materials) |
| `foreground`, `secondary`, `muted`, `disabled` | text, strongest first: text and icons, supporting text, hints, and what is disabled |
| `border`, `border-subtle` | separators, and dividers inside a material |
| `accent`, `on-accent` | what is on: checked controls and slider thumbs |
| `accent-text` | the accent as text, such as a link: the accent until a theme sets it apart |
| `primary`, `primary-hover`, `on-primary` | the main action, a primary button: the accent until a theme sets it apart |
| `success`, `warning`, `danger` | states, each with a label beside it |
| `pressed`, `focus` | a pressed ghost, and the focus ring |
| `tooltip` | a tooltip's fill |

The page sets where you are and the materials' fills, and each container sets them again for what's inside it. Materials take a card's fill until a theme sets them apart.

### Materials

A material is what a box is made of: its fill and its edge. A component is made of one, as a `Button` is of `material-control`, and the theme draws it. Each paints itself from its own variables, `--color-*` for its fill and `--shadow-*` for its edge, so any element that sets them again changes every material inside it. The docs site lists every [color](https://ui.roprgm.com/fundamentals/colors), [material](https://ui.roprgm.com/fundamentals/materials), and [utility](https://ui.roprgm.com/fundamentals/utilities), with what each is for.

| Material | Variables | Used by |
| --- | --- | --- |
| `material-card` | `--shadow-card`, `--inset-shadow-card` | cards |
| `material-panel` | | a container docked in your layout, such as a sidebar |
| `material-float` | `--shadow-float` | popups, dialogs, notices, anything dragged; a level up with `raised` |
| `material-control` | `--color-control`, `--color-control-hover`, `--shadow-control` | buttons, selects, selected tabs and toggles, slider thumbs |
| `material-field` | `--color-field`, `--shadow-field` | inputs, textareas, tracks, checkboxes, switches, code |

The first three are containers: each sets its own fill, a level, as the background of what sits on it, and sets the materials inside it again. In the default theme, a field sits two levels below what it's on, and a container lifts what sits on it two levels.

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

Every part a component renders carries a `data-slot`, and its variants a `data-variant` and `data-size`. Set tokens or materials on a slot to restyle one component, and every other stays as it is:

```css
[data-slot="button"][data-variant="default"] {
  --color-control: oklch(52% 0.14 150);
  --color-control-hover: oklch(58% 0.15 150);
  --radius-md: 9999px;
}
```

A theme of your own imports `base.css` and sets the materials' variables again: on the page in `@theme`, and inside each container on its class. For example:

```css
@import "@roprgm/ui/base.css";

@theme {
  --shadow-control: inset 0 -1px 0 oklch(0% 0 0 / 0.3);
}

/* On a card, controls turn green. */
@layer components {
  .material-card {
    --color-control: oklch(60% 0.17 150);
    --color-control-hover: oklch(66% 0.17 150);
  }
}
```

Any class of yours is a scope too. A toolbar of glass lays its controls flat:

```css
.toolbar-glass {
  background-color: oklch(20% 0 0 / 0.45);
  backdrop-filter: blur(12px);
  --color-control: oklch(100% 0 0 / 0.14);
  --color-control-hover: oklch(100% 0 0 / 0.22);
  --shadow-control: none;
}
```

## Development

```bash
bun install
bun run dev
```

`bun run check` formats, lints, and type-checks. `bun run build` compiles the package, the registry, and the docs site.

Publishing a GitHub release publishes the package to npm. The release tag must match the version in `package.json`, such as `v0.6.0`.
