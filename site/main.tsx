import "./index.css";
import { type ReactNode, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "../src/tooltip";
import {
  ButtonDemo,
  CheckboxDemo,
  ChipDemo,
  FieldDemo,
  IconButtonDemo,
  InputDemo,
  LayersDemo,
  ListItemDemo,
  MenuDemo,
  NoticeDemo,
  PanelDemo,
  PopoverDemo,
  ScrollAreaDemo,
  ScrubInputDemo,
  SelectDemo,
  ShimmerDemo,
  SliderDemo,
  SpinnerDemo,
  SwitchDemo,
  TabsDemo,
  TextareaDemo,
  ToggleGroupDemo,
  TooltipDemo,
  TreeListDemo,
  VerticalSliderDemo,
} from "./demos";
import { Code, type Group, Page } from "./docs";
import { EditorDemo } from "./editor";

const groups: Group[] = [
  {
    title: "Actions",
    docs: [
      {
        name: "button",
        title: "Button",
        description:
          "Actions. render draws one as another element, such as a link; it renders on the server.",
        demo: <ButtonDemo />,
      },
      {
        name: "icon-button",
        title: "Icon button",
        description:
          "A ghost icon button whose label is its accessible name and tooltip, with an optional shortcut.",
        demo: <IconButtonDemo />,
      },
      {
        name: "chip",
        title: "Chip",
        description:
          "Pill buttons for bars over a canvas; aria-pressed shows one on.",
        demo: <ChipDemo />,
      },
    ],
  },
  {
    title: "Inputs",
    docs: [
      {
        name: "input",
        title: "Input",
        description:
          "A sunken text field. aria-invalid rings it red, and file inputs get a styled picker.",
        demo: <InputDemo />,
      },
      {
        name: "textarea",
        title: "Textarea",
        description: "A multi-line field that grows with its text.",
        demo: <TextareaDemo />,
      },
      {
        name: "field",
        title: "Field",
        description:
          "A label, one control, and a description or error, connected for assistive technology.",
        demo: <FieldDemo />,
      },
      {
        name: "checkbox",
        title: "Checkbox",
        description: "A native checkbox; its label is clickable too.",
        demo: <CheckboxDemo />,
      },
      {
        name: "switch",
        title: "Switch",
        description: "A native checkbox with the switch role.",
        demo: <SwitchDemo />,
      },
      {
        name: "toggle-group",
        title: "Toggle group",
        description:
          "Segmented choices from hidden radios, without JavaScript.",
        demo: <ToggleGroupDemo />,
      },
      {
        name: "select",
        title: "Select",
        description: "One value, or several with multiple, from a list.",
        demo: <SelectDemo />,
      },
      {
        name: "slider",
        title: "Slider",
        description:
          "A labeled value with a bar; compact drops the bar and edits by dragging the value.",
        demo: <SliderDemo />,
      },
      {
        name: "scrub-input",
        title: "Scrub input",
        description:
          "A number that drags sideways, types on click, and steps with the arrow keys.",
        demo: <ScrubInputDemo />,
      },
      {
        name: "vertical-slider",
        title: "Vertical slider",
        description: "An upright range with an optional painted track.",
        demo: <VerticalSliderDemo />,
      },
    ],
  },
  {
    title: "Containers",
    docs: [
      {
        name: "panel",
        title: "Panel",
        description:
          "A side panel of sections with dividers, a scrolling body, and an optional resize edge.",
        demo: <PanelDemo />,
      },
      {
        name: "cards",
        title: "Cards",
        description:
          "Theme utilities: layer-card and layer-elevated paint a card and set the fills for the fields and buttons on it, so they keep the same contrast on the page, in a card, and in a card inside it.",
        demo: <LayersDemo />,
        bare: true,
        code: '<div className="layer-card rounded-xl shadow-raised">…</div>',
      },
      {
        name: "scroll-area",
        title: "Scroll area",
        description: "Vertical scrolling with a thin bar and faded edges.",
        demo: <ScrollAreaDemo />,
      },
    ],
  },
  {
    title: "Navigation",
    docs: [
      {
        name: "tabs",
        title: "Tabs",
        description:
          "Rows or columns of tabs with arrow-key navigation, such as a tool rail.",
        demo: <TabsDemo />,
      },
      {
        name: "list-item",
        title: "List item",
        description: "Selectable rows for collections such as layers.",
        demo: <ListItemDemo />,
      },
      {
        name: "tree-list",
        title: "Tree list",
        description:
          "Rows that nest into groups and drag to reorder or nest, with arrow-key navigation.",
        demo: <TreeListDemo />,
      },
    ],
  },
  {
    title: "Overlays",
    docs: [
      {
        name: "tooltip",
        title: "Tooltip",
        description:
          "A hint on hover or focus, with an arrow and an optional shortcut.",
        demo: <TooltipDemo />,
      },
      {
        name: "menu",
        title: "Menu",
        description: "Commands, with separators and submenus.",
        demo: <MenuDemo />,
      },
      {
        name: "popover",
        title: "Popover",
        description: "Settings that open beside their trigger.",
        demo: <PopoverDemo />,
      },
      {
        name: "notice",
        title: "Notice",
        description: "A message that floats without blocking the app.",
        demo: <NoticeDemo />,
      },
    ],
  },
  {
    title: "Effects",
    docs: [
      {
        name: "spinner",
        title: "Spinner",
        description: "Work in progress.",
        demo: <SpinnerDemo />,
      },
      {
        name: "shimmer",
        title: "Shimmer",
        description:
          "A theme utility: a bright band sweeps across text, icons, or placeholder blocks while work is pending.",
        demo: <ShimmerDemo />,
        code: '<span className="shimmer">Decoding RAW…</span>',
      },
    ],
  },
  {
    title: "Blocks",
    docs: [
      {
        name: "editor",
        title: "Photo editor",
        description:
          "A tool rail, a canvas with a floating bar, and a resizable panel. Try the Brush tool and drag the panel's edge.",
        demo: <EditorDemo />,
        block: true,
      },
    ],
  },
];

function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-base font-medium">{title}</h3>
      {children}
    </section>
  );
}

