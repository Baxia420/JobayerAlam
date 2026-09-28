import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import Tilt from "@/components/motion/Tilt";
import Eyebrow from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "About",
  description: "Who Jobayer Alam is and where he's headed.",
};

const rightNow = [
  {
    label: "Studying",
    value: "Software Engineering at Universiti Teknologi Malaysia",
  },
  { label: "Building", value: "ClawFit & AI-powered applications" },
  {
    label: "Looking for",
    value: "Freelance projects & software engineering internships",
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

      <section className="mx-auto max-w-[1080px] px-7 pb-10 pt-6">
        <div className="grid grid-cols-1 items-start gap-16 min-[761px]:grid-cols-[1.4fr_0.9fr]">
          {/* bio column */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <p className="text-[19px] leading-[1.7] text-ink-soft">
                I&rsquo;m Jobayer Alam, a software engineering student at
                Universiti Teknologi Malaysia. I build complete software
                products from idea to implementation — spanning web
                applications, AI-powered systems, and interactive experiences.
              </p>
            </Reveal>
            <Reveal>
              <p className="text-[19px] leading-[1.7] text-ink-soft">
                My work bridges frontend engineering, backend services, and
                system design. Whether building full-stack platforms like
                ClawFit, developing production client websites like Narmaa
                Transport, or competing in hackathons, I enjoy working through
                the entire development lifecycle.
              </p>
            </Reveal>
            <Reveal>
              <p className="text-[19px] leading-[1.7] text-ink-soft">
                I learn by building real products and solving concrete
                constraints. I&rsquo;m always interested in freelance
                opportunities, engineering internships, and collaborating on
                ambitious software projects.
              </p>
            </Reveal>

            <Reveal className="mt-4">
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
              <Tilt maxDeg={5} scale={1.015}>
                <div className="stripes flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[14px] border border-line">
                  <span className="font-mono text-xs uppercase tracking-[0.1em] text-mono-label">
                    portrait
                  </span>
                </div>
              </Tilt>
            </Reveal>
            <Reveal>
              <div className="rounded-[14px] bg-cream-deep p-7">
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
