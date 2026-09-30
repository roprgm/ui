import { cn } from "cn";

// Recipes for what floats: compose them with `cn`, which lets a later class win, and set
// `data-raised` on the element to lift it a level, for one that opens over a card.

/** The floating box of menus, selects, popovers, dialogs, and notices; its content goes in sections. */
export const popup =
  "max-h-(--available-height) min-w-40 overflow-x-hidden overflow-y-auto rounded-xl text-foreground surface-float outline-none popup-motion";

/** A popup that pads a column of `popupItem` rows. */
export const popupList = cn(popup, "flex flex-col gap-0.5 rounded-lg p-1");

/** A row in a popup's list, as in a menu or select. */
export const popupItem =
  "flex h-6.5 shrink-0 cursor-default items-center rounded-sm px-2.5 outline-none select-none data-disabled:text-disabled data-highlighted:bg-raised";
