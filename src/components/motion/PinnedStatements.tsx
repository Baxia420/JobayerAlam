"use client";

import { useEffect, useRef } from "react";
import SparkMark from "@/components/SparkMark";

const statements = [
  {
    label: "Independent",
    lead: "I build independently.",
    sub: "Side projects taken from idea to shipped, outside of class.",
  },
  {
    label: "Academic",
    lead: "I study broadly.",
    sub: "Coursework across systems, networks, and data. Not just code.",
  },
  {
    label: "Community",
    lead: "I show up.",
    sub: "Volunteering and community work, semester after semester.",
  },
];

/**
 * "What I'm about": sticky section pinned while three statements crossfade,
 * driven by scroll progress. The rendered progress chases the real scroll
 * position through a lerp (factor 0.1) in a continuous rAF loop, so chunky
 * mouse-wheel steps ease out smoothly instead of jumping. A progress rail on
 * the left fills and lights up dots; the ghost ✳ rotates with progress.
 * Under prefers-reduced-motion the lerp and glyph rotation are skipped and
 * progress tracks the scrollbar exactly.
 */
export default function PinnedStatements() {
  const outerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const stmts = [...outer.querySelectorAll<HTMLElement>("[data-stmt]")];
    const glyph = outer.querySelector<HTMLElement>("[data-glyph-pin]");
    const fill = outer.querySelector<HTMLElement>("[data-progressfill]");
    const dots = [...outer.querySelectorAll<HTMLElement>("[data-dot]")];
    const n = stmts.length;

    const targetProgress = () => {
      const r = outer.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? -r.top / total : 0;
      return Math.max(0, Math.min(1, p));
    };

    const render = (p: number) => {
      stmts.forEach((s, i) => {
        const center = (i + 0.5) / n;
        const d = Math.abs(p - center);
        const span = 1 / n;
        const op = Math.max(0, Math.min(1, 1 - d / (span * 0.72)));
        s.style.opacity = op.toFixed(3);
        s.style.transform = `translateY(${(p - center) * -70}px)`;
      });

      if (glyph && !reduce) {
        glyph.style.rotate = `${p * 140}deg`;
      }
      if (fill) fill.style.height = `${(p * 100).toFixed(1)}%`;

      const active = Math.min(n - 1, Math.floor(p * n));
      dots.forEach((d, i) => {
        const mark = d.querySelector<HTMLElement>("[data-dotmark]");
        const lab = d.querySelector<HTMLElement>("[data-dotlabel]");
        const on = i <= active;
        if (mark) mark.style.background = on ? "#8fae9f" : "#2d4a3e";
        if (lab)
          lab.style.color =
            i === active
              ? "#faf6ef"
              : on
                ? "rgba(250,246,239,.62)"
                : "rgba(250,246,239,.4)";
      });
    };

    if (reduce) {
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          render(targetProgress());
          ticking = false;
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    let shown = targetProgress();
    let raf = 0;
    render(shown);
    const loop = () => {
      const target = targetProgress();
      shown += (target - shown) * 0.1;
      if (Math.abs(target - shown) < 0.0004) shown = target;
      render(shown);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={outerRef}
      id="ethos"
      className="relative h-[260vh] bg-forest text-cream"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <span
          data-glyph-pin
          aria-hidden
          className="pointer-events-none absolute -right-[14vw] top-1/2 block -translate-y-1/2 select-none text-cream/[0.055]"
        >
          <SparkMark className="h-[64vh] w-[64vh]" />
        </span>

        <div className="relative mx-auto grid w-full max-w-[1080px] grid-cols-1 items-center gap-9 px-7 min-[721px]:grid-cols-[auto_1fr] min-[721px]:gap-[60px]">
          {/* progress rail */}
          <div className="relative self-center py-1">
            <div className="absolute bottom-[10px] left-[5px] top-[10px] hidden w-[2px] bg-cream/[0.14] min-[721px]:block" />
            <div
              data-progressfill
              className="absolute left-[5px] top-[10px] hidden w-[2px] bg-sage min-[721px]:block"
              style={{ height: 0 }}
            />
            <ul className="relative flex list-none flex-row flex-wrap gap-[22px] min-[721px]:flex-col min-[721px]:gap-[72px]">
              {statements.map((s) => (
                <li key={s.label} data-dot className="flex items-center gap-4">
                  <span
                    data-dotmark
                    className="h-3 w-3 flex-none rounded-full border-2 border-sage bg-forest transition-colors duration-300"
                  />
                  <span
                    data-dotlabel
                    className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cream/40 transition-colors duration-300"
                  >
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* statement stage */}
          <div className="relative min-h-[clamp(280px,44vh,440px)]">
            <p className="mb-[34px] text-xs font-medium uppercase tracking-[0.26em] text-cream/50">
              What I&rsquo;m about
            </p>
            <div className="relative">
              {statements.map((s, i) => (
                <div
                  key={s.lead}
                  data-stmt
                  className="absolute inset-x-0 top-0"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-[0.35em] right-0 select-none font-serif text-[clamp(8rem,32vh,17rem)] italic leading-none text-cream/[0.07]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="relative font-display text-[clamp(2.8rem,7.5vw,5.4rem)] leading-[1.02] tracking-[-0.01em]">
                    {s.lead}
                  </p>
                  <p className="relative mt-6 max-w-[38ch] text-[19px] leading-[1.55] text-cream/70">
                    {s.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
