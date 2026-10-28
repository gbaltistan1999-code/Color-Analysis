/**
 * Quiz scoring. Each answer nudges three axes:
 *   warmth  (-cool  … +warm)
 *   depth   (-light … +deep)
 *   chroma  (-soft  … +bright/high contrast)
 * The axis with the strongest normalized signal becomes the season's dominant
 * trait, and the other two pick the specific season — the classic 12-season model.
 */

export type Delta = { w?: number; d?: number; c?: number };

export type Answer = {
  id: string;
  label: string;
  hint?: string;
  swatches?: string[];
  delta: Delta;
};

export type Question = {
  id: string;
  title: string;
  helper: string;
  answers: Answer[];
};

export const questions: Question[] = [
  {
    id: "veins",
    title: "What color do the veins on your inner wrist look in daylight?",
    helper: "Look near a window — artificial light can fool you.",
    answers: [
      { id: "green", label: "Greenish or olive", swatches: ["#6B8E4E", "#8A9A5B"], delta: { w: 2 } },
      { id: "blue", label: "Blue or purple", swatches: ["#4A6FA5", "#7B5EA7"], delta: { w: -2 } },
      { id: "mix", label: "A mix — hard to tell", swatches: ["#6B8E4E", "#4A6FA5"], delta: {} },
    ],
  },
  {
    id: "jewelry",
    title: "Which jewelry makes your skin look its best?",
    helper: "Think about which one makes you look glowy, not which you like more.",
    answers: [
      { id: "gold", label: "Gold", swatches: ["#D4AF37", "#F3D27A"], delta: { w: 2 } },
      { id: "silver", label: "Silver", swatches: ["#C0C0C8", "#E6E8EE"], delta: { w: -2 } },
      { id: "both", label: "Both look good", swatches: ["#D4AF37", "#C0C0C8"], delta: {} },
    ],
  },
  {
    id: "white",
    title: "Pure white or creamy ivory — which flatters you more?",
    helper: "Hold each near your face if you can.",
    answers: [
      { id: "white", label: "Crisp pure white", swatches: ["#FFFFFF"], delta: { w: -1, c: 1 } },
      { id: "ivory", label: "Soft ivory or cream", swatches: ["#FFF1D6"], delta: { w: 1, c: -1 } },
      { id: "either", label: "Not sure / both", swatches: ["#FFFFFF", "#FFF1D6"], delta: {} },
    ],
  },
  {
    id: "skin",
    title: "How would you describe your skin depth?",
    helper: "Pick the closest match — there's no wrong answer.",
    answers: [
      { id: "fair", label: "Fair", swatches: ["#F6E1D3"], delta: { d: -2 } },
      { id: "light", label: "Light", swatches: ["#EBC8AE"], delta: { d: -1 } },
      { id: "medium", label: "Medium", swatches: ["#C99A76"], delta: {} },
      { id: "tan", label: "Tan", swatches: ["#A3714F"], delta: { d: 1 } },
      { id: "deep", label: "Deep", swatches: ["#6B4430"], delta: { d: 2 } },
    ],
  },
  {
    id: "hair",
    title: "What's your natural hair color (or what was it)?",
    helper: "Go with your roots, not your latest dye job!",
    answers: [
      { id: "blonde", label: "Light or golden blonde", swatches: ["#E8C97A"], delta: { d: -2, w: 0.5 } },
      { id: "ash", label: "Ash blonde or light brown", swatches: ["#B5A48A"], delta: { d: -1, w: -0.5, c: -1 } },
      { id: "red", label: "Red, copper or auburn", swatches: ["#A8452A"], delta: { w: 2 } },
      { id: "brown", label: "Medium to dark brown", swatches: ["#5A3B26"], delta: { d: 1 } },
      { id: "black", label: "Black or near-black", swatches: ["#1B1612"], delta: { d: 2, c: 1 } },
    ],
  },
  {
    id: "eyes",
    title: "Which best describes your eyes?",
    helper: "Look closely at the flecks and the ring around the iris.",
    answers: [
      { id: "blue", label: "Icy blue or grey", swatches: ["#8FB3D9", "#A3ADB8"], delta: { w: -1, d: -1 } },
      { id: "softblue", label: "Soft blue-green or grey-green", swatches: ["#8AA59A"], delta: { c: -1 } },
      { id: "hazel", label: "Hazel, green or golden", swatches: ["#8A7A3A", "#5E8A4B"], delta: { w: 1 } },
      { id: "brown", label: "Warm brown", swatches: ["#7A4A26"], delta: { w: 0.5, d: 1 } },
      { id: "dark", label: "Very dark brown or black", swatches: ["#2B1A12"], delta: { d: 2, c: 1 } },
    ],
  },
  {
    id: "contrast",
    title: "How much contrast is there between your hair, skin and eyes?",
    helper: "Imagine a black-and-white photo of your face.",
    answers: [
      { id: "high", label: "High — they really stand apart", swatches: ["#111111", "#F6E1D3"], delta: { c: 2 } },
      { id: "medium", label: "Medium", swatches: ["#5A3B26", "#EBC8AE"], delta: {} },
      { id: "low", label: "Low — everything blends softly", swatches: ["#B5A48A", "#EBC8AE"], delta: { c: -2 } },
    ],
  },
  {
    id: "compliments",
    title: "Which colors earn you the most compliments?",
    helper: "Think of the outfit people always say you look great in.",
    answers: [
      { id: "bright", label: "Bright and bold", swatches: ["#FF1F8E", "#0066FF", "#00A86B"], delta: { c: 2 } },
      { id: "soft", label: "Soft and dusty", swatches: ["#C9A1A8", "#9CAF94", "#7D93A8"], delta: { c: -2 } },
      { id: "deep", label: "Deep and rich", swatches: ["#6E1F2B", "#1F5C5A", "#3B2416"], delta: { d: 1 } },
      { id: "pastel", label: "Light and pastel", swatches: ["#A7C7E7", "#F4A7B9", "#FFE17A"], delta: { d: -1 } },
    ],
  },
  {
    id: "sun",
    title: "How does your skin react to the sun?",
    helper: "Without sunscreen — but please wear sunscreen 😉",
    answers: [
      { id: "burn", label: "Burns easily, rarely tans", delta: { w: -1, d: -1 } },
      { id: "both", label: "Burns first, then tans", delta: {} },
      { id: "golden", label: "Tans easily to a golden glow", delta: { w: 1, d: 0.5 } },
      { id: "deep", label: "Rarely burns, deepens easily", delta: { d: 1 } },
    ],
  },
];

