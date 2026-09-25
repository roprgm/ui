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
<div className="layer-card rounded-xl p-3 shadow-raised">
  <Input placeholder="Name" />
</div>
```

- Use `layer-card` for panels and cards, and `layer-elevated` for a card inside a card.
- Use the theme's colors, such as `text-muted` or `bg-field`, instead of Tailwind's palette.
- Use `shadow-raised`, `shadow-sunken`, and `shadow-float` instead of borders.

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

`theme.css` holds the tokens: colors, radii, sizes, and shadows. It imports `base.css`, the utilities the components are built from, which read those tokens. `base.css` also sets the page to 13px text on a dark background, in Geist when your app loads it.

### Colors

| Token | Use |
| --- | --- |
| `foreground`, `muted`, `faint`, `disabled` | text, from strongest to weakest |
| `field` | inputs, checkboxes, and tracks |
| `raised`, `raised-hover` | buttons, selects, and selected items |
| `primary`, `primary-hover`, `on-primary` | primary buttons and checked controls |
| `hover`, `pressed` | translucent states for ghost buttons and chips |
| `line`, `focus`, `danger`, `backdrop` | dividers, the focus ring, errors, and the shade behind a dialog |
| `gray-1` to `gray-8` | the gray scale, darkest first |

### Layers

The page and each card pick their colors from the gray scale:

| Layer | Background | `field` | `raised` |
| --- | --- | --- | --- |
| The page | `gray-2` | `gray-1` | `gray-4` |
| `layer-card` | `gray-3` | `gray-2` | `gray-5` |
| `layer-elevated` | `gray-4` | `gray-3` | `gray-6` |

Menus, popovers, and select lists open one layer above the one their trigger sits on. Dialogs are cards.

### Surfaces

Components paint their controls with four utilities from `base.css`, so a control you build with them follows the theme too:

| Utility | Paints | Used by |
| --- | --- | --- |
| `surface-raised` | `raised` with `shadow-raised` | buttons, selects, selected tabs and toggles |
| `surface-primary` | `primary` with `shadow-raised` | primary buttons and slider thumbs |
| `surface-sunken` | `field` with `shadow-sunken` | fields, tracks, checkboxes, switches |
| `surface-fill` | `primary` with `shadow-sunken` | checked checkboxes and switches that are on |

### Density

Five tokens in `theme.css` set spacing and size; `base.css` derives the rest from them. `--padding` and `--size-control` are the density and change together: a denser theme lowers both.

Button's three heights are the scale. Other controls name their sizes after the Button they go with and measure whatever looks as tall beside it: Input and Select match it, and ToggleGroup stands 4px taller, since the eye sizes it by its raised toggle.

| Token | Default | Use |
| --- | --- | --- |
| `--padding` | 14px | from a container's edge to its content: dialog, notice, popover, and panel sections, and list rows |
| `--padding-sm` | 5px | around a list of items, as in a menu or select |
| `--padding-xs` | 3px | around a raised control set into a sunken one, as a toggle in its group |
| `--size-control` | 28px | buttons, selects, fields, chips, and row thumbnails and icon buttons |
| `--size-thumb` | 14px | a range input's thumb; the slider's fill and bar follow it |

| Derived in `base.css` | Default | Use |
| --- | --- | --- |
| `--size-control-lg` | 32px | large buttons, selects, and fields, and toggle groups |
| `--size-control-sm` | 24px | buttons inside a large field, and close buttons |
| `--size-row` | 40px | panel headers and list rows, holding a control 6px in |
| `--padding-optical` | 12px | buttons against an edge, and a section's top when it opens with text |

### Customize

Redefine any token to restyle every component that uses it:

```css
@theme {
  --color-primary: hsl(210 90% 60%);
  --radius-md: 8px;
  --padding: 16px;
  --size-control: 2rem;
}
```

Redefine a utility after the import to change what it paints. Tailwind merges both definitions and yours wins, so this flattens every sunken control:

```css
@utility surface-sunken {
  box-shadow: none;
}
```

## Development

```bash
bun install
bun run dev
```

`bun run check` formats, lints, and type-checks. `bun run build` compiles the package, the registry, and the docs site.

`bun run snapshots` compares every demo on the docs site against screenshots taken before a change, to prove a refactor changes no pixel. Take them first with `bun run snapshots --update-snapshots`; Playwright needs Chromium once, with `bunx playwright install chromium`.

Publishing a GitHub release publishes the package to npm. The release tag must match the version in `package.json`, such as `v0.5.0`.
