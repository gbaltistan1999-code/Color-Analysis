import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ, { type FaqItem } from "@/components/FAQ";
import { faqLd, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Color Analysis FAQ: Seasons, Undertones & Accuracy",
  description:
    "Answers to common color analysis questions: skin tone vs undertone, dyed hair, glasses, men's color analysis, wearing colors outside your palette and more.",
  path: "/faq",
});

// Deliberately different from the homepage FAQ, so the two pages don't compete in search.
const groups: { title: string; items: FaqItem[] }[] = [
  {
    title: "Seasons and coloring",
    items: [
      {
        q: "Does my skin tone decide my season?",
        a: "No. Skin depth is only one part. Your season comes from undertone, value, chroma and contrast across your skin, hair and eyes together — which is why every season includes people of every skin tone.",
      },
      {
        q: "What's the difference between skin tone and undertone?",
        a: "Skin tone is the surface color — fair, medium, deep — and changes with a tan. Undertone is the subtle warm, cool or neutral hue underneath, and stays the same. The skin undertone test walks you through it.",
      },
      {
        q: "What does 'contrast' mean in color analysis?",
        a: "How much your hair, skin and eyes stand apart. Dark hair with fair skin is high contrast; hair, skin and eyes of similar depth are low contrast. High-contrast people suit bold combinations; low-contrast people suit blended, tonal outfits.",
      },
      {
        q: "Is color analysis the same as colour analysis?",
        a: "Yes — 'colour' is the UK, Canadian and Australian spelling. The method is the same.",
      },
    ],
  },
  {
    title: "Taking the quiz",
    items: [
      {
        q: "I dye my hair. What should I answer?",
        a: "Answer with your natural color — think of your roots or childhood photos. Your natural coloring decides your season; afterwards, your season page suggests hair colors that harmonize with it.",
      },
      {
        q: "Why did my result show a 'close second' season?",
        a: "Your answers sat near the border between two seasons. Rather than guess, the quiz shows both. Try colors from each palette near your face in daylight and keep whichever flatters you more.",
      },
      {
        q: "Does the photo check upload my picture?",
        a: "No. The photo is read by your own browser and never uploaded, sent or saved. It's gone when you leave the page.",
      },
      {
        q: "Should I wear glasses for the photo check?",
        a: "Take them off if you can — lenses and frames reflect color onto your skin and make eye color hard to sample.",
      },
      {
        q: "Does the quiz work for men?",
        a: "Yes. Color analysis works the same for everyone. Skip the makeup tips and focus on the palette, neutrals and metals for shirts, suits, ties and accessories.",
      },
    ],
  },
  {
    title: "Using your results",
    items: [
      {
        q: "Can I wear colors outside my palette?",
        a: "Of course. Your palette shows what tends to flatter near your face. Colors outside it work well lower on the body — trousers, shoes, bags — or as small accents.",
      },
      {
        q: "How do I use the HEX codes?",
        a: "Paste them into shopping-site color filters, makeup shade finders or design apps to match colors. Remember screens vary, so check colors in person before buying.",
      },
      {
        q: "Is an in-person color analysis more accurate?",
        a: "Yes. A trained analyst draping fabrics in controlled light remains the most accurate method. The quiz is a free, quick starting point.",
      },
    ],
  },
];

export default function FaqPage() {
  const all = groups.flatMap((g) => g.items);
  return (
    <div className="container-x max-w-3xl py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd(all))} />
      <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
      <h1 className="mt-4 text-4xl font-extrabold">Color Analysis FAQ</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Straight answers about seasons, undertones and getting the most from your results. Still curious? Take the{" "}
        <Link href="/#quiz" className="font-semibold text-primary underline">
          free color analysis quiz
        </Link>{" "}
        or <Link href="/contact" className="font-semibold text-primary underline">get in touch</Link>.
      </p>
      <div className="mt-10 space-y-10">
        {groups.map((g) => (
          <section key={g.title} aria-labelledby={g.title}>
            <h2 id={g.title} className="text-2xl font-bold">
              {g.title}
            </h2>
            <div className="mt-4">
              <FAQ items={g.items} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
