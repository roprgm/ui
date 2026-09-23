import { cn } from "cn";
import { type ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { IconButton } from "../src/button";
import { CheckIcon, CopyIcon } from "./icons";

export type Doc = {
  /** The registry item, which also serves as the anchor. */
  name: string;
  title: string;
  description: string;
  demo: ReactNode;
  /** A composition of components: it fills the preview and has no registry item yet. */
  block?: boolean;
  /** Shown instead of the install command, for utilities that come with the theme. */
  code?: string;
};

export type Group = { title: string; docs: Doc[] };

const slug = (group: Group) => group.title.toLowerCase();

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
        <a href={`#${slug(groups[0] ?? current)}`} className="mb-5 font-medium">
          @roprgm/ui
        </a>
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-1">
            <a
              href={`#${slug(group)}`}
              className={cn(
                "transition hover:text-neutral-100",
                group === current ? "text-neutral-100" : "text-neutral-500",
              )}
            >
              {group.title}
            </a>
            <div className="mb-3 flex flex-col gap-1 border-white/10 border-l pl-3">
              {group.docs.map((doc) => (
                <a
                  key={doc.name}
                  href={`#${doc.name}`}
                  className={cn(
                    "transition hover:text-neutral-100",
                    doc.name === hash ? "text-neutral-100" : "text-neutral-400",
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
              className={
                group === current ? "text-neutral-100" : "text-neutral-500"
              }
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
        <p className="text-neutral-400">{doc.description}</p>
      </div>
      <div
        className={cn(
          "rounded-xl bg-neutral-800 shadow-raised",
          doc.block && "overflow-hidden",
          !doc.block &&
            "flex min-h-40 flex-wrap items-center justify-center gap-3 p-10",
        )}
      >
        {doc.demo}
      </div>
      {!doc.block && (
        <Code>
          {doc.code ??
            `npx shadcn@latest add https://ui.roprgm.com/r/${doc.name}.json`}
        </Code>
      )}
    </article>
  );
}

/** A one-line command with a copy button. */
export function Code({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-center gap-2 rounded-xl bg-neutral-900 py-1.5 pr-1.5 pl-3 shadow-sunken">
      <code className="flex-1 truncate font-mono text-xs text-neutral-300">
        {children}
      </code>
      <IconButton
        label={copied ? "Copied" : "Copy"}
        size="icon-sm"
        onClick={copy}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </IconButton>
    </div>
  );
}
