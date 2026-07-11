# jobayeralam.com

Personal portfolio — warm editorial design (cream base, forest-green accent, Instrument Serif + Fraunces + Inter), custom scroll-driven motion, content in MDX.

## Stack

Next.js (App Router, TypeScript, static output) · Tailwind CSS v4 · MDX via next-mdx-remote · custom motion (CSS transitions, IntersectionObserver, a small scroll handler, and a canvas fireworks layer — no animation library) · Formspree contact form · Vercel hosting · Cloudflare DNS.

## Develop

```bash
npm run dev     # http://localhost:3000
npm run build   # production build (all pages static)
```

## Editing content

Every project/coursework entry is one MDX file in `content/projects/`. Frontmatter fields:

| Field | Values | Meaning |
|---|---|---|
| `type` | `independent` \| `coursework` | The tag shown on the card |
| `tier` | `flagship` \| `archive` | `flagship` → large alternating card on /projects; `archive` → compact row below them |
| `featured` | `true` \| `false` | `true` → shows on the home page |
| `priority` | number | Higher = earlier in the flagship grid |
| `course` | string | Course name chip (coursework only) |
| `links` | map | e.g. `github:`, `live:` — rendered as buttons |

The placeholder files are named for what they should become — replace the bracketed text with real write-ups and rename the files (the filename is the URL slug).

Other placeholders to replace:
- **Resume PDF** — drop your real PDF at `public/Jobayer-Alam-Resume.pdf`
- **GitHub/LinkedIn URLs** — in `src/components/Footer.tsx`
- **Bio, resume sections, involvement entries** — bracketed text in `src/app/about/page.tsx`, `src/app/resume/page.tsx`, `src/app/involvement/page.tsx`
- **Contact form** — create a free form at [formspree.io](https://formspree.io), put its ID in `FORMSPREE_ID` in `src/components/ContactForm.tsx`

## Deploy

1. Push this repo to GitHub.
2. [vercel.com](https://vercel.com) → Add New Project → import the repo. Defaults are correct; deploy.
3. In the Vercel project → Settings → Domains → add `jobayeralam.com` (and `www.jobayeralam.com`).
4. In Cloudflare DNS for jobayeralam.com, add the records Vercel shows you (A record `76.76.21.21` for the apex, CNAME `cname.vercel-dns.com` for www). Set both to **DNS only** (grey cloud) — Vercel handles TLS and CDN; proxying through Cloudflare on top causes issues.
5. Wait for DNS + certificate (minutes), done.

Every future `git push` to the default branch auto-deploys.

## Motion notes

No animation library. Reveals are CSS transitions triggered by an IntersectionObserver; the pinned "What I'm about" section and the hero fireworks are driven by a single scroll/rAF handler; the cursor is a small canvas-free DOM element. Initial hidden states are CSS-gated behind a `js` class on `<html>`, so users without JavaScript — and anyone with `prefers-reduced-motion: reduce` — see full content with no animation.
