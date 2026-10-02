"use client";

import { Button } from "@roprgm/ui/button";
import { IconButton } from "@roprgm/ui/icon-button";
import { Popover, PopoverContent, PopoverTrigger } from "@roprgm/ui/popover";
import { ScrollArea } from "@roprgm/ui/scroll-area";
import Link from "next/link";
import { useState } from "react";
import { version } from "../../package.json";
import { GitHubIcon, MenuIcon } from "./icons";
import { Nav } from "./nav";

function Brand() {
  return (
    <div className="flex items-center gap-1">
      <Link
        href="/"
        className="flex items-baseline gap-2 rounded-sm px-1 font-medium transition focus-ring"
      >
        @roprgm/ui
        <span className="font-normal text-muted">{version}</span>
      </Link>
      <IconButton
        label="GitHub"
        className="ml-auto"
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
  );
}

/** The tree, docked at the left on wide screens. */
export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col gap-4 py-5 pl-4 md:flex">
      <div className="pr-4 pl-1.5">
        <Brand />
      </div>
      <ScrollArea fade className="flex-1">
        <div className="pr-4 pb-8">
          <Nav />
        </div>
      </ScrollArea>
    </aside>
  );
}

/** A bar over the page on narrow screens, whose menu opens the tree. */
export function MobileBar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="sticky top-0 z-40 flex items-center gap-2 bg-background px-4 py-3 md:hidden">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button variant="ghost" size="icon" aria-label="Menu">
              <MenuIcon />
            </Button>
          }
        />
        <PopoverContent align="start" className="w-64 p-0">
          <ScrollArea fade className="max-h-[70dvh]">
            <div className="p-2">
              <Nav onNavigate={() => setOpen(false)} />
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
      <div className="flex-1">
        <Brand />
      </div>
    </div>
  );
}
