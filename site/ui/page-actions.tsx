"use client";

import { CopyButton } from "@roprgm/ui/copy-button";
import { IconButton } from "@roprgm/ui/icon-button";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Page } from "@/tree";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

function Step({
  page,
  label,
  children,
}: {
  page?: Page;
  label: string;
  children: ReactNode;
}) {
  if (!page)
    return (
      <IconButton label={label} variant="default" disabled>
        {children}
      </IconButton>
    );
  return (
    <IconButton
      label={`${label}: ${page.title}`}
      variant="default"
      render={<Link href={page.href} />}
    >
      {children}
    </IconButton>
  );
}

/** What a page's header offers: its Markdown to copy, and the pages before and after it. */
export function PageActions({
  markdown,
  previous,
  next,
}: {
  markdown: string;
  previous?: Page;
  next?: Page;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <CopyButton value={markdown}>Copy page</CopyButton>
      <Step page={previous} label="Previous">
        <ArrowLeftIcon />
      </Step>
      <Step page={next} label="Next">
        <ArrowRightIcon />
      </Step>
    </div>
  );
}
