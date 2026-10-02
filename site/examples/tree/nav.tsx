"use client";

import { Tree } from "@roprgm/ui/tree";

type Page = { id: string; title: string; children?: Page[] };

const pages: Page[] = [
  { id: "/trips", title: "Trips" },
  {
    id: "europe",
    title: "Europe",
    children: [
      { id: "/trips/lisbon", title: "Lisbon" },
      { id: "/trips/porto", title: "Porto" },
    ],
  },
  {
    id: "asia",
    title: "Asia",
    children: [
      { id: "/trips/kyoto", title: "Kyoto" },
      { id: "/trips/tokyo", title: "Tokyo" },
    ],
  },
];

export default function TreeNav() {
  const current = "/trips/lisbon";
  return (
    <Tree
      aria-label="Trips"
      items={pages}
      label={(page) => page.title}
      selected={current}
      render={(page) =>
        page.children ? undefined : (
          // biome-ignore lint/a11y/useAnchorContent: the row fills it.
          <a
            href={page.id}
            aria-current={page.id === current ? "page" : undefined}
            onClick={(event) => event.preventDefault()}
          />
        )
      }
      className="w-48"
    >
      {(page) => page.title}
    </Tree>
  );
}
