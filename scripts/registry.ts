import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

/**
 * Writes the `theme` item of registry.json from themes/default.css and the files it imports, so the
 * registry installs the same CSS the package ships. `@theme` variables become `cssVars.theme`;
 * everything else goes to `css`. Runs before each build.
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

function item(path: string) {
  const {
    "@theme": theme = {},
    "@theme inline": inline = {},
    ...css
  } = parse(read(path)) as Record<string, Rules>;
  const vars = Object.fromEntries(
    Object.entries({ ...theme, ...inline }).map(([key, value]) => [
      key.replace(/^--/, ""),
      value,
    ]),
  );
  return { cssVars: { theme: vars }, css };
}

const registry = JSON.parse(readFileSync("registry.json", "utf8"));
for (const entry of registry.items) {
  if (entry.name === "theme")
    Object.assign(entry, item("src/themes/default.css"));
}
writeFileSync("registry.json", `${JSON.stringify(registry, null, 2)}\n`);
