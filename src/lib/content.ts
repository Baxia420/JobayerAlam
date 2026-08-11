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
  /** Path to the card cover image under /public, e.g. "/projects/aksara/cover.webp". */
  cover?: string;
}

export interface ProjectEntry extends ProjectMeta {
  body: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

function parseFile(filename: string): ProjectEntry {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
  const { data, content } = matter(raw);

  const slug = filename.replace(/\.mdx$/, "");

  if (!data.title || typeof data.title !== "string") {
    throw new Error(`Invalid frontmatter in ${slug}: 'title' is missing or not a string`);
  }
  if (!data.description || typeof data.description !== "string") {
    throw new Error(`Invalid frontmatter in ${slug}: 'description' is missing or not a string`);
  }
  if (!data.date || typeof data.date !== "string") {
    throw new Error(`Invalid frontmatter in ${slug}: 'date' is missing or not a string`);
  }
  if (data.type !== "independent" && data.type !== "coursework") {
    throw new Error(`Invalid frontmatter in ${slug}: 'type' must be "independent" or "coursework", got "${data.type}"`);
  }
  if (data.tier !== "flagship" && data.tier !== "archive") {
    throw new Error(`Invalid frontmatter in ${slug}: 'tier' must be "flagship" or "archive", got "${data.tier}"`);
  }
  if (data.priority !== undefined && typeof data.priority !== "number") {
    throw new Error(`Invalid frontmatter in ${slug}: 'priority' must be a number`);
  }
  if (data.tags !== undefined) {
    if (!Array.isArray(data.tags)) {
      throw new Error(`Invalid frontmatter in ${slug}: 'tags' must be an array`);
    }
    if (!data.tags.every(t => typeof t === "string")) {
      throw new Error(`Invalid frontmatter in ${slug}: 'tags' array must contain only strings`);
    }
  }

  if (data.featured !== undefined && typeof data.featured !== "boolean") {
    throw new Error(`Invalid frontmatter in ${slug}: 'featured' must be a boolean`);
  }

  if (data.priority !== undefined) {
    if (typeof data.priority !== "number" || !Number.isFinite(data.priority)) {
      throw new Error(`Invalid frontmatter in ${slug}: 'priority' must be a finite number`);
    }
  }

  if (data.course !== undefined && typeof data.course !== "string") {
    throw new Error(`Invalid frontmatter in ${slug}: 'course' must be a string`);
  }

  if (data.imageLabel !== undefined && typeof data.imageLabel !== "string") {
    throw new Error(`Invalid frontmatter in ${slug}: 'imageLabel' must be a string`);
  }

  if (data.cover !== undefined && typeof data.cover !== "string") {
    throw new Error(`Invalid frontmatter in ${slug}: 'cover' must be a string`);
  }

  if (data.links !== undefined) {
    if (typeof data.links !== "object" || data.links === null || Array.isArray(data.links)) {
      throw new Error(`Invalid frontmatter in ${slug}: 'links' must be a plain object`);
    }
    for (const key in data.links) {
      if (typeof data.links[key] !== "string") {
        throw new Error(`Invalid frontmatter in ${slug}: 'links' values must be strings`);
      }
    }
  }

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    type: data.type,
    tier: data.tier,
    featured: data.featured ?? false,
    priority: data.priority ?? 0,
    tags: data.tags ?? [],
    course: data.course,
    links: data.links,
    imageLabel: data.imageLabel,
    cover: data.cover,
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
