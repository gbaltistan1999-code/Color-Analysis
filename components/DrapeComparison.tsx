import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { DrapedFace } from "./Illustrations";

const EXTS = ["jpg", "jpeg", "webp", "png", "avif"];

/** Returns the public URL of /public/images/<name>.<ext> if a file exists, else null. */
function findPhoto(name: string) {
  for (const ext of EXTS) {
    if (fs.existsSync(path.join(process.cwd(), "public", "images", `${name}.${ext}`))) return `/images/${name}.${ext}`;
  }
  return null;
}

const panels = [
  {
    key: "before",
    label: "Before",
    verdict: "✗ Unflattering color",
    verdictClass: "text-[#b91c1c] dark:text-[#f87171]",
    caption: "Skin looks sallow, shadows deepen under the eyes and around the mouth.",
    alt: "Woman wearing a color that dulls her complexion",
    svg: { drape: "#C9A227", drapeShade: "#8A6E12", mood: "dull" as const, bg: "from-[#f5f5f4] to-[#e7e5e4] dark:from-[#26222b] dark:to-[#1f1b24]" },
  },
  {
    key: "after",
    label: "After",
    verdict: "✓ Flattering color",
    verdictClass: "text-[#15803d] dark:text-[#4ade80]",
    caption: "Skin looks even and bright, eyes stand out, a natural healthy glow.",
    alt: "The same woman wearing a color that brightens her complexion",
    svg: { drape: "#E58FB0", drapeShade: "#C2386B", mood: "glow" as const, bg: "from-[#fdf2f8] to-[#ede9fe] dark:from-[#2a1a3a] dark:to-[#241a3d]" },
  },
];

/**
 * Before/after comparison. Drop real photos at public/images/drape-before.(jpg|webp|png)
 * and public/images/drape-after.(…) to replace the SVG fallback.
 */
export default function DrapeComparison() {
  const photos = { before: findPhoto("drape-before"), after: findPhoto("drape-after") };
  const usePhotos = Boolean(photos.before && photos.after);

  return (
    <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
      {panels.map((p) => (
        <figure key={p.key} className="card overflow-hidden">
          {usePhotos ? (
            <div className="relative aspect-[4/5]">
              <Image
                src={photos[p.key as "before" | "after"]!}
                alt={p.alt}
                fill
                sizes="(min-width: 640px) 448px, 100vw"
                className="object-cover"
              />
              <span
                className="absolute inset-x-0 bottom-6 text-center font-display text-4xl font-extrabold uppercase tracking-wide text-white sm:text-5xl"
                style={{ textShadow: "0 2px 16px rgb(0 0 0 / 0.45)" }}
              >
                {p.label}
              </span>
            </div>
          ) : (
            <div className={`bg-gradient-to-b px-8 pt-8 ${p.svg.bg}`}>
              <DrapedFace
                drape={p.svg.drape}
                drapeShade={p.svg.drapeShade}
                mood={p.svg.mood}
                title={`${p.label}: illustration with a ${p.svg.mood === "glow" ? "flattering" : "unflattering"} drape`}
              />
            </div>
          )}
          <figcaption className="p-5">
            <p className={`font-bold ${p.verdictClass}`}>{p.verdict}</p>
            <p className="mt-1 text-sm text-muted">{p.caption}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
