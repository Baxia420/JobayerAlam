import Link from "next/link";
import Tag from "@/components/Tag";
import Tilt from "@/components/motion/Tilt";
import type { ProjectMeta } from "@/lib/content";

function getProjectBadge(slug: string, type: string) {
  if (slug === "clawfit") return "AI · Full-Stack Platform";
  if (slug === "narmaa") return "Production Client Work";
  if (slug === "unsaid") return "Top 5 Finalist · AI Game";
  if (slug === "moonblade") return "Top 5 Finalist · Canvas Engine";
  return type === "independent" ? "Independent Project" : "Coursework";
}

function ProductPreviewShell({ project }: { project: ProjectMeta }) {
  if (project.cover) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.cover}
        alt={`${project.title} — preview`}
        loading="lazy"
        className="h-full w-full object-contain"
      />
    );
  }

  if (project.slug === "clawfit") {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-cream p-5 font-sans select-none">
        <div className="flex items-center justify-between border-b border-line pb-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-forest" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-forest">
              Nutrition &amp; Workout Engine
            </span>
          </div>
          <span className="font-mono text-[10px] text-mono-label">Fastify · PostgreSQL</span>
        </div>

        <div className="my-auto space-y-3 py-2">
          <div className="rounded-lg border border-line bg-cream-deep/60 p-3">
            <div className="flex items-baseline justify-between text-xs font-medium">
              <span className="text-ink">Daily Caloric Target</span>
              <span className="font-mono font-semibold text-forest">2,150 / 2,400 kcal</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div className="h-full w-[82%] rounded-full bg-forest transition-all" />
            </div>
            <div className="mt-2.5 grid grid-cols-3 gap-2 pt-0.5 font-mono text-[10px] text-ink-soft">
              <div>Protein: <span className="font-semibold text-ink">145g</span></div>
              <div>Carbs: <span className="font-semibold text-ink">210g</span></div>
              <div>Fats: <span className="font-semibold text-ink">58g</span></div>
            </div>
          </div>

          <div className="rounded-lg border border-dashed border-forest/30 bg-forest/[0.03] p-3 text-xs">
            <div className="font-mono text-[10px] uppercase tracking-wider text-forest font-semibold">
              AI Meal Analysis Pipeline
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-ink/85 italic">
              &ldquo;Grilled salmon, sweet potato, and steamed broccoli&rdquo;
            </p>
            <div className="mt-2 flex items-center justify-between font-mono text-[9px]">
              <span className="rounded bg-forest/10 px-2 py-0.5 font-medium text-forest">
                Vision &amp; NLP Ingestion
              </span>
              <span className="text-mono-label">Parsed into relational schema</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line pt-2 font-mono text-[10px] text-mono-label">
          <span>Next.js Client Dashboard</span>
          <span>Validated Payload ✓</span>
        </div>
      </div>
    );
  }

  if (project.slug === "unsaid") {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-cream p-5 font-sans select-none">
        <div className="flex items-center justify-between border-b border-line pb-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#bd7b58]" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
              Cinematic Dialogue Runtime
            </span>
          </div>
          <span className="font-mono text-[10px] font-semibold text-forest">Top 5 Finalist</span>
        </div>

        <div className="my-auto space-y-2.5 py-2">
          <div className="flex items-center justify-between rounded-md border border-line bg-cream-deep/60 px-3 py-1.5 font-mono text-[10px]">
            <span className="text-ink-soft">Trust Meter: <strong className="text-forest">78%</strong></span>
            <span className="text-ink-soft">Hesitation: <strong className="text-[#bd7b58]">22%</strong></span>
            <span className="text-mono-label">Branch: Alpha-3</span>
          </div>

          <div className="rounded-lg border border-line bg-cream-deep/40 p-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-forest font-semibold">
              AI Character Response
            </div>
            <p className="mt-1.5 font-serif text-[13px] leading-snug text-ink italic">
              &ldquo;You weren&rsquo;t supposed to look in that archive. What did you think you would find?&rdquo;
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between rounded border border-dashed border-forest/30 bg-forest/[0.04] px-2.5 py-1 text-[11px] text-ink">
              <span>&ldquo;I only looked because you were hiding something.&rdquo;</span>
              <span className="font-mono text-[9px] text-[#bd7b58]">Tone: Direct</span>
            </div>
            <div className="flex items-center justify-between rounded border border-line bg-white/40 px-2.5 py-1 text-[11px] text-ink-soft">
              <span>&ldquo;I came to help you finish what you started.&rdquo;</span>
              <span className="font-mono text-[9px] text-forest">Trust +15%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line pt-2 font-mono text-[10px] text-mono-label">
          <span>Dynamic State Machine</span>
          <span>Sub-second Latency</span>
        </div>
      </div>
    );
  }

  return (
    <div className="stripes flex h-full w-full items-center justify-center">
      <span className="font-mono text-xs uppercase tracking-[0.1em] text-mono-label">
        {project.imageLabel ?? "product preview"}
      </span>
    </div>
  );
}

/**
 * Product-focused flagship showcase card:
 * Elevated container, domain-tailored interactive preview shell,
 * structured hierarchy, technology tags, and clear interaction prompt.
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
  const badge = getProjectBadge(project.slug, project.type);

  const image = (
    <Tilt maxDeg={5} scale={1.015} className={flip ? "lg:order-2" : "lg:order-1"}>
      <div className="flex aspect-[16/11] flex-col overflow-hidden rounded-xl border border-line/80 bg-cream-deep shadow-[0_16px_36px_-14px_rgba(26,26,24,0.18)] transition-shadow duration-300 group-hover:shadow-[0_24px_48px_-16px_rgba(45,74,62,0.22)]">
        <div className="flex items-center justify-between bg-stripe px-4 py-2.5 border-b border-line/70">
          <div className="flex items-center gap-1.5">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#bd7b58]" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#c8a75e]" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#8fae9f]" />
            <span className="ml-2 font-mono text-[11px] tracking-[0.08em] text-mono-label">
              {project.slug}
            </span>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-wider text-mono-label sm:inline-block">
            {badge}
          </span>
        </div>
        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-cream">
          <ProductPreviewShell project={project} />
        </div>
      </div>
    </Tilt>
  );

  const text = (
    <div className={`flex flex-col justify-center ${flip ? "lg:order-1" : "lg:order-2"}`}>
      <div className="flex items-center justify-between gap-4">
        <span className="font-serif text-[34px] italic text-ink/[0.22] transition-colors group-hover:text-forest">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="rounded-full border border-forest/20 bg-forest/[0.06] px-3 py-1 text-[11px] font-medium tracking-wide text-forest">
          {badge}
        </span>
      </div>

      <h3 className="mt-3 font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-forest">
        {project.title}
      </h3>

      <p className="mt-3 leading-[1.65] text-ink-soft">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Tag variant={project.type}>
          {project.type === "independent"
            ? "Independent"
            : project.type === "hackathon"
            ? "Hackathon"
            : "Coursework"}
        </Tag>
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-forest">
        <span>Explore case study</span>
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
        >
          →
        </span>
      </div>
    </div>
  );

  return (
    <Link
      data-mag
      href={`/projects/${project.slug}`}
      className="group relative block rounded-2xl border border-line bg-cream-deep/20 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-forest/35 hover:bg-cream-deep/40 hover:shadow-[0_20px_48px_-18px_rgba(45,74,62,0.12)] sm:p-9"
    >
      <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-2 lg:gap-12">
        {image}
        {text}
      </div>
    </Link>
  );
}
