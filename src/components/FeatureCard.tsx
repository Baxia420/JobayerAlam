import Link from "next/link";
import Tag from "@/components/Tag";
import Tilt from "@/components/motion/Tilt";
import type { ProjectMeta } from "@/lib/content";

/**
 * Alternating-layout flagship project card: striped image placeholder on one
 * side (tilts toward the pointer), ghost numeral + title + pitch + tags on
 * the other. `flip` puts the image on the right.
 */
export default function FeatureCard({
  project,
  index,
  flip = false,
}: {
  project: ProjectMeta;
  index: number;
  flip?: boolean;
}) {
  const image = (
    <Tilt maxDeg={7} scale={1.02} className={flip ? "sm:order-1" : ""}>
      <div className="flex aspect-[4/3] flex-col overflow-hidden rounded-xl border border-line bg-cream-deep">
        <div className="flex items-center gap-1.5 bg-stripe px-4 py-2.5">
          {/* macOS traffic-light layout, tinted to the palette (clay / ochre /
              sage) so it reads as a Mac window without the loud native colors. */}
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#bd7b58]" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#c8a75e]" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#8fae9f]" />
          <span className="ml-2 font-mono text-[11px] tracking-[0.08em] text-mono-label">
            {project.slug}
          </span>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-mono-label">
            {project.imageLabel ?? "screenshot coming"}
          </span>
        </div>
      </div>
    </Tilt>
  );

  const text = (
    <div className={flip ? "sm:order-2" : ""}>
      <span className="font-serif text-[34px] italic text-ink/[0.16]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-2 font-serif text-[clamp(1.6rem,3.4vw,2.4rem)] font-medium tracking-[-0.02em]">
        {project.title}
      </h3>
      <p className="mt-3.5 max-w-[34ch] leading-[1.6] text-ink-soft">
        {project.description}
      </p>
      <div className="mt-[22px] flex flex-wrap gap-2">
        <Tag variant={project.type}>
          {project.type === "independent" ? "Independent" : "Coursework"}
        </Tag>
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  );

  return (
    <Link
      data-mag
      href={`/projects/${project.slug}`}
      className="grid grid-cols-1 items-center gap-11 sm:grid-cols-2"
    >
      {image}
      {text}
    </Link>
  );
}
