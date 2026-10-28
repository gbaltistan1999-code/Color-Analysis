/**
 * Quiz content and scoring. Each answer nudges three axes:
 *   w  warmth  (-cool  … +warm)
 *   d  depth   (-light … +deep)
 *   c  chroma  (-soft  … +bright/high contrast)
 * The axis with the strongest normalized signal becomes the season's dominant
 * trait, and the other two pick the specific season — the classic 12-season model.
 */

export type Delta = { w?: number; d?: number; c?: number };

export type Visual =
  | { kind: "hair"; colors: [string, string, string] }
  | { kind: "eye"; iris: string; ring: string }
  | { kind: "eyeMix" }
  | { kind: "skin"; tone: string; shade: string }
  | { kind: "tee"; colors: string[] }
  | { kind: "fabric"; colors: string[] }
  | { kind: "outfit"; top: string; layer: string; bottom: string }
  | { kind: "metal"; rings: [string, string][] }
  | { kind: "pair"; colors: [string, string] }
  | { kind: "text"; text: string };

export type Answer = {
  id: string;
  label: string;
  delta: Delta;
  /** Illustration for tile layouts. */
  visual?: Visual;
  /** Optional real photo in /public that replaces the illustration. */
  image?: string;
  /** Single color dot for swatch layouts. */
  swatch?: string;
  /** In multi-select, choosing this clears the others (e.g. "none"). */
  exclusive?: boolean;
};

export type Phase = 1 | 2 | 3;

export type Question = {
  id: string;
  phase: Phase;
  title: string;
  helper?: string;
  select: "single" | "multi";
  layout: "list" | "tiles" | "swatches";
  answers: Answer[];
};

export const phases: Record<Phase, { name: string; done: string; next: string }> = {
  1: {
    name: "Your Coloring",
    done: "Your natural coloring is mapped 🎨",
    next: "Next up: a few quick picks about the colors and moods you're drawn to.",
  },
  2: {
    name: "Style Instincts",
    done: "Your style instincts are in ✨",
    next: "Last stretch: tell us how you shop and wear color today.",
  },
  3: {
    name: "Color Habits",
    done: "All questions answered 🌟",
    next: "Want an extra check? Add a selfie and we'll sample your real skin tone — right on your device.",
  },
};

const GOLD: [string, string] = ["#F6DE8D", "#C9962B"];
const SILVER: [string, string] = ["#F2F3F6", "#9DA3AE"];
const ROSE: [string, string] = ["#F6CDBE", "#B9785F"];

