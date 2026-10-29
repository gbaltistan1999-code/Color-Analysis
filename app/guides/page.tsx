import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { PaletteStrip } from "@/components/Illustrations";
import { SITE_URL } from "@/lib/site-config";
import { jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Color Analysis Guides: Undertones, Contrast & Drape Tests",
  description:
    "Beginner-friendly color analysis guides: warm vs cool undertones, depth and contrast, how to do a drape test at home and how to use your palette.",
  path: "/guides",
});

const guides = [
  {
    id: "undertones",
    emoji: "🌡️",
    title: "Warm vs. cool undertones, explained",
    colors: ["#F7A21B", "#FF7F61", "#C19A6B", "#4A7FB5", "#C2386B", "#8C9EDB"],
    paragraphs: [
      "Your surface tone is what you see at a glance — fair, medium, deep — and it changes with a tan. Your undertone sits underneath and stays put. Warm undertones lean golden or peachy, cool undertones lean pink or blue, and neutral sits in the middle.",
      "Undertone decides which 'side' of the color wheel tends to flatter you. Warm folks usually shine in yellow-based colors; cool folks in blue-based ones.",
    ],
  },
  {
    id: "depth-contrast",
    emoji: "🌗",
    title: "Depth and contrast: the other two dials",
    colors: ["#F6E1D3", "#C99A76", "#6B4430", "#111111", "#FAFAFA"],
    paragraphs: [
      "Depth is how light or dark your overall coloring is — skin, hair and eyes together. Light coloring looks lovely in lighter shades; deep coloring can carry rich, dark ones.",
      "Contrast is how much your features stand apart. Very dark hair with fair skin is high contrast; blonde hair with light skin and soft eyes is low contrast. High-contrast people suit bold combinations, low-contrast people suit blended, tonal outfits.",
    ],
  },
  {
    id: "drape-test",
    emoji: "🧣",
    title: "How to do a drape test at home",
    colors: ["#D4AF37", "#C0C0C8", "#FF7F61", "#C71585", "#FFF1D6", "#FFFFFF"],
    paragraphs: [
      "Find a spot with indirect daylight and remove makeup if you can. Pull your hair back and cover any colored clothing with a neutral towel.",
      "Hold fabrics, towels or tops near your chin one at a time — try a gold and a silver item, an orange-red and a blue-red, ivory and pure white. Watch your skin, not the fabric: the right color evens out redness and brightens your eyes; the wrong one can deepen shadows or make you look tired.",
      "Take photos of each to compare side by side. A friend's honest opinion helps too!",
    ],
  },
  {
    id: "using-palette",
    emoji: "🛍️",
    title: "Using your palette in real life",
    colors: ["#7C3AED", "#EC4899", "#FB923C", "#FACC15", "#22C55E"],
    paragraphs: [
      "You don't need to replace your wardrobe. Start with the pieces closest to your face — tops, scarves, glasses frames and lipstick — since that's where color matters most.",
      "Save your palette's HEX codes on your phone and use them when shopping online or matching makeup. Colors outside your palette are still fine below the waist or as small accents.",
    ],
  },
];

export default function GuidesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Color Analysis Guides: Undertones, Contrast & Drape Tests",
          mainEntityOfPage: `${SITE_URL}/guides`,
        })}
      />
      <section style={{ background: "var(--grad-hero)" }}>
        <div className="container-x py-14">
          <Breadcrumbs items={[{ name: "Guides", path: "/guides" }]} />
        </div>
        <div className="container-x pb-14 text-center">
          <span className="eyebrow">📚 Learn the basics</span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Color Analysis Guides</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Bite-sized reads to help you understand your result and put it to work.
          </p>
        </div>
      </section>
      <div className="container-x grid gap-10 py-14 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Guides" className="lg:sticky lg:top-24 lg:self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col">
            {guides.map((g) => (
              <li key={g.id}>
                <a
                  href={`#${g.id}`}
                  className="block rounded-full bg-surface-2 px-4 py-2 text-sm font-semibold text-ink hover:text-primary lg:rounded-xl"
                >
                  {g.emoji} {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-8">
          {guides.map((g) => (
            <article key={g.id} id={g.id} className="card scroll-mt-24 p-6 sm:p-8">
              <PaletteStrip colors={g.colors} className="h-2 w-32" />
              <h2 className="mt-4 text-2xl font-bold">
                <span aria-hidden="true">{g.emoji} </span>
                {g.title}
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-muted">
                {g.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </article>
          ))}
          <div className="card p-6 text-center sm:p-8">
            <h2 className="text-2xl font-bold">Ready to put it into practice?</h2>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/#quiz" className="btn-primary">
                Take the Quiz
              </Link>
              <Link href="/skin-undertone-test" className="btn-ghost">
                Try the Undertone Test
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
