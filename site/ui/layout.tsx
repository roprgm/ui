import { Toaster } from "@roprgm/ui/toast";
import { TooltipProvider } from "@roprgm/ui/tooltip";
import { useEffect } from "react";
import { Outlet, ScrollRestoration, useMatches } from "react-router";
import { head, type Meta } from "@/head";
import { MobileBar, Sidebar } from "./sidebar";

/** The page's title, kept in step as it navigates; the build writes each page's in its HTML. */
function useTitle() {
  const { title } = head(useMatches().at(-1)?.handle as Meta);
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export function Layout() {
  useTitle();
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
