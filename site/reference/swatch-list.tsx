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

/** Each token with its sample, and what it's for. */
export function SwatchList({ items }: { items: Swatch[] }) {
  return (
    <table className="w-full table-fixed text-left">
      <colgroup>
        <col className="w-3/5 sm:w-64" />
        <col />
      </colgroup>
      <thead className="text-xs text-muted">
        <tr>
          <th className="pb-1 font-normal">Token</th>
          <th className="pb-1 font-normal">Use it for</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.name}>
            <td className="py-1.5 pr-4">
              <span className="flex min-w-0 items-center gap-2.5">
                <span
                  className={cn("size-5 shrink-0 rounded-sm", item.className)}
                  style={item.style}
                  {...item.attributes}
                />
                <code className="truncate rounded-sm bg-level-4 px-1.25 py-px font-mono text-xs text-foreground">
                  {item.name}
                </code>
              </span>
            </td>
            <td className="py-1.5 text-secondary">{item.use}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