export const questions: Question[] = [
  // ── Phase 1: Your Coloring ────────────────────────────────────────────
  {
    id: "dyed",
    phase: 1,
    title: "Is your hair its natural color right now?",
    helper: "No judgment — we just want to read your natural coloring.",
    select: "single",
    layout: "list",
    answers: [
      { id: "natural", label: "Yes, it's all natural", delta: {} },
      { id: "colored", label: "No, it's currently colored", delta: {} },
      { id: "growing", label: "I'm growing out a color", delta: {} },
    ],
  },
  {
    id: "hair",
    phase: 1,
    title: "Which is closest to your natural hair color?",
    helper: "Think of your roots or your childhood photos if you color it.",
    select: "single",
    layout: "tiles",
    answers: [
      { id: "blonde", label: "Golden blonde", delta: { d: -2, w: 1 }, visual: { kind: "hair", colors: ["#F6DFA4", "#E2BE73", "#B98C45"] } },
      { id: "ash", label: "Ash blonde", delta: { d: -1.5, w: -1, c: -1 }, visual: { kind: "hair", colors: ["#DCD2B8", "#B9AC8F", "#8C8169"] } },
      { id: "lightbrown", label: "Light brown", delta: { d: -0.5, c: -1 }, visual: { kind: "hair", colors: ["#B48A62", "#8E6643", "#654529"] } },
      { id: "mediumbrown", label: "Medium brown", delta: { c: -0.5 }, visual: { kind: "hair", colors: ["#8A6244", "#664429", "#452B19"] } },
      { id: "darkbrown", label: "Dark brown", delta: { d: 1.5 }, visual: { kind: "hair", colors: ["#5A3D2B", "#3D271A", "#24160E"] } },
      { id: "black", label: "Black", delta: { d: 2, c: 1 }, visual: { kind: "hair", colors: ["#3A3633", "#1D1A18", "#0C0B0A"] } },
      { id: "red", label: "Red or auburn", delta: { w: 2 }, visual: { kind: "hair", colors: ["#D9773E", "#B0522A", "#7A3318"] } },
      { id: "gray", label: "Gray or silver", delta: { w: -1, c: -0.5 }, visual: { kind: "hair", colors: ["#E8E8E6", "#BDBDBB", "#8E8E8C"] } },
    ],
  },
  {
    id: "eyes",
    phase: 1,
    title: "What color are your eyes?",
    helper: "Look in a mirror near a window — check the flecks too.",
    select: "single",
    layout: "tiles",
    answers: [
      { id: "blue", label: "Blue", delta: { w: -1, c: 0.5 }, visual: { kind: "eye", iris: "#6E9FCB", ring: "#2F4E73" } },
      { id: "green", label: "Green", delta: { w: 0.5 }, visual: { kind: "eye", iris: "#8FA876", ring: "#3F5536" } },
      { id: "hazel", label: "Hazel", delta: { w: 1, c: -0.5 }, visual: { kind: "eye", iris: "#9C8445", ring: "#4F5A2E" } },
      { id: "amber", label: "Amber or honey", delta: { w: 2 }, visual: { kind: "eye", iris: "#C98A2E", ring: "#6E4413" } },
      { id: "lightbrown", label: "Light brown", delta: { w: 0.5, d: 0.5 }, visual: { kind: "eye", iris: "#9A6A3C", ring: "#4E3018" } },
      { id: "darkbrown", label: "Dark brown", delta: { d: 1.5, c: 0.5 }, visual: { kind: "eye", iris: "#4A2C1A", ring: "#1F120A" } },
      { id: "gray", label: "Gray", delta: { w: -1, c: -1 }, visual: { kind: "eye", iris: "#9AA4AD", ring: "#4D565E" } },
      { id: "mixed", label: "Mixed or other", delta: {}, visual: { kind: "eyeMix" } },
    ],
  },
  {
    id: "skin",
    phase: 1,
    title: "Which skin tone is closest to yours?",
    helper: "Compare with the skin on your inner arm.",
    select: "single",
    layout: "tiles",
    answers: [
      { id: "fair", label: "Fair", delta: { d: -2 }, image: "/images/quiz/skin-fair.jpg", swatch: "#F4DCCB", visual: { kind: "skin", tone: "#F6E1D3", shade: "#E7C5B0" } },
      { id: "light", label: "Light", delta: { d: -1 }, image: "/images/quiz/skin-light.jpg", swatch: "#E8C3A4", visual: { kind: "skin", tone: "#EBC8AE", shade: "#D6AA8C" } },
      { id: "medium", label: "Medium", delta: {}, image: "/images/quiz/skin-medium.jpg", swatch: "#CF9C74", visual: { kind: "skin", tone: "#C99A76", shade: "#AE7D5A" } },
      { id: "tan", label: "Tan", delta: { d: 1 }, image: "/images/quiz/skin-tan.jpg", swatch: "#C88A5A", visual: { kind: "skin", tone: "#A3714F", shade: "#87583A" } },
      { id: "deep", label: "Deep", delta: { d: 2 }, image: "/images/quiz/skin-deep.jpg", swatch: "#8E5A3C", visual: { kind: "skin", tone: "#6B4430", shade: "#523221" } },
      { id: "rich", label: "Rich deep", delta: { d: 2, c: 0.5 }, image: "/images/quiz/skin-rich-deep.jpg", swatch: "#5E3A27", visual: { kind: "skin", tone: "#4A2E21", shade: "#361F16" } },
    ],
  },
  {
    id: "sun",
    phase: 1,
    title: "What happens when your skin meets the sun?",
    helper: "Without sunscreen — though please do wear it 😉",
    select: "single",
    layout: "list",
    answers: [
      { id: "burn", label: "I burn quickly and rarely tan", delta: { w: -1, d: -1 } },
      { id: "both", label: "I burn first, then tan a little", delta: {} },
      { id: "slow", label: "I tan slowly and burn now and then", delta: { w: 0.5 } },
      { id: "golden", label: "I tan easily to a golden glow", delta: { w: 1, d: 1 } },
    ],
  },
  {
    id: "veins",
    phase: 1,
    title: "In daylight, what color are the veins on your inner wrist?",
    select: "single",
    layout: "list",
    answers: [
      { id: "blue", label: "Mostly blue or purple", delta: { w: -2 } },
      { id: "green", label: "Mostly green or olive", delta: { w: 2 } },
      { id: "mix", label: "A mix of both", delta: {} },
    ],
  },
  {
    id: "white",
    phase: 1,
    title: "Which white makes you look more awake?",
    helper: "Picture each one right under your chin.",
    select: "single",
    layout: "tiles",
    answers: [
      { id: "crisp", label: "Crisp bright white", delta: { w: -1, c: 1 }, visual: { kind: "tee", colors: ["#FFFFFF"] } },
      { id: "cream", label: "Soft cream", delta: { w: 1, c: -1 }, visual: { kind: "tee", colors: ["#F3E6CC"] } },
      { id: "both", label: "Both work", delta: {}, visual: { kind: "tee", colors: ["#FFFFFF", "#F3E6CC"] } },
      { id: "unsure", label: "Not sure", delta: {}, visual: { kind: "text", text: "🤔" } },
    ],
  },

  // ── Phase 2: Style Instincts ──────────────────────────────────────────
  {
    id: "metal",
    phase: 2,
    title: "Which jewelry makes your skin glow?",
    select: "single",
    layout: "tiles",
    answers: [
      { id: "gold", label: "Gold", delta: { w: 2 }, visual: { kind: "metal", rings: [GOLD] } },
      { id: "silver", label: "Silver", delta: { w: -2 }, visual: { kind: "metal", rings: [SILVER] } },
      { id: "rose", label: "Rose gold", delta: { w: 0.5, c: -0.5 }, visual: { kind: "metal", rings: [ROSE] } },
      { id: "both", label: "Any of them", delta: {}, visual: { kind: "metal", rings: [GOLD, SILVER] } },
    ],
  },
  {
    id: "mood",
    phase: 2,
    title: "Which outfit mood feels most like you?",
    helper: "Go with your gut — the first one you liked counts.",
    select: "single",
    layout: "tiles",
    answers: [
      { id: "soft", label: "Soft & muted", delta: { c: -2 }, visual: { kind: "outfit", top: "#C9A1A8", layer: "#9CAF94", bottom: "#A7B7C9" } },
      { id: "crisp", label: "Crisp & classic", delta: { c: 1.5, w: -0.5 }, visual: { kind: "outfit", top: "#FFFFFF", layer: "#1D2B4F", bottom: "#1D2B4F" } },
      { id: "earthy", label: "Warm & earthy", delta: { w: 1.5, c: -1 }, visual: { kind: "outfit", top: "#B8582E", layer: "#A68A64", bottom: "#5C5A3A" } },
      { id: "cool", label: "Cool & polished", delta: { w: -1.5 }, visual: { kind: "outfit", top: "#7D93B8", layer: "#9EA3AB", bottom: "#4B5260" } },
    ],
  },
  {
    id: "neutrals",
    phase: 2,
    title: "Which group of neutrals pulls you in?",
    select: "single",
    layout: "tiles",
    answers: [
      { id: "contrast", label: "Bold contrast", delta: { c: 2, d: 1 }, visual: { kind: "fabric", colors: ["#111111", "#F7F7F7", "#1D2B4F"] } },
      { id: "blended", label: "Soft greys", delta: { c: -2, w: -0.5 }, visual: { kind: "fabric", colors: ["#B8B8C0", "#D9D9DE", "#8D939C"] } },
      { id: "light", label: "Light & airy", delta: { d: -1.5 }, visual: { kind: "fabric", colors: ["#F4EEE2", "#D9C3A3", "#2E4A6B"] } },
      { id: "rich", label: "Rich & warm", delta: { w: 1.5, d: 1 }, visual: { kind: "fabric", colors: ["#4A2E21", "#5B5A2E", "#D8B48A"] } },
    ],
  },
  {
    id: "contrast",
    phase: 2,
    title: "How much do your hair, skin and eyes stand apart?",
    helper: "Imagine your face in a black-and-white photo.",
    select: "single",
    layout: "tiles",
    answers: [
      { id: "high", label: "A lot — very striking", delta: { c: 2 }, visual: { kind: "pair", colors: ["#151210", "#F6E1D3"] } },
      { id: "medium", label: "Somewhere in between", delta: {}, visual: { kind: "pair", colors: ["#5A3D2B", "#E2B999"] } },
      { id: "low", label: "Not much — it all blends", delta: { c: -2 }, visual: { kind: "pair", colors: ["#B48A62", "#D9AE8E"] } },
    ],
  },

  // ── Phase 3: Color Habits ─────────────────────────────────────────────
  {
    id: "accents",
    phase: 3,
    title: "Which accent colors would you happily wear?",
    helper: "Pick as many as you like.",
    select: "multi",
    layout: "swatches",
    answers: [
      { id: "red", label: "Red", swatch: "#C8102E", delta: { c: 1 } },
      { id: "coral", label: "Coral", swatch: "#F2705E", delta: { w: 1, c: 0.5 } },
      { id: "pink", label: "Pink", swatch: "#E77FAE", delta: { w: -0.5 } },
      { id: "lavender", label: "Lavender", swatch: "#B9A1DD", delta: { w: -1, d: -1 } },
      { id: "emerald", label: "Emerald", swatch: "#0E8A5F", delta: { c: 1, w: -0.5 } },
      { id: "teal", label: "Teal", swatch: "#1D8C8C", delta: {} },
      { id: "royal", label: "Royal blue", swatch: "#2F5BB5", delta: { w: -1, c: 1 } },
      { id: "mustard", label: "Mustard", swatch: "#D4A017", delta: { w: 1.5, c: -0.5 } },
      { id: "burgundy", label: "Burgundy", swatch: "#7A1F35", delta: { d: 1.5, w: -0.5 } },
      { id: "none", label: "None — I keep it minimal", delta: { c: -1 }, exclusive: true },
    ],
  },
  {
    id: "avoid",
    phase: 3,
    title: "Any colors you usually steer clear of?",
    helper: "Pick all that apply.",
    select: "multi",
    layout: "swatches",
    answers: [
      { id: "orange", label: "Orange", swatch: "#F27D2E", delta: { w: -1 } },
      { id: "yellow", label: "Yellow", swatch: "#F3CF4E", delta: { w: -1 } },
      { id: "pink", label: "Pink", swatch: "#EC8BAA", delta: { w: 0.5 } },
      { id: "purple", label: "Purple", swatch: "#8E5DB8", delta: { w: 0.5 } },
      { id: "green", label: "Green", swatch: "#4E9E68", delta: {} },
      { id: "blue", label: "Blue", swatch: "#3F7FCF", delta: { w: 0.5 } },
      { id: "brown", label: "Brown", swatch: "#7B5136", delta: { w: -1 } },
      { id: "white", label: "White", swatch: "#F7F7F5", delta: { w: 0.5, c: -0.5 } },
      { id: "black", label: "Black", swatch: "#111111", delta: { c: -1, d: -0.5 } },
      { id: "none", label: "I wear them all", delta: {}, exclusive: true },
    ],
  },
  {
    id: "struggle",
    phase: 3,
    title: "What's the trickiest part of choosing colors for you?",
    helper: "We'll add a tip just for this in your results.",
    select: "single",
    layout: "list",
    answers: [
      { id: "tired", label: "Some colors make me look tired", delta: {} },
      { id: "unworn", label: "I buy colorful things but never wear them", delta: {} },
      { id: "black", label: "I end up wearing black all the time", delta: {} },
      { id: "match", label: "I'm not sure what suits my hair and eyes", delta: {} },
      { id: "guide", label: "I just want a simple, clear guide", delta: {} },
    ],
  },
];

