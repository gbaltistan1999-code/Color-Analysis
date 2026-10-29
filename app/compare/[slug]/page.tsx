import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { comparisons, getComparison } from "@/data/comparisons";
import { getSeason, seasonPhoto } from "@/lib/seasons";
import type { Season } from "@/types";
import { SITE_URL } from "@/lib/site-config";
import { jsonLd, pageMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { IconArrow, IconCheck } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getComparison((await params).slug);
  if (!c) return {};
  return pageMetadata({ title: c.metaTitle, description: c.description, path: `/compare/${c.slug}` });
}

function SeasonColumn({ season }: { season: Season }) {
  const photo = seasonPhoto(season);
  return (
    <Link href={`/seasons/${season.slug}`} className="card group overflow-hidden transition hover:-translate-y-1 hover:border-primary">
      <div className="relative aspect-[4/3]">
        <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 360px, 100vw" className={`object-cover ${photo.position}`} />
      </div>
      <div className="flex h-3" aria-hidden="true">
        {season.palette.map((p) => (
          <span key={p.hex} className="flex-1" style={{ background: p.hex }} />
        ))}
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold">
          <span aria-hidden="true">{season.emoji} </span>
          {season.name}
        </h2>
        <p className="mt-1 text-sm text-muted">{season.tagline}</p>
        <ul className="mt-3 grid grid-cols-4 gap-2" aria-label={`${season.name} palette`}>
          {season.palette.map((p) => (
            <li key={p.hex} title={`${p.name} ${p.hex}`}>
              <span className="block aspect-square rounded-lg ring-1 ring-black/10" style={{ background: p.hex }} />
              <span className="sr-only">
                {p.name} {p.hex}
              </span>
            </li>
          ))}
        </ul>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Full {season.name} palette <IconArrow className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default async function ComparePage({ params }: Props) {
  const c = getComparison((await params).slug);
  if (!c) notFound();

  const [a, b] = c.pair ? [getSeason(c.pair[0])!, getSeason(c.pair[1])!] : [null, null];
  const colA = a?.name ?? "Warm";
  const colB = b?.name ?? "Cool";
  const others = comparisons.filter((x) => x.slug !== c.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: c.metaTitle,
          description: c.description,
          mainEntityOfPage: `${SITE_URL}/compare/${c.slug}`,
        })}
      />
      <section style={{ background: "var(--grad-hero)" }}>
        <div className="container-x max-w-3xl py-14 text-center">
          <div className="flex justify-center">
            <Breadcrumbs
              items={[
                { name: "Seasons", path: "/seasons" },
                { name: c.title, path: `/compare/${c.slug}` },
              ]}
            />
          </div>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{c.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">{c.intro}</p>
        </div>
      </section>

      <div className="container-x max-w-4xl space-y-12 py-14">
        {a && b && (
          <div className="grid gap-6 md:grid-cols-2">
            <SeasonColumn season={a} />
            <SeasonColumn season={b} />
          </div>
        )}

        <section aria-labelledby="shared" className="rounded-2xl bg-surface-2 p-6">
          <h2 id="shared" className="text-xl font-bold">
            What they have in common
          </h2>
          <p className="mt-2 text-muted">{c.shared}</p>
        </section>

        <section aria-labelledby="diff">
          <h2 id="diff" className="section-title">
            Key differences
          </h2>
          <div className="card mt-6 overflow-x-auto !shadow-none">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-surface-2">
                <tr>
                  <th scope="col" className="p-4 font-semibold text-muted">
                    &nbsp;
                  </th>
                  <th scope="col" className="p-4 font-bold">
                    {colA}
                  </th>
                  <th scope="col" className="p-4 font-bold">
                    {colB}
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.differences.map((d) => (
                  <tr key={d.label} className="border-t border-line">
                    <th scope="row" className="p-4 font-semibold text-muted">
                      {d.label}
                    </th>
                    <td className="p-4">{d.a}</td>
                    <td className="p-4">{d.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="tests">
          <h2 id="tests" className="section-title">
            How to tell which you are
          </h2>
          <ol className="mt-6 space-y-3">
            {c.tests.map((t, i) => (
              <li key={t} className="flex gap-4 rounded-2xl border border-line bg-surface p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] font-bold text-white">
                  {i + 1}
                </span>
                <p className="leading-relaxed">{t}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex gap-3 rounded-2xl bg-primary-soft p-4 font-medium">
            <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            {c.verdict}
          </p>
        </section>

        <div className="rounded-[2rem] px-6 py-10 text-center text-white" style={{ background: "var(--grad-cta)" }}>
          <h2 className="text-2xl font-extrabold sm:text-3xl">Still not sure? Let the quiz decide 🎨</h2>
          <p className="mx-auto mt-3 max-w-lg text-white/90">Free, about 3 minutes, no signup — with an optional private selfie check.</p>
          <Link
            href="/#quiz"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-[#6D28D9] shadow-xl transition hover:-translate-y-0.5"
          >
            Take the free color analysis quiz <IconArrow className="h-5 w-5" />
          </Link>
        </div>

        <nav aria-labelledby="more">
          <h2 id="more" className="text-xl font-bold">
            More comparisons
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/compare/${o.slug}`}
                  className="flex items-center justify-between rounded-2xl border border-line bg-surface p-4 font-semibold transition hover:border-primary hover:text-primary"
                >
                  {o.title} <IconArrow className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
