import type { Metadata } from "next";
import Link from "next/link";
import SeasonCard from "@/components/SeasonCard";
import { families, seasons } from "@/lib/seasons";

export const metadata: Metadata = {
  title: "The 12 Color Seasons",
  description: "Explore all 12 color seasons with palettes, HEX codes, makeup and style tips.",
};

export default function SeasonsPage() {
  return (
    <>
      <section style={{ background: "var(--grad-hero)" }}>
        <div className="container-x py-16 text-center">
          <span className="eyebrow">🌈 12 seasons, 4 families</span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">The 12 Color Seasons</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Each family splits into three seasons based on what stands out most in your coloring — warmth, depth or
            brightness.
          </p>
          <Link href="/quiz" className="btn-primary mt-8">
            Not sure? Take the quiz
          </Link>
        </div>
      </section>
      <div className="container-x space-y-14 py-16">
        {families.map(({ family, blurb }) => (
          <section key={family} aria-labelledby={`fam-${family}`}>
            <h2 id={`fam-${family}`} className="text-2xl font-bold">
              {family} <span className="text-base font-semibold text-muted">· {blurb}</span>
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {seasons
                .filter((s) => s.family === family)
                .map((s) => (
                  <SeasonCard key={s.slug} season={s} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