export type Selections = Record<string, string | string[]>;
export type Scores = { w: number; d: number; c: number };

const axes = ["w", "d", "c"] as const;

function chosen(q: Question, sel: Selections): Answer[] {
  const v = sel[q.id];
  const ids = Array.isArray(v) ? v : v ? [v] : [];
  return q.answers.filter((a) => ids.includes(a.id));
}

/** Largest possible |contribution| of a question on an axis (multi-selects are averaged). */
function questionMax(q: Question, axis: (typeof axes)[number]) {
  return Math.max(0, ...q.answers.map((a) => Math.abs(a.delta[axis] ?? 0)));
}

/** Normalized scores in [-1, 1] for each axis. */
export function score(sel: Selections): Scores {
  const raw = { w: 0, d: 0, c: 0 };
  const max = { w: 0, d: 0, c: 0 };
  for (const q of questions) {
    const picks = chosen(q, sel);
    for (const axis of axes) {
      max[axis] += questionMax(q, axis);
      if (picks.length) raw[axis] += picks.reduce((s, a) => s + (a.delta[axis] ?? 0), 0) / picks.length;
    }
  }
  return { w: raw.w / (max.w || 1), d: raw.d / (max.d || 1), c: raw.c / (max.c || 1) };
}

/** Blend in a skin sample from a photo: it informs warmth and depth, never chroma. */
export function blendPhoto(scores: Scores, photo: { w: number; d: number } | null, weight = 0.3): Scores {
  if (!photo) return scores;
  return {
    w: scores.w * (1 - weight) + photo.w * weight,
    d: scores.d * (1 - weight) + photo.d * weight,
    c: scores.c,
  };
}

