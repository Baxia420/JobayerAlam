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
  { label: "Studying", value: "[Current semester / notable course]" },
  { label: "Building", value: "[What you're currently building]" },
  { label: "Looking for", value: "Internships and mentorship" },
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
            Second semester in, building fast.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1080px] px-7 pb-10 pt-6">
        <div className="grid grid-cols-1 items-start gap-16 min-[761px]:grid-cols-[1.4fr_0.9fr]">
          {/* bio column */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <p className="text-[19px] leading-[1.7] text-ink-soft">
                [Replace with your real bio: 2-3 short paragraphs. Where
                you&rsquo;re studying, what pulled you into software
                engineering, and what you&rsquo;re currently building or
                learning.]
              </p>
            </Reveal>
            <Reveal>
              <p className="text-[19px] leading-[1.7] text-ink-soft">
                I haven&rsquo;t picked a lane yet, whether front-end, back-end,
                or full-stack, and I&rsquo;m treating that as a feature, not a
                bug. My independent projects push my engineering skills, and my
                coursework stretches wider: designing network topologies,
                drawing technical plans, even running a statistics survey from
                methodology to analysis. All of it sharpens how I think about
                systems and data, not just code.
              </p>
            </Reveal>
            <Reveal>
              <p className="text-[19px] leading-[1.7] text-ink-soft">
                Outside of class I volunteer. Showing up consistently matters
                to me as much as shipping.
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
