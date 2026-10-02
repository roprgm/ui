/** What a route says about itself in the document's head. */
export type Meta = { title?: string; description?: string };

const site = {
  title: "@roprgm/ui",
  description:
    "A minimal, dark component library for React and Tailwind CSS v4, on Base UI.",
};

/** The document's title and description for a route's meta. */
export const head = ({ title, description }: Meta = {}) => ({
  title: title ? `${title} · ${site.title}` : site.title,
  description: description ?? site.description,
});
