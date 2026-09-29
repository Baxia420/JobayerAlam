import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import Eyebrow from "@/components/Eyebrow";
import ProfileCard from "@/components/ProfileCard";

export const metadata: Metadata = {
  title: "About",
  description: "Who Jobayer Alam is, his background in software engineering, and how he builds products.",
};

const rightNow = [
  {
    label: "Studying",
    value: "Software Engineering at Universiti Teknologi Malaysia (UTM)",
  },
  { label: "Building", value: "ClawFit & AI-assisted products" },
  {
    label: "Focus",
    value: "Full-Stack Development, System Architecture & AI Integration",
  },
  {
    label: "Looking for",
    value: "Freelance client work & software engineering internships",
  },
];

export default function AboutPage() {
  return (
    <>
      <section
        className="dot-pattern relative mx-auto max-w-[1080px] px-7 pb-12 pt-[88px]"
        style={{ "--dot-pos": "94% 24%" } as React.CSSProperties}
      >
        <Reveal>
          <Eyebrow className="mb-3.5">About</Eyebrow>
          <h1 className="max-w-[16ch] font-display text-[clamp(3rem,9vw,6rem)] leading-[0.96] tracking-[-0.02em]">
            Building complete software, end to end.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1080px] px-7 pb-14 pt-6">
        <div className="grid grid-cols-1 items-start gap-14 min-[761px]:grid-cols-[1.3fr_0.9fr]">
          {/* bio column */}
          <div className="flex flex-col gap-8">
            <Reveal>
              <div className="space-y-4">
                <p className="text-[19px] leading-[1.7] text-ink-soft">
                  I&rsquo;m Jobayer Alam, a software engineering student at
                  Universiti Teknologi Malaysia. I build complete software
                  products from idea to implementation — spanning web
                  applications, AI-powered systems, and interactive software.
                </p>
                <p className="text-[19px] leading-[1.7] text-ink-soft">
                  Rather than specializing narrowly in front-end or back-end,
                  I work across the entire product lifecycle: understanding what
                  users and businesses need, architecting relational schemas,
                  building resilient APIs, and crafting fast, accessible
                  interfaces.
                </p>
              </div>
            </Reveal>

            {/* Three Pillars */}
            <div className="space-y-6 border-t border-line/70 pt-6">
              <Reveal>
                <div className="rounded-xl border border-line bg-cream-deep/30 p-6">
                  <h2 className="font-serif text-xl font-medium tracking-tight text-ink">
                    I build beyond assignments.
                  </h2>
                  <p className="mt-2 text-base leading-[1.65] text-ink-soft">
                    The work that has shaped my engineering skills the most is
                    the work nobody assigned. I take concepts from university
                    lectures and push them into real-world applications — like
                    building a custom 2D action engine on bare canvas or
                    designing structured AI prompt pipelines for cinematic games.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="rounded-xl border border-line bg-cream-deep/30 p-6">
                  <h2 className="font-serif text-xl font-medium tracking-tight text-ink">
                    I learn by creating real products.
                  </h2>
                  <p className="mt-2 text-base leading-[1.65] text-ink-soft">
                    Reading documentation and following tutorials only goes so far.
                    True understanding comes from solving production bottlenecks:
                    handling database foreign-key constraints in PostgreSQL,
                    optimizing Fastify REST endpoints, managing sub-second LLM
                    inference windows, and deploying websites that real businesses
                    rely on.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="rounded-xl border border-line bg-cream-deep/30 p-6">
                  <h2 className="font-serif text-xl font-medium tracking-tight text-ink">
                    I build across the full process.
                  </h2>
                  <p className="mt-2 text-base leading-[1.65] text-ink-soft">
                    From problem definition to deployed software, I enjoy
                    handling the complete path. When developing Narmaa
                    Transport, that meant translating client operational
                    friction into a responsive customer-facing platform with a
                    direct WhatsApp enquiry funnel that actually converts.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal className="mt-2">
              <div className="flex flex-wrap gap-3.5">
                <Link
                  data-mag
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-[13px] text-sm font-medium text-cream transition-colors hover:bg-forest-deep"
                >
                  See the work <span aria-hidden>→</span>
                </Link>
                <Link
                  data-mag
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-ink/20 px-6 py-[13px] text-sm font-medium transition-colors hover:border-forest hover:text-forest"
                >
                  Get in touch
                </Link>
              </div>
            </Reveal>
          </div>

          {/* sticky aside */}
          <div className="flex flex-col gap-7 min-[761px]:sticky min-[761px]:top-24">
            <Reveal>
              <ProfileCard />
            </Reveal>

            <Reveal>
              <div className="rounded-2xl border border-line bg-cream-deep p-7">
                <h2 className="mb-[18px] font-serif text-xl font-medium tracking-[-0.01em]">
                  Right now
                </h2>
                <dl className="flex flex-col gap-4">
                  {rightNow.map((item, i) => (
                    <div
                      key={item.label}
                      className={
                        i > 0 ? "border-t border-line pt-4" : undefined
                      }
                    >
                      <dt className="mb-[5px] text-[11px] font-semibold uppercase tracking-[0.2em] text-forest">
                        {item.label}
                      </dt>
                      <dd className="text-[15px] text-ink-soft">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
