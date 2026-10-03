import { Collapsible } from "@base-ui/react/collapsible";
import { Badge } from "@roprgm/ui/badge";
import { Chevron } from "@roprgm/ui/chevron";
import { Tree } from "@roprgm/ui/tree";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";
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
  const { pathname } = useLocation();
  return (
    <nav className="flex flex-col">
      {sections.map((section) => (
        <Collapsible.Root
          key={section.slug}
          defaultOpen
          className="group/section"
        >
          <Collapsible.Trigger className="mb-px flex h-6.5 w-full cursor-pointer items-center gap-1.5 rounded-md px-2 text-left font-medium text-foreground transition focus-ring -outline-offset-2 hover:bg-hover">
            <span className="text-secondary">{icons[section.slug]}</span>
            {section.title}
            <span className="ml-auto font-normal text-muted tabular-nums">
              {section.count}
            </span>
            <Chevron
              direction="right"
              className="text-muted group-data-open/section:rotate-90"
            />
          </Collapsible.Trigger>
          <Collapsible.Panel
            hiddenUntilFound
            className="h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-200 ease-out data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0 motion-reduce:transition-none"
          >
            {/* The space under a section folds away with it, so closed ones sit together. */}
            <div className="pb-4">
              <Tree
                aria-label={section.title}
                items={section.items}
                label={(node) => node.title}
                selected={pathname}
                render={(node) =>
                  node.href ? (
                    <Link
                      to={node.href}
                      aria-current={node.href === pathname ? "page" : undefined}
                      onClick={onNavigate}
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
            </div>
          </Collapsible.Panel>
        </Collapsible.Root>
      ))}
    </nav>
  );
}
