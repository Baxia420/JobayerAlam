import Link from "next/link";
import SparkMark from "@/components/SparkMark";

export const metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <section className="dot-pattern mx-auto flex min-h-[72vh] max-w-[1080px] flex-col justify-center px-7 py-24">
      <p className="mb-7 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.26em] text-forest">
        <span data-egg className="inline-block">
          <SparkMark size={15} className="block" />
        </span>
        Error 404
      </p>
      <h1 className="font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.95] tracking-[-0.02em]">
        This page went
        <br />
        <span className="italic text-forest">off the map.</span>
      </h1>
      <p className="mt-8 max-w-[460px] text-lg leading-[1.65] text-ink-soft">
        The link is broken or the page never existed. No harm done, let&rsquo;s
        get you back to something real.
      </p>
      <div className="mt-10 flex flex-wrap gap-3.5">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full bg-forest px-[26px] py-3.5 text-sm font-medium text-cream transition-colors hover:bg-forest-deep"
        >
          Back home{" "}
          <span
            aria-hidden
            className="inline-block transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center rounded-full border border-ink/20 px-[26px] py-3.5 text-sm font-medium transition-colors hover:border-forest hover:text-forest"
        >
          See the work
        </Link>
      </div>
    </section>
  );
}
