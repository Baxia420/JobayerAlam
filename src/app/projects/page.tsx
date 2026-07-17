import type { Metadata } from "next";
import Link from "next/link";
import { getFlagship, getArchive } from "@/lib/content";
import FeatureCard from "@/components/FeatureCard";
import ArchiveRow from "@/components/ArchiveRow";
import Reveal from "@/components/motion/Reveal";
import Eyebrow from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected independent projects and coursework by Jobayer Alam.",
};

export default function ProjectsPage() {
  const flagship = getFlagship();
  const archive = getArchive();

  return (
    <>
      <section
        className="dot-pattern relative mx-auto max-w-[1080px] px-7 pb-10 pt-[88px]"
        style={{ "--dot-pos": "92% 20%" } as React.CSSProperties}
      >
        <Reveal>
          <Eyebrow mark="01" className="mb-3.5">
            Projects
          </Eyebrow>
          <h1 className="font-display text-[clamp(3rem,10vw,6.4rem)] leading-[0.95] tracking-[-0.02em]">
            Selected work
          </h1>
          <p className="mt-[26px] max-w-[56ch] text-lg leading-[1.65] text-ink-soft">
            Independent projects built outside of class, plus coursework with
            real technical substance. Every entry is tagged so you know the
            context it was built in.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1080px] px-7 pb-10 pt-14">
        <div className="flex flex-col gap-20">
          {flagship.map((project, i) => (
            <Reveal key={project.slug}>
              <FeatureCard project={project} index={i} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-7 pb-10 pt-16">
        {archive.length > 0 && (
          <>
            <Reveal>
              <Eyebrow mark="02" className="mb-2">
                Archive
              </Eyebrow>
              <h2 className="mb-6 font-serif text-[clamp(1.9rem,4.4vw,2.8rem)] font-medium tracking-[-0.02em]">
                More coursework &amp; smaller work
              </h2>
            </Reveal>

            <div>
              {archive.map((project, i) => (
                <Reveal key={project.slug}>
                  <ArchiveRow
                    project={project}
                    number={flagship.length + i + 1}
                    last={i === archive.length - 1}
                  />
                </Reveal>
              ))}
            </div>
          </>
        )}

        <Reveal className="mt-12">
          <Link
            data-mag
            href="/"
            className="border-b border-forest/35 pb-[3px] text-sm font-medium text-forest"
          >
            ← Back home
          </Link>
        </Reveal>
      </section>
    </>
  );
}
