import sharp from "sharp";
import path from "path";

/**
 * A captioned screenshot for project write-ups (MDX), framed as a macOS-style
 * browser window to match the project cards: clay / ochre / sage traffic
 * lights, a mono label derived from the file name, and a soft shadow. The
 * `m-0` on the image overrides the prose plugin's default image margins.
 */
export default async function Figure({
  src,
  caption,
  alt,
}: {
  src: string;
  caption?: string;
  alt?: string;
}) {
  const label =
    src
      .split("/")
      .pop()
      ?.replace(/\.\w+$/, "")
      .replace(/-/g, " ") ?? "";

  let width, height;
  try {
    // Determine intrinsic dimensions to prevent layout shift during lazy load
    const absolutePath = path.join(process.cwd(), "public", src);
    const metadata = await sharp(absolutePath).metadata();
    width = metadata.width;
    height = metadata.height;
  } catch {
    // Silently fall back if the image can't be read at build/render time
  }

  return (
    <figure className="my-9">
      <div className="overflow-hidden rounded-xl bg-cream-deep shadow-[0_20px_44px_-18px_rgba(26,26,24,0.28)]">
        <div className="flex items-center gap-1.5 bg-stripe px-4 py-2.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#bd7b58]" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#c8a75e]" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#8fae9f]" />
          <span className="ml-2 font-mono text-[11px] tracking-[0.08em] text-mono-label">
            {label}
          </span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt ?? caption ?? label}
          loading="lazy"
          className="m-0 block w-full"
          width={width}
          height={height}
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
