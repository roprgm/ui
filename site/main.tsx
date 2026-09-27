import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "../src/components/toast";
import { TooltipProvider } from "../src/components/tooltip";
import {
  AlertDialogDemo,
  BadgeDemo,
  ButtonDemo,
  CardDemo,
  CheckboxDemo,
  ChipDemo,
  CollapsibleDemo,
  ColorsDemo,
  ComboboxDemo,
  ContextMenuDemo,
  DepthDemo,
  DialogDemo,
  FieldDemo,
  IconButtonDemo,
  InputDemo,
  KbdDemo,
  ListItemDemo,
  MenuDemo,
  NoticeDemo,
  PopoverDemo,
  RadioDemo,
  ScrollAreaDemo,
  ScrollTextDemo,
  ScrubInputDemo,
  SelectDemo,
  ShimmerDemo,
  SizesDemo,
  SliderDemo,
  SpinnerDemo,
  SurfacesDemo,
  SwitchDemo,
  TabsDemo,
  TextareaDemo,
  ToastDemo,
  ToggleGroupDemo,
  TooltipDemo,
  TreeListDemo,
} from "./demos";
import { type Group, Page } from "./docs";
import { EditorDemo } from "./editor";
import { FormsDemo } from "./forms";
import { Overview } from "./overview";

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
        bare: true,
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
        half: true,
      },
      {
        name: "badge",
        title: "Badge",
        description:
          "A short label that isn't a control, such as a status or a count. primary marks what is new; it renders on the server.",
        demo: <BadgeDemo />,
        half: true,
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
        half: true,
      },
      {
        name: "radio",
        title: "Radio",
        description:
          "A native radio: radios that share a name choose one, without JavaScript.",
        demo: <RadioDemo />,
        half: true,
      },
      {
        name: "switch",
        title: "Switch",
        description: "A native checkbox with the switch role.",
        demo: <SwitchDemo />,
        half: true,
      },
      {
        name: "toggle-group",
        title: "Toggle group",
        description:
          "Segmented choices from hidden radios, without JavaScript.",
        demo: <ToggleGroupDemo />,
        half: true,
      },
      {
        name: "select",
        title: "Select",
        description: "One value, or several with multiple, from a list.",
        demo: <SelectDemo />,
        bare: true,
      },
      {
        name: "combobox",
        title: "Combobox",
        description:
          "A choice from a list, filtered as you type, for lists too long to scan, such as fonts.",
        demo: <ComboboxDemo />,
      },
      {
        name: "slider",
        title: "Slider",
        description:
          "A labeled value with a bar. Compact drops the bar and edits by dragging the value; a vertical orientation stands the bar upright alone.",
        demo: <SliderDemo />,
        bare: true,
      },
      {
        name: "scrub-input",
        title: "Scrub input",
        description:
          "A number that drags sideways, types on click, and steps with the arrow keys.",
        demo: <ScrubInputDemo />,
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
          "Padded as one section until it holds Sections, which stack with a line between each; the first reads as a header and the last as a footer. SectionAction holds a header's icon buttons. For a panel docked in a layout, put surface-card, without its edge, and sections() on your own element, as the Photo editor block does.",
        demo: <CardDemo />,
      },
      {
        name: "collapsible",
        title: "Collapsible",
        description:
          "A section whose trigger shows and hides its panel, such as a card that opens to its details. The panel slides open, and find-in-page opens it.",
        demo: <CollapsibleDemo />,
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
          "Tabs and the panels they show, in a row or a column, with arrow-key navigation. The segmented variant sets them into a sunken strip, as a tool rail or a switch between views.",
        demo: <TabsDemo />,
        bare: true,
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
        name: "context-menu",
        title: "Context menu",
        description:
          "A menu's commands at the pointer, opened by a right-click or a long press on its trigger.",
        demo: <ContextMenuDemo />,
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
          "A modal for decisions that need an answer, such as exporting. DialogClose closes it; alert asks before what can't be undone.",
        demo: (
          <>
            <DialogDemo />
            <AlertDialogDemo />
          </>
        ),
      },
      {
        name: "notice",
        title: "Notice",
        description:
          "A message that floats without blocking the app; NoticeClose dismisses it.",
        demo: <NoticeDemo />,
      },
      {
        name: "toast",
        title: "Toast",
        description:
          "Notices in a corner, shown with toast.add from anywhere once a Toaster is mounted. They close on their own, or swipe away.",
        demo: <ToastDemo />,
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
        half: true,
      },
      {
        name: "shimmer",
        title: "Shimmer",
        description:
          "A theme utility: a bright band sweeps across text, icons, or placeholder blocks while work is pending.",
        demo: <ShimmerDemo />,
        half: true,
        code: '<span className="shimmer">Decoding RAW…</span>',
      },
      {
        name: "scroll-text",
        title: "Scroll text",
        description:
          "One line of text that fades and scrolls where it doesn't fit, instead of an ellipsis. It's the overflow-fade-x utility, which works on any row that may not fit, such as tabs or chips.",
        demo: <ScrollTextDemo />,
      },
    ],
  },
  {
    title: "Foundations",
    docs: [
      {
        name: "surfaces",
        title: "Surfaces",
        description:
          "What every component is built from: a fill, and an edge the theme draws. Build your own controls from them and they follow the theme.",
        demo: <SurfacesDemo />,
        code: '<button className="surface-raised hover:bg-raised-hover rounded-md px-3">…</button>',
      },
      {
        name: "depth",
        title: "Depth",
        description:
          "A card rises two levels over what it sits on, and what sits on it follows, so controls keep their contrast at any depth.",
        demo: <DepthDemo />,
        bare: true,
        code: '<div className="rounded-xl surface-card">…</div>',
      },
      {
        name: "colors",
        title: "Colors",
        description:
          "Every fill is a level, 3.7% apart in lightness. Muted and disabled text fade the foreground, so they read on any level.",
        demo: <ColorsDemo />,
        bare: true,
        code: '<div className="bg-level-4 text-muted">…</div>',
      },
      {
        name: "sizes",
        title: "Sizes",
        description:
          "Controls are 28px tall, with 24px and 32px sizes. List rows are 40px.",
        demo: <SizesDemo />,
        code: '<Button size="sm">…</Button>',
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
      <Page groups={groups} overview={<Overview />} />
      <Toaster />
    </TooltipProvider>
  </StrictMode>,
);
