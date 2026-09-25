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
<div className="layer-card rounded-xl p-(--padding) shadow-raised">
  <Input placeholder="Name" />
</div>
```

- Use `layer-card` for panels and cards, and `layer-elevated` for a card inside a card.
- Use the theme's colors, such as `text-muted` or `bg-field`, instead of Tailwind's palette.
- Paint your own controls with the `surface-*` utilities, and use shadows instead of borders.

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

`theme.css` holds what a theme decides: colors, radii, sizes, and shadows. It imports `base.css`, the utilities the components are built from, and sets the page to 13px text on a dark background, in Geist when your app loads it. The comments in both files describe each token.

### Colors

| Token | Use |
| --- | --- |
| `foreground`, `muted`, `faint`, `disabled` | text, from strongest to weakest |
| `field` | inputs, checkboxes, and tracks |
| `raised`, `raised-hover` | buttons, selects, and selected items |
| `primary`, `primary-hover`, `on-primary` | primary buttons, checked controls, and slider thumbs |
| `hover`, `pressed` | translucent states for ghost buttons and chips |
| `line`, `focus`, `danger`, `backdrop` | dividers, the focus ring, errors, and the shade behind a dialog |
| `gray-1` to `gray-8` | the gray scale, darkest first |

### Layers and surfaces

The page, `layer-card`, and `layer-elevated` each paint a background from the gray scale and set the `field` and `raised` colors of the controls on them. Menus, popovers, and select lists open one layer above the one their trigger sits on; dialogs and notices are cards.

Controls stand on their layer with four utilities: `surface-raised` (buttons, selects), `surface-primary` (primary buttons, slider thumbs), `surface-sunken` (fields, tracks), and `surface-fill` (checked checkboxes, switches that are on).

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

Publishing a GitHub release publishes the package to npm. The release tag must match the version in `package.json`, such as `v0.5.0`.
