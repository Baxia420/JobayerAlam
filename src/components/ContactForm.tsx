"use client";

import { useState } from "react";

// Create a free form at https://formspree.io, then replace this ID.
const FORMSPREE_ID = "YOUR_FORM_ID";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return; // honeypot

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full rounded-md border border-line bg-white/60 px-4 py-3 text-sm placeholder:text-ink-soft/60 focus:border-forest";

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Name</span>
          <input type="text" name="name" required className={inputClasses} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Email</span>
          <input type="email" name="email" required className={inputClasses} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Message</span>
        <textarea name="message" rows={6} required className={inputClasses} />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-forest-deep disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {status === "success" && (
        <p className="text-sm text-forest">
          Thanks! Your message is on its way. I&rsquo;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-700">
          Something went wrong. Email me directly at{" "}
          <a href="mailto:jobayermahin@gmail.com" className="underline">
            jobayermahin@gmail.com
          </a>
          .
        </p>
      )}
    </form>
  );
}
