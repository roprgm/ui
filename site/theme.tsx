import { useState } from "react";
import { Select } from "../src/components/select";
import standard from "./themes/default.css?inline";
import flat from "./themes/flat.css?inline";
import lines from "./themes/lines.css?inline";

/** Each theme draws the primitives its own way, so the site builds a stylesheet per theme. */
const themes = { default: standard, lines, flat };
type Theme = keyof typeof themes;

const items = [
  { value: "default", label: "Default" },
  { value: "lines", label: "Lines" },
  { value: "flat", label: "Flat" },
] as const;

// One element, found again when Vite reloads this module, so an edit replaces the stylesheet.
const style =
  document.querySelector<HTMLStyleElement>("style#theme") ??
  document.head.appendChild(
    Object.assign(document.createElement("style"), { id: "theme" }),
  );

function isTheme(value: string | null): value is Theme {
  return value !== null && value in themes;
}

function stored(): Theme {
  try {
    const theme = localStorage.getItem("theme");
    if (isTheme(theme)) return theme;
  } catch {}
  return "default";
}

function apply(theme: Theme) {
  style.textContent = themes[theme];
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

// Before the first render, so the page never paints in another theme.
apply(stored());

export function ThemeSelect({ className }: { className?: string }) {
  const [theme, setTheme] = useState(stored);
  return (
    <Select
      aria-label="Theme"
      items={items}
      value={theme}
      onValueChange={(next) => {
        if (!next) return;
        apply(next);
        setTheme(next);
      }}
      className={className}
    />
  );
}
