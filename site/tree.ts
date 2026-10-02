import registry from "../registry.json";

/** A page of the site; its content is `docs/{section}/{slug}.mdx`. */
export type Page = {
  section: string;
  slug: string;
  href: string;
  title: string;
  description: string;
  /** The group it sits in within its section, such as a component's category. */
  group?: string;
};

type Group = { title?: string; pages: Page[] };

export type Section = {
  slug: string;
  title: string;
  description: string;
  groups: Group[];
};

type Entry = [slug: string, title: string, description: string];

/** The page the site opens on. */
const home = "introduction";

function group(section: string, entries: Entry[], title?: string): Group {
  return {
    title,
    pages: entries.map(([slug, pageTitle, description]) => ({
      section,
      slug,
      href: slug === home ? "/" : `/${section}/${slug}`,
      title: pageTitle,
      description,
      group: title,
    })),
  };
}

const categories = [
  ["actions", "Actions"],
  ["inputs", "Inputs"],
  ["containers", "Containers"],
  ["navigation", "Navigation"],
  ["overlays", "Overlays"],
  ["effects", "Effects"],
] as const;

/** Components come from the registry, in its order, grouped by their category. */
const components = categories.map(([category, title]) =>
  group(
    "components",
    registry.items
      .filter((item) => item.categories?.includes(category))
      .map(
        (item): Entry => [item.name, item.title ?? "", item.description ?? ""],
      ),
    title,
  ),
);

const fundamentals = group("fundamentals", [
  [
    "introduction",
    "Introduction",
    "A minimal, dark component library for React and Tailwind CSS v4, on Base UI.",
  ],
  [
    "installation",
    "Installation",
    "Add it as a package, or copy each component's source into your app.",
  ],
  [
    "colors",
    "Colors",
    "Grays in even steps of lightness, four steps of text, an accent, and states.",
  ],
  [
    "tokens",
    "Color tokens",
    "The colors components use, which each region sets again for what sits on it.",
  ],
  [
    "materials",
    "Materials",
    "What a box is made of, which any container can set again for what's inside it.",
  ],
  [
    "depth",
    "Depth",
    "A card sets the colors of what sits on it, so its controls keep their contrast.",
  ],
  [
    "sizes",
    "Sizes",
    "Three control heights a theme can scale, and corners from Tailwind's scale.",
  ],
  [
    "utilities",
    "Utilities",
    "What every control shares, and patterns too fiddly to write twice.",
  ],
  [
    "writing-a-theme",
    "Writing a theme",
    "A theme imports base.css and sets again only what it changes.",
  ],
]);

const blocks = group("blocks", [
  [
    "photo-editor",
    "Photo editor",
    "A tool rail, a canvas with a floating bar, and a resizable panel.",
  ],
  [
    "forms",
    "Forms",
    "Fields, buttons, selects, and toggles side by side, in a card and on the page.",
  ],
]);

export const sections: Section[] = [
  {
    slug: "fundamentals",
    title: "Fundamentals",
    description:
      "What the library is, how to add it, and the rules its components follow.",
    groups: [fundamentals],
  },
  {
    slug: "components",
    title: "Components",
    description:
      "Every component, with its examples, its parts, and how to add it.",
    groups: components,
  },
  {
    slug: "blocks",
    title: "Blocks",
    description:
      "Whole layouts built from the components, to see how they sit together.",
    groups: [blocks],
  },
];

/** Every page, in reading order. */
export const pages = sections.flatMap((section) =>
  section.groups.flatMap((group) => group.pages),
);

export const findPage = (section: string, slug: string) =>
  pages.find((page) => page.section === section && page.slug === slug);

export const findSection = (slug: string) =>
  sections.find((section) => section.slug === slug);
