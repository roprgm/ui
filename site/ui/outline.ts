/** The anchor a heading gets from its text. */
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export type Heading = { id: string; title: string; depth: 2 | 3 };

/** The `##` and `###` headings of an MDX file, outside its code. */
export function outline(mdx: string): Heading[] {
  const headings: Heading[] = [];
  let fenced = false;
  for (const line of mdx.split("\n")) {
    if (line.startsWith("```")) fenced = !fenced;
    const match = fenced ? null : line.match(/^(#{2,3}) (.+)$/);
    if (match?.[1] && match[2])
      headings.push({
        id: slugify(match[2]),
        title: match[2],
        depth: match[1].length as 2 | 3,
      });
  }
  return headings;
}
