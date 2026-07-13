import Link from "next/link";
import { getFlagship } from "@/lib/content";
import HeroIntro from "@/components/motion/HeroIntro";
import HeroFireworks from "@/components/motion/HeroFireworks";
import Reveal from "@/components/motion/Reveal";
import ParallaxGlyph from "@/components/motion/ParallaxGlyph";
import PinnedStatements from "@/components/motion/PinnedStatements";
import FeatureCard from "@/components/FeatureCard";
import SectionHeading from "@/components/SectionHeading";
import SparkMark from "@/components/SparkMark";

export default function Home() {
  const flagship = getFlagship();

  return (
    <>
      <section
        className="dot-pattern relative mx-auto max-w-[1080px] overflow-hidden px-7 pb-[72px] pt-24"
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
                Independent projects, university coursework, and community
                work, all in one place. Still deciding between front-end,
                back-end, and everything in between, and building my way to
                the answer.
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
          {flagship.map((project, i) => (
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

      <PinnedStatements />

      <section
        id="contact"
        className="mx-auto max-w-[1080px] px-7 pb-10 pt-[120px]"
      >
        <Reveal>
          <SectionHeading index="02" eyebrow="Get in touch">
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
            Open to internships, collaborations, and good conversations about
            software.
          </p>
        </Reveal>
      </section>
    </>
  );
}
