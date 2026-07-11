"use client";

import { useEffect, useRef } from "react";

/**
 * Pointer-following 3D tilt (design handoff's data-tilt). Skipped on touch
 * devices and under prefers-reduced-motion.
 */
export default function Tilt({
  children,
  maxDeg = 7,
  scale = 1.02,
  className = "",
}: {
  children: React.ReactNode;
  maxDeg?: number;
  scale?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${px * maxDeg}deg) rotateX(${-py * maxDeg}deg) scale(${scale})`;
    };
    const leave = () => {
      el.style.transform =
        "perspective(800px) rotateY(0) rotateX(0) scale(1)";
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [maxDeg, scale]);

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