export function seasonFromScores({ w, d, c }: Scores): string {
  const warm = w >= 0;
  const dominant = (
    [
      ["w", Math.abs(w)],
      ["d", Math.abs(d)],
      ["c", Math.abs(c)],
    ] as const
  ).reduce((best, cur) => (cur[1] > best[1] ? cur : best))[0];

  if (dominant === "w") {
    if (warm) return c - d >= 0 ? "warm-spring" : "warm-autumn";
    return c + d >= 0 ? "cool-winter" : "cool-summer";
  }
  if (dominant === "d") {
    if (d >= 0) return warm ? "deep-autumn" : "deep-winter";
    return warm ? "light-spring" : "light-summer";
  }
  if (c >= 0) return warm ? "bright-spring" : "bright-winter";
  return warm ? "soft-autumn" : "soft-summer";
}

export function describe({ w, d, c }: Scores) {
  const undertone = Math.abs(w) < 0.12 ? "Neutral" : w > 0 ? "Warm" : "Cool";
  const depth = d < -0.25 ? "Light" : d > 0.25 ? "Deep" : "Medium";
  const contrast = c < -0.25 ? "Low" : c > 0.25 ? "High" : "Medium";
  return { undertone, depth, contrast };
}

export const struggleTips: Record<string, { title: string; body: (s: { name: string; neutrals: string; top: string[] }) => string }> = {
  tired: {
    title: "Banish the tired look",
    body: (s) => `Keep ${s.top.join(", ")} closest to your face — tops, scarves and lipstick. They're picked to brighten your skin, while off-palette shades can sit lower on your body.`,
  },
  unworn: {
    title: "Buy colors you'll actually wear",
    body: (s) => `Save your ${s.name} palette on your phone and check it before checkout. A color that's in your palette and goes with one of your neutrals is far more likely to leave the closet.`,
  },
  black: {
    title: "Your black alternatives",
    body: (s) => `Try your softer power neutrals instead: ${s.neutrals}. They give the same easy, put-together feel as black without overpowering your coloring.`,
  },
  match: {
    title: "Hair and eyes, sorted",
    body: (s) => `Your ${s.name} palette already accounts for your hair and eye color. For an easy win, echo your eye color with a top or accessory from ${s.top[0]} or ${s.top[1]}.`,
  },
  guide: {
    title: "Your simple starter formula",
    body: (s) => `Pick 3 neutrals (${s.neutrals}) and 2 accent colors (${s.top.slice(0, 2).join(" and ")}). Everything mixes, and you'll always have something that suits you.`,
  },
};

/** Rough perceptual distance between two hex colors (redmean approximation). */
export function colorDistance(a: string, b: string) {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [r1, g1, b1] = p(a);
  const [r2, g2, b2] = p(b);
  const rm = (r1 + r2) / 2;
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt((2 + rm / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rm) / 256) * db * db);
}
