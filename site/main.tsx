import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "../src/components/tooltip";
import {
  ButtonDemo,
  CheckboxDemo,
  ChipDemo,
  DialogDemo,
  FieldDemo,
  IconButtonDemo,
  InputDemo,
  KbdDemo,
  LayersDemo,
  ListItemDemo,
  MenuDemo,
  NoticeDemo,
  PanelDemo,
  PopoverDemo,
  ScrollAreaDemo,
  ScrollTextDemo,
  ScrubInputDemo,
  SelectDemo,
  ShimmerDemo,
  SliderDemo,
  SpinnerDemo,
  SurfacesDemo,
  SwitchDemo,
  TabsDemo,
  TextareaDemo,
  ToggleGroupDemo,
  TooltipDemo,
  TreeListDemo,
  VerticalSliderDemo,
} from "./demos";
import { type Group, Page } from "./docs";
import { EditorDemo } from "./editor";
import { FormsDemo } from "./forms";
import { Usage } from "./usage";

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
      {
        name: "kbd",
        title: "Kbd",
        description:
          "A shortcut written as Mod Z: Mod shows as ⌘ on a Mac and Ctrl elsewhere. Tooltips and menu items take one as shortcut.",
        demo: <KbdDemo />,
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
        name: "card",
        title: "Card",
        description:
          "Theme utilities: layer-card and layer-elevated paint a card and set the fills for the fields and buttons on it, so they keep the same contrast on the page, in a card, and in a card inside it.",
        demo: <LayersDemo />,
        bare: true,
        code: '<div className="layer-card rounded-xl surface-card">…</div>',
      },
      {
        name: "surfaces",
        title: "Surfaces",
        description:
          "The primitives components are built from: surface-raised lifts a control off its layer, surface-sunken sets it in, surface-card stands a card on the page, surface-float lifts a popup over everything, surface-thumb marks what you grab, and separator draws a line between groups. The base gives each its fill and the theme draws its edge, so a control you build with them follows the theme too.",
        demo: <SurfacesDemo />,
        code: '<button className="surface-raised hover:bg-raised-hover rounded-md px-3">…</button>',
      },
      {
        name: "panel",
        title: "Panel",
        description:
          "A side panel of sections with dividers, a scrolling body, and an optional resize edge.",
        demo: <PanelDemo />,
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
        title: "Tab list",
        description:
          "Rows or columns of tabs with arrow-key navigation. The segmented variant sets them into a sunken strip, as a tool rail or a switch between views.",
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
        name: "dialog",
        title: "Dialog",
        description:
          "A modal for decisions that need an answer, such as exporting or confirming a delete. DialogClose closes it.",
        demo: <DialogDemo />,
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
      {
        name: "scroll-text",
        title: "Scroll text",
        description:
          "A theme utility: one line of text that fades at the end instead of an ellipsis when it doesn't fit, and scrolls sideways to show the rest. Use it where you would use truncate. The fade follows the scroll, and scroll-fade-x gives the same fade to anything that scrolls sideways.",
        demo: <ScrollTextDemo />,
        code: '<span className="scroll-text">{layer.name}</span>',
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
      {
        name: "forms",
        title: "Forms",
        description:
          "Fields, buttons, selects, and toggles side by side, in a card and on the page, to see how their sizes and paddings sit together.",
        demo: <FormsDemo />,
        block: true,
      },
    ],
  },
];

// biome-ignore lint/style/noNonNullAssertion: index.html provides #root.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
      <Page groups={groups} usage={<Usage />} />
    </TooltipProvider>
  </StrictMode>,
);
