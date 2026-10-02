import { cn } from "cn";
import type { CSSProperties } from "react";

export type Swatch = {
  name: string;
  use?: string;
  /** The sample's classes, such as a fill or a material. */
  className: string;
  style?: CSSProperties;
  attributes?: Record<string, string>;
};

/** Each sample beside its name and use, in two columns where they fit. */
export function SwatchList({ items }: { items: Swatch[] }) {
  return (
    <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.name} className="flex items-center gap-3">
          <span
            className={cn("size-8 shrink-0 rounded-md", item.className)}
            style={item.style}
            {...item.attributes}
          />
          <div className="flex min-w-0 flex-col items-start gap-1">
            <code className="max-w-full truncate rounded-sm bg-hover px-1 py-px font-mono text-xs text-foreground">
              {item.name}
            </code>
            {item.use && <span className="text-secondary">{item.use}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
