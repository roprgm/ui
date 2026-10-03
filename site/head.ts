/** What a route says about itself in the document's head; a page with a URL of its own gives its path. */
export type Meta = { title?: string; description?: string; path?: string };

export const origin = "https://ui.roprgm.com";

const site = {
  title: "@roprgm/ui",
  description:
    "A minimal, dark component library for React and Tailwind CSS v4, on Base UI.",
};

/** A route's title, its canonical URL, and the meta tags search engines and link previews read. */
export function head({
  title,
  description = site.description,
  path,
}: Meta = {}) {
  const url = path && new URL(path, origin).href;
  const meta: [attribute: "name" | "property", key: string, value?: string][] =
    [
      ["name", "description", description],
      ["property", "og:title", title ?? site.title],
      ["property", "og:description", description],
      ["property", "og:url", url],
      ["property", "og:site_name", site.title],
      ["property", "og:type", "website"],
    ];
  return {
    title: title ? `${title} · ${site.title}` : site.title,
    canonical: url,
    meta: meta.filter(([, , value]) => value),
  };
}

export type Head = ReturnType<typeof head>;
