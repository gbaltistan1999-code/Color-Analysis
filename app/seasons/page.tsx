import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { IconArrow } from "@/components/Icons";
import SeasonCard from "@/components/SeasonCard";
import { comparisons } from "@/data/comparisons";
import { familyInfo } from "@/data/families";
import { seasons } from "@/data/seasons";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "12 Season Color Analysis: All Color Seasons Explained",
  description:
    "Seasonal color analysis explained: how the 4 seasons and 12 sub-seasons work, with palettes, HEX codes, makeup, hair colors and comparisons for seasons people mix up.",
  path: "/seasons",
});

const dials = [
  { name: "Undertone", detail: "Warm (golden) or cool (rosy). This splits Spring and Autumn (warm) from Summer and Winter (cool)." },
  { name: "Value", detail: "How light or deep your overall coloring is — hair, eyes and skin together." },
  { name: "Chroma", detail: "How clear and bright, or soft and muted, the colors that suit you are." },
  { name: "Contrast", detail: "How much your hair, skin and eyes stand apart from each other." },
];

export default function SeasonsPage() {
  return (
    <>
      <section style={{ background: "var(--grad-hero)" }}>
        <div className="container-x py-14">
          <Breadcrumbs items={[{ name: "Seasons", path: "/seasons" }]} />
          <div className="mt-6 text-center">
            <span className="eyebrow">🌈 12 seasons, 4 families</span>
            <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">12 Season Color Analysis</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Seasonal colour analysis groups people by how colors interact with their natural coloring. Four seasons set the
              temperature and mood; each splits into three sub-seasons based on what stands out most.
            </p>
            <Link href="/#quiz" className="btn-primary mt-8">
              Not sure? Take the free quiz
            </Link>
          </div>
        </div>
      </section>

      <div className="container-x space-y-16 py-16">
        <section aria-labelledby="how">
          <h2 id="how" className="section-title">
            How the seasonal system works
          </h2>
          <p className="mt-3 max-w-3xl text-muted">
            Every season is a combination of four characteristics. They describe how colors behave next to your features —
            they appear in every skin tone, and no season is better than another.
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dials.map((d) => (
              <div key={d.name} className="card p-5">
                <dt className="font-bold">{d.name}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted">{d.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="families">
          <h2 id="families" className="section-title">
            The four seasons
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {familyInfo.map((f) => (
              <li key={f.slug}>
                <Link href={`/seasons/${f.slug}`} className="card group block h-full p-5 transition hover:-translate-y-1 hover:border-primary">
                  <span className="text-2xl" aria-hidden="true">
                    {f.emoji}
                  </span>
                  <h3 className="mt-2 text-lg font-bold">{f.family}</h3>
                  <p className="text-sm font-semibold text-primary">{f.tagline}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.definition}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    {f.family} overview <IconArrow className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {familyInfo.map((f) => (
          <section key={f.slug} aria-labelledby={`fam-${f.slug}`}>
            <h2 id={`fam-${f.slug}`} className="text-2xl font-bold">
              {f.family} sub-seasons <span className="text-base font-semibold text-muted">· {f.tagline}</span>
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {seasons
                .filter((s) => s.family === f.family)
                .map((s) => (
                  <SeasonCard key={s.slug} season={s} />
                ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="compare">
          <h2 id="compare" className="text-2xl font-bold">
            Seasons people mix up
          </h2>
          <p className="mt-2 text-muted">Side-by-side palettes and simple at-home tests to settle it.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/compare/${c.slug}`}
                  className="flex h-full items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4 font-semibold transition hover:border-primary hover:text-primary"
                >
                  {c.title} <IconArrow className="h-4 w-4 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
