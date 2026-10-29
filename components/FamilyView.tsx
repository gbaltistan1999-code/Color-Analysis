import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import { PaletteStrip } from "@/components/Illustrations";
import SeasonCard from "@/components/SeasonCard";
import { familyInfo, type FamilyInfo } from "@/data/families";
import { seasons } from "@/data/seasons";
import { faqLd, jsonLd } from "@/lib/seo";

export default function FamilyView({ info }: { info: FamilyInfo }) {
  const members = seasons.filter((s) => s.family === info.family);
  const others = familyInfo.filter((f) => f.slug !== info.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd(info.faqs))} />
      <section style={{ background: "var(--grad-hero)" }}>
        <div className="container-x max-w-4xl py-14">
          <Breadcrumbs
            items={[
              { name: "Seasons", path: "/seasons" },
              { name: info.family, path: `/seasons/${info.slug}` },
            ]}
          />
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            <span aria-hidden="true">{info.emoji} </span>
            {info.family} Color Analysis: {info.tagline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{info.definition}</p>
          <PaletteStrip colors={members.flatMap((m) => m.palette.slice(0, 4).map((p) => p.hex))} className="mt-6 h-4 max-w-md" />
        </div>
      </section>

      <div className="container-x max-w-5xl space-y-14 py-14">
        <section aria-labelledby="traits">
          <h2 id="traits" className="section-title">
            Shared {info.family} traits
          </h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ["Undertone", info.traits.undertone],
              ["Value (depth)", info.traits.value],
              ["Chroma (clarity)", info.traits.chroma],
            ].map(([k, v]) => (
              <div key={k} className="card p-5">
                <dt className="text-xs font-bold uppercase tracking-wide text-muted">{k}</dt>
                <dd className="mt-1 text-lg font-bold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-muted">
            {info.family} coloring appears in people of every skin depth and background — these traits describe how colors
            interact with your features, not your skin shade.
          </p>
        </section>

        <section aria-labelledby="subs">
          <h2 id="subs" className="section-title">
            The three {info.family} sub-seasons
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((s) => (
              <SeasonCard key={s.slug} season={s} />
            ))}
          </div>
        </section>

        <section aria-labelledby="choose" className="rounded-2xl bg-surface-2 p-6 sm:p-8">
          <h2 id="choose" className="text-2xl font-bold">
            Which {info.family} are you?
          </h2>
          <ul className="mt-4 space-y-3">
            {info.howToChoose.map((t) => (
              <li key={t} className="leading-relaxed text-muted">
                {t}
              </li>
            ))}
          </ul>
          <Link href="/#quiz" className="btn-primary mt-6">
            Find out with the free quiz
          </Link>
        </section>

        <section aria-labelledby="family-faq">
          <h2 id="family-faq" className="text-2xl font-bold">
            {info.family} FAQ
          </h2>
          <div className="mt-5">
            <FAQ items={info.faqs} />
          </div>
        </section>

        <nav aria-labelledby="other-families">
          <h2 id="other-families" className="text-xl font-bold">
            Other seasons
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {others.map((f) => (
              <li key={f.slug}>
                <Link
                  href={`/seasons/${f.slug}`}
                  className="block rounded-2xl border border-line bg-surface p-4 font-semibold transition hover:border-primary hover:text-primary"
                >
                  <span aria-hidden="true">{f.emoji} </span>
                  {f.family} <span className="font-normal text-muted">· {f.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
