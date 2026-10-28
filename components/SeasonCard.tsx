import Link from "next/link";
import type { Season } from "@/lib/seasons";
import { PaletteStrip } from "./Illustrations";
import { IconArrow } from "./Icons";

export default function SeasonCard({ season }: { season: Season }) {
  return (
    <Link
      href={`/seasons/${season.slug}`}
      className="card group flex flex-col gap-3 p-5 transition duration-200 hover:-translate-y-1 hover:border-primary"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-muted">{season.family}</span>
        <span className="text-xl" aria-hidden="true">
          {season.emoji}
        </span>
      </div>
      <h3 className="text-lg font-bold text-ink">{season.name}</h3>
      <PaletteStrip colors={season.palette.map((p) => p.hex)} className="h-4" />
      <p className="text-sm text-muted">{season.tagline}</p>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary">
        Explore palette
        <IconArrow className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
