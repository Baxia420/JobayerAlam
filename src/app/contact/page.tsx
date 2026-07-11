import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/motion/Reveal";
import Eyebrow from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Jobayer Alam.",
};

export default function ContactPage() {
  return (
    <>
      <section
        className="dot-pattern relative mx-auto max-w-[820px] px-7 pb-10 pt-[88px]"
        style={{ "--dot-pos": "94% 20%" } as React.CSSProperties}
      >
        <Reveal>
          <Eyebrow className="mb-3.5">Contact</Eyebrow>
          <h1 className="font-display text-[clamp(3rem,9vw,6rem)] leading-[0.96] tracking-[-0.02em]">
            Say hello.
          </h1>
          <p className="mt-[26px] max-w-[52ch] text-lg leading-[1.65] text-ink-soft">
            Internships, project feedback, or just a good conversation: my
            inbox is open. The form below lands straight in it, or email me
            directly at{" "}
            <a
              href="mailto:jobayermahin@gmail.com"
              className="text-forest underline decoration-forest/40 underline-offset-4"
            >
              jobayermahin@gmail.com
            </a>
            .
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[820px] px-7 py-10">
        <Reveal>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
