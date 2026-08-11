"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  dec: number;
  c: string;
  r: number;
  plus?: boolean;
  g: number;
}

interface Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  explodeY: number;
  c: string;
}

const COLORS = ["#2d4a3e", "#8fae9f", "#57544c"];

/**
 * Miniature fireworks over the hero's empty bottom-right region: rockets
 * launch from the bottom edge, climb slowly with a fading trail, and burst
 * at random heights into confetti sparks (dots and tiny plus glyphs) of
 * random size. Six rockets go up together after the hero reveal, then a
 * lazy recurring show of one to three rockets fires at random intervals
 * while the hero is on screen; clicking any spark logo ([data-egg]) fires a
 * volley. Skipped under prefers-reduced-motion and below the desktop
 * breakpoint (the stacked mobile hero has no empty corner to hold them);
 * the rAF loop sleeps whenever nothing is airborne.
 */
export default function HeroFireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Only run over the wide desktop hero, where there is genuine empty space to
  // the right of the headline. Tracked as state (not a one-off check) so the
  // show lights up if the window is later widened past the breakpoint.
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 721px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!wide) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = canvasRef.current;
    const host = cv?.parentElement;
    if (!cv || !host) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let W = 0,
      H = 0;
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = host.clientWidth;
      H = host.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(host);

    let parts: Particle[] = [];
    let rockets: Rocket[] = [];
    let raf = 0;
    let running = false;
    let visible = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const volleyTimers: ReturnType<typeof setTimeout>[] = [];

    const explode = (x: number, y: number) => {
      const scale = 0.7 + Math.random() * 1.2;
      const n = Math.round(16 + Math.random() * 26);
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = (0.6 + Math.random() * 2.4) * scale;
        parts.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 1,
          dec: 0.008 + Math.random() * 0.014,
          c: COLORS[i % COLORS.length],
          r: 1.1 + Math.random() * 1.7,
          plus: Math.random() < 0.28,
          g: 0.045,
        });
      }
    };

    const step = () => {
      ctx.clearRect(0, 0, W, H);
      rockets = rockets.filter((r) => {
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.008;
        parts.push({
          x: r.x,
          y: r.y,
          vx: 0,
          vy: 0.3,
          life: 0.35,
          dec: 0.05,
          c: r.c,
          r: 1,
          g: 0,
        });
        ctx.globalAlpha = 1;
        ctx.fillStyle = r.c;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 1.6, 0, 6.283);
        ctx.fill();
        if (r.y <= r.explodeY || r.vy >= -0.35) {
          explode(r.x, r.y);
          return false;
        }
        return true;
      });
      parts = parts.filter((p) => p.life > 0);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.g;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.life -= p.dec;
        ctx.globalAlpha = Math.max(p.life, 0);
        if (p.plus) {
          ctx.strokeStyle = p.c;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x - p.r * 1.6, p.y);
          ctx.lineTo(p.x + p.r * 1.6, p.y);
          ctx.moveTo(p.x, p.y - p.r * 1.6);
          ctx.lineTo(p.x, p.y + p.r * 1.6);
          ctx.stroke();
        } else {
          ctx.fillStyle = p.c;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, 6.283);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      if (rockets.length || parts.length) {
        raf = requestAnimationFrame(step);
      } else {
        running = false;
      }
    };
    const wake = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };

    const launch = () => {
      rockets.push({
        // Center-biased across the hero (was hard against the right edge, so
        // the ascent was off-screen and only half of each burst showed).
        x: W * (0.32 + Math.random() * 0.46),
        y: H + 4,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(2.8 + Math.random() * 1.8),
        explodeY: H * (0.16 + Math.random() * 0.5),
        c: Math.random() < 0.7 ? COLORS[0] : COLORS[1],
      });
      wake();
    };
    /** n rockets scattered across `spread` ms so several are airborne at once. */
    const volley = (n: number, spread = 1400) => {
      for (let i = 0; i < n; i++) {
        volleyTimers.push(setTimeout(launch, Math.random() * spread));
      }
    };

    const schedule = () => {
      timer = setTimeout(
        () => {
          if (visible && document.visibilityState === "visible") {
            const n =
              1 + (Math.random() < 0.45 ? 1 : 0) + (Math.random() < 0.15 ? 1 : 0);
            volley(n, 800);
          }
          schedule();
        },
        4500 + Math.random() * 6500
      );
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    io.observe(host);

    const t0 = setTimeout(() => volley(6, 1600), 1200);
    schedule();

    const onEgg = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest("[data-egg]")) {
        volley(4, 1000);
      }
    };
    document.addEventListener("click", onEgg);

    return () => {
      clearTimeout(t0);
      clearTimeout(timer);
      volleyTimers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("click", onEgg);
    };
  }, [wide]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      // w-full/h-full pins the DISPLAY size to the container; the drawing
      // buffer (cv.width/height) is set separately for DPR. Without this the
      // canvas renders at its intrinsic buffer size and overflows the page.
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
