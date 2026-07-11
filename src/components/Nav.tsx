"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SparkMark from "@/components/SparkMark";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/involvement", label: "Involvement" },
  { href: "/resume", label: "Resume" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-[100] border-b border-line bg-cream">
      <nav className="mx-auto flex max-w-[1080px] items-center justify-between px-7 py-3.5">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-[21px] tracking-[-0.01em]"
          onClick={() => setOpen(false)}
        >
          <span data-egg className="inline-block text-forest">
            <SparkMark size={17} className="block" />
          </span>
          Jobayer&nbsp;Alam
        </Link>

        <div className="hidden items-center gap-[30px] sm:flex">
          <ul className="flex items-center gap-[30px] text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors hover:text-forest ${
                    isActive(link.href) ? "text-forest" : "text-ink-soft"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="rounded-full bg-forest px-[18px] py-[9px] text-[13px] font-medium text-cream transition-colors hover:bg-forest-deep"
          >
            Get in touch
          </Link>
        </div>

        <button
          type="button"
          className="text-sm text-ink-soft sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul id="mobile-nav" className="border-t border-line px-7 py-4 sm:hidden">
          {[...links, { href: "/contact", label: "Get in touch" }].map(
            (link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2 text-sm ${
                    isActive(link.href) ? "text-forest" : "text-ink-soft"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </header>
  );
}
