"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Cross-fades client-side route changes using the View Transitions API.
 * React 19.2 does not ship its <ViewTransition> component at runtime, so this
 * intercepts internal link clicks and wraps the navigation in
 * document.startViewTransition itself. Anything the API can't or shouldn't
 * handle (unsupported browsers, reduced-motion, new-tab / external / hash /
 * download / modified clicks) falls straight through to the normal link.
 */
export default function ViewTransitions() {
  const router = useRouter();

  useEffect(() => {
    const doc = document as Document & {
      startViewTransition?: (cb: () => void | Promise<void>) => unknown;
    };
    if (typeof doc.startViewTransition !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      const target = a.getAttribute("target");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("http") ||
        target === "_blank" ||
        a.hasAttribute("download")
      )
        return;
      // Same-document app navigation → take it over with a transition.
      e.preventDefault();
      doc.startViewTransition!(
        () =>
          new Promise<void>((resolve) => {
            router.push(href);
            // Let React commit the new route before the transition snapshots
            // the "after" state (two frames is enough for the swap).
            requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
          })
      );
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return null;
}
