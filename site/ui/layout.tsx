import { Toaster } from "@roprgm/ui/toast";
import { TooltipProvider } from "@roprgm/ui/tooltip";
import { useEffect } from "react";
import { Outlet, ScrollRestoration, useMatches } from "react-router";
import { head, type Meta } from "@/head";
import { MobileBar, Sidebar } from "./sidebar";

/** The page's head, kept in step as it navigates; the build writes each page's in its HTML. */
function useHead() {
  const handle = useMatches().at(-1)?.handle as Meta;
  useEffect(() => {
    const { title, canonical, meta } = head(handle);
    document.title = title;
    if (canonical)
      document
        .querySelector('link[rel="canonical"]')
        ?.setAttribute("href", canonical);
    for (const [attribute, key, value = ""] of meta)
      document
        .querySelector(`meta[${attribute}="${key}"]`)
        ?.setAttribute("content", value);
  }, [handle]);
}

export function Layout() {
  useHead();
  return (
    <TooltipProvider>
      <div className="mx-auto flex max-w-screen-2xl">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <MobileBar />
          <Outlet />
        </main>
      </div>
      <Toaster />
      <ScrollRestoration />
    </TooltipProvider>
  );
}
