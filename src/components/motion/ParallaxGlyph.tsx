"use client";

import { useEffect, useRef } from "react";
import SparkMark from "@/components/SparkMark";

/**
 * The faint oversized ✳ behind the home hero, drifting slightly against
 * scroll (design handoff's data-parallax="-0.12").
 */
export default function ParallaxGlyph({ speed = -0.12 }: { speed?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        el.style.translate = `0 ${window.scrollY * speed}px`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <span
      ref={ref}
      data-glyph-hero
      aria-hidden
      className="pointer-events-none absolute -right-[6vw] -top-[4vh] z-0 block select-none text-forest/[0.06]"
    >
      <SparkMark className="h-[min(46vh,520px)] w-[min(46vh,520px)]" />
    </span>
  );
}
