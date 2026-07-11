import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllEntries, getEntry } from "@/lib/content";
import Tag from "@/components/Tag";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return {};
  return { title: entry.title, description: entry.description };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Tag variant={entry.type}>
          {entry.type === "independent" ? "Independent" : "Coursework"}
        </Tag>
        {entry.course && <Tag>{entry.course}</Tag>}
        <span className="text-sm text-ink-soft">{entry.date.slice(0, 7)}</span>
      </div>

      <h1 className="font-display text-[clamp(2.6rem,7vw,4.6rem)] leading-[0.98] tracking-[-0.02em]">
        {entry.title}
      </h1>
      <p className="mt-4 text-lg text-ink-soft">{entry.description}</p>

      {entry.links && Object.keys(entry.links).length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {Object.entries(entry.links).map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink/20 px-4 py-2 text-sm capitalize transition-colors hover:border-forest hover:text-forest"
            >
              {label} ↗
            </a>
          ))}
        </div>
      )}

      <div className="prose prose-neutral mt-12 max-w-none prose-headings:font-serif prose-headings:font-medium prose-headings:tracking-tight prose-a:text-forest">
        <MDXRemote source={entry.body} />
      </div>

      <div className="mt-16 border-t border-line pt-8">
        <Link
          data-mag
          href="/projects"
          className="border-b border-forest/35 pb-[3px] text-sm font-medium text-forest"
        >
          ← All projects
        </Link>
      </div>
    </article>
  );
}
