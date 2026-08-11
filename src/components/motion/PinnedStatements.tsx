"use client";

import { useEffect, useRef } from "react";

const statements = [
  {
    label: "Independent",
    lead: "I ship what I start.",
    sub: "The work I care about most is the work nobody assigned. I build it outside of class, and I see it through.",
    motif: "plane",
    cap: "shipped",
  },
  {
    label: "Academic",
    lead: "I learn past the syllabus.",
    sub: "Systems, networks, data, design. I follow the parts of the field that reach beyond writing code.",
    motif: "venn",
    cap: "breadth",
  },
  {
    label: "Community",
    lead: "I show up in person.",
    sub: "Some of what matters never ships as code. I make time for the work that happens off the keyboard.",
    motif: "people",
    cap: "presence",
  },
] as const;

function Motif({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 100 100",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.4,
    className: "h-full w-full",
  } as const;
  if (name === "plane") {
    return (
      <svg {...common} strokeLinejoin="round" strokeLinecap="round" aria-hidden>
        <path d="M16 48 L84 18 L60 84 L48 58 Z" />
        <path d="M84 18 L48 58" />
      </svg>
    );
  }
  if (name === "venn") {
    return (
      <svg {...common} aria-hidden>
        <circle cx="40" cy="42" r="21" />
        <circle cx="60" cy="42" r="21" />
        <circle cx="50" cy="60" r="21" />
      </svg>
    );
  }
  return (
    <svg {...common} strokeLinecap="round" aria-hidden>
      <circle cx="37" cy="39" r="12" />
      <circle cx="65" cy="43" r="9.5" />
      <path d="M18 80 c0-14 10-22 19-22 c9 0 16 7 18 16" />
      <path d="M52 80 c1-11 9-17 16-17 c8 0 13 5 15 12" />
    </svg>
  );
}

