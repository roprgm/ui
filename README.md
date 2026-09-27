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
<div className="layer-card surface-card rounded-xl p-3.5">
  <Input placeholder="Name" />
</div>
```

- Use `layer-card` for panels and cards; one inside another card rises to `layer-elevated` on its own. Popups are `layer-elevated`.
- Use the theme's colors, such as `text-muted`, `bg-field`, or `bg-level-3`, instead of Tailwind's palette.
- Build your own controls from the `surface-*` primitives rather than shadows or borders of your own, so they follow the theme.
- For content that may not fit, use `overflow-fade-x` or `overflow-fade-y`: it scrolls, and fades where more lies that way. For one line of text, use `ScrollText` rather than `truncate`: it fades at the end and scrolls to show the rest, without becoming a tab stop. Inside something you click, such as a button, keep `truncate`.

Components without JavaScript, such as `Button` and `Input`, render on the server.

Mount one `<Toaster />` near the root, then show a toast from anywhere, even outside React: `toast.add({ title: "Exported" })`.

## Components

| Section | Components |
| --- | --- |
| Actions | `Button`, `IconButton`, `Chip`, `Kbd`, `Badge` |
| Inputs | `Input`, `Textarea`, `Field`, `Checkbox`, `Radio`, `Switch`, `ToggleGroup`, `Select`, `Combobox`, `Slider`, `ScrubInput`, `VerticalSlider` |
| Containers | `Card` with `CardSection` and `CardAction`; `layer-card` and `layer-elevated`; the `surface-*` primitives; `Collapsible`, `Panel`, `ScrollArea` |
| Navigation | `TabList`, `ListItem`, `TreeList` |
| Overlays | `Tooltip`, `Menu`, `ContextMenu`, `Popover`, `Dialog`, `Notice`, `Toast` |
| Effects | `Spinner`, `ScrollText`, and the `shimmer`, `overflow-fade-x`, and `overflow-fade-y` utilities |

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

A layer is what a container is filled with. The page, `layer-card`, and `layer-elevated` set a background, `--layer`, that the fills of the controls on them mix from, and a `layer-card` inside a card rises to the elevated level on its own. A layer of your own sets `--layer` and paints it. Popups are elevated wherever they open; dialogs and notices are cards.

A surface is how a box stands against what's under it, and the theme draws it. A container's surface is only its edge, so a container is a layer and a surface, as a card is `layer-card surface-card`; a control's surface also fills it, from the layer it sits on:

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

`--size-control` (28px) sets the height of buttons, selects, and fields, and the other sizes follow from it, such as 32px large controls and 40px list rows. Each is also a utility, for controls of your own: `h-control`, `h-control-lg`, `h-row`, and the rest listed in `base.css`. Spacing is Tailwind's own.

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
