import Eyebrow from "@/components/Eyebrow";

export default function SectionHeading({
  eyebrow,
  index,
  children,
}: {
  eyebrow?: string;
  index?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {eyebrow && (
        <Eyebrow mark={index} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className="font-serif text-[clamp(2.2rem,5vw,3.4rem)] font-medium tracking-[-0.02em]">
        {children}
      </h2>
    </div>
  );
}
