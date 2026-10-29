/**
 * Season-specific copy that can't be generated from palette data: a short definition,
 * how each season differs from the neighbors it's most often confused with, and common
 * misconceptions. Written individually per season to avoid templated, duplicate pages.
 */
export type SeasonDetail = {
  definition: string;
  neighbors: { slug: string; difference: string }[];
  misconceptions: string[];
};

export const seasonDetails: Record<string, SeasonDetail> = {
  "light-spring": {
    definition:
      "Light Spring is the lightest of the warm seasons. Its colors are pale and fresh, with just enough warmth and clarity to look sunny rather than washed out.",
    neighbors: [
      { slug: "light-summer", difference: "Light Summer shares the lightness but leans cool and slightly dusty; Light Spring needs a touch of warmth and clarity." },
      { slug: "true-spring", difference: "True Spring is warmer and more saturated; Light Spring can look overwhelmed by its stronger golds and oranges." },
    ],
    misconceptions: [
      "Being fair doesn't make you a Light Spring — many fair people are Summers or Winters. Light Spring is about low contrast plus gentle warmth.",
      "Light Spring isn't only for blondes; light golden-brown hair with soft features fits too.",
    ],
  },
  "true-spring": {
    definition:
      "True Spring is the warmest Spring. Warmth is the defining trait, carried by clear, cheerful colors with a golden base — think marigold, tomato red and leaf green.",
    neighbors: [
      { slug: "bright-spring", difference: "Bright Spring is defined by clarity and can borrow a little coolness; True Spring is defined by warmth first." },
      { slug: "true-autumn", difference: "True Autumn shares the warmth but its colors are deeper and muted; True Spring's are lighter and clearer." },
    ],
    misconceptions: [
      "Freckles and red hair are common in True Spring but not required — warm golden coloring at any skin depth can belong here.",
      "Warm doesn't mean orange everything; True Springs also wear turquoise and warm aqua beautifully.",
    ],
  },
  "bright-spring": {
    definition:
      "Bright Spring is defined by clarity. Its coloring has sparkle and contrast, so it carries saturated, high-energy colors that would overpower softer seasons.",
    neighbors: [
      { slug: "bright-winter", difference: "Bright Winter is the cool-leaning version; Bright Spring keeps a warm thread, so warm corals and golden yellows still work." },
      { slug: "true-spring", difference: "True Spring is warmer but less vivid; Bright Spring needs more contrast and saturation." },
    ],
    misconceptions: [
      "Bright doesn't mean neon everywhere — one clear, saturated color paired with a crisp neutral reads best.",
      "Bright Springs can wear black in small doses, especially paired with a bright color near the face.",
    ],
  },
  "light-summer": {
    definition:
      "Light Summer is the lightest of the cool seasons. Its palette is airy and powdery — pastels with a whisper of grey that look calm rather than sugary.",
    neighbors: [
      { slug: "light-spring", difference: "Light Spring shares the lightness but leans warm and clear; Light Summer's colors are cooler and slightly softer." },
      { slug: "true-summer", difference: "True Summer is cooler and a little deeper; Light Summer is defined by lightness first." },
    ],
    misconceptions: [
      "Light Summer isn't just 'baby pink and baby blue' — soft lilac, seafoam and dove grey are just as central.",
      "Ash blonde hair is common but not essential; light ash-brown hair with soft, cool coloring fits too.",
    ],
  },
  "true-summer": {
    definition:
      "True Summer is the coolest Summer. Coolness defines it: blue-based colors with a soft, elegant finish — never loud, always cool.",
    neighbors: [
      { slug: "soft-summer", difference: "Soft Summer is more muted and closer to neutral; True Summer is cooler and can take slightly clearer colors." },
      { slug: "light-summer", difference: "Light Summer is lighter; True Summer handles mid-tones like ocean blue, raspberry and plum." },
    ],
    misconceptions: [
      "Cool doesn't mean icy — True Summer's blues and pinks have softness that pure Winter colors lack.",
      "True Summers aren't limited to pastels; medium-depth colors like raspberry and slate are core to the palette.",
    ],
  },
  "soft-summer": {
    definition:
      "Soft Summer is defined by low chroma. Its colors are gentle and greyed, which harmonizes with features that blend softly rather than stand apart.",
    neighbors: [
      { slug: "soft-autumn", difference: "Soft Autumn is equally muted but leans warm; Soft Summer leans cool. Compare camel against soft grey near your face." },
      { slug: "true-summer", difference: "True Summer is cooler and slightly clearer; Soft Summer needs the dustiest versions of each color." },
    ],
    misconceptions: [
      "Muted isn't dull — on a Soft Summer, dusty rose and sage look sophisticated, while brights look loud.",
      "Early greying hair is common in Soft Summer, and it usually suits the palette rather than fighting it.",
    ],
  },
  "soft-autumn": {
    definition:
      "Soft Autumn is the gentlest Autumn. Its palette is warm and earthy but softened, like a misty forest in early fall.",
    neighbors: [
      { slug: "soft-summer", difference: "Soft Summer shares the softness but leans cool; Soft Autumn needs a golden thread in each color." },
      { slug: "true-autumn", difference: "True Autumn is warmer and richer; Soft Autumn can look heavy in its strongest rusts and pumpkins." },
    ],
    misconceptions: [
      "Soft Autumn isn't 'beige everything' — olive, salmon and warm teal bring real color.",
      "Low contrast doesn't mean light skin; Soft Autumns span light to deep skin with blended features.",
    ],
  },
  "true-autumn": {
    definition:
      "True Autumn is the warmest Autumn. Warmth leads, carried by rich, spicy colors with a strong golden base — pumpkin, mustard, forest green.",
    neighbors: [
      { slug: "deep-autumn", difference: "Deep Autumn is darker and handles espresso and burgundy; True Autumn is defined by warmth more than depth." },
      { slug: "soft-autumn", difference: "Soft Autumn is more muted; True Autumn needs richer, more saturated earth tones." },
    ],
    misconceptions: [
      "Red hair isn't required — warm golden-brown, chestnut and dark hair with golden skin can all be True Autumn.",
      "True Autumns can wear blue; it just needs warmth, like teal or warm navy.",
    ],
  },
  "deep-autumn": {
    definition:
      "Deep Autumn is defined by depth with a warm lean. It carries rich, dark, warm colors — espresso, deep teal, burgundy — with ease.",
    neighbors: [
      { slug: "deep-winter", difference: "Deep Winter is the cool-leaning deep season; Deep Autumn prefers espresso to black and ivory to crisp white." },
      { slug: "true-autumn", difference: "True Autumn is warmer and lighter overall; Deep Autumn needs more depth in its colors." },
    ],
    misconceptions: [
      "Deep doesn't refer to skin alone — depth comes from hair, eyes and skin together, and Deep Autumns span many skin tones.",
      "Deep Autumns aren't limited to brown; jewel tones with a warm base, like aubergine and deep teal, are core colors.",
    ],
  },
  "deep-winter": {
    definition:
      "Deep Winter is defined by depth with a cool lean. Its coloring is strong, balanced by black, jewel tones and crisp white.",
    neighbors: [
      { slug: "deep-autumn", difference: "Deep Autumn shares the depth but leans warm and earthy; Deep Winter suits true black and cool reds." },
      { slug: "true-winter", difference: "True Winter is cooler and can be lighter in depth; Deep Winter needs darker, richer colors." },
    ],
    misconceptions: [
      "Dark hair alone doesn't make you a Deep Winter — the overall coloring must also lean cool and carry contrast.",
      "Deep Winters can wear lighter colors when they're icy and clear, not pastel and dusty.",
    ],
  },
  "true-winter": {
    definition:
      "True Winter (also called Cool Winter) is the coolest Winter. Coolness defines it, with pure, blue-based colors and crisp contrast.",
    neighbors: [
      { slug: "bright-winter", difference: "Bright Winter is defined by clarity and is the most vivid season; True Winter is defined by coolness and suits icy shades." },
      { slug: "true-summer", difference: "True Summer shares the coolness but is softer and lower in contrast; True Winter needs sharper, purer colors." },
    ],
    misconceptions: [
      "True Winter isn't only porcelain skin and black hair — cool, high-contrast coloring appears at every skin depth.",
      "You don't have to wear black every day; icy blues, pine green and magenta are just as central.",
    ],
  },
  "bright-winter": {
    definition:
      "Bright Winter is defined by clarity with a cool lean. It handles the most vivid colors of all 12 seasons, alongside stark black and white.",
    neighbors: [
      { slug: "true-winter", difference: "True Winter is cooler and icier; Bright Winter needs maximum saturation and clarity." },
      { slug: "bright-spring", difference: "Bright Spring is the warm-leaning bright season; Bright Winter prefers cool fuchsia and electric blue to coral and gold." },
    ],
    misconceptions: [
      "Bright doesn't mean you must dress loudly — a single electric accent with black or white is classic Bright Winter.",
      "Bright Winters are often recognized by unusually clear eyes, not by hair or skin alone.",
    ],
  },
};
