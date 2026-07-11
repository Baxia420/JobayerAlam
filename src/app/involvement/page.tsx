import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import Eyebrow from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Involvement",
  description: "Volunteering, clubs, and community service by Jobayer Alam.",
};

const entries = [
  {
    period: "[Jan 2026 to present]",
    title: "[Role: Volunteer / Member / Organizer] · [Organization]",
    description:
      "[What you actually did and who it helped. Concrete beats grand: “tutored 12 first-years in intro programming” lands better than “passionate about education.”]",
    sage: false,
  },
  {
    period: "[Period]",
    title: "[Second role] · [Second organization]",
    description: "[What you did, in one or two concrete sentences.]",
    sage: false,
  },
  {
    period: "[Period]",
    title: "[Third role] · [Organization]",
    description: "[What you did. Keep it specific.]",
    sage: true,
  },
];

export default function InvolvementPage() {
  return (
    <>
      <section
        className="dot-pattern relative mx-auto max-w-[820px] px-7 pb-10 pt-[88px]"
        style={{ "--dot-pos": "96% 24%" } as React.CSSProperties}
      >
        <Reveal>
          <Eyebrow className="mb-3.5">Involvement</Eyebrow>
          <h1 className="max-w-[14ch] font-display text-[clamp(3rem,9vw,6rem)] leading-[0.96] tracking-[-0.02em]">
            Showing up, off the keyboard.
          </h1>
          <p className="mt-[26px] max-w-[52ch] text-lg leading-[1.65] text-ink-soft">
            Volunteering, clubs, and community service: the work that
            doesn&rsquo;t ship as code but says just as much about how I work
            with people.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[820px] px-7 py-10">
        <div className="flex flex-col gap-12 border-l-2 border-forest/[0.28] pl-[34px]">
          {entries.map((entry) => (
            <Reveal key={entry.title} className="relative">
              <span
                aria-hidden
                className={`absolute -left-[42px] top-[7px] h-[13px] w-[13px] rounded-full border-[3px] border-cream ${
                  entry.sage ? "bg-sage" : "bg-forest"
                }`}
              />
              <p className="text-[13px] font-medium tracking-[0.05em] text-ink-soft">
                {entry.period}
              </p>
              <h3 className="mt-1.5 font-serif text-[clamp(1.3rem,3vw,1.7rem)] font-medium tracking-[-0.01em]">
                {entry.title}
              </h3>
              <p className="mt-3 max-w-[60ch] text-[17px] leading-[1.65] text-ink-soft">
                {entry.description}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-[52px]">
          <div className="flex flex-wrap gap-3.5">
            <Link
              data-mag
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-[13px] text-sm font-medium text-cream transition-colors hover:bg-forest-deep"
            >
              Get in touch <span aria-hidden>→</span>
            </Link>
            <Link
              data-mag
              href="/"
              className="inline-flex items-center rounded-full border border-ink/20 px-6 py-[13px] text-sm font-medium transition-colors hover:border-forest hover:text-forest"
            >
              ← Back home
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