const usage = (
  <div className="flex max-w-3xl flex-col gap-10">
    <header className="flex flex-col gap-2">
      <h1 className="text-2xl font-medium">@roprgm/ui</h1>
      <p className="text-muted">
        A minimal, dark UI library for React. Use it one of two ways: copy each
        component's source into your app, or install the package.
      </p>
    </header>
    <Step title="Copy the source">
      <p className="text-muted">
        The shadcn CLI adds a component's file to your app, with the theme and
        the other components it needs. The code is yours to change. Every
        component page shows its command.
      </p>
      <Code>npx shadcn@latest add https://ui.roprgm.com/r/button.json</Code>
    </Step>
    <Step title="Or install the package">
      <p className="text-muted">
        Add it, then import the theme after Tailwind in your CSS. It also sets
        the page: 13px text, the background, and dark form controls.
      </p>
      <Code>bun add @roprgm/ui</Code>
      <Code>{`@import "tailwindcss";
@import "@roprgm/ui/theme.css";`}</Code>
    </Step>
    <Step title="Use a component">
      <p className="text-muted">
        Each component has its own path. Components without JavaScript, such as
        Button and Input, render on the server.
      </p>
      <Code>{`import { Button } from "@roprgm/ui/button";

<Button variant="primary">Export</Button>`}</Code>
    </Step>
    <Step title="Put controls on cards">
      <p className="text-muted">
        A field or a button takes its fill from the card it sits on, so it keeps
        the same contrast on the page, in a card, and in a card inside it.
      </p>
      <Code>{`<div className="layer-card rounded-xl p-3 shadow-raised">
  <Input placeholder="Name" />
</div>`}</Code>
    </Step>
  </div>
);

// biome-ignore lint/style/noNonNullAssertion: index.html provides #root.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
      <Page groups={groups} usage={usage} />
    </TooltipProvider>
  </StrictMode>,
);
