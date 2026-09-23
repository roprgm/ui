import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "../src/tooltip";
import {
  ButtonDemo,
  CheckboxDemo,
  ChipDemo,
  FieldDemo,
  IconButtonDemo,
  InputDemo,
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
  VerticalSliderDemo,
} from "./demos";
import { Code, type Group, Page } from "./docs";
import { EditorDemo } from "./editor";

const groups: Group[] = [
  {
    title: "Primitives",
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
        name: "chip",
        title: "Chip",
        description:
          "Pill buttons for bars over a canvas; aria-pressed shows one on.",
        demo: <ChipDemo />,
      },
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
    title: "Panels",
    docs: [
      {
        name: "panel",
        title: "Panel",
        description:
          "A side panel of sections with dividers, a scrolling body, and an optional resize edge.",
        demo: <PanelDemo />,
      },
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
        name: "scroll-area",
        title: "Scroll area",
        description: "Vertical scrolling with a thin bar and faded edges.",
        demo: <ScrollAreaDemo />,
      },
    ],
  },
  {
    title: "Controls",
    docs: [
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

const intro = (
  <header className="flex flex-col gap-4">
    <h1 className="text-2xl font-medium">@roprgm/ui</h1>
    <p className="max-w-xl text-neutral-400">
      Minimal dark components for professional tools such as photo and video
      editors. Shadows instead of borders, CSS before JavaScript, and Base UI
      where behavior needs it.
    </p>
    <Code>bun add @roprgm/ui</Code>
  </header>
);

// biome-ignore lint/style/noNonNullAssertion: index.html provides #root.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
      <Page groups={groups} intro={intro} />
    </TooltipProvider>
  </StrictMode>,
);
