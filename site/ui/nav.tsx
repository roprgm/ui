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
import { BlocksIcon, BookIcon, ComponentsIcon } from "./icons";

export type NavNode = {
  id: string;
  title: string;
  href?: string;
  children?: NavNode[];
};

/** A section of the tree, with only what the menu shows. */
export type NavSection = {
  slug: string;
  title: string;
  count: number;
  /** Pages straight under the section, with no groups, hang from a line as a group's do. */
  flat: boolean;
  items: NavNode[];
};

const icons: Record<string, ReactNode> = {
  fundamentals: <BookIcon />,
  components: <ComponentsIcon />,
  blocks: <BlocksIcon />,
};

/** The site's tree: each section, its groups, and their pages. */
export function Nav({
  sections,
  onNavigate,
}: {
  sections: NavSection[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col">
      {sections.map((section) => (
        <Collapsible key={section.slug} defaultOpen>
          <CollapsibleTrigger className="mb-px h-6.5 gap-1.5 rounded-md px-2 py-0 font-medium text-foreground data-panel-open:rounded-md">
            <span className="text-secondary">{icons[section.slug]}</span>
            {section.title}
            <span className="ml-auto font-normal text-muted tabular-nums">
              {section.count}
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
              items={section.items}
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
                section.flat
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
