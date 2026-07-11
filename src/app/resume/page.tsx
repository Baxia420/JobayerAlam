import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import Eyebrow from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Resume",
  description: "Jobayer Alam's resume: education, skills, and experience.",
};

const sections = [
  {
    heading: "Education",
    items: [
      {
        title: "BSc in Software Engineering, [University name]",
        period: "2025-2029 (expected)",
        detail: "[GPA if strong, relevant coursework, scholarships or honors.]",
      },
    ],
  },
  {
    heading: "Skills",
    items: [
      {
        title: "Languages & tools",
        period: "",
        detail:
          "[e.g. TypeScript, Python, Java. List what you can actually be interviewed on, nothing aspirational.]",
      },
    ],
  },
  {
    heading: "Projects",
    items: [
      {
        title: "Major Project One",
        period: "2026",
        detail: "[One line: the pitch plus the stack.]",
      },
      {
        title: "Major Project Two",
        period: "2026",
        detail: "[One line.]",
      },
    ],
  },
  {
    heading: "Involvement",
    items: [
      {
        title: "[Organization / club]",
        period: "[Period]",
        detail: "[Role and what you actually did.]",
      },
    ],
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
        {sections.map((section) => (
          <Reveal key={section.heading} className="mb-12">
            <h2 className="mb-6 border-b border-line pb-2 text-xs font-medium uppercase tracking-[0.2em] text-forest">
              {section.heading}
            </h2>
            <div className="space-y-6">
              {section.items.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-serif text-lg font-medium tracking-[-0.01em]">
                      {item.title}
                    </h3>
                    {item.period && (
                      <span className="text-sm text-ink-soft">
                        {item.period}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-ink-soft">{item.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}
