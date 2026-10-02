import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findPage, pages } from "@/tree";
import { Doc } from "@/ui/doc";

type Props = { params: Promise<{ section: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  // A page written but left out of the tree would never be reached.
  const docs = join(process.cwd(), "site/docs");
  for (const section of readdirSync(docs))
    for (const file of readdirSync(join(docs, section))) {
      const slug = file.replace(/\.mdx$/, "");
      if (!findPage(section, slug))
        throw new Error(`site/docs/${section}/${file} isn't in site/tree.ts`);
    }
  return pages
    .filter((page) => page.href !== "/")
    .map(({ section, slug }) => ({ section, slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, slug } = await params;
  const page = findPage(section, slug);
  return { title: page?.title, description: page?.description };
}

export default async function DocPage({ params }: Props) {
  const { section, slug } = await params;
  const page = findPage(section, slug);
  if (!page) notFound();
  return <Doc page={page} />;
}
