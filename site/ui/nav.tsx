"use client";

import { Badge } from "@roprgm/ui/badge";
import { Chevron } from "@roprgm/ui/chevron";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@roprgm/ui/collapsible";
import { Tree } from "@roprgm/ui/tree";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { type Section, sections } from "@/tree";
import { BlocksIcon, BookIcon, ComponentsIcon } from "./icons";

type Node = { id: string; title: string; href?: string; children?: Node[] };

/** A section's pages, under a row for each of its groups. */
const nodes = (section: Section): Node[] =>
  section.groups.flatMap((group): Node[] => {
    const pages = group.pages.map((page) => ({
      id: page.href,
      title: page.title,
      href: page.href,
    }));
    if (!group.title) return pages;
    return [
      {
        id: `${section.slug}/${group.title}`,
        title: group.title,
        children: pages,
      },
    ];
  });

const icons: Record<string, ReactNode> = {
  fundamentals: <BookIcon />,
  components: <ComponentsIcon />,
  blocks: <BlocksIcon />,
};

const trees = sections.map((section) => ({
  section,
  items: nodes(section),
  count: section.groups.reduce((sum, group) => sum + group.pages.length, 0),
  // Pages straight under a section hang from a line, as a group's do.
  flat: section.groups.every((group) => !group.title),
}));

/** The site's tree: each section, its groups, and their pages. */
export function Nav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col">
      {trees.map(({ section, items, count, flat }) => (
        <Collapsible key={section.slug} defaultOpen>
          <CollapsibleTrigger className="mb-px h-6.5 gap-1.5 rounded-md px-2 py-0 font-medium text-foreground data-panel-open:rounded-md">
            <span className="text-secondary">{icons[section.slug]}</span>
            {section.title}
            <span className="ml-auto font-normal text-muted tabular-nums">
              {count}
            </span>
            <Chevron
              direction="right"
              className="text-muted group-data-open/collapsible:rotate-90"
            />
          </CollapsibleTrigger>
          {/* The space under a section folds away with it, so closed ones sit together. */}
          <CollapsiblePanel className="gap-0 p-0 pb-4 shadow-none">
            <Tree
              aria-label={section.title}
              items={items}
              label={(node) => node.title}
              selected={pathname}
              render={(node) =>
                node.href ? (
                  <Link
                    href={node.href}
                    aria-current={node.href === pathname ? "page" : undefined}
                    onNavigate={onNavigate}
                  />
                ) : undefined
              }
              className={
                flat
                  ? "ml-4 pl-1.5 shadow-[inset_1px_0_0_var(--color-control)]"
                  : undefined
              }
            >
              {(node) => (
                <>
                  {node.title}
                  {node.children && (
                    <Badge size="xs">{node.children.length}</Badge>
                  )}
                </>
              )}
            </Tree>
          </CollapsiblePanel>
        </Collapsible>
      ))}
    </nav>
  );
}
