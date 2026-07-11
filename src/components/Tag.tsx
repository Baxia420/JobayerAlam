const styles = {
  independent: "bg-forest text-cream",
  coursework: "border border-forest text-forest",
  plain: "border border-line text-ink-soft",
} as const;

export default function Tag({
  children,
  variant = "plain",
}: {
  children: React.ReactNode;
  variant?: keyof typeof styles;
}) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-[5px] text-xs ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
