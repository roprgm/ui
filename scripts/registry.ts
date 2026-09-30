import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { Features, transform } from "lightningcss";

/**
 * Writes registry.json's `theme` item: themes/default.css with its imports to `css`, and
 * tailwind.css's token utilities to `cssVars.theme`, which shadcn writes as `@theme inline`,
 * since an app that installs with shadcn uses Tailwind.
 */
type Rules = { [key: string]: string | Rules };

function parse(source: string): Rules {
  const css = source.replace(/\/\*[\s\S]*?\*\//g, "");
  let index = 0;
  const clean = (text: string) =>
    text.trim().replace(/\s+/g, " ").replace(/\( /g, "(").replace(/ \)/g, ")");

  function add(rules: Rules, key: string, value: string | Rules) {
    const current = rules[key];
    if (typeof current === "object" && typeof value === "object") {
      for (const [inner, rule] of Object.entries(value))
        add(current, inner, rule);
    } else {
      rules[key] = value;
    }
  }

  function statement(rules: Rules, text: string) {
    const line = clean(text);
    // Layer statements are Tailwind's own order, which the app's CSS declares.
    if (!line || line.startsWith("@layer")) return;
    const colon = line.indexOf(":");
    if (line.startsWith("@") || colon < 0) return add(rules, line, {});
    add(rules, line.slice(0, colon).trim(), line.slice(colon + 1).trim());
  }

  function block(): Rules {
    const rules: Rules = {};
    let buffer = "";
    while (index < css.length) {
      const char = css[index++];
      if (char === "{") {
        add(rules, clean(buffer), block());
        buffer = "";
      } else if (char === "}") {
        break;
      } else if (char === ";") {
        statement(rules, buffer);
        buffer = "";
      } else {
        buffer += char;
      }
    }
    statement(rules, buffer);
    return rules;
  }

  return block();
}

/** A CSS file with its relative imports written in place. */
function read(path: string): string {
  return readFileSync(path, "utf8").replace(
    /@import "(\.{1,2}\/.+?)";/g,
    (_, file) => read(join(dirname(path), file)),
  );
}

/** The same CSS without nesting, which shadcn's CSS writer mangles. */
function flatten(path: string, css: string): string {
  const code = Buffer.from(css);
  return transform({
    filename: path,
    code,
    include: Features.Nesting,
  }).code.toString();
}

function item(path: string, tailwind: string) {
  const utilities = parse(read(tailwind))["@theme reference"] as Rules;
  const theme = Object.fromEntries(
    Object.entries(utilities).map(([key, value]) => [key.slice(2), value]),
  );
  return { cssVars: { theme }, css: parse(flatten(path, read(path))) };
}

const theme = "https://ui.roprgm.com/r/theme.json";
const registry = JSON.parse(readFileSync("registry.json", "utf8"));
for (const entry of registry.items) {
  if (entry.name === "theme")
    Object.assign(entry, item("src/themes/default.css", "src/tailwind.css"));
  // Installed alone with shadcn, an item gets the theme's CSS only if it lists the theme itself.
  else if (!entry.registryDependencies?.includes(theme))
    throw new Error(`registry.json: "${entry.name}" must list ${theme}`);
}
writeFileSync("registry.json", `${JSON.stringify(registry, null, 2)}\n`);
