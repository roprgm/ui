import { cn } from "cn";
import type { ComponentProps } from "react";

/**
 * The floating panel under menus, selects, and popovers. Its 8px corners less 4px of padding
 * leave 4px (`rounded-sm`) for the items inside. Render a Base UI popup as one:
 * `<Menu.Popup render={(props) => <Surface {...props} />} />`.
 */
export function Surface({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "max-h-(--available-height) min-w-40 origin-(--transform-origin) overflow-y-auto rounded-lg bg-surface p-1 text-foreground shadow-float outline-none transition-[opacity,scale] duration-100 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}
