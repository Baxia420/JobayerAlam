import SparkMark from "@/components/SparkMark";

export default function Eyebrow({
  mark,
  children,
  className = "",
}: {
  /** Italic serif marker before the label, e.g. an index like "01".
      Omit it to show the spark logo mark instead. */
  mark?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline gap-[18px] ${className}`}>
      {mark ? (
        <span className="font-serif text-[15px] italic text-ink/35">
          {mark}
        </span>
      ) : (
        <SparkMark size={13} className="self-center text-ink/35" />
      )}
      <span className="text-xs font-medium uppercase tracking-[0.24em] text-forest">
        {children}
      </span>
    </div>
  );
}
