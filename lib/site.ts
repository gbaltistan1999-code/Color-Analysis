/**
 * Public site URL, used for canonical links, the sitemap and social previews.
 * Set NEXT_PUBLIC_SITE_URL in your host's environment (e.g. https://huemuse.com) before launch.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const SITE_NAME = "HueMuse";

/** Renders a JSON-LD <script> payload. */
export function jsonLd(data: object | object[]) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
