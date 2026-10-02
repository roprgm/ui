"use client";

import { cn } from "cn";
import { useState } from "react";

export type Swatch = {
  name: string;
  /** What to write to use it, revealed on hover and copied on click. */
  code: string;
  className: string;
  /** Props for the swatch, such as a `data-accent` it shows. */
  attributes?: Record<string, string>;
};

/** Colors side by side; the one under the pointer shows, under its name, how to use it. */
export function Swatches({ swatches }: { swatches: Swatch[] }) {
  const [copied, setCopied] = useState<string>();
  const copy = async (swatch: Swatch) => {
    await navigator.clipboard.writeText(swatch.code);
    setCopied(swatch.name);
    setTimeout(() => setCopied(undefined), 1200);
  };
  return (
    <div className="flex h-32 gap-1.5">
      {swatches.map((swatch) => (
        <button
          key={swatch.name}
          type="button"
          onClick={() => copy(swatch)}
          className={cn(
            "group flex min-w-0 flex-1 cursor-pointer flex-col justify-end rounded-xl px-3 pb-2.5 text-left focus-ring",
            swatch.className,
          )}
          {...swatch.attributes}
        >
          <span className="truncate font-medium">{swatch.name}</span>
          {/* 0fr to 1fr opens a line under the name, which rises to make room. */}
          <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] motion-reduce:transition-none">
            <code className="min-h-0 truncate font-mono text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-70 group-focus-visible:opacity-70">
              {copied === swatch.name ? "Copied" : swatch.code}
            </code>
          </span>
        </button>
      ))}
    </div>
  );
}
