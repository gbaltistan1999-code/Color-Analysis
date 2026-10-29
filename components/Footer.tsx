import Link from "next/link";
import { Logo, SITE_NAME } from "./Logo";

const cols = [
  {
    title: "Quick Links",
    links: [
      { href: "/quiz", label: "Color Analysis Quiz" },
      { href: "/seasons", label: "All 12 Seasons" },
      { href: "/skin-undertone-test", label: "Undertone Test" },
      { href: "/guides", label: "Guides" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog (coming soon)" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            A free, playful way to discover the colors that make you glow. Built on classic seasonal color theory — no
            account, no fuss.
          </p>
          <div className="mt-5 flex gap-1.5" aria-hidden="true">
            {["#7C3AED", "#EC4899", "#FB923C", "#FACC15", "#22C55E", "#3B82F6"].map((c) => (
              <span key={c} className="h-4 w-4 rounded-full" style={{ background: c }} />
            ))}
          </div>
        </div>
        {cols.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <p className="container-x py-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} {SITE_NAME}. Results are for fun and inspiration — not professional advice.
        </p>
      </div>
    </footer>
  );
}
