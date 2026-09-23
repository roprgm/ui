import { cn } from "cn";
import { type ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { version } from "../package.json";
import { CopyButton } from "./copy-button";

export type Doc = {
  /** The registry item, which also serves as the anchor. */
  name: string;
  title: string;
  description: string;
  demo: ReactNode;
  /** A composition of components: it fills the preview and has no registry item yet. */
  block?: boolean;
  /** Renders on the page itself, without the preview card. */
  bare?: boolean;
  /** Shown instead of the install command, for utilities that come with the theme. */
  code?: string;
};

export type Group = { title: string; docs: Doc[] };

const slug = (group: Group) => group.title.toLowerCase();

/** Nav links take the library's focus ring, hugging the text rather than the row. */
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

/**
 * The docs page shows one group at a time. The hash picks it, by the group's name or one of
 * its docs; a doc link in another group switches to that group and scrolls to the doc.
 */
export function Page({ groups, intro }: { groups: Group[]; intro: ReactNode }) {
  const hash = useHash();
  const current =
    groups.find(
      (group) =>
        slug(group) === hash || group.docs.some((doc) => doc.name === hash),
    ) ?? groups[0];

  // Runs after the group renders, so a doc from another group exists to scroll to.
  useLayoutEffect(() => {
    const doc = document.getElementById(hash);
    if (doc?.tagName === "ARTICLE") doc.scrollIntoView();
    else scrollTo(0, 0);
  }, [hash]);

  if (!current) return null;
  return (
    <div className="mx-auto flex max-w-6xl gap-12 px-6">
      <nav className="sticky top-0 hidden h-dvh w-44 shrink-0 flex-col gap-1 overflow-y-auto py-12 md:flex">
        <a
          href={`#${slug(groups[0] ?? current)}`}
          className={cn(link, "mb-5 flex items-baseline gap-2")}
        >
          <span className="font-medium">@roprgm/ui</span>
          <span className="text-muted">v{version}</span>
        </a>
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-1">
            <a
              href={`#${slug(group)}`}
              className={cn(
                link,
                "hover:text-foreground",
                group === current ? "text-foreground" : "text-faint",
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
                    doc.name === hash ? "text-foreground" : "text-muted",
                  )}
                >
                  {doc.title}
                </a>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <main className="flex min-w-0 flex-1 flex-col gap-14 py-12">
        <div className="flex flex-wrap gap-x-4 gap-y-1 md:hidden">
          {groups.map((group) => (
            <a
              key={group.title}
              href={`#${slug(group)}`}
              className={cn(
                link,
                group === current ? "text-foreground" : "text-faint",
              )}
            >
              {group.title}
            </a>
          ))}
        </div>
        {current === groups[0] && intro}
        <h2 className="text-2xl font-medium">{current.title}</h2>
        {current.docs.map((doc) => (
          <Article key={doc.name} doc={doc} />
        ))}
      </main>
    </div>
  );
}

function Article({ doc }: { doc: Doc }) {
  return (
    <article id={doc.name} className="flex scroll-mt-12 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-medium">{doc.title}</h3>
        <p className="text-muted">{doc.description}</p>
      </div>
      <Preview doc={doc} />
      {!doc.block && (
        <Code>
          {doc.code ??
            `npx shadcn@latest add https://ui.roprgm.com/r/${doc.name}.json`}
        </Code>
      )}
    </article>
  );
}

function Preview({ doc }: { doc: Doc }) {
  if (doc.bare) return doc.demo;
  return (
    <div
      className={cn(
        "layer-card rounded-xl shadow-raised",
        doc.block && "overflow-hidden",
        !doc.block &&
          "flex min-h-40 flex-wrap items-center justify-center gap-3 p-10",
      )}
    >
      {doc.demo}
    </div>
  );
}

/** A one-line command with a copy button. */
export function Code({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-field py-1.5 pr-1.5 pl-3 shadow-sunken">
      <code className="flex-1 truncate font-mono text-xs text-foreground">
        {children}
      </code>
      <CopyButton value={children} size="icon-sm" />
    </div>
  );
}
