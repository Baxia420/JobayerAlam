import Link from "next/link";
import Tag from "@/components/Tag";
import type { ProjectMeta } from "@/lib/content";

/** Compact archive list row on /projects, numbered after the flagship cards. */
export default function ArchiveRow({
  project,
  number,
  last = false,
}: {
  project: ProjectMeta;
  number: number;
  last?: boolean;
}) {
  return (
    <Link
      data-mag
      href={`/projects/${project.slug}`}
      className={`-mx-3 flex items-center justify-between gap-6 border-t border-line px-3 py-[26px] transition-colors duration-300 hover:bg-cream-deep/70 ${
        last ? "border-b" : ""
      }`}
    >
      <div className="flex items-baseline gap-5">
        <span className="font-serif text-[22px] italic text-ink/[0.18]">
          {String(number).padStart(2, "0")}
        </span>
        <div>
          <h3 className="font-serif text-[clamp(1.3rem,2.6vw,1.7rem)] font-medium tracking-[-0.01em]">
            {project.title}
          </h3>
          <p className="mt-1.5 text-[15px] text-ink-soft">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Tag variant={project.type}>
              {project.type === "independent" ? "Independent" : "Coursework"}
            </Tag>
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
      <span
        aria-hidden
        className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-ink/15 text-ink-soft"
      >
        →
      </span>
    </Link>
  );
}
