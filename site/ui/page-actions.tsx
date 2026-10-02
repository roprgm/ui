"use client";

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

/** The pages before and after one, from its header. */
export function PageActions({
  previous,
  next,
}: {
  previous?: Page;
  next?: Page;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Step page={previous} label="Previous">
        <ArrowLeftIcon />
      </Step>
      <Step page={next} label="Next">
        <ArrowRightIcon />
      </Step>
    </div>
  );
}
