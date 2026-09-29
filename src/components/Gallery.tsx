import React from "react";

export default function Gallery({
  children,
  caption,
  columns = 2,
}: {
  children: React.ReactNode;
  caption?: string;
  columns?: 2 | 3;
}) {
  return (
    <figure className="my-10">
      <div
        className={`grid grid-cols-1 gap-6 ${
          columns === 3 ? "md:grid-cols-3" : "sm:grid-cols-2"
        }`}
      >
        {children}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-mono text-[12px] tracking-[0.04em] text-mono-label">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
