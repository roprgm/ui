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
@import "@roprgm/ui/theme.css";
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

Put groups of controls on a card. Fields and buttons take their color from the card they sit on, so they keep the same contrast everywhere:

```tsx
<div className="layer-card rounded-xl p-(--padding) surface-raised">
  <Input placeholder="Name" />
</div>
```

- Use `layer-card` for panels and cards, and `layer-elevated` for a card inside a card.
- Use the theme's colors, such as `text-muted` or `bg-field`, instead of Tailwind's palette.
- Give your own controls a `surface-*` utility and a fill, such as `surface-raised bg-raised`, rather than shadows or borders of your own.

Components without JavaScript, such as `Button` and `Input`, render on the server.

## Components

| Section | Components |
| --- | --- |
| Actions | `Button`, `IconButton`, `Chip`, `Kbd` |
| Inputs | `Input`, `Textarea`, `Field`, `Checkbox`, `Switch`, `ToggleGroup`, `Select`, `Slider`, `ScrubInput`, `VerticalSlider` |
| Containers | Cards with `layer-card` and `layer-elevated`, the `surface-*` utilities, `Panel`, `ScrollArea` |
| Navigation | `TabList`, `ListItem`, `TreeList` |
| Overlays | `Tooltip`, `Menu`, `Popover`, `Dialog`, `Notice` |
| Effects | `Spinner`, and the `shimmer` utility |

Each one has a live demo and its install command on the [docs site](https://ui.roprgm.com).

## Theme

`theme.css` holds what a theme decides: colors, radii, sizes, and the edges its surfaces draw. It imports `base.css`, the utilities the components are built from, and sets the page to 13px text on a dark background, in Geist when your app loads it. The comments in both files describe each token.

### Colors

| Token | Use |
| --- | --- |
| `foreground`, `muted`, `faint`, `disabled` | text, from strongest to weakest |
| `field` | inputs, checkboxes, and tracks |
| `raised`, `raised-hover` | buttons, selects, and selected items |
| `primary`, `primary-hover`, `on-primary` | primary buttons, checked controls, and slider thumbs |
| `hover`, `pressed` | translucent states for ghost buttons and chips |
| `line`, `focus`, `danger`, `backdrop` | dividers, the focus ring, errors, and the shade behind a dialog |
| `gray-1` to `gray-4` | the grays the page, cards, and tooltips are painted with, darkest first |

### Layers and surfaces

The page, `layer-card`, and `layer-elevated` each set a background, `--layer`, and the `field` and `raised` colors of the controls on them are mixed from it, so they keep the same contrast on any background. A layer of your own only sets `--layer` and paints it. Popups are elevated wherever they open; dialogs and notices are cards.

Surfaces set how something stands off its layer. Each draws only its edge, from the theme, so pair it with any fill:

| Utility | Stands | Used by |
| --- | --- | --- |
| `surface-raised` | out from the layer | buttons (`bg-raised`, or `bg-primary` for primary), selects, selected tabs and toggles |
| `surface-sunken` | into the layer | fields (`bg-field`), tracks, checkboxes and switches (`bg-primary` when on) |
| `surface-float` | over everything | popups and anything dragged |
| `surface-thumb` | under your finger | slider thumbs and switch knobs |
| `separator` | between groups | a menu's separators |

### Density

`--size-control` (28px) sets the height of buttons, selects, and fields, and `--padding` (14px) the space from a container's edge to its content. `base.css` derives the rest from them, such as 32px large controls and 40px list rows. Each control sets its own side padding.

### Customize

Redefine a token to restyle every component that uses it:

```css
@theme {
  --color-primary: hsl(210 90% 60%);
  --radius-md: 8px;
  --size-control: 32px;
  --padding: 16px;
}
```

A layer of your own sets only its background; the controls on it follow:

```css
@utility layer-panel {
  --layer: hsl(0 0% 15%);
  background-color: var(--layer);
}
```

The fills are mixes of the layer, so a theme can redefine them too, such as `--color-field` in its own `@theme inline` block.

### Themes

A theme is a stylesheet that sets tokens after `theme.css`. `flat.css` removes every edge, so controls stand apart from their layer by their fills alone:

```css
@import "tailwindcss";
@import "@roprgm/ui/theme.css";
@import "@roprgm/ui/flat.css";
```

The surfaces read the `--edge-*` variables when the page renders, so a theme can also be applied at runtime or to part of a page: set them on an element and everything inside follows. An edge can be any `box-shadow`: light and shadow as in the default theme, or a border as `inset 0 0 0 1px`. Write an edge that goes away as `0 0 hsl(0 0% 0% / 0)` rather than `none`: Tailwind joins each edge with the focus ring in one `box-shadow`, and a `none` in that list removes the ring too.

## Development

```bash
bun install
bun run dev
```

`bun run check` formats, lints, and type-checks. `bun run build` compiles the package, the registry, and the docs site.

Publishing a GitHub release publishes the package to npm. The release tag must match the version in `package.json`, such as `v0.5.0`.
