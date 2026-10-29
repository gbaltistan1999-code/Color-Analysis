import type { MetadataRoute } from "next";
import { comparisons } from "@/data/comparisons";
import { familyInfo } from "@/data/families";
import { seasons } from "@/data/seasons";
import { SITE_URL } from "@/lib/site-config";

/** Only canonical, indexable pages. The "coming soon" blog is noindex, so it's left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority,
  });

  return [
    page("/", 1),
    page("/seasons", 0.9),
    ...familyInfo.map((f) => page(`/seasons/${f.slug}`, 0.8)),
    ...seasons.map((s) => page(`/seasons/${s.slug}`, 0.8)),
    page("/skin-undertone-test", 0.8),
    ...comparisons.map((c) => page(`/compare/${c.slug}`, 0.6)),
    page("/guides", 0.6),
    page("/faq", 0.6),
    page("/about", 0.4),
    page("/contact", 0.3),
    page("/privacy-policy", 0.2),
    page("/terms-and-conditions", 0.2),
    page("/cookie-policy", 0.2),
    page("/disclaimer", 0.2),
  ];
}
