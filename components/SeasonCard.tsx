import Image from "next/image";
import Link from "next/link";
import { seasonPhoto, type Family, type Season } from "@/lib/seasons";
import { IconArrow } from "./Icons";

// Pill colors chosen for ≥4.5:1 contrast with white text.
const familyPill: Record<Family, string> = {
  Spring: "#C2410C",
  Summer: "#3B5FA0",
  Autumn: "#9A3412",
  Winter: "#3730A3",
};

/** e.g. "Neutral-warm" → "neutral-warm"; used inside sentences. */
const lower = (s: string) => s.toLowerCase();

function characteristics(season: Season) {
  return [`${season.undertone} undertone`, `${season.depth} depth, ${lower(season.contrast)} contrast`];
}

export default function SeasonCard({ season }: { season: Season }) {
  const photo = seasonPhoto(season);
  return (
    <Link
      href={`/seasons/${season.slug}`}
      className="card group flex flex-col overflow-hidden transition duration-200 hover:-translate-y-1 hover:border-primary"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className={`object-cover transition duration-500 group-hover:scale-105 ${photo.position}`}
        />
        <span
          className="absolute left-4 top-4 rounded-full px-3.5 py-1 text-sm font-bold text-white shadow-md"
          style={{ background: familyPill[season.family] }}
        >
          {season.family}
        </span>
        <div className="absolute inset-x-0 bottom-0 flex h-1.5" aria-hidden="true">
          {season.palette.map((p) => (
            <span key={p.hex} className="flex-1" style={{ background: p.hex }} />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl font-bold text-ink">{season.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{season.tagline}</p>

        <p className="mt-4 text-sm font-bold text-[#BE185D] dark:text-[#F9A8D4]">Characteristics:</p>
        <ul className="mt-1.5 space-y-1">
          {characteristics(season).map((c) => (
            <li key={c} className="flex items-center gap-2 text-sm text-ink">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#BE185D] dark:bg-[#F9A8D4]" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-sm font-bold text-[#BE185D] dark:text-[#F9A8D4]">Best colors:</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {season.palette.slice(0, 3).map((p) => (
            <li key={p.hex} className="flex items-center gap-1.5 rounded-full bg-surface-2 py-1 pl-1.5 pr-3 text-xs font-medium text-ink">
              <span className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10" style={{ background: p.hex }} aria-hidden="true" />
              {p.name}
            </li>
          ))}
        </ul>

        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-primary">
          Explore palette
          <IconArrow className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
