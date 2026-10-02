"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { pages, sections } from "@/tree";

const hrefs = [
  ...pages.map((page) => page.href),
  ...sections.map((section) => `/${section.slug}`),
];

/** Every page ahead of time, once the browser is idle, so no click waits on the network. */
export function PrefetchAll() {
  const router = useRouter();
  useEffect(() => {
    const id = requestIdleCallback(() => {
      for (const href of hrefs) router.prefetch(href);
    });
    return () => cancelIdleCallback(id);
  }, [router]);
  return null;
}
