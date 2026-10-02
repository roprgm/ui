import { cn } from "cn";
import type { ComponentType } from "react";
import { type Page, pages } from "@/tree";
import { Breadcrumb } from "./breadcrumb";
import { toMarkdown } from "./markdown";
import { outline } from "./outline";
import { PageActions } from "./page-actions";
import { readSource } from "./source";
import { Toc } from "./toc";

/** A page of the tree: its header, its MDX content, and the pages around it. */
export async function Doc({ page }: { page: Page }) {
  const file = `${page.section}/${page.slug}.mdx`;
  const [{ default: Content }, mdx]: [{ default: ComponentType }, string] =
    await Promise.all([
      import(`@/docs/${file}`),
      readSource(`site/docs/${file}`),
    ]);
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
            <PageActions
              markdown={await toMarkdown(page, mdx)}
              previous={pages[index - 1]}
              next={pages[index + 1]}
            />
          </div>
          <p className="max-w-[60ch] text-base text-secondary">
            {page.description}
          </p>
        </header>
        <div className="flex flex-col gap-4">
          <Content />
        </div>
      </article>
      {!wide && <Toc headings={outline(mdx)} />}
    </div>
  );
}
