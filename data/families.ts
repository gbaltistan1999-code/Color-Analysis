import type { Family } from "@/types";

/** Content for the four parent-season pages (/seasons/spring etc.). */
export type FamilyInfo = {
  family: Family;
  slug: string;
  emoji: string;
  tagline: string;
  definition: string;
  traits: { undertone: string; value: string; chroma: string };
  /** How to pick between the three sub-seasons. */
  howToChoose: string[];
  faqs: { q: string; a: string }[];
};

export const familyInfo: FamilyInfo[] = [
  {
    family: "Spring",
    slug: "spring",
    emoji: "🌼",
    tagline: "Warm and clear",
    definition:
      "Spring coloring is warm and clear. Springs look their best in fresh, golden-based colors with some brightness — the palette of a sunny morning rather than a cozy evening.",
    traits: { undertone: "Warm to neutral-warm", value: "Light to medium", chroma: "Clear and bright" },
    howToChoose: [
      "If lightness stands out most and bold colors overwhelm you, look at Light Spring.",
      "If warmth stands out most and golden colors make you glow, look at True Spring.",
      "If clarity stands out most and you can wear vivid, saturated colors, look at Bright Spring.",
    ],
    faqs: [
      { q: "How do I know if I'm a Spring?", a: "Springs usually look healthiest in warm, clear colors like coral, warm aqua and golden yellow, and less so in dusty or very dark shades. Gold jewelry tends to flatter, and cream often beats stark white." },
      { q: "What's the difference between Spring and Autumn?", a: "Both are warm. Spring colors are clearer and lighter; Autumn colors are softer, richer and earthier." },
    ],
  },
  {
    family: "Summer",
    slug: "summer",
    emoji: "🌸",
    tagline: "Cool and soft",
    definition:
      "Summer coloring is cool and soft. Summers look their best in blue-based colors with a gentle, slightly greyed finish — elegant rather than electric.",
    traits: { undertone: "Cool to neutral-cool", value: "Light to medium", chroma: "Soft and muted" },
    howToChoose: [
      "If lightness stands out most and dark colors feel heavy, look at Light Summer.",
      "If coolness stands out most and blue-based colors make you glow, look at True Summer.",
      "If softness stands out most and bright colors look loud on you, look at Soft Summer.",
    ],
    faqs: [
      { q: "How do I know if I'm a Summer?", a: "Summers usually look best in cool, gentle colors like dusty rose, soft blue and slate, and are overpowered by orange, gold and very saturated brights. Silver tends to flatter more than gold." },
      { q: "What's the difference between Summer and Winter?", a: "Both are cool. Summer colors are softer and lower in contrast; Winter colors are clearer, darker and higher in contrast." },
    ],
  },
  {
    family: "Autumn",
    slug: "autumn",
    emoji: "🍂",
    tagline: "Warm and soft",
    definition:
      "Autumn coloring is warm and soft. Autumns look their best in rich, earthy, golden-based colors — the palette of turning leaves, spices and forest greens.",
    traits: { undertone: "Warm to neutral-warm", value: "Medium to deep", chroma: "Soft to rich" },
    howToChoose: [
      "If softness stands out most and strong colors feel heavy, look at Soft Autumn.",
      "If warmth stands out most and spicy colors like rust and mustard make you glow, look at True Autumn.",
      "If depth stands out most and you carry dark, rich colors easily, look at Deep Autumn.",
    ],
    faqs: [
      { q: "How do I know if I'm an Autumn?", a: "Autumns usually look best in warm earth tones like olive, rust and camel, and can look washed out in icy pastels or stark black and white. Gold, bronze and copper tend to flatter." },
      { q: "What's the difference between Autumn and Spring?", a: "Both are warm. Autumn colors are softer, deeper and earthier; Spring colors are lighter and clearer." },
    ],
  },
  {
    family: "Winter",
    slug: "winter",
    emoji: "❄️",
    tagline: "Cool and clear",
    definition:
      "Winter coloring is cool and clear, usually with noticeable contrast. Winters look their best in pure, saturated, blue-based colors, plus black and crisp white.",
    traits: { undertone: "Cool to neutral-cool", value: "Medium to deep", chroma: "Clear and vivid" },
    howToChoose: [
      "If depth stands out most and you wear dark colors with ease, look at Deep Winter.",
      "If coolness stands out most and icy shades suit you, look at True Winter.",
      "If clarity stands out most and electric colors make your eyes sparkle, look at Bright Winter.",
    ],
    faqs: [
      { q: "How do I know if I'm a Winter?", a: "Winters usually look sharp in black, crisp white and jewel tones, and tired in muted, earthy or warm golden colors. Silver and platinum tend to flatter." },
      { q: "What's the difference between Winter and Summer?", a: "Both are cool. Winter colors are clearer and higher in contrast; Summer colors are softer and more muted." },
    ],
  },
];

export function getFamily(slug: string) {
  return familyInfo.find((f) => f.slug === slug);
}
