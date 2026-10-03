import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { Head } from "./head";

const escapeHtml = (text: string) =>
  text.replace(/[&<>"]/g, (char) => `&#${char.charCodeAt(0)};`);

const tags = ({ title, canonical, meta }: Head) =>
  [
    `<title>${escapeHtml(title)}</title>`,
    ...meta.map(
      ([attribute, key, value = ""]) =>
        `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`,
    ),
    canonical && `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
  ]
    .filter(Boolean)
    .join("\n    ");

/** Writes each path's HTML into the built site, as `{path}.html`, a `404.html`, and a sitemap. */
export async function prerender(root: string) {
  const out = resolve(root, "out");
  const server = resolve(root, ".server");
  const template = await readFile(join(out, "index.html"), "utf8");
  const { origin, paths, render }: typeof import("./server") = await import(
    pathToFileURL(join(server, "server.js")).href
  );
  for (const path of [...paths, "/404"]) {
    const { html, head } = await render(path);
    const file = join(out, path === "/" ? "index.html" : `${path}.html`);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(
      file,
      template
        .replace("<!--head-->", () => tags(head))
        .replace("<!--app-->", () => html),
    );
  }
  const urls = paths.map(
    (path) => `  <url><loc>${new URL(path, origin).href}</loc></url>`,
  );
  await writeFile(
    join(out, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
  );
  await writeFile(
    join(out, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", origin).href}\n`,
  );
  await rm(server, { recursive: true });
}
