import React from "react";

export default function Diagram({
  title,
  caption,
  children,
}: {
  title?: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-xl border border-line bg-cream shadow-[0_16px_36px_-16px_rgba(26,26,24,0.18)]">
        <div className="flex items-center justify-between border-b border-line bg-stripe px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#bd7b58]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#c8a75e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#8fae9f]" />
            <span className="ml-2 font-mono text-[11px] tracking-[0.08em] text-mono-label">
              {title ?? "system-architecture.diagram"}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-forest font-semibold">
            Architecture Blueprint
          </span>
        </div>
        <div className="p-6 sm:p-8 font-sans">{children}</div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-mono text-[12px] tracking-[0.04em] text-mono-label">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
