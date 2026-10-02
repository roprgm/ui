import { IconButton } from "@roprgm/ui/icon-button";
import { ScrollArea } from "@roprgm/ui/scroll-area";
import Link from "next/link";
import { type Section, sections } from "@/tree";
import { version } from "../../package.json";
import { GitHubIcon } from "./icons";
import { MobileMenu } from "./mobile-menu";
import { Nav, type NavNode, type NavSection } from "./nav";

/** A section's pages, under a row for each of its groups. */
const nodes = (section: Section): NavNode[] =>
  section.groups.flatMap((group): NavNode[] => {
    const pages = group.pages.map(({ href, title }) => ({
      id: href,
      title,
      href,
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

const navSections: NavSection[] = sections.map((section) => ({
  slug: section.slug,
  title: section.title,
  count: section.groups.reduce((sum, group) => sum + group.pages.length, 0),
  flat: section.groups.every((group) => !group.title),
  items: nodes(section),
}));

function Brand() {
  return (
    <div className="flex items-center gap-1">
      <Link
        href="/"
        className="flex items-baseline gap-2 rounded-sm px-1 font-medium transition focus-ring"
      >
        @roprgm/ui
        <span className="font-normal text-muted">{version}</span>
      </Link>
      <IconButton
        label="GitHub"
        className="ml-auto"
        render={
          <a
            href="https://github.com/roprgm/ui"
            target="_blank"
            rel="noreferrer"
          />
        }
      >
        <GitHubIcon />
      </IconButton>
    </div>
  );
}

/** The tree, docked at the left on wide screens. */
export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col gap-4 py-5 pl-4 md:flex">
      <div className="pr-4 pl-1.5">
        <Brand />
      </div>
      <ScrollArea fade className="flex-1">
        <div className="pr-4 pb-8">
          <Nav sections={navSections} />
        </div>
      </ScrollArea>
    </aside>
  );
}

/** A bar over the page on narrow screens, whose menu opens the tree. */
export function MobileBar() {
  return (
    <MobileMenu sections={navSections}>
      <Brand />
    </MobileMenu>
  );
}
