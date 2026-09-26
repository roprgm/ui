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

Put groups of controls on a card. Controls take their fills from the layer they sit on, so they keep the same contrast everywhere:

```tsx
<div className="layer-card surface-card rounded-xl p-(--padding)">
  <Input placeholder="Name" />
</div>
```

- Use `layer-card` for panels and cards, and `layer-elevated` for a card inside a card.
- Use the theme's colors, such as `text-muted`, `bg-field`, or `bg-level-3`, instead of Tailwind's palette.
- Build your own controls from the `surface-*` primitives rather than shadows or borders of your own, so they follow the theme.
- For one line of text that may not fit, use `ScrollText` rather than `truncate`: it fades at the end and scrolls to show the rest, without becoming a tab stop. Inside something you click, such as a button, keep `truncate`.

Components without JavaScript, such as `Button` and `Input`, render on the server.

## Components

| Section | Components |
| --- | --- |
| Actions | `Button`, `IconButton`, `Chip`, `Kbd` |
| Inputs | `Input`, `Textarea`, `Field`, `Checkbox`, `Switch`, `ToggleGroup`, `Select`, `Slider`, `ScrubInput`, `VerticalSlider` |
| Containers | `Card` with `CardHeader`, `CardSection`, and `CardFooter`; `layer-card` and `layer-elevated`; the `surface-*` primitives; `Collapsible`, `Panel`, `ScrollArea` |
| Navigation | `TabList`, `ListItem`, `TreeList` |
| Overlays | `Tooltip`, `Menu`, `Popover`, `Dialog`, `Notice` |
| Effects | `Spinner`, `ScrollText`, and the `shimmer`, `scroll-fade`, `scroll-fade-x`, and `scroll-text` utilities |

Each one has a live demo and its install command on the [docs site](https://ui.roprgm.com).

## Theme

`base.css` holds the tokens, the primitives the components are built from, and the page's rules: 13px text on a dark background. `themes/default.css` imports it, draws the primitives with light and shadow, and sets Geist when your app loads it. The comments in both files describe each token.

### Colors

| Token | Use |
| --- | --- |
| `foreground`, `muted`, `faint`, `disabled` | text, strongest first |
| `primary`, `primary-hover`, `on-primary` | primary buttons, checked controls, and slider thumbs |
| `field`, `raised`, `raised-hover` | fills of fields and of raised controls, mixed from the layer they sit on |
| `hover`, `pressed` | translucent states for ghost buttons and chips |
| `line`, `focus`, `danger`, `backdrop` | dividers, the focus ring, errors, and the shade behind a dialog |
| `level-1` to `level-8` | backgrounds by role: sunk below the page, the page, a card, elevated, then each more prominent |

### Layers and primitives

The page, `layer-card`, and `layer-elevated` set a background, `--layer`, that the fills of the controls on them mix from. A layer of your own sets `--layer` and paints it. Popups are elevated wherever they open; dialogs and notices are cards.

Components are built from primitives. Each sets its fill from a color token, and the theme draws its edge:

| Primitive | Stands | Used by |
| --- | --- | --- |
| `surface-raised` | out from its layer | buttons, selects, selected tabs and toggles |
| `surface-sunken` | into its layer | fields, tracks, checkboxes, switches, groups |
| `surface-card` | on the layer under it | cards and panels of controls |
| `surface-float` | over everything | popups and anything dragged |
| `surface-callout` | over everything, in a shape | tooltips with their arrow |
| `surface-thumb` | under your finger | slider thumbs and switch knobs |
| `separator` | between groups | a menu's separators |

### Density

`--size-control` (28px) sets the height of buttons, selects, and fields, and `--padding` (14px) the space from a container's edge to its content. The other sizes follow from them, such as 32px large controls and 40px list rows.

### Customize

Redefine a token to restyle every component that uses it:

```css
@theme {
  --color-primary: hsl(210 90% 60%);
  --radius-md: 8px;
  --size-control: 32px;
}
```

A layer of your own sets only its background; the controls on it follow:

```css
@utility layer-panel {
  --layer: var(--color-level-3);
  background-color: var(--layer);
}
```

## Development

```bash
bun install
bun run dev
```

`bun run check` formats, lints, and type-checks. `bun run build` compiles the package, the registry, and the docs site.

Publishing a GitHub release publishes the package to npm. The release tag must match the version in `package.json`, such as `v0.6.0`.
