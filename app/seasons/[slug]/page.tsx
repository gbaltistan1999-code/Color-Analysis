import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FAQ, { type FaqItem } from "@/components/FAQ";
import { IconArrow } from "@/components/Icons";
import { PaletteStrip } from "@/components/Illustrations";
import SeasonCard from "@/components/SeasonCard";
import { comparisonsFor } from "@/lib/compare";
import { seasonLooks } from "@/lib/seasonLooks";
import { familyExtras, getSeason, seasonPhoto, seasons, type Season } from "@/lib/seasons";
import { SITE_URL, jsonLd } from "@/lib/site";

const list = (names: string[]) => names.slice(0, -1).join(", ") + " and " + names[names.length - 1];

function seasonFaqs(season: Season): FaqItem[] {
  const n = season.name;
  return [
    {
      q: `What colors look best on a ${n}?`,
      a: `${n}s shine in ${list(season.palette.slice(0, 5).map((p) => p.name.toLowerCase()))}. Their best neutrals are ${season.neutrals.toLowerCase()}.`,
    },
    {
      q: `What colors should a ${n} avoid?`,
      a: `${list(season.avoid.map((p) => p.name.toLowerCase()))} can overpower or dull ${n} coloring when worn near the face. Wear them lower on the body or as small accents instead.`,
    },
    {
      q: `What is the best lipstick for a ${n}?`,
      a: `${season.makeup.find((m) => /lip/i.test(m)) ?? season.makeup[0]}.`,
    },
    {
      q: `What hair color suits a ${n}?`,
      a: familyExtras[season.family].hair,
    },
    {
      q: `Am I a ${n}?`,
      a: `${n}s usually have ${seasonLooks[season.slug].hair.toLowerCase()} hair, ${seasonLooks[season.slug].eyes.toLowerCase()} eyes and ${seasonLooks[season.slug].skin.toLowerCase()} skin. The quickest way to check is the free color analysis quiz.`,
    },
  ];
}

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return seasons.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const season = getSeason((await params).slug);
  if (!season) return {};
  return {
    title: `${season.name} Color Palette: Best Colors, Makeup & Hair`,
    description: `${season.name} color palette with HEX codes: the best colors, colors to avoid, makeup and lipstick, hair colors and how to tell if you're a ${season.name}.`,
    alternates: { canonical: `/seasons/${season.slug}` },
  };
}

export default async function SeasonPage({ params }: Props) {
  const season = getSeason((await params).slug);
  if (!season) notFound();

  const siblings = seasons.filter((s) => s.family === season.family && s.slug !== season.slug);
  const photo = seasonPhoto(season);
  const look = seasonLooks[season.slug];
  const faqs = seasonFaqs(season);
  const compares = comparisonsFor(season.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Seasons", item: `${SITE_URL}/seasons` },
              { "@type": "ListItem", position: 2, name: season.name, item: `${SITE_URL}/seasons/${season.slug}` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ])}
      />
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
              {season.name} Color Palette
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
          <figure className="mx-auto w-full max-w-xs">
            <div
              className="rounded-[2rem] p-1.5 shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${season.palette.slice(0, 4).map((p) => p.hex).join(", ")})` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.65rem]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority
                  sizes="320px"
                  className={`object-cover ${photo.position}`}
                />
              </div>
            </div>
            <PaletteStrip colors={season.palette.map((p) => p.hex)} className="mx-auto mt-4 h-3 w-3/4" />
          </figure>
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

        <section aria-labelledby="who" className="card p-6 sm:p-8">
          <h2 id="who" className="text-2xl font-bold">
            Who is a {season.name}?
          </h2>
          <p className="mt-2 text-muted">{look.summary}</p>
          <dl className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              ["💇 Hair", look.hair],
              ["👁️ Eyes", look.eyes],
              ["✨ Skin", look.skin],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-surface-2 p-4">
                <dt className="font-bold">{k}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section aria-labelledby="avoid" className="card p-6">
            <h2 id="avoid" className="text-xl font-bold">
              Colors to avoid as a {season.name}
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
              💄 Best makeup &amp; lipstick for {season.name}
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
          <section aria-labelledby="hair" className="card p-6">
            <h2 id="hair" className="text-xl font-bold">
              💇 Best hair colors for {season.name}
            </h2>
            <p className="mt-3 text-muted">{familyExtras[season.family].hair}</p>
          </section>
          <section aria-labelledby="accessories" className="card p-6">
            <h2 id="accessories" className="text-xl font-bold">
              🕶️ Jewelry &amp; sunglasses
            </h2>
            <p className="mt-3 text-muted">{familyExtras[season.family].accessories}</p>
          </section>
        </div>

        {compares.length > 0 && (
          <section aria-labelledby="compare">
            <h2 id="compare" className="text-2xl font-bold">
              Torn between two seasons?
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {compares.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/compare/${c.slug}`}
                    className="flex items-center justify-between rounded-2xl border border-line bg-surface p-4 font-semibold transition hover:border-primary hover:text-primary"
                  >
                    {c.title} <IconArrow className="h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="season-faq">
          <h2 id="season-faq" className="text-2xl font-bold">
            {season.name} FAQ
          </h2>
          <div className="mt-5">
            <FAQ items={faqs} />
          </div>
        </section>

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
