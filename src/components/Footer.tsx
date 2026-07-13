export default function Footer() {
  return (
    <footer className="mt-10 bg-forest-deep text-cream">
      <div className="mx-auto max-w-[1080px] px-7 pb-12 pt-[72px]">
        <p
          aria-hidden
          className="mb-11 font-display text-[clamp(3.2rem,9.5vw,7.4rem)] leading-[0.9] tracking-[-0.02em]"
        >
          Jobayer&nbsp;Alam
          <span data-egg className="inline-block text-sage">
            .
          </span>
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-cream/[0.62]">
          <div className="flex gap-[26px]">
            <a
              href="mailto:jobayermahin@gmail.com"
              className="text-cream/80 transition-colors hover:text-cream"
            >
              Email
            </a>
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/80 transition-colors hover:text-cream"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/80 transition-colors hover:text-cream"
            >
              LinkedIn
            </a>
          </div>
          <p>© {new Date().getFullYear()} Jobayer Alam</p>
        </div>
      </div>
    </footer>
  );
}
