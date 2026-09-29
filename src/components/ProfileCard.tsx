import Tilt from "@/components/motion/Tilt";
import SparkMark from "@/components/SparkMark";

export default function ProfileCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-line bg-cream-deep/40 p-6 sm:p-7 ${className}`}
    >
      <div className="flex flex-col gap-6">
        {/* Framed portrait placeholder */}
        <Tilt maxDeg={4} scale={1.015}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line bg-cream shadow-sm">
            <div className="flex items-center justify-between border-b border-line bg-stripe px-3.5 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#bd7b58]" />
                <span className="h-2 w-2 rounded-full bg-[#c8a75e]" />
                <span className="h-2 w-2 rounded-full bg-[#8fae9f]" />
                <span className="ml-1.5 font-mono text-[10px] tracking-wide text-mono-label">
                  jobayer-alam.portrait
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-forest font-semibold">
                UTM
              </span>
            </div>

            <div className="stripes relative flex h-[calc(100%-33px)] w-full flex-col items-center justify-center p-6 text-center select-none">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-forest/20 bg-forest/[0.06] text-forest">
                <SparkMark size={28} className="block" />
              </div>
              <span className="mt-4 font-serif text-lg font-medium text-ink">
                Jobayer Alam
              </span>
              <span className="mt-1 font-mono text-[11px] text-ink-soft">
                Johor Bahru, Malaysia
              </span>
              <span className="mt-3 rounded-full border border-forest/25 bg-cream/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-forest font-medium">
                Portrait slot · Photo coming
              </span>
            </div>
          </div>
        </Tilt>

        {/* Identity & verified background */}
        <div className="space-y-4">
          <div>
            <h3 className="font-serif text-xl font-medium tracking-tight text-ink">
              Jobayer Alam
            </h3>
            <p className="mt-1 text-sm font-medium text-forest">
              Software Engineering Student
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Universiti Teknologi Malaysia (UTM)
            </p>
          </div>

          <div className="space-y-2 border-t border-line/70 pt-3 text-xs font-mono text-ink-soft">
            <div className="flex items-center justify-between">
              <span className="text-mono-label">Academic:</span>
              <span className="font-medium text-ink">CGPA 3.71 / 4.00 (Dean&rsquo;s List 2×)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-mono-label">English:</span>
              <span className="font-medium text-ink">IELTS Academic 8.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-mono-label">Status:</span>
              <span className="rounded bg-forest/10 px-1.5 py-0.5 text-forest font-medium">
                Available for hire
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
