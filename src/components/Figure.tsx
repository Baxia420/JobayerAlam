/**
 * A framed, captioned screenshot for use inside project write-ups (MDX).
 * Bordered and rounded to echo the project-card window frame, with a small
 * mono caption underneath.
 */
export default function Figure({
  src,
  caption,
  alt,
}: {
  src: string;
  caption?: string;
  alt?: string;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl border border-line bg-cream-deep">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt ?? caption ?? ""}
          loading="lazy"
          className="block w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-mono text-[12px] tracking-[0.04em] text-mono-label">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
