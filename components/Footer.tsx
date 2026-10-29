import Link from "next/link";
import { SITE_NAME } from "@/lib/site-config";
import CookieSettingsButton from "./CookieSettingsButton";
import { Logo } from "./Logo";

const linkClass = "text-sm text-muted transition hover:text-primary";

const cols = [
  {
    title: "Explore",
    links: [
      { href: "/#quiz", label: "Color Analysis Quiz" },
      { href: "/seasons", label: "All 12 Seasons" },
      { href: "/skin-undertone-test", label: "Skin Undertone Test" },
      { href: "/guides", label: "Guides" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Us" },
      { href: "/blog", label: "Blog (coming soon)" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-and-conditions", label: "Terms and Conditions" },
      { href: "/disclaimer", label: "Disclaimer" },
      { href: "/cookie-policy", label: "Cookie Policy" },
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
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
              {col.title === "Legal" && (
                <li>
                  <CookieSettingsButton className={`${linkClass} text-left`} />
                </li>
              )}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <p className="container-x py-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} {SITE_NAME}. Results are approximate style guidance —{" "}
          <Link href="/disclaimer" className="underline hover:text-primary">
            not professional advice
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
