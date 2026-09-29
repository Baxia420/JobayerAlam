import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllEntries, getEntry } from "@/lib/content";
import Tag from "@/components/Tag";
import Figure from "@/components/Figure";
import Gallery from "@/components/Gallery";
import Diagram from "@/components/Diagram";

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
          {entry.type === "independent"
            ? "Independent"
            : entry.type === "hackathon"
            ? "Hackathon"
            : "Coursework"}
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

      {entry.cover && (
        <div className="my-10 overflow-hidden rounded-xl border border-line bg-cream-deep shadow-[0_20px_44px_-18px_rgba(26,26,24,0.22)]">
          <div className="flex items-center justify-between border-b border-line bg-stripe px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#bd7b58]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#c8a75e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#8fae9f]" />
              <span className="ml-2 font-mono text-[11px] text-mono-label">
                {entry.slug} / cover
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-forest font-semibold">
              Project Preview
            </span>
          </div>
          <div className="flex items-center justify-center bg-cream">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={entry.cover}
              alt={`${entry.title} cover`}
              className="m-0 block max-h-[480px] w-full object-contain"
            />
          </div>
        </div>
      )}

      <div className="prose prose-neutral mt-12 max-w-none prose-headings:font-serif prose-headings:font-medium prose-headings:tracking-tight prose-a:text-forest">
        <MDXRemote source={entry.body} components={{ Figure, Gallery, Diagram }} />
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
