import Link from "next/link";
import { getFeatured } from "@/lib/content";
import HeroIntro from "@/components/motion/HeroIntro";
import HeroFireworks from "@/components/motion/HeroFireworks";
import Reveal from "@/components/motion/Reveal";
import ParallaxGlyph from "@/components/motion/ParallaxGlyph";
import PinnedStatements from "@/components/motion/PinnedStatements";
import FeatureCard from "@/components/FeatureCard";
import SectionHeading from "@/components/SectionHeading";
import SparkMark from "@/components/SparkMark";

export default function Home() {
  // Curated picks only: /projects carries the full flagship list.
  const featured = getFeatured();

  return (
    <>
      <section
        className="dot-pattern relative mx-auto max-w-[1080px] px-7 pb-[72px] pt-24"
        style={{ "--dot-pos": "90% 14%" } as React.CSSProperties}
      >
        <ParallaxGlyph />
        <HeroFireworks />
        <div className="relative z-[1]">
          <HeroIntro>
            <p
              data-hero-fade
              className="mb-[30px] flex items-center gap-3 text-xs font-medium uppercase tracking-[0.26em] text-forest"
            >
              <span data-egg className="inline-block">
                <SparkMark size={15} className="block" />
              </span>
              Software engineering student
            </p>
            {/* Each mask gets bottom padding (pulled back with a negative
                margin) so descenders like J and y aren't clipped by the
                tight 0.92 line-height during the masked reveal. */}
            <h1 className="font-display text-[clamp(3.4rem,11.5vw,8rem)] leading-[0.92] tracking-[-0.02em]">
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

            <div
              data-hero-fade
              className="mt-[52px] flex flex-wrap items-start justify-between gap-8 border-t border-line pt-[30px]"
            >
              <p className="max-w-[460px] text-lg leading-[1.65] text-ink-soft">
                I build web applications, AI-powered products, and interactive
                experiences — handling everything from system design to
                implementation.
              </p>
              <div className="flex flex-wrap gap-3.5">
                <Link
                  data-mag
                  href="/projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-forest px-[26px] py-3.5 text-sm font-medium text-cream transition-colors hover:bg-forest-deep"
                >
                  View projects{" "}
                  <span
                    aria-hidden
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
                <Link
                  data-mag
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-ink/20 px-[26px] py-3.5 text-sm font-medium transition-colors hover:border-forest hover:text-forest"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </HeroIntro>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-[1080px] border-t border-line px-7 py-[104px]">
        <Reveal className="mb-4">
          <SectionHeading index="01" eyebrow="Selected work">
            Featured projects
          </SectionHeading>
        </Reveal>

        <div className="mt-14 flex flex-col gap-20">
          {featured.map((project, i) => (
            <Reveal key={project.slug}>
              <FeatureCard project={project} index={i} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <Link
            data-mag
            href="/projects"
            className="border-b border-forest/35 pb-[3px] text-sm font-medium text-forest"
          >
            All projects →
          </Link>
        </Reveal>
      </section>

      <section id="services" className="mx-auto max-w-[1080px] border-t border-line px-7 py-[104px]">
        <Reveal className="mb-4">
          <SectionHeading index="02" eyebrow="What I offer">
            Services
          </SectionHeading>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-cream-deep p-7">
              <div>
                <span className="font-serif text-2xl italic text-ink/20">01</span>
                <h3 className="mt-4 font-serif text-2xl font-medium tracking-[-0.01em]">
                  Web Development
                </h3>
                <p className="mt-3 text-base leading-[1.6] text-ink-soft">
                  Modern responsive websites and full-stack applications.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-cream-deep p-7">
              <div>
                <span className="font-serif text-2xl italic text-ink/20">02</span>
                <h3 className="mt-4 font-serif text-2xl font-medium tracking-[-0.01em]">
                  AI Integration
                </h3>
                <p className="mt-3 text-base leading-[1.6] text-ink-soft">
                  Adding AI-powered features and automation into software products.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-cream-deep p-7">
              <div>
                <span className="font-serif text-2xl italic text-ink/20">03</span>
                <h3 className="mt-4 font-serif text-2xl font-medium tracking-[-0.01em]">
                  Custom Software
                </h3>
                <p className="mt-3 text-base leading-[1.6] text-ink-soft">
                  Building tools and platforms based on specific requirements.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-[1080px] border-t border-line px-7 py-[104px]">
        <Reveal className="mb-4">
          <SectionHeading index="03" eyebrow="Work history">
            Experience
          </SectionHeading>
        </Reveal>

        <div className="mt-12">
          <Reveal>
            <div className="rounded-xl border border-line bg-cream-deep p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-serif text-2xl font-medium tracking-[-0.01em]">
                    Software Development Intern
                  </h3>
                  <p className="mt-1 font-medium text-forest">Narmaa Transport</p>
                </div>
                <span className="font-mono text-sm text-ink-soft">2025</span>
              </div>
              <p className="mt-4 text-base leading-[1.6] text-ink-soft">
                Developed and deployed the company&rsquo;s website by converting business requirements into a customer-facing digital platform.
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-sm text-ink-soft">
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

      <section id="achievements" className="mx-auto max-w-[1080px] border-t border-line px-7 py-[104px]">
        <Reveal className="mb-4">
          <SectionHeading index="04" eyebrow="Recognition">
            Achievements
          </SectionHeading>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-cream-deep p-7">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-forest">
                    Hackathon
                  </span>
                  <span className="rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-medium text-forest">
                    Top 5 Finalist
                  </span>
                </div>
                <h3 className="mt-3.5 font-serif text-2xl font-medium tracking-[-0.01em]">
                  Tencent Hackathon 2026
                </h3>
                <p className="mt-2.5 text-sm leading-[1.6] text-ink-soft">
                  Developed Unsaid, an AI-powered cinematic conversation game as a solo developer.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-cream-deep p-7">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-forest">
                    Hackathon
                  </span>
                  <span className="rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-medium text-forest">
                    Top 5 Finalist
                  </span>
                </div>
                <h3 className="mt-3.5 font-serif text-2xl font-medium tracking-[-0.01em]">
                  UTM Hackathon 2026
                </h3>
                <p className="mt-2.5 text-sm leading-[1.6] text-ink-soft">
                  Developed Moonblade, a browser-based 2D action game without using a game engine.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-cream-deep p-7">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-forest">
                    Academic
                  </span>
                  <span className="rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-medium text-forest">
                    Dean&rsquo;s List 2×
                  </span>
                </div>
                <h3 className="mt-3.5 font-serif text-2xl font-medium tracking-[-0.01em]">
                  Dean&rsquo;s List Recipient
                </h3>
                <p className="mt-1 text-sm font-medium text-ink-soft">
                  Universiti Teknologi Malaysia
                </p>
                <p className="mt-2.5 text-sm leading-[1.6] text-ink-soft">
                  Received Dean&rsquo;s List recognition twice. Current CGPA: 3.71 / 4.00
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-cream-deep p-7">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-forest">
                    Language
                  </span>
                  <span className="rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-medium text-forest">
                    Band 8.0
                  </span>
                </div>
                <h3 className="mt-3.5 font-serif text-2xl font-medium tracking-[-0.01em]">
                  IELTS Academic
                </h3>
                <p className="mt-2.5 text-sm leading-[1.6] text-ink-soft">
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
        className="mx-auto max-w-[1080px] px-7 pb-10 pt-[120px]"
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
            className="inline-block break-all font-display text-[clamp(1.8rem,6vw,4.6rem)] leading-[1.05] tracking-[-0.01em]"
          >
            jobayermahin@gmail.com
            <span aria-hidden className="ml-3 inline-block text-forest">
              ↗
            </span>
          </a>
          <p className="mt-[26px] max-w-xl text-[17px] leading-[1.6] text-ink-soft">
            Available for freelance projects, internships, and collaborations.
          </p>
        </Reveal>
      </section>
    </>
  );
}
