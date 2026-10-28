"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { IconClose, IconMenu } from "./Icons";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { href: "/seasons", label: "Seasons" },
  { href: "/guides", label: "Guides" },
  { href: "/undertone-test", label: "Undertone Test" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={pathname.startsWith(n.href) ? "page" : undefined}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-muted transition hover:bg-primary-soft hover:text-primary aria-[current=page]:text-primary"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/quiz" className="btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex">
            Take the Quiz
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <IconClose width={20} height={20} /> : <IconMenu width={20} height={20} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-surface md:hidden">
        <nav aria-label="Mobile" className="container-x py-4">
          <ul className="flex flex-col gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="block rounded-xl px-4 py-3 font-semibold text-ink hover:bg-primary-soft hover:text-primary"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/quiz" className="btn-primary mt-3 w-full">
            Take the Quiz
          </Link>
        </nav>
      </div>
    </header>
  );
}
