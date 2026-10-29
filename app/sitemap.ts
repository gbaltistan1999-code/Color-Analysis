import type { MetadataRoute } from "next";
import { comparisons } from "@/lib/compare";
import { seasons } from "@/lib/seasons";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority,
  });

  return [
    page("/", 1),
    page("/quiz", 0.9),
    page("/skin-undertone-test", 0.8),
    page("/seasons", 0.8),
    ...seasons.map((s) => page(`/seasons/${s.slug}`, 0.7)),
    ...comparisons.map((c) => page(`/compare/${c.slug}`, 0.6)),
    page("/guides", 0.5),
    page("/contact", 0.2),
    page("/privacy", 0.1),
    page("/terms", 0.1),
  ];
}
