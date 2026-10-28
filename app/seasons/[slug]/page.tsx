import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DrapedFace, PaletteStrip } from "@/components/Illustrations";
import SeasonCard from "@/components/SeasonCard";
import { getSeason, seasons } from "@/lib/seasons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return seasons.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const season = getSeason((await params).slug);
  if (!season) return {};
  return {
    title: `${season.name} Color Palette`,
    description: `${season.name}: ${season.tagline.toLowerCase()}. Palette with HEX codes, colors to avoid, makeup and style tips.`,
  };
}

export default async function SeasonPage({ params }: Props) {
  const season = getSeason((await params).slug);
  if (!season) notFound();

  const siblings = seasons.filter((s) => s.family === season.family && s.slug !== season.slug);

  return (
    <>
      <section style={{ background: "var(--grad-hero)" }}>
        <div className="container-x grid items-center gap-10 py-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link href="/seasons" className="font-semibold text-primary hover:underline">
                Seasons
              </Link>{" "}
              / {season.family}
            </nav>
            <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
              <span aria-hidden="true">{season.emoji} </span>
              {season.name}
            </h1>
            <p className="mt-2 text-xl font-semibold text-primary">{season.tagline}</p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{season.description}</p>
            <dl className="mt-6 grid max-w-md grid-cols-3 gap-3 text-center">
              {[
                ["Undertone", season.undertone],
                ["Depth", season.depth],
                ["Contrast", season.contrast],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-surface p-3 shadow-sm">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{k}</dt>
                  <dd className="mt-1 text-sm font-bold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mx-auto w-full max-w-xs">
            <DrapedFace
              drape={season.palette[0].hex}
              drapeShade={season.palette[1].hex}
              mood="glow"
              title={`Illustration wearing a ${season.palette[0].name} drape`}
            />
          </div>
        </div>
      </section>

      <div className="container-x space-y-14 py-16">
        <section aria-labelledby="palette">
          <h2 id="palette" className="section-title">
            Signature palette 🎨
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {season.palette.map((s) => (
              <li key={s.hex} className="card p-3">
                <span className="block h-24 rounded-xl ring-1 ring-black/5" style={{ background: s.hex }} />
                <p className="mt-3 font-semibold">{s.name}</p>
                <p className="font-mono text-sm text-muted">{s.hex}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section aria-labelledby="avoid" className="card p-6">
            <h2 id="avoid" className="text-xl font-bold">
              Colors to wear with care
            </h2>
            <p className="mt-1 text-sm text-muted">These can overpower or dull your natural coloring near the face.</p>
            <ul className="mt-4 grid grid-cols-4 gap-3">
              {season.avoid.map((s) => (
                <li key={s.hex} className="text-center">
                  <span className="block aspect-square rounded-xl ring-1 ring-black/5" style={{ background: s.hex }} />
                  <span className="mt-1 block text-xs text-muted">{s.name}</span>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="basics" className="card p-6">
            <h2 id="basics" className="text-xl font-bold">
              Wardrobe basics
            </h2>
            <dl className="mt-4 space-y-3">
              <div>
                <dt className="text-sm font-semibold text-muted">Best metals</dt>
                <dd className="font-semibold">{season.metals}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-muted">Go-to neutrals</dt>
                <dd className="font-semibold">{season.neutrals}</dd>
              </div>
            </dl>
          </section>
          <section aria-labelledby="makeup" className="card p-6">
            <h2 id="makeup" className="text-xl font-bold">
              💄 Makeup ideas
            </h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted">
              {season.makeup.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="style" className="card p-6">
            <h2 id="style" className="text-xl font-bold">
              👗 Style tips
            </h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted">
              {season.style.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="related">
          <h2 id="related" className="text-2xl font-bold">
            Other {season.family} seasons
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {siblings.map((s) => (
              <SeasonCard key={s.slug} season={s} />
            ))}
          </div>
        </section>

        <div className="card flex flex-col items-center gap-4 p-8 text-center">
          <PaletteStrip colors={season.palette.map((p) => p.hex)} className="h-3 w-48" />
          <h2 className="text-2xl font-bold">Not sure this is you?</h2>
          <p className="text-muted">Take the free quiz to see which season matches your coloring.</p>
          <Link href="/quiz" className="btn-primary">
            Take the Quiz
          </Link>
        </div>
      </div>
    </>
  );
}
