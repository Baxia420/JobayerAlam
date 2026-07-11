"use client";

import { useEffect } from "react";
import SparkMark from "@/components/SparkMark";

/**
 * Global interaction layer:
 * - custom cursor: the tapered-spark logo mark follows the pointer with a
 *   slight lerp, spins with cumulative travel, and swells over
 *   links/buttons/[data-mag]
 * - spark easter egg: clicking any [data-egg] glyph spins every mark on the
 *   page
 *
 * Listeners are delegated on `document` so they survive client-side route
 * changes. Touch devices keep the native cursor (CSS hides the element).
 */
export default function SiteEffects() {
  useEffect(() => {
    const touch = window.matchMedia("(hover: none)").matches;
    const cleanups: (() => void)[] = [];

    if (!touch) {
      const spark = document.getElementById("cur-spark");
      if (spark) {
        let mx = innerWidth / 2,
          my = innerHeight / 2;
        let x = mx,
          y = my,
          lx = mx,
          ly = my;
        let spin = 0,
          scale = 1,
          hov = false,
          shown = false,
          raf = 0;

        const onMove = (e: MouseEvent) => {
          mx = e.clientX;
          my = e.clientY;
          if (!shown) {
            shown = true;
            x = mx;
            y = my;
            spark.style.opacity = "1";
          }
        };
        window.addEventListener("mousemove", onMove);

        const loop = () => {
          x += (mx - x) * 0.3;
          y += (my - y) * 0.3;
          spin += (Math.abs(x - lx) + Math.abs(y - ly)) * 0.55;
          lx = x;
          ly = y;
          scale += ((hov ? 1.8 : 1) - scale) * 0.18;
          spark.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%) rotate(${spin}deg) scale(${scale.toFixed(3)})`;
          raf = requestAnimationFrame(loop);
        };
        loop();

        const isMag = (t: EventTarget | null) =>
          t instanceof Element && t.closest("a,button,[data-mag]");
        const onOver = (e: MouseEvent) => {
          if (isMag(e.target)) hov = true;
        };
        const onOut = (e: MouseEvent) => {
          if (isMag(e.target) && !isMag(e.relatedTarget)) hov = false;
        };
        document.addEventListener("mouseover", onOver);
        document.addEventListener("mouseout", onOut);

        cleanups.push(() => {
          window.removeEventListener("mousemove", onMove);
          document.removeEventListener("mouseover", onOver);
          document.removeEventListener("mouseout", onOut);
          cancelAnimationFrame(raf);
        });
      }
    }

    const onEggClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const egg = e.target.closest("[data-egg]");
      if (!egg) return;
      e.preventDefault();
      document
        .querySelectorAll("[data-egg], [data-glyph-hero]")
        .forEach((s) => {
          s.classList.remove("egg-spin");
          void (s as HTMLElement).offsetWidth;
          s.classList.add("egg-spin");
        });
    };
    document.addEventListener("click", onEggClick);
    cleanups.push(() => document.removeEventListener("click", onEggClick));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div
      id="cur-spark"
      className="pointer-events-none fixed left-0 top-0 z-[9999] text-forest opacity-0 mix-blend-multiply"
    >
      <SparkMark size={22} className="block" />
    </div>
  );
}
