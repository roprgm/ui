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
```

```tsx
import { Button } from "@roprgm/ui/button";
```

## Components

| Section | Component | JavaScript |
| --- | --- | --- |
| Primitives | `Button`, `IconButton` | none; `IconButton` adds a Tooltip |
| | `Input` | none |
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
| Controls | `Slider` (`compact` drops the bar) | none for the bar |
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
