"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { pages } from "@/tree";

/** The old one-page site linked to `/#button`; those links now open the page. */
export function HashRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/") return;
    const slug = location.hash.slice(1);
    const page = pages.find((page) => page.slug === slug);
    if (page) router.replace(page.href);
  }, [pathname, router]);
  return null;
}
