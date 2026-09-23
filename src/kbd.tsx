import { cn } from "cn";
import type { ComponentProps } from "react";

const mac =
  typeof navigator !== "undefined" &&
  /Mac|iPhone|iPad/.test(navigator.platform);

/** A shortcut written as `Mod Z`, which shows as ⌘Z on Apple devices and Ctrl Z elsewhere. */
export function Kbd({
  children,
  className,
  ...props
}: Omit<ComponentProps<"kbd">, "children"> & { children: string }) {
  return (
    // The server can't tell the platform, so it writes Ctrl and a Mac corrects it.
    <kbd
      suppressHydrationWarning
      className={cn("font-sans text-faint", className)}
      {...props}
    >
      {children.replace(/Mod ?/, mac ? "⌘" : "Ctrl ")}
    </kbd>
  );
}
