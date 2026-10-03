import type { RouteObject } from "react-router";
import { pages, sections } from "@/tree";
import { Doc } from "@/ui/doc";
import { Layout } from "@/ui/layout";
import { NotFound } from "@/ui/not-found";
import { SectionIndex } from "@/ui/section-index";

/** A route for every section and page of the tree, so each has its own URL. */
export const routes: RouteObject[] = [
  {
    Component: Layout,
    children: [
      ...sections.map((section) => ({
        path: `/${section.slug}`,
        element: <SectionIndex section={section} />,
        handle: {
          title: section.title,
          description: section.description,
          path: `/${section.slug}`,
        },
      })),
      ...pages.map((page) => ({
        path: page.href,
        element: <Doc page={page} />,
        handle:
          page.href === "/"
            ? { path: "/" }
            : {
                title: page.title,
                description: page.description,
                path: page.href,
              },
      })),
      { path: "*", Component: NotFound, handle: { title: "Not found" } },
    ],
  },
];
