import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findPage, pages } from "@/tree";
import { Doc } from "@/ui/doc";

type Props = { params: Promise<{ section: string; slug: string }> };

export const dynamicParams = false;

export const generateStaticParams = () =>
  pages
    .filter((page) => page.href !== "/")
    .map(({ section, slug }) => ({ section, slug }));

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
