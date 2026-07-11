import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type EntryType = "independent" | "coursework";
export type EntryTier = "flagship" | "archive";

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  type: EntryType;
  tier: EntryTier;
  featured: boolean;
  priority: number;
  tags: string[];
  course?: string;
  links?: Record<string, string>;
  /** Label shown inside the striped image placeholder, e.g. "project shot". */
  imageLabel?: string;
}

export interface ProjectEntry extends ProjectMeta {
  body: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

function parseFile(filename: string): ProjectEntry {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug: filename.replace(/\.mdx$/, ""),
    title: data.title ?? "Untitled",
    description: data.description ?? "",
    date: data.date ?? "",
    type: data.type === "coursework" ? "coursework" : "independent",
    tier: data.tier === "archive" ? "archive" : "flagship",
    featured: Boolean(data.featured),
    priority: Number(data.priority ?? 0),
    tags: Array.isArray(data.tags) ? data.tags : [],
    course: data.course,
    links: data.links,
    imageLabel: data.imageLabel,
    body: content,
  };
}

export function getAllEntries(): ProjectEntry[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parseFile)
    .sort(
      (a, b) => b.priority - a.priority || b.date.localeCompare(a.date)
    );
}

/** Flagship grid on /projects: best independent work + coursework that earned a spot. */
export function getFlagship(): ProjectEntry[] {
  return getAllEntries().filter((e) => e.tier === "flagship");
}

/** Archive rows below the flagship cards: smaller/coursework entries. */
export function getArchive(): ProjectEntry[] {
  return getAllEntries().filter((e) => e.tier === "archive");
}

/** Curated picks for the home page. */
export function getFeatured(): ProjectEntry[] {
  return getAllEntries().filter((e) => e.featured);
}

export function getEntry(slug: string): ProjectEntry | undefined {
  if (!fs.existsSync(path.join(CONTENT_DIR, `${slug}.mdx`))) return undefined;
  return parseFile(`${slug}.mdx`);
}
