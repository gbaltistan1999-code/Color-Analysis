import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site-config";

/** Renders a JSON-LD <script> payload safely. */
export function jsonLd(data: object | object[]) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

/** Default social preview image (the 12-season map). */
export const OG_IMAGE = { url: "/images/season-map.jpg", width: 1200, height: 1000, alt: "Map of the 12 color seasons" };

/**
 * Standard metadata for an indexable page: title, description, canonical and social tags.
 * `absoluteTitle` skips the " | Color Analysis" suffix (used on the homepage, whose title already leads with it).
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: { title, description, url: path, siteName: SITE_NAME, type: "website", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE_URL}${it.path}` })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
