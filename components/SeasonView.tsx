import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ, { type FaqItem } from "@/components/FAQ";
import { IconArrow } from "@/components/Icons";
import { PaletteStrip } from "@/components/Illustrations";
import PaletteSwatches from "@/components/PaletteSwatches";
import SeasonCard from "@/components/SeasonCard";
import { comparisonsFor } from "@/data/comparisons";
import { familyInfo } from "@/data/families";
import { seasonDetails } from "@/data/season-details";
import { seasonLooks } from "@/data/season-looks";
import { familyExtras, seasons } from "@/data/seasons";
import { getSeason, seasonPhoto } from "@/lib/seasons";
import { faqLd, jsonLd } from "@/lib/seo";
import type { Season } from "@/types";

const list = (names: string[]) => names.slice(0, -1).join(", ") + " and " + names[names.length - 1];

export function seasonFaqs(season: Season): FaqItem[] {
  const n = season.name;
  const look = seasonLooks[season.slug];
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
    { q: `What hair colour suits a ${n}?`, a: familyExtras[season.family].hair },
    {
      q: `Am I a ${n}?`,
      a: `${n}s often have ${look.hair.toLowerCase()} hair, ${look.eyes.toLowerCase()} eyes and ${look.skin.toLowerCase()} skin — but every season includes people of all skin depths. The quickest way to check is the free color analysis quiz.`,
    },
  ];
}

export default function SeasonView({ season }: { season: Season }) {
  const photo = seasonPhoto(season);
  const look = seasonLooks[season.slug];
  const detail = seasonDetails[season.slug];
  const faqs = seasonFaqs(season);
  const compares = comparisonsFor(season.slug);
  const family = familyInfo.find((f) => f.family === season.family)!;
  const siblings = seasons.filter((s) => s.family === season.family && s.slug !== season.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd(faqs))} />
      <section style={{ background: "var(--grad-hero)" }}>
        <div className="container-x grid items-center gap-10 py-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Breadcrumbs
              items={[
                { name: "Seasons", path: "/seasons" },
                { name: season.family, path: `/seasons/${family.slug}` },
                { name: season.name, path: `/seasons/${season.slug}` },
              ]}
            />
            <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
              <span aria-hidden="true">{season.emoji} </span>
              {season.name} Color Palette
            </h1>
            <p className="mt-2 text-xl font-semibold text-primary">{season.tagline}</p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{detail.definition}</p>
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
                <Image src={photo.src} alt={photo.alt} fill priority sizes="320px" className={`object-cover ${photo.position}`} />
              </div>
            </div>
            <PaletteStrip colors={season.palette.map((p) => p.hex)} className="mx-auto mt-4 h-3 w-3/4" />
          </figure>
        </div>
      </section>

      <div className="container-x space-y-14 py-16">
        <section aria-labelledby="about-season" className="max-w-3xl">
          <h2 id="about-season" className="section-title">
            What makes a {season.name}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{season.description}</p>
          <p className="mt-3 leading-relaxed text-muted">
            In color analysis terms, {season.name} combines a {season.undertone.toLowerCase()} undertone, {season.depth.toLowerCase()}{" "}
            value (depth) and {season.contrast.toLowerCase()} contrast. These traits describe how colors interact — they appear
            across all skin tones and ethnicities, and no season is better than another.
          </p>
        </section>

        <section aria-labelledby="palette">
          <h2 id="palette" className="section-title">
            {season.name} color palette 🎨
          </h2>
          <p className="mt-2 text-muted">Signature shades to wear near your face, with HEX codes for shopping and makeup matching.</p>
          <div className="mt-6">
            <PaletteSwatches colors={season.palette} label={`${season.name} palette`} />
          </div>
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
              Colors to approach with care
            </h2>
            <p className="mt-1 text-sm text-muted">
              Not forbidden — just harder to wear near the face. Try them in shoes, bags or trousers instead.
            </p>
            <ul className="mt-4 grid grid-cols-4 gap-3">
              {season.avoid.map((s) => (
                <li key={s.hex} className="text-center">
                  <span className="block aspect-square rounded-xl ring-1 ring-black/5" style={{ background: s.hex }} aria-hidden="true" />
                  <span className="mt-1 block text-xs text-muted">{s.name}</span>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="basics" className="card p-6">
            <h2 id="basics" className="text-xl font-bold">
              Neutrals &amp; metals
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

        <section aria-labelledby="neighbors">
          <h2 id="neighbors" className="section-title">
            {season.name} vs neighboring seasons
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {detail.neighbors.map((nb) => {
              const other = getSeason(nb.slug)!;
              const compare = compares.find((c) => c.pair?.includes(nb.slug));
              return (
                <div key={nb.slug} className="card p-5">
                  <h3 className="font-bold">
                    {season.name} vs {other.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{nb.difference}</p>
                  <Link
                    href={compare ? `/compare/${compare.slug}` : `/seasons/${other.slug}`}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                  >
                    {compare ? `Full ${compare.title} comparison` : `See the ${other.name} palette`}
                    <IconArrow className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="myths" className="rounded-2xl bg-surface-2 p-6 sm:p-8">
          <h2 id="myths" className="text-2xl font-bold">
            Common misconceptions &amp; limitations
          </h2>
          <ul className="mt-4 space-y-3">
            {detail.misconceptions.map((m) => (
              <li key={m} className="leading-relaxed text-muted">
                {m}
              </li>
            ))}
            <li className="leading-relaxed text-muted">
              Seasons are a guide, not a rule. Lighting, hair dye, a tan or makeup can shift how colors look on you, and an
              in-person draping session remains the most accurate way to confirm your season.
            </li>
          </ul>
        </section>

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
          <p className="mt-2 text-muted">
            Or read the{" "}
            <Link href={`/seasons/${family.slug}`} className="font-semibold text-primary underline">
              {season.family} season overview
            </Link>
            .
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {siblings.map((s) => (
              <SeasonCard key={s.slug} season={s} />
            ))}
          </div>
        </section>

        <div className="card flex flex-col items-center gap-4 p-8 text-center">
          <PaletteStrip colors={season.palette.map((p) => p.hex)} className="h-3 w-48" />
          <h2 className="text-2xl font-bold">Not sure you&apos;re a {season.name}?</h2>
          <p className="text-muted">Take the free color analysis quiz to see which season matches your coloring.</p>
          <Link href="/#quiz" className="btn-primary">
            Take the free quiz
          </Link>
        </div>
      </div>
    </>
  );
}
