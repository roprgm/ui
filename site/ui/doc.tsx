import type { Toc as Entries } from "@stefanprobst/rehype-extract-toc";
import { cn } from "cn";
import type { ComponentType } from "react";
import { type Page, pages } from "@/tree";
import { Breadcrumb } from "./breadcrumb";
import { PageActions } from "./page-actions";
import { type Heading, Toc } from "./toc";

/** The `##` headings, each followed by its `###`s. */
const headings = (entries: Entries): Heading[] =>
  entries
    .flatMap((entry) => [entry, ...(entry.children ?? [])])
    .flatMap(({ id, value, depth }) => (id ? [{ id, value, depth }] : []));

/** A page of the tree: its header, its MDX content, and the pages around it. */
export async function Doc({ page }: { page: Page }) {
  const {
    default: Content,
    tableOfContents,
  }: { default: ComponentType; tableOfContents: Entries } = await import(
    `@/docs/${page.section}/${page.slug}.mdx`
  );
  const index = pages.indexOf(page);
  // A block is a whole layout, so it takes the width an outline would.
  const wide = page.section === "blocks";
  return (
    <div className="flex justify-center gap-16 px-5 pt-6 pb-16 md:px-12 md:pt-10">
      <article
        className={cn(
          "flex w-full min-w-0 flex-col gap-10",
          wide ? "max-w-6xl" : "max-w-3xl",
        )}
      >
        <header className="flex flex-col gap-3">
          <Breadcrumb page={page} />
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <h1 className="text-3xl font-semibold tracking-tight">
              {page.title}
            </h1>
            <PageActions previous={pages[index - 1]} next={pages[index + 1]} />
          </div>
          <p className="max-w-[60ch] text-base text-secondary">
            {page.description}
          </p>
        </header>
        <div className="flex flex-col gap-4">
          <Content />
        </div>
      </article>
      {!wide && <Toc headings={headings(tableOfContents)} />}
    </div>
  );
}
