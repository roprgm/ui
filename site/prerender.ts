import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

type Server = {
  paths: string[];
  render: (
    path: string,
  ) => Promise<{ html: string; title: string; description: string }>;
};

const escapeHtml = (text: string) =>
  text.replace(/[&<>"]/g, (char) => `&#${char.charCodeAt(0)};`);

/** Writes each path's HTML into the built site, as `{path}.html`, and a `404.html`. */
export async function prerender(root: string) {
  const out = resolve(root, "out");
  const server = resolve(root, ".server");
  const template = await readFile(join(out, "index.html"), "utf8");
  const { paths, render }: Server = await import(
    pathToFileURL(join(server, "server.js")).href
  );
  for (const path of [...paths, "/404"]) {
    const { html, title, description } = await render(path);
    const file = join(out, path === "/" ? "index.html" : `${path}.html`);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(
      file,
      template
        .replace(
          "<!--head-->",
          () =>
            `<title>${escapeHtml(title)}</title>\n    <meta name="description" content="${escapeHtml(description)}" />`,
        )
        .replace("<!--app-->", () => html),
    );
  }
  await rm(server, { recursive: true });
}
