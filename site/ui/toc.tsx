"use client";

import { cn } from "cn";
import { useEffect, useState } from "react";
import type { Heading } from "./outline";

/** The heading whose section is on screen: the last one scrolled past the top third. */
function useCurrent(headings: Heading[]) {
  const [current, setCurrent] = useState<string>();
  useEffect(() => {
    const update = () => {
      const line = innerHeight / 3;
      let id = headings[0]?.id;
      for (const heading of headings) {
        const top = document
          .getElementById(heading.id)
          ?.getBoundingClientRect().top;
        if (top !== undefined && top < line) id = heading.id;
      }
      setCurrent(id);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, [headings]);
  return current;
}

/** The page's headings, beside it on wide screens. */
export function Toc({ headings }: { headings: Heading[] }) {
  const current = useCurrent(headings);
  if (headings.length === 0) return null;
  return (
    <aside className="sticky top-10 hidden h-fit w-44 shrink-0 flex-col gap-2 xl:flex">
      <p className="text-muted">On this page</p>
      <nav className="flex flex-col gap-1.5">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            aria-current={heading.id === current ? "location" : undefined}
            className={cn(
              "self-start rounded-sm text-secondary transition focus-ring hover:text-foreground aria-[current=location]:text-foreground",
              heading.depth === 3 && "pl-3",
            )}
          >
            {heading.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}
