import { Menu as Primitive } from "@base-ui/react/menu";
import { cn } from "cn";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import { Chevron } from "./chevron";
import { Surface } from "./surface";

/** Commands opened from `trigger`, such as an IconButton. For settings, use a Popover. */
export function Menu({
  trigger,
  align = "end",
  children,
}: {
  trigger: ReactElement;
  align?: "start" | "center" | "end";
  children: ReactNode;
}) {
  return (
    <Primitive.Root>
      <Primitive.Trigger render={trigger} />
      <Primitive.Portal>
        <Primitive.Positioner sideOffset={4} align={align} className="z-50">
          <Primitive.Popup render={(props) => <Surface {...props} />}>
            {children}
          </Primitive.Popup>
        </Primitive.Positioner>
      </Primitive.Portal>
    </Primitive.Root>
  );
}

export function MenuItem({
  className,
  ...props
}: ComponentProps<typeof Primitive.Item>) {
  return (
    <Primitive.Item
      className={cn(
        "flex cursor-default items-center gap-2 rounded-sm px-2.5 py-1.5 outline-none select-none data-disabled:text-neutral-600 data-highlighted:bg-white/8",
        className,
      )}
      {...props}
    />
  );
}

export function MenuSeparator() {
  return <Primitive.Separator className="mx-1 my-1 h-px bg-white/10" />;
}

/** An item that opens a nested list of commands beside the menu. */
export function Submenu({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <Primitive.SubmenuRoot>
      <Primitive.SubmenuTrigger className="flex cursor-default items-center justify-between gap-4 rounded-sm px-2.5 py-1.5 outline-none select-none data-highlighted:bg-white/8 data-popup-open:bg-white/8">
        {label}
        <Chevron direction="right" size="sm" className="text-neutral-400" />
      </Primitive.SubmenuTrigger>
      <Primitive.Portal>
        <Primitive.Positioner sideOffset={4} alignOffset={-4} className="z-50">
          <Primitive.Popup render={(props) => <Surface {...props} />}>
            {children}
          </Primitive.Popup>
        </Primitive.Positioner>
      </Primitive.Portal>
    </Primitive.SubmenuRoot>
  );
}
