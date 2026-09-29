import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import Eyebrow from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Resume",
  description: "Jobayer Alam's resume: education, experience, achievements, and technical skills.",
};

const experience = [
  {
    title: "Software Development Intern · Narmaa Transport",
    period: "2025",
    description:
      "Developed a customer-facing production web application with React and TypeScript for a Malaysian transport business. Replaced manual booking friction with an automated WhatsApp lead generation funnel, structured a dynamic typed catalogue for fleet and tour services, implemented programmatic SEO metadata and OpenGraph tags, and coordinated feature-flagged releases with business stakeholders.",
  },
];

const education = [
  {
    title: "BSc in Software Engineering · Universiti Teknologi Malaysia (UTM)",
    period: "2025–2029 (Expected)",
    description:
      "Current CGPA: 3.71 / 4.00 · Dean's List (2 semesters) · IELTS Academic Band 8.0. Core study areas include Software Architecture, Relational Database Systems, Full-Stack Web Engineering, and AI Systems Integration.",
  },
];

const achievements = [
  {
    title: "Top 5 Finalist · Tencent Hackathon 2026",
    period: "2026",
    description:
      "Built Unsaid end-to-end as a solo developer: an AI-powered conversational game using dynamic disposition state machines and schema-constrained LLM generation with sub-500ms response targets.",
  },
  {
    title: "Top 5 Finalist · UTM Hackathon 2026",
    period: "2026",
    description:
      "Built Moonblade end-to-end as a solo developer: a zero-dependency 2D action game written in raw HTML5 Canvas with custom 60 FPS fixed-timestep physics, AABB collisions, and multi-phase boss AI.",
  },
  {
    title: "Dean's List Award (2 Semesters)",
    period: "2025–2026",
    description:
      "Awarded by Universiti Teknologi Malaysia in recognition of academic excellence in Software Engineering.",
  },
];

const projects = [
  {
    title: "ClawFit — AI-Assisted Nutrition & Fitness Platform",
    period: "2026",
    description:
      "Full-stack application built with Next.js, Fastify, and PostgreSQL. Parses natural language and image meal inputs into typed relational records via schema-constrained AI ingestion with sub-second response times.",
  },
  {
    title: "Narmaa Transport — Regional Logistics & Tourism Platform",
    period: "2026",
    description:
      "Production customer-facing website built with React, TypeScript, and Tailwind CSS. Features fleet and tour catalogues with deep-linked WhatsApp inquiry qualification and programmatic SEO.",
  },
  {
    title: "Unsaid — Cinematic AI Narrative Game",
    period: "2026",
    description:
      "Solo hackathon finalist project combining a deterministic emotion state machine with prompt-constrained LLM output for real-time dramatic pacing under 500ms latency.",
  },
  {
    title: "Moonblade — Zero-Dependency Canvas Action Game",
    period: "2026",
    description:
      "Solo hackathon finalist project featuring a custom 60 FPS fixed-timestep physics loop, AABB collision detection, and multi-phase boss state machines without third-party engines.",
  },
];

const skillCategories = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5 Canvas"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Fastify", "REST APIs"],
  },
  {
    category: "Database",
    skills: ["PostgreSQL", "Supabase"],
  },
  {
    category: "AI & LLM Integration",
    skills: [
      "AI APIs",
      "Prompt Engineering",
      "Structured JSON Schemas",
      "AI-Assisted Workflows",
    ],
  },
  {
    category: "Tools & DevOps",
    skills: ["Git", "GitHub", "Vercel", "Docker"],
  },
];

export default function ResumePage() {
  return (
    <>
      <section
        className="dot-pattern relative mx-auto max-w-[820px] px-7 pb-10 pt-[88px]"
        style={{ "--dot-pos": "92% 22%" } as React.CSSProperties}
      >
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow className="mb-3.5">Resume</Eyebrow>
              <h1 className="font-display text-[clamp(3rem,9vw,6rem)] leading-[0.96] tracking-[-0.02em]">
                The one-pager
              </h1>
            </div>
            <a
              data-mag
              href="/Jobayer-Alam-Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-[13px] text-sm font-medium text-cream transition-colors hover:bg-forest-deep"
            >
              Download PDF <span aria-hidden>↓</span>
            </a>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[820px] px-7 py-10">
        {/* Experience */}
        <Reveal className="mb-12">
          <h2 className="mb-6 border-b border-line pb-2 text-xs font-medium uppercase tracking-[0.2em] text-forest">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((item) => (
              <div key={item.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-lg font-medium tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <span className="text-sm text-ink-soft">{item.period}</span>
                </div>
                <p className="mt-1 text-ink-soft leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Education */}
        <Reveal className="mb-12">
          <h2 className="mb-6 border-b border-line pb-2 text-xs font-medium uppercase tracking-[0.2em] text-forest">
            Education
          </h2>
          <div className="space-y-6">
            {education.map((item) => (
              <div key={item.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-lg font-medium tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <span className="text-sm text-ink-soft">{item.period}</span>
                </div>
                <p className="mt-1 text-ink-soft leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Honors & Awards */}
        <Reveal className="mb-12">
          <h2 className="mb-6 border-b border-line pb-2 text-xs font-medium uppercase tracking-[0.2em] text-forest">
            Honors &amp; Hackathon Achievements
          </h2>
          <div className="space-y-6">
            {achievements.map((item) => (
              <div key={item.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-lg font-medium tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <span className="text-sm text-ink-soft">{item.period}</span>
                </div>
                <p className="mt-1 text-ink-soft leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Flagship Projects */}
        <Reveal className="mb-12">
          <h2 className="mb-6 border-b border-line pb-2 text-xs font-medium uppercase tracking-[0.2em] text-forest">
            Flagship Projects
          </h2>
          <div className="space-y-6">
            {projects.map((item) => (
              <div key={item.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-lg font-medium tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <span className="text-sm text-ink-soft">{item.period}</span>
                </div>
                <p className="mt-1 text-ink-soft leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Technical Skills */}
        <Reveal className="mb-12">
          <h2 className="mb-6 border-b border-line pb-2 text-xs font-medium uppercase tracking-[0.2em] text-forest">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {skillCategories.map((group) => (
              <div
                key={group.category}
                className="rounded-lg border border-line bg-cream-deep/40 p-4"
              >
                <h3 className="font-mono text-xs uppercase tracking-wider text-forest font-semibold mb-2.5">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-line bg-cream px-2.5 py-1 text-xs text-ink font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
