/**
 * "X vs Y" comparison pages for seasons people commonly mix up.
 * Season pairs reference slugs in lib/seasons.ts; the undertone page stands alone.
 */

export type Comparison = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  /** Season slugs being compared (omitted for the undertone page). */
  pair?: [string, string];
  /** What the two have in common. */
  shared: string;
  differences: { label: string; a: string; b: string }[];
  /** Practical at-home checks that separate the two. */
  tests: string[];
  verdict: string;
};

export const comparisons: Comparison[] = [
  {
    slug: "soft-autumn-vs-soft-summer",
    title: "Soft Autumn vs Soft Summer",
    metaTitle: "Soft Autumn vs Soft Summer: How to Tell Them Apart",
    description:
      "Soft Autumn vs Soft Summer explained: both are muted, but one leans warm and one leans cool. See the key differences, side-by-side palettes and easy tests to find yours.",
    intro:
      "These two are the most commonly confused seasons. Both look best in muted, blended colors and both have low contrast — the difference is a quiet shift in temperature.",
    pair: ["soft-autumn", "soft-summer"],
    shared: "Muted colors, low contrast, medium depth. Neither suits pure black or neon brights.",
    differences: [
      { label: "Undertone", a: "Neutral-warm — a hint of gold", b: "Neutral-cool — a hint of rose" },
      { label: "Best neutrals", a: "Oatmeal, mushroom, olive", b: "Rose taupe, soft grey, charcoal blue" },
      { label: "Greens", a: "Olive and moss", b: "Sage and soft teal" },
      { label: "Pinks", a: "Salmon and peach", b: "Dusty rose and mauve" },
      { label: "Metals", a: "Antique or brushed gold", b: "Brushed silver or pewter" },
    ],
    tests: [
      "Hold a camel scarf and a soft grey scarf under your chin in daylight. If camel evens out your skin, lean Soft Autumn; if grey does, lean Soft Summer.",
      "Compare a salmon lipstick with a dusty rose one. Salmon looking natural points to Soft Autumn.",
      "Check your hair in sunlight: golden or copper glints suggest Autumn, ashy tones suggest Summer.",
    ],
    verdict:
      "If you can't decide, live in the overlap — sage, soft teal, taupe and muted rosewood flatter both — and let your best metal break the tie.",
  },
  {
    slug: "deep-autumn-vs-deep-winter",
    title: "Deep Autumn vs Deep Winter",
    metaTitle: "Deep Autumn vs Deep Winter: Key Differences & Palettes",
    description:
      "Deep Autumn vs Deep Winter: both are dark and rich, but one is warm and earthy, the other cool and crisp. Compare palettes, metals and tests to find your deep season.",
    intro:
      "Both seasons have deep coloring — dark hair, often dark eyes — and look amazing in rich colors. The split is warmth: Deep Autumn is spicy and earthy, Deep Winter is cool and crisp.",
    pair: ["deep-autumn", "deep-winter"],
    shared: "Deep coloring and high contrast. Both can wear dark, saturated colors and should avoid pale pastels near the face.",
    differences: [
      { label: "Undertone", a: "Neutral-warm", b: "Neutral-cool" },
      { label: "Darkest neutral", a: "Espresso brown", b: "True black" },
      { label: "Reds", a: "Brick and burnt orange", b: "Ruby and cool red" },
      { label: "Light neutral", a: "Warm ivory", b: "Crisp white" },
      { label: "Metals", a: "Antique gold, bronze, copper", b: "Silver, platinum, gunmetal" },
    ],
    tests: [
      "Try a crisp white tee next to a warm ivory one. Crisp white looking clean (not harsh) points to Deep Winter.",
      "Compare black with espresso brown near your face. If black makes you look sharper rather than tired, lean Deep Winter.",
      "Gold vs silver: bronze and copper glowing on you suggests Deep Autumn.",
    ],
    verdict:
      "Deep teal, aubergine, burgundy and dark olive work for both, so build around those while you test.",
  },
  {
    slug: "true-winter-vs-bright-winter",
    title: "True Winter vs Bright Winter",
    metaTitle: "True Winter vs Bright Winter: Which Winter Are You?",
    description:
      "True (Cool) Winter vs Bright Winter: both are cool and high-contrast, but one is icy and pure, the other electric and vivid. Compare palettes and easy tests.",
    intro:
      "True Winter and Bright Winter share cool coloring and striking contrast. True Winter is defined by coolness, Bright Winter by clarity — its colors are the most vivid of all 12 seasons.",
    pair: ["true-winter", "bright-winter"],
    shared: "Cool undertones, high contrast and clear (not muted) colors. Both can wear black, white and jewel tones.",
    differences: [
      { label: "Defining trait", a: "Coolness", b: "Brightness and clarity" },
      { label: "Undertone", a: "Fully cool", b: "Neutral-cool — can borrow a little warmth" },
      { label: "Signature colors", a: "Icy lavender, pine, true blue", b: "Electric blue, hot pink, emerald" },
      { label: "Lightest colors", a: "Icy pastels", b: "Optic white and lemon" },
      { label: "Typical eyes", a: "Cool grey, blue or dark brown", b: "Very clear, sparkling eyes" },
    ],
    tests: [
      "Try icy lavender and electric blue near your face. Icy shades looking elegant points to True Winter; electric blue making your eyes sparkle points to Bright Winter.",
      "Lemon yellow is a good tie-breaker: Bright Winters can often wear it, True Winters usually can't.",
      "Look at your eyes in daylight — unusually clear, jewel-like eyes are a Bright Winter hallmark.",
    ],
    verdict: "Royal blue, magenta, black and crisp white are safe for both.",
  },
  {
    slug: "light-spring-vs-light-summer",
    title: "Light Spring vs Light Summer",
    metaTitle: "Light Spring vs Light Summer: Differences & Best Colors",
    description:
      "Light Spring vs Light Summer: both are light and delicate, but Spring is sunny and warm while Summer is airy and cool. Compare palettes, metals and simple tests.",
    intro:
      "Both light seasons have fair-to-light coloring and look lovely in light, gentle colors. The difference is temperature and a touch of clarity: Light Spring is sunny and fresh, Light Summer is airy and cool.",
    pair: ["light-spring", "light-summer"],
    shared: "Light depth and low contrast. Both are overwhelmed by black and very dark colors.",
    differences: [
      { label: "Undertone", a: "Neutral-warm", b: "Neutral-cool" },
      { label: "Pinks", a: "Peach and warm coral", b: "Rose pink and soft lilac" },
      { label: "Blues", a: "Aqua and periwinkle", b: "Powder blue and sky blue" },
      { label: "Whites", a: "Ivory", b: "Soft white" },
      { label: "Metals", a: "Light gold, rose gold", b: "Silver, white gold, rose gold" },
    ],
    tests: [
      "Compare peach with powder pink under your chin. Peach looking fresh points to Light Spring.",
      "Hold an ivory and a soft white top up in daylight. Ivory warming your skin suggests Light Spring.",
      "Look for golden strands in your hair in sunlight — they lean Spring; ash tones lean Summer.",
    ],
    verdict: "Periwinkle, mint and rose gold sit in both palettes and are easy wins while you decide.",
  },
  {
    slug: "warm-vs-cool-undertone",
    title: "Warm vs Cool Undertone",
    metaTitle: "Warm vs Cool Undertone: How to Tell Which You Have",
    description:
      "Warm vs cool undertone explained: what each looks like, 4 simple at-home tests, and which colors, metals and seasons suit each. Plus what neutral undertone means.",
    intro:
      "Your undertone is the subtle hue under your skin's surface. It doesn't change with a tan, and it's the first thing color analysis looks at, because it decides which side of the color wheel flatters you.",
    shared: "Both warm and cool undertones come in every skin depth — from very fair to very deep.",
    differences: [
      { label: "Looks like", a: "Golden, peachy or yellow hints", b: "Pink, rosy or bluish hints" },
      { label: "Wrist veins", a: "Greenish or olive", b: "Blue or purple" },
      { label: "Best metal", a: "Gold", b: "Silver" },
      { label: "Best white", a: "Cream or ivory", b: "Crisp pure white" },
      { label: "Seasons", a: "Spring and Autumn", b: "Summer and Winter" },
    ],
    tests: [
      "Vein test: look at your inner wrist in daylight — green suggests warm, blue or purple suggests cool.",
      "Jewelry test: hold gold and silver next to your face; the one that makes your skin glow is your side.",
      "Paper test: hold white paper next to your bare face; yellow or golden skin reads warm, pink or rosy reads cool.",
      "Sun test: tanning golden suggests warm; burning pink suggests cool.",
    ],
    verdict:
      "If you get mixed results, you may be neutral — you can borrow from both sides, and the 'soft' and 'bright' seasons are worth a look.",
  },
];

export function getComparison(slug: string) {
  return comparisons.find((c) => c.slug === slug);
}

/** Comparisons that involve a given season, for cross-linking from season pages. */
export function comparisonsFor(seasonSlug: string) {
  return comparisons.filter((c) => c.pair?.includes(seasonSlug));
}
