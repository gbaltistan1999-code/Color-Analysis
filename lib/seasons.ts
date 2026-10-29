import { seasonPhotos, seasons } from "@/data/seasons";
import type { Season } from "@/types";

export function getSeason(slug: string) {
  return seasons.find((s) => s.slug === slug);
}

/** Portrait for a season: its own photo, else its family's, else the homepage photo. */
export function seasonPhoto(season: Season) {
  const p = seasonPhotos[season.slug] ?? seasonPhotos[season.family];
  return {
    src: p?.src ?? "/images/hero.jpg",
    alt: p?.alt ?? "Smiling woman holding a fan of color swatches",
    position: p?.position ?? "object-[50%_25%]",
  };
}
