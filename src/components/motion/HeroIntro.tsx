"use client";

import { useEffect, useRef } from "react";

/**
 * Home hero entrance: masked [data-hero-line] elements slide up with a
 * stagger, then [data-hero-fade] elements fade in (0.5s CSS delay). Hidden
 * states and transitions live in CSS behind the `.js` gate; this component
 * just applies the stagger delays and flips lines/fades to .is-in, with a
 * fallback timer so content can never stay hidden.
 */
export default function HeroIntro({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lines = el.querySelectorAll<HTMLElement>("[data-hero-line]");
    const fades = el.querySelectorAll<HTMLElement>("[data-hero-fade]");
    const show = () => {
      lines.forEach((l) => l.classList.add("is-in"));
      fades.forEach((f) => f.classList.add("is-in"));
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show();
      return;
    }
    lines.forEach((l, i) => {
      l.style.transitionDelay = `${0.08 + i * 0.09}s`;
    });
    // Force reflow so hidden states are committed before animating in.
    void el.offsetWidth;
    const t1 = setTimeout(show, 60);
    const t2 = setTimeout(show, 600); // safety fallback
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
