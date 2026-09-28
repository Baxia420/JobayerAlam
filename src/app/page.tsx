import Link from "next/link";
import { getFeatured } from "@/lib/content";
import HeroIntro from "@/components/motion/HeroIntro";
import HeroFireworks from "@/components/motion/HeroFireworks";
import Reveal from "@/components/motion/Reveal";
import ParallaxGlyph from "@/components/motion/ParallaxGlyph";
import PinnedStatements from "@/components/motion/PinnedStatements";
import FeatureCard from "@/components/FeatureCard";
import SectionHeading from "@/components/SectionHeading";
import Eyebrow from "@/components/Eyebrow";
import SparkMark from "@/components/SparkMark";

export default function Home() {
  // Curated picks only: /projects carries the full flagship list.
  const featured = getFeatured();

  return (
    <>
      <section
        className="dot-pattern relative mx-auto max-w-[1080px] px-7 pb-16 pt-20 sm:pt-28"
        style={{ "--dot-pos": "90% 14%" } as React.CSSProperties}
      >
        <ParallaxGlyph />
        <HeroFireworks />
        <div className="relative z-[1]">
          <HeroIntro>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
              <div>
                <p
                  data-hero-fade
                  className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-forest"
                >
                  <span data-egg className="inline-block">
                    <SparkMark size={15} className="block" />
                  </span>
                  Software Engineering Student
                </p>

                {/* Each mask gets bottom padding (pulled back with a negative
                    margin) so descenders like J and y aren't clipped by the
                    tight 0.92 line-height during the masked reveal. */}
                <h1 className="font-display text-[clamp(3.2rem,8.5vw,6.4rem)] leading-[0.94] tracking-[-0.02em]">
                  <span className="-mb-[0.16em] block overflow-hidden pb-[0.16em]">
                    <span data-hero-line className="block">
                      I&rsquo;m Jobayer Alam.
                    </span>
                  </span>
                  <span className="-mb-[0.16em] block overflow-hidden pb-[0.16em]">
                    <span data-hero-line className="block">
                      I build software,
                    </span>
                  </span>
                  <span className="-mb-[0.16em] block overflow-hidden pb-[0.16em]">
                    <span data-hero-line className="block italic text-forest">
                      end to end.
                    </span>
                  </span>
                </h1>

                <div data-hero-fade className="mt-8 space-y-6">
                  <p className="max-w-[480px] text-lg leading-[1.65] text-ink-soft">
                    I build web applications, AI-powered products, and interactive
                    experiences — handling everything from system design to
                    implementation.
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5 pt-1">
                    <Link
                      data-mag
                      href="/projects"
                      className="group inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-medium text-cream shadow-sm transition-all duration-200 hover:bg-forest-deep hover:shadow"
                    >
                      View projects{" "}
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                    <Link
                      data-mag
                      href="/contact"
                      className="inline-flex items-center rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium transition-colors hover:border-forest hover:bg-cream-deep/40 hover:text-forest"
                    >
                      Contact
                    </Link>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line/70 pt-5 font-mono text-xs text-mono-label">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                      Full-Stack Dev
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                      AI Integration
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                      Freelance &amp; Internships
                    </span>
                  </div>
                </div>
              </div>

              {/* Flexible future visual showcase / preview area */}
              <div data-hero-fade className="hidden lg:block">
                <div className="relative rounded-2xl border border-line bg-cream-deep/40 p-4 shadow-[0_16px_36px_-16px_rgba(26,26,24,0.14)]">
                  <div className="flex items-center justify-between border-b border-line px-1 pb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#bd7b58]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#c8a75e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#8fae9f]" />
                      <span className="ml-2 font-mono text-[11px] text-mono-label">
                        featured-stack.preview
                      </span>
                    </div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-forest">
                      Engineering
                    </span>
                  </div>

                  <div className="mt-3 flex aspect-[4/3] flex-col justify-between rounded-xl border border-dashed border-line bg-cream p-5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="font-medium text-ink">Flagship Systems</span>
                        <span className="text-forest">2025–2026</span>
                      </div>
                      <div className="space-y-2 font-mono text-[11px] text-ink-soft">
                        <div className="flex items-center justify-between rounded bg-cream-deep/70 px-3 py-2">
                          <span className="font-semibold text-ink">ClawFit</span>
                          <span className="text-[10px] text-mono-label">Next.js · Fastify · PostgreSQL · AI</span>
                        </div>
                        <div className="flex items-center justify-between rounded bg-cream-deep/70 px-3 py-2">
                          <span className="font-semibold text-ink">Narmaa Transport</span>
                          <span className="text-[10px] text-mono-label">Production Client Platform</span>
                        </div>
                        <div className="flex items-center justify-between rounded bg-cream-deep/70 px-3 py-2">
                          <span className="font-semibold text-ink">Unsaid</span>
                          <span className="text-[10px] text-mono-label">Tencent Hackathon · Top 5</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-line/60 pt-3 font-mono text-[10px] text-mono-label">
                      <span>Status: Available for hire</span>
                      <span className="font-medium text-forest">Idea → Shipped Code</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HeroIntro>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-[1080px] border-t border-line px-7 py-20 sm:py-24">
        <Reveal className="mb-4">
          <SectionHeading index="01" eyebrow="Selected work">
            Featured projects
          </SectionHeading>
        </Reveal>

        <div className="mt-12 flex flex-col gap-10 sm:gap-14">
          {featured.map((project, i) => (
            <Reveal key={project.slug}>
              <FeatureCard project={project} index={i} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <Link
            data-mag
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-forest-deep"
          >
            <span className="border-b border-forest/35 pb-[3px]">All projects</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </section>

      <section id="services" className="mx-auto max-w-[1080px] border-t border-line px-7 py-16 sm:py-20">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow mark="02" className="mb-2">
                Capabilities
              </Eyebrow>
              <h2 className="font-serif text-[clamp(1.8rem,3.8vw,2.4rem)] font-medium tracking-[-0.02em]">
                What I build for clients &amp; teams
              </h2>
            </div>
            <p className="max-w-[42ch] text-sm leading-relaxed text-ink-soft">
              Available for freelance engagements and engineering roles where full-cycle product delivery matters.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Reveal>
            <div className="group rounded-xl border border-line bg-cream-deep/30 p-6 transition-all duration-200 hover:border-forest/30 hover:bg-cream-deep/50">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-forest">
                Engineering
              </span>
              <h3 className="mt-2.5 font-serif text-xl font-medium tracking-[-0.01em] text-ink">
                Web Development
              </h3>
              <p className="mt-2 text-sm leading-[1.6] text-ink-soft">
                Modern responsive websites and full-stack applications built with Next.js, TypeScript, and clean architectures.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="group rounded-xl border border-line bg-cream-deep/30 p-6 transition-all duration-200 hover:border-forest/30 hover:bg-cream-deep/50">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-forest">
                Intelligence
              </span>
              <h3 className="mt-2.5 font-serif text-xl font-medium tracking-[-0.01em] text-ink">
                AI Integration
              </h3>
              <p className="mt-2 text-sm leading-[1.6] text-ink-soft">
                Adding AI-powered features, dynamic LLM prompt pipelines, and structured automation into software products.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="group rounded-xl border border-line bg-cream-deep/30 p-6 transition-all duration-200 hover:border-forest/30 hover:bg-cream-deep/50">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-forest">
                Systems
              </span>
              <h3 className="mt-2.5 font-serif text-xl font-medium tracking-[-0.01em] text-ink">
                Custom Software
              </h3>
              <p className="mt-2 text-sm leading-[1.6] text-ink-soft">
                Building tools, platforms, and backend services tailored directly to specific business workflows and requirements.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-[1080px] border-t border-line px-7 py-16 sm:py-20">
        <Reveal className="mb-4">
          <SectionHeading index="03" eyebrow="Work history">
            Experience
          </SectionHeading>
        </Reveal>

        <div className="mt-10">
          <Reveal>
            <div className="rounded-xl border border-line bg-cream-deep/30 p-7 transition-all duration-300 hover:border-forest/30 hover:bg-cream-deep/50 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line/60 pb-5">
                <div>
                  <h3 className="font-serif text-2xl font-medium tracking-[-0.01em]">
                    Software Development Intern
                  </h3>
                  <p className="mt-1 font-medium text-forest">Narmaa Transport</p>
                </div>
                <span className="font-mono text-sm text-ink-soft">2025</span>
              </div>
              <p className="mt-5 text-base leading-[1.6] text-ink-soft">
                Developed and deployed the company&rsquo;s website by converting business requirements into a customer-facing digital platform.
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-2.5 text-sm text-ink-soft sm:grid-cols-2">
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-forest" />
                  Developed website pages
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-forest" />
                  Created responsive layouts
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-forest" />
                  Implemented enquiry flows
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-forest" />
                  Deployed production website
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="achievements" className="mx-auto max-w-[1080px] border-t border-line px-7 py-16 sm:py-20">
        <Reveal className="mb-4">
          <SectionHeading index="04" eyebrow="Recognition">
            Achievements
          </SectionHeading>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-cream-deep/30 p-6 transition-all duration-300 hover:border-forest/30 hover:bg-cream-deep/50">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-forest">
                    Hackathon
                  </span>
                  <span className="rounded-full border border-forest/20 bg-forest/[0.06] px-2.5 py-0.5 text-xs font-medium text-forest">
                    Top 5 Finalist
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-xl font-medium tracking-[-0.01em]">
                  Tencent Hackathon 2026
                </h3>
                <p className="mt-2 text-sm leading-[1.6] text-ink-soft">
                  Developed Unsaid, an AI-powered cinematic conversation game as a solo developer.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-cream-deep/30 p-6 transition-all duration-300 hover:border-forest/30 hover:bg-cream-deep/50">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-forest">
                    Hackathon
                  </span>
                  <span className="rounded-full border border-forest/20 bg-forest/[0.06] px-2.5 py-0.5 text-xs font-medium text-forest">
                    Top 5 Finalist
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-xl font-medium tracking-[-0.01em]">
                  UTM Hackathon 2026
                </h3>
                <p className="mt-2 text-sm leading-[1.6] text-ink-soft">
                  Developed Moonblade, a browser-based 2D action game without using a game engine.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-cream-deep/30 p-6 transition-all duration-300 hover:border-forest/30 hover:bg-cream-deep/50">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-forest">
                    Academic
                  </span>
                  <span className="rounded-full border border-forest/20 bg-forest/[0.06] px-2.5 py-0.5 text-xs font-medium text-forest">
                    2× Recipient
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-xl font-medium tracking-[-0.01em]">
                  Dean&rsquo;s List Recipient
                </h3>
                <p className="mt-0.5 text-xs font-medium text-ink-soft">
                  Universiti Teknologi Malaysia
                </p>
                <p className="mt-2 text-sm leading-[1.6] text-ink-soft">
                  Received Dean&rsquo;s List recognition twice. Current CGPA: 3.71 / 4.00
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-cream-deep/30 p-6 transition-all duration-300 hover:border-forest/30 hover:bg-cream-deep/50">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-forest">
                    Language
                  </span>
                  <span className="rounded-full border border-forest/20 bg-forest/[0.06] px-2.5 py-0.5 text-xs font-medium text-forest">
                    Band 8.0
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-xl font-medium tracking-[-0.01em]">
                  IELTS Academic
                </h3>
                <p className="mt-2 text-sm leading-[1.6] text-ink-soft">
                  Overall Band Score: 8.0
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PinnedStatements />

      <section
        id="contact"
        className="mx-auto max-w-[1080px] px-7 pb-12 pt-20 sm:pt-28"
      >
        <Reveal>
          <SectionHeading index="05" eyebrow="Get in touch">
            Let&rsquo;s talk.
          </SectionHeading>
        </Reveal>
        <Reveal className="mt-7">
          <a
            data-mag
            href="mailto:jobayermahin@gmail.com"
            className="group inline-block break-all font-display text-[clamp(1.8rem,6vw,4.6rem)] leading-[1.05] tracking-[-0.01em] transition-colors hover:text-forest"
          >
            jobayermahin@gmail.com
            <span
              aria-hidden
              className="ml-3 inline-block text-forest transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
            >
              ↗
            </span>
          </a>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.6] text-ink-soft">
            Available for freelance projects, internships, and collaborations.
          </p>
        </Reveal>
      </section>
    </>
  );
}
