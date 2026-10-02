import Link from "next/link";
import { Fragment } from "react";
import { findSection, type Page } from "@/tree";

/** Where a page sits: its section, its group, and itself. */
export function Breadcrumb({ page }: { page: Page }) {
  const section = findSection(page.section);
  const trail = [
    section && (
      <Link
        href={`/${section.slug}`}
        className="rounded-sm transition focus-ring hover:text-foreground"
      >
        {section.title}
      </Link>
    ),
    page.group,
    <span aria-current="page" className="text-foreground">
      {page.title}
    </span>,
  ].filter(Boolean);
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-muted"
    >
      {trail.map((part, index) => (
        <Fragment key={index}>
          {index > 0 && <span aria-hidden>/</span>}
          {part}
        </Fragment>
      ))}
    </nav>
  );
}