/**
 * "What I'm about": a pinned manifesto. As you scroll, each statement docks
 * and stacks at the top while the active one stays large with a crossfading
 * motif; a rail on the left tracks progress with a three-state dot (active =
 * cream, done = sage, upcoming = hollow) that matches its label. Rendered
 * progress chases the real scroll position through a lerp (0.1) so wheel
 * steps ease out; under prefers-reduced-motion the lerp is skipped and
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

    const docks = [...outer.querySelectorAll<HTMLElement>("[data-dock]")];
    const dots = [...outer.querySelectorAll<HTMLElement>("[data-dot]")];
    const marks = dots
      .map((d) => d.querySelector<HTMLElement>("[data-dotmark]"))
      .filter((m): m is HTMLElement => !!m);
    const fill = outer.querySelector<HTMLElement>("[data-fill]");
    const track = outer.querySelector<HTMLElement>("[data-track]");
    const dmotifs = [...outer.querySelectorAll<HTMLElement>("[data-dmotif]")];
    const mmotifs = [...outer.querySelectorAll<HTMLElement>("[data-mmotif]")];
    const leadEl = outer.querySelector<HTMLElement>("[data-lead]");
    const subEl = outer.querySelector<HTMLElement>("[data-sub]");
    const n = statements.length;
    let last = -1;
    // Rail track length in px, measured from the real first/last dot centers
    // so the fill starts and ends exactly on the dots (never poking past the
    // last circle). Recomputed on resize and after fonts load.
    let trackLen = 0;
    const layoutRail = () => {
      if (!fill || marks.length < 2) return;
      const container = fill.parentElement;
      if (!container) return;
      const cTop = container.getBoundingClientRect().top;
      const centerOf = (m: HTMLElement) => {
        const r = m.getBoundingClientRect();
        return r.top - cTop + r.height / 2;
      };
      const first = centerOf(marks[0]);
      const lastC = centerOf(marks[marks.length - 1]);
      trackLen = Math.max(0, lastC - first);
      fill.style.top = `${first}px`;
      if (track) {
        track.style.top = `${first}px`;
        track.style.bottom = "auto";
        track.style.height = `${trackLen}px`;
      }
    };

    const targetProgress = () => {
      const r = outer.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? -r.top / total : 0;
      return Math.max(0, Math.min(1, p));
    };

    const render = (p: number) => {
      const active = Math.min(n - 1, Math.floor(p * n));
      if (fill) fill.style.height = `${(p * trackLen).toFixed(1)}px`;
      docks.forEach((d, i) => d.classList.toggle("is-on", i < active));
      dmotifs.forEach((m, i) => m.classList.toggle("is-on", i === active));
      mmotifs.forEach((m, i) => m.classList.toggle("is-on", i === active));
      dots.forEach((d, i) => {
        const mark = d.querySelector<HTMLElement>("[data-dotmark]");
        const lab = d.querySelector<HTMLElement>("[data-dotlabel]");
        if (!mark || !lab) return;
        if (i === active) {
          mark.style.background = "#faf6ef";
          mark.style.borderColor = "#faf6ef";
          lab.style.color = "#faf6ef";
        } else if (i < active) {
          mark.style.background = "#8fae9f";
          mark.style.borderColor = "#8fae9f";
          lab.style.color = "rgba(250,246,239,.62)";
        } else {
          mark.style.background = "#2d4a3e";
          mark.style.borderColor = "#8fae9f";
          lab.style.color = "rgba(250,246,239,.4)";
        }
      });
      if (active !== last) {
        last = active;
        if (leadEl) leadEl.textContent = statements[active].lead;
        if (subEl) subEl.textContent = statements[active].sub;
      }
    };

    let shown = targetProgress();
    layoutRail();
    render(shown);

    let disposed = false;

    // Rail geometry depends on rendered dot positions: recompute once fonts
    // settle and on every resize (the rail also reflows to a row on mobile).
    const relayout = () => {
      if (disposed) return;
      layoutRail();
      if (reduce) render(targetProgress());
      else wake();
    };
    if (document.fonts?.ready) document.fonts.ready.then(relayout);
    window.addEventListener("resize", relayout);

    if (reduce) {
      let ticking = false;
      let reduceRaf = 0;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        reduceRaf = requestAnimationFrame(() => {
          if (disposed) return;
          render(targetProgress());
          ticking = false;
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => {
        disposed = true;
        cancelAnimationFrame(reduceRaf);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", relayout);
      };
    }

    let raf = 0;
    let ticking = false;
    const loop = () => {
      const t = targetProgress();
      shown += (t - shown) * 0.1;
      if (Math.abs(t - shown) < 0.0004) {
        shown = t;
        render(shown);
        ticking = false;
        return;
      }
      render(shown);
      raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      if (!ticking && !disposed) {
        ticking = true;
        raf = requestAnimationFrame(loop);
      }
    };
    wake();
    window.addEventListener("scroll", wake, { passive: true });
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", relayout);
    };
  }, []);

  return (
    <section
      ref={outerRef}
      id="ethos"
      className="relative h-[280vh] bg-forest text-cream"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1080px] grid-cols-1 items-center gap-x-[60px] gap-y-9 px-7 min-[721px]:grid-cols-[auto_1fr_auto]">
          {/* progress rail: vertical on desktop, dot row on mobile */}
          <div className="relative py-1">
            <div
              data-track
              className="absolute bottom-[10px] left-[5px] top-[10px] hidden w-[2px] bg-cream/[0.14] min-[721px]:block"
            />
            <div
              data-fill
              className="absolute left-[5px] top-[10px] hidden w-[2px] bg-sage min-[721px]:block"
              style={{ height: 0 }}
            />
            <ul className="relative flex list-none flex-row flex-wrap gap-x-6 gap-y-3 min-[721px]:flex-col min-[721px]:gap-[64px]">
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

          {/* text column */}
          <div>
            <p className="mb-8 text-xs font-medium uppercase tracking-[0.26em] text-cream/50">
              What I&rsquo;m about
            </p>
            <div className="relative min-h-[clamp(300px,46vh,420px)]">
              {/* dock stack */}
              <div className="flex flex-col">
                {statements.map((s) => (
                  <div
                    key={s.lead}
                    data-dock
                    className="mani-dock w-fit border-b border-cream/[0.16] pr-10 font-display text-[clamp(1.2rem,2.6vw,1.7rem)] leading-none text-cream/45"
                  >
                    {s.lead}
                  </div>
                ))}
              </div>
              {/* active statement */}
              <div className="pt-7">
                <div className="relative mb-5 h-[50px] w-[50px] text-sage min-[721px]:hidden">
                  {statements.map((s, i) => (
                    <span
                      key={s.motif}
                      data-mmotif
                      className={`mani-motif absolute inset-0 block ${i === 0 ? "is-on" : ""}`}
                    >
                      <Motif name={s.motif} />
                    </span>
                  ))}
                </div>
                <p
                  data-lead
                  className="font-display text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.03] tracking-[-0.01em]"
                >
                  {statements[0].lead}
                </p>
                <p
                  data-sub
                  className="mt-5 max-w-[40ch] text-[17px] leading-[1.55] text-cream/70"
                >
                  {statements[0].sub}
                </p>
              </div>
            </div>
          </div>

          {/* desktop motif panel */}
          <div className="relative hidden h-[150px] w-[130px] text-sage min-[721px]:block">
            {statements.map((s, i) => (
              <div
                key={s.cap}
                data-dmotif
                className={`mani-motif absolute inset-0 flex flex-col items-center justify-center gap-3.5 ${i === 0 ? "is-on" : ""}`}
              >
                <span className="h-[92px] w-[92px]">
                  <Motif name={s.motif} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/50">
                  {s.cap}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
