"use client";

import { Button } from "@roprgm/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@roprgm/ui/popover";
import { ScrollArea } from "@roprgm/ui/scroll-area";
import { type ReactNode, useState } from "react";
import { MenuIcon } from "./icons";
import { Nav, type NavSection } from "./nav";

/** A bar over the page on narrow screens, whose menu opens the tree and closes on a page. */
export function MobileMenu({
  sections,
  children,
}: {
  sections: NavSection[];
  children: ReactNode;
}) {
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
              <Nav sections={sections} onNavigate={() => setOpen(false)} />
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
      <div className="flex-1">{children}</div>
    </div>
  );
}
