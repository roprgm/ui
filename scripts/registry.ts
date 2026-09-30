import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { Features, transform } from "lightningcss";

/** Writes registry.json's `theme` item from themes/default.css and its imports. */
type Rules = { [key: string]: string | Rules };

function parse(source: string): Rules {
  const css = source.replace(/\/\*[\s\S]*?\*\//g, "");
  let index = 0;
  const clean = (text: string) =>
    text.trim().replace(/\s+/g, " ").replace(/\( /g, "(").replace(/ \)/g, ")");

  function add(rules: Rules, key: string, value: string | Rules) {
    const current = rules[key];
    if (typeof current === "object" && typeof value === "object") {
      Object.assign(current, value);
    } else {
      rules[key] = value;
    }
  }

  function statement(rules: Rules, text: string) {
    const line = clean(text);
    if (!line || line.startsWith("@source")) return;
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
function flatten(css: string): string {
  const code = Buffer.from(css);
  return transform({
    filename: "theme.css",
    code,
    include: Features.Nesting,
  }).code.toString();
}

/**
 * The theme item. Its tokens go to `css` as variables on `:root`, which the components' CSS reads,
 * and to `cssVars.theme`, which shadcn writes as `@theme inline`, each naming its own variable, for
 * Tailwind utilities such as `bg-raised`.
 */
function item(path: string) {
  const { "@theme static": tokens = {}, ...css } = parse(
    flatten(read(path)),
  ) as Record<string, Rules>;
  const theme = Object.fromEntries(
    Object.keys(tokens).map((key) => [key.slice(2), `var(${key})`]),
  );
  return {
    cssVars: { theme },
    css: { "@layer theme": { ":root": tokens }, ...css },
  };
}

const theme = "https://ui.roprgm.com/r/theme.json";
const registry = JSON.parse(readFileSync("registry.json", "utf8"));
for (const entry of registry.items) {
  if (entry.name === "theme")
    Object.assign(entry, item("src/themes/default.css"));
  // Installed alone with shadcn, an item gets the theme's CSS only if it lists the theme itself.
  else if (!entry.registryDependencies?.includes(theme))
    throw new Error(`registry.json: "${entry.name}" must list ${theme}`);
}
writeFileSync("registry.json", `${JSON.stringify(registry, null, 2)}\n`);
