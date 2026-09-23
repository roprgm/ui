# @roprgm/ui

Minimal dark UI components for React and Tailwind CSS v4, meant for professional tools such as photo and video editors. Most are plain styled HTML; Base UI supplies behavior only where CSS can't (Select, Tooltip).

## Install

Copy the source into your app with the shadcn CLI:

```bash
npx shadcn@latest add https://ui.roprgm.com/r/button.json
```

Or use the package:

```bash
bun add @roprgm/ui
```

```css
@import "tailwindcss";
@import "@roprgm/ui/theme.css";
/* Optional page defaults: 13px text, the page background, dark form controls, Geist first. */
@import "@roprgm/ui/base.css";
```

`base.css` uses Geist when the app loads it, with `next/font` or `@fontsource-variable/geist`, and the system font otherwise.

```tsx
import { Button } from "@roprgm/ui/button";

<Button render={<Link href="/trips" />}>Trips</Button>;
```

Components with Base UI, hooks, or their own handlers are marked `"use client"`; the rest, such as `Button`, `Input`, and `Textarea`, render in React Server Components.

## Components

| Section | Component | JavaScript |
| --- | --- | --- |
| Primitives | `Button` (`render` draws it as another element) | none |
| | `IconButton` | Tooltip |
| | `Input` (`aria-invalid` and file pickers styled) | none |
| | `Textarea` | none |
| | `Field` (label, control, description or error) | ids only |
| | `Checkbox` | none |
| | `Switch` | none |
| | `ToggleGroup`, `Toggle` | none |
| | `Select` | Base UI |
| | `Chip` | none |
| | `Spinner` | none |
| Overlays | `Tooltip`, `TooltipProvider` | Base UI |
| | `Menu`, `MenuItem`, `MenuSeparator`, `Submenu` | Base UI |
| | `Popover` | Base UI |
| | `Notice` | none |
| Panels | `Panel`, `PanelHeader`, `PanelSection`, `PanelBody` | resizing only |
| | `TabList`, `Tab` | arrow keys |
| | `ListItem` | none |
| | `ScrollArea` | Base UI |
| Controls | `Slider` (`variant`: `panel`, `toolbar`, or `compact` without the bar; the fill runs from `origin`, the default value, to the value) | none for the bar |
| | `ScrubInput` | drag, typing, and arrow keys |
| | `VerticalSlider` | none |

`theme.css` also provides utilities: `shadow-raised`, `shadow-sunken`, `shadow-float`, `drop-shadow-float`, `focus-ring`, `shimmer`, and the `thumb:` variant for range thumbs.

The site at `site/` documents each component and shows a photo editor built from them.

## Development

```bash
bun install
bun run dev
```

`bun run check` formats, lints, and type-checks. `bun run build` compiles `dist/`, writes the registry to `site/public/r/`, and builds the site.
