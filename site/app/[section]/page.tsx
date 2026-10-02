import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findSection, sections } from "@/tree";

type Props = { params: Promise<{ section: string }> };

export const dynamicParams = false;

export const generateStaticParams = () =>
  sections.map((section) => ({ section: section.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const section = findSection((await params).section);
  return { title: section?.title, description: section?.description };
}

/** A section's pages, by group, each with its description. */
export default async function SectionPage({ params }: Props) {
  const section = findSection((await params).section);
  if (!section) notFound();
  return (
    <div className="flex justify-center px-5 pt-6 pb-16 md:px-12 md:pt-10">
      <div className="flex w-full max-w-3xl flex-col gap-10">
        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {section.title}
          </h1>
          <p className="text-base text-secondary">{section.description}</p>
        </header>
        {section.groups.map((group) => (
          <section
            key={group.title ?? section.slug}
            className="flex flex-col gap-2"
          >
            {group.title && (
              <h2 className="text-lg font-medium tracking-tight">
                {group.title}
              </h2>
            )}
            <div className="-mx-3.5 grid gap-x-4 sm:grid-cols-2">
              {group.pages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="flex flex-col gap-0.5 rounded-lg px-3.5 py-2.5 transition focus-ring hover:bg-hover"
                >
                  <span>{page.title}</span>
                  <span className="text-secondary">{page.description}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
