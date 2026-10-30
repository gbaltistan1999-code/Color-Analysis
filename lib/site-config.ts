/**
 * Public site configuration. Everything here is safe to ship to the browser.
 * No environment variables are used anywhere in this project.
 */
export const siteConfig = {
  name: "Color Analysis",
  /** Live domain (no trailing slash). Canonical URLs, the sitemap, robots.txt and social previews all use it. */
  url: "https://www.coloranalyses.app",
  description:
    "Free color analysis quiz: find your color season, skin undertone and personal palette in about 3 minutes. No signup — answers and photos stay on your device.",
  contactEmail: "eshfaqihmed@gmail.com",
  /** Google Search Console ownership token (rendered as <meta name="google-site-verification">). */
  googleSiteVerification: "-qzp7JjV3gFdnS4fYDZm4DjVWkaxcuv1y1R9hCbutX8",
  themeColor: "#7C3AED",
  /** Main navigation (header). */
  nav: [
    { href: "/", label: "Home" },
    { href: "/seasons", label: "Seasons" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
  ],
  /**
   * Optional services. None are installed; the cookie banner reads these flags so it
   * can say honestly what runs. Add a script only behind <ConsentGate> if you enable one.
   */
  services: { analytics: false, marketing: false },
} as const;

export const SITE_NAME = siteConfig.name;
export const SITE_URL = siteConfig.url;
