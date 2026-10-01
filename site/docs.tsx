import { cn } from "cn";
import { type ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { parse, render } from "sugar-high/core";
import * as css from "sugar-high/lang/css";
import * as shell from "sugar-high/lang/shell";
import * as typescript from "sugar-high/lang/typescript";
import { Card } from "../src/components/card";
import { CodeBlock } from "../src/components/code-block";
import { IconButton } from "../src/components/icon-button";
import { ScrollArea } from "../src/components/scroll-area";
import { GitHubIcon } from "./icons";

export type Doc = {
  /** The registry item, which also serves as the anchor. */
  name: string;
  title: string;
  description: string;
  demo: ReactNode;
  /** A composition that fills the preview and has no registry item. */
  block?: boolean;
  /** Renders on the page itself, without the preview card. */
  bare?: boolean;
  /** Shares a row with the next doc that has it, on wide screens. */
  half?: boolean;
  /** Shown instead of the install command, for the theme's utilities. */
  code?: string;
};

export type Group = { title: string; docs: Doc[] };

const slug = (group: Group) => group.title.toLowerCase();

/** Focus rings hug the text rather than the row. */
const link = "self-start rounded-sm transition focus-ring";

/** The location hash, which names a group or a doc. */
function useHash() {
  const [hash, setHash] = useState(() => location.hash.slice(1));
  useEffect(() => {
    const update = () => setHash(location.hash.slice(1));
    addEventListener("hashchange", update);
    return () => removeEventListener("hashchange", update);
  }, []);
  return hash;
}

/** The overview, or the group the hash names by its title or one of its docs. */
export function Page({
  groups,
  overview,
}: {
  groups: Group[];
  overview: ReactNode;
}) {
  const hash = useHash();
  const current = groups.find(
    (group) =>
      slug(group) === hash || group.docs.some((doc) => doc.name === hash),
  );

  // After the group renders, so the doc exists to scroll to.
  useLayoutEffect(() => {
    const doc = document.getElementById(hash);
    if (doc?.tagName === "ARTICLE") doc.scrollIntoView();
    else scrollTo(0, 0);
  }, [hash]);

  return (
    <div className="mx-auto flex max-w-6xl gap-12 px-6">
      <nav className="sticky top-0 hidden h-dvh w-48 shrink-0 md:block">
        {/* 4px past the left edge, padded back, so it doesn't clip focus rings. */}
        <ScrollArea className="-ml-1 h-full">
          <div className="flex flex-col gap-1 py-12 pr-4 pl-1">
            <div className="mb-4 -mt-px flex items-center gap-1">
              <a
                href="#overview"
                className={cn(link, "flex items-baseline gap-2 self-center")}
              >
                <span className="font-medium">@roprgm/ui</span>
              </a>
              <IconButton
                label="GitHub"
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
            <a
              href="#overview"
              className={cn(
                link,
                "mb-3 hover:text-foreground",
                current ? "text-secondary" : "text-foreground",
              )}
            >
              Overview
            </a>
            {groups.map((group) => (
              <div key={group.title} className="flex flex-col gap-1">
                <a
                  href={`#${slug(group)}`}
                  className={cn(
                    link,
                    "hover:text-foreground",
                    group === current ? "text-foreground" : "text-secondary",
                  )}
                >
                  {group.title}
                </a>
                <div className="mb-3 flex flex-col gap-1 border-hover border-l pl-3">
                  {group.docs.map((doc) => (
                    <a
                      key={doc.name}
                      href={`#${doc.name}`}
                      className={cn(
                        link,
                        "hover:text-foreground",
                        doc.name === hash
                          ? "text-foreground"
                          : "text-secondary",
                      )}
                    >
                      {doc.title}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </nav>
      <main className="flex min-w-0 flex-1 flex-col gap-14 py-12">
        <div className="flex flex-wrap gap-x-4 gap-y-3 md:hidden">
          <a
            href="#overview"
            className={cn(link, current ? "text-secondary" : "text-foreground")}
          >
            Overview
          </a>
          {groups.map((group) => (
            <a
              key={group.title}
              href={`#${slug(group)}`}
              className={cn(
                link,
                group === current ? "text-foreground" : "text-secondary",
              )}
            >
              {group.title}
            </a>
          ))}
        </div>
        {!current && overview}
        {current && (
          <>
            <h2 className="text-2xl font-medium">{current.title}</h2>
            {rows(current.docs).map((row) => (
              <Row key={row[0]?.name} docs={row} />
            ))}
          </>
        )}
      </main>
    </div>
  );
}

/** Docs in rows: each alone, but two in a row where both are `half`. */
function rows(docs: Doc[]) {
  const rows: Doc[][] = [];
  for (const doc of docs) {
    const last = rows.at(-1);
    if (doc.half && last?.length === 1 && last[0]?.half) last.push(doc);
    else rows.push([doc]);
  }
  return rows;
}

function Row({ docs }: { docs: Doc[] }) {
  if (docs.length === 1)
    return docs.map((doc) => <Article key={doc.name} doc={doc} />);
  return (
    <div className="grid gap-14 lg:grid-cols-2">
      {docs.map((doc) => (
        <Article key={doc.name} doc={doc} />
      ))}
    </div>
  );
}

function Article({ doc }: { doc: Doc }) {
  return (
    <article id={doc.name} className="flex min-w-0 scroll-mt-12 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-medium">{doc.title}</h3>
        <p className="text-secondary">{doc.description}</p>
      </div>
      <Preview doc={doc} />
      {!doc.block && (
        <Code lang={doc.code ? "tsx" : "shell"}>
          {doc.code ??
            `npx shadcn@latest add https://ui.roprgm.com/r/${doc.name}.json`}
        </Code>
      )}
    </article>
  );
}

function Preview({ doc }: { doc: Doc }) {
  if (doc.bare) return doc.demo;
  // Blocks lay out by this frame's width.
  if (doc.block) return <Card className="@container p-0">{doc.demo}</Card>;
  return (
    <Card className="p-0">
      <div className="flex min-h-32 flex-wrap items-center justify-center-safe gap-3 p-6 sm:p-8">
        {doc.demo}
      </div>
    </Card>
  );
}

const languages = { css, shell, tsx: typescript };

/** Highlighted code with a copy button; `text` wraps instead. */
export function Code({
  lang = "shell",
  children,
}: {
  lang?: keyof typeof languages | "text";
  children: string;
}) {
  if (lang === "text") return <CodeBlock code={children} wrap />;
  return (
    <CodeBlock
      code={children}
      html={render(parse(children, languages[lang]))}
    />
  );
}
