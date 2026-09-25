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

Put groups of controls on a card. Fields and buttons take their color from the card they sit on, so they keep the same contrast everywhere:

```tsx
<div className="layer-card rounded-xl p-(--padding) surface-card">
  <Input placeholder="Name" />
</div>
```

- Use `layer-card` for panels and cards, and `layer-elevated` for a card inside a card.
- Use the theme's colors, such as `text-muted` or `bg-field`, instead of Tailwind's palette.
- Build your own controls from the `surface-*` primitives, such as `surface-raised` for a button, rather than shadows or borders of your own, so they follow the theme.

Components without JavaScript, such as `Button` and `Input`, render on the server.

## Components

| Section | Components |
| --- | --- |
| Actions | `Button`, `IconButton`, `Chip`, `Kbd` |
| Inputs | `Input`, `Textarea`, `Field`, `Checkbox`, `Switch`, `ToggleGroup`, `Select`, `Slider`, `ScrubInput`, `VerticalSlider` |
| Containers | Cards with `layer-card` and `layer-elevated`, the `surface-*` utilities, `Panel`, `ScrollArea` |
| Navigation | `TabList`, `ListItem`, `TreeList` |
| Overlays | `Tooltip`, `Menu`, `Popover`, `Dialog`, `Notice` |
| Effects | `Spinner`, `ScrollText`, and the `shimmer`, `scroll-fade`, and `scroll-fade-x` utilities |

Each one has a live demo and its install command on the [docs site](https://ui.roprgm.com).

## Theme

`base.css` holds the tokens (colors, radii, sizes), the primitives the components are built from, and the rules that set the page to 13px text on a dark background in the system font. A theme in `themes/` imports it and draws the primitives its own way; the default theme also sets Geist, when your app loads it. The comments in the files describe each token.

### Colors

| Token | Use |
| --- | --- |
| `foreground`, `muted`, `faint`, `disabled` | text, from strongest to weakest |
| `field` | inputs, checkboxes, and tracks |
| `raised`, `raised-hover` | buttons, selects, and selected items |
| `primary`, `primary-hover`, `on-primary` | primary buttons, checked controls, and slider thumbs |
| `hover`, `pressed` | translucent states for ghost buttons and chips |
| `line`, `focus`, `danger`, `backdrop` | dividers, the focus ring, errors, and the shade behind a dialog |
| `level-1` to `level-8` | the interface's backgrounds by role: sunk below the page, the page, a card, elevated, then each more prominent; the layers use 2 to 4, and your own backgrounds can use any |

### Layers and surfaces

The page, `layer-card`, and `layer-elevated` each set a background, `--layer`, and the `field` and `raised` colors of the controls on them are mixed from it, so they keep the same contrast on any background. A layer of your own only sets `--layer` and paints it. Popups are elevated wherever they open; dialogs and notices are cards.

Components are built from primitives: surfaces, which set how something stands off its layer, and lines. Each takes its fill from a color token, and the theme draws its edge:

| Utility | Stands | Used by |
| --- | --- | --- |
| `surface-raised` | out from the layer | buttons, selects, selected tabs and toggles |
| `surface-sunken` | into the layer | fields, checkboxes and switches |
| `surface-card` | on the layer under it | cards and panels of controls; its fill is its own layer |
| `surface-float` | over everything | popups and anything dragged; its fill is its layer |
| `surface-callout` | over everything, in a shape | tooltips with their arrow |
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

Import one theme. Each draws the primitives' edges its own way: `default.css` with light and shadow, `lines.css` with 1px lines, and `flat.css` with nothing, so controls stand apart by their fills alone. `light.css` is the default theme's light counterpart: dark text on a light-gray page with white cards, and its own colors and fills.

```css
@import "tailwindcss";
@import "@roprgm/ui/themes/lines.css";
```

A theme of your own imports `base.css`, sets again any token it changes, and adds its edges to the primitives. Change a fill through its token rather than redeclaring `background-color`: Tailwind orders the merged definitions of a utility by how many properties each has, so the base's could win.

```css
@import "@roprgm/ui/base.css";

@theme {
  --color-primary: hsl(210 90% 60%);
}

@utility surface-raised {
  box-shadow: inset 0 0 0 1px hsl(0 0% 100% / 0.12);
}
```

A theme can also redraw a part of one component through its `data-slot`, such as a slider's track. Write the rule outside any `@layer`, so it wins over the component's utilities:

```css
[data-slot="slider-track"] {
  box-shadow: none;
}
```

## Development

```bash
bun install
bun run dev
```

`bun run check` formats, lints, and type-checks. `bun run build` compiles the package, the registry, and the docs site.

Publishing a GitHub release publishes the package to npm. The release tag must match the version in `package.json`, such as `v0.5.0`.
