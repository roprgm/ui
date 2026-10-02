import { surfaces, tokens, utilities } from "@/reference/tables";
import type { Page } from "@/tree";
import { exportsOf, readSource } from "./source";

/** Each reference table, by the expression a page passes it as. */
const references: Record<string, { name: string; use: string }[]> = {
  utilities,
  ...Object.fromEntries(
    Object.entries(tokens).map(([group, rows]) => [`tokens.${group}`, rows]),
  ),
  ...Object.fromEntries(
    Object.entries(surfaces).map(([group, rows]) => [
      `surfaces.${group}`,
      rows,
    ]),
  ),
};

const fence = (lang: string, code: string) =>
  `\`\`\`${lang}\n${code.trim()}\n\`\`\``;

async function install(name: string) {
  const exports = await exportsOf(name);
  return [
    fence("shell", "bun add @roprgm/ui"),
    fence("tsx", `import { ${exports} } from "@roprgm/ui/${name}";`),
    "Or copy its source into components/ui with shadcn:",
    fence(
      "shell",
      `npx shadcn@latest add https://ui.roprgm.com/r/${name}.json`,
    ),
  ].join("\n\n");
}

/** A page as Markdown, with each example's code and the install steps written out, for an agent. */
export async function toMarkdown(page: Page, mdx: string) {
  let body = mdx.replace(/^import .*\n/gm, "");
  for (const [tag, name] of body.matchAll(/<Example name="([^"]+)"[^>]*\/>/g))
    body = body.replace(
      tag,
      fence("tsx", await readSource(`site/examples/${name}.tsx`)),
    );
  for (const [tag, name] of body.matchAll(/<Install name="([^"]+)" \/>/g))
    body = body.replace(tag, await install(name ?? ""));
  // A reference table as a list; a demo that only shows colors says nothing in text.
  body = body
    .replace(/<Reference entries=\{([\w.]+)\} \/>/g, (_, key: string) =>
      (references[key] ?? [])
        .map((row) => `- \`${row.name}\`: ${row.use}`)
        .join("\n"),
    )
    .replace(/^<[A-Z]\w*[^>]*\/>\n?/gm, "");
  return `# ${page.title}\n\n${page.description}\n\n${body.trim()}\n`;
}