export type Scores = { w: number; d: number; c: number };

function maxRange(axis: keyof Delta) {
  return questions.reduce((sum, q) => {
    const vals = q.answers.map((a) => Math.abs(a.delta[axis] ?? 0));
    return sum + Math.max(0, ...vals);
  }, 0);
}

/** Normalized scores in [-1, 1] for each axis. */
export function score(selected: Record<string, string>): Scores {
  const raw = { w: 0, d: 0, c: 0 };
  for (const q of questions) {
    const a = q.answers.find((x) => x.id === selected[q.id]);
    if (!a) continue;
    raw.w += a.delta.w ?? 0;
    raw.d += a.delta.d ?? 0;
    raw.c += a.delta.c ?? 0;
  }
  return {
    w: raw.w / (maxRange("w") || 1),
    d: raw.d / (maxRange("d") || 1),
    c: raw.c / (maxRange("c") || 1),
  };
}

export function seasonFromScores({ w, d, c }: Scores): string {
  const warm = w >= 0;
  const dominant = [
    ["w", Math.abs(w)],
    ["d", Math.abs(d)],
    ["c", Math.abs(c)],
  ].sort((a, b) => (b[1] as number) - (a[1] as number))[0][0];

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
  const undertone = Math.abs(w) < 0.15 ? "Neutral" : w > 0 ? "Warm" : "Cool";
  const depth = d < -0.25 ? "Light" : d > 0.25 ? "Deep" : "Medium";
  const contrast = c < -0.25 ? "Low" : c > 0.25 ? "High" : "Medium";
  return { undertone, depth, contrast };
}
