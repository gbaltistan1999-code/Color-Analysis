/**
 * Pure quiz scoring — no React, no imports beyond types, so it can be unit-tested
 * directly (see tests/quiz-scoring.test.ts).
 *
 * Each answer nudges three axes:
 *   w  warmth  (-cool  … +warm)          → undertone
 *   d  depth   (-light … +deep)          → value
 *   c  chroma  (-soft  … +bright/contrast) → chroma and contrast
 *
 * The 12-season model picks the axis with the strongest signal as the season's
 * dominant trait (e.g. "Soft" = low chroma), then uses temperature and the
 * remaining axes to choose the exact season.
 */
import type { Answer, Question, Scores, Selections } from "../types/index.ts";

const AXES = ["w", "d", "c"] as const;
type Axis = (typeof AXES)[number];

function chosen(q: Question, sel: Selections): Answer[] {
  const v = sel[q.id];
  const ids = Array.isArray(v) ? v : v ? [v] : [];
  return q.answers.filter((a) => ids.includes(a.id));
}

/** Largest possible |contribution| of a question on an axis. */
function questionMax(q: Question, axis: Axis) {
  return Math.max(0, ...q.answers.map((a) => Math.abs(a.delta[axis] ?? 0)));
}

/** Normalized scores in [-1, 1]. Multi-select answers are averaged so picking more doesn't count more. */
export function score(sel: Selections, questions: Question[]): Scores {
  const raw = { w: 0, d: 0, c: 0 };
  const max = { w: 0, d: 0, c: 0 };
  for (const q of questions) {
    const picks = chosen(q, sel);
    for (const axis of AXES) {
      max[axis] += questionMax(q, axis);
      if (picks.length) raw[axis] += picks.reduce((s, a) => s + (a.delta[axis] ?? 0), 0) / picks.length;
    }
  }
  return { w: raw.w / (max.w || 1), d: raw.d / (max.d || 1), c: raw.c / (max.c || 1) };
}

export type PhotoSignal = { w: number; d: number; c?: number };

/**
 * Blend in readings from the optional photo check. The photo informs warmth and depth
 * (and contrast if hair/eyes were sampled) but only at 30%, because lighting and
 * cameras distort color.
 */
export function blendPhoto(scores: Scores, photo: PhotoSignal | null, weight = 0.3): Scores {
  if (!photo) return scores;
  const mix = (a: number, b: number) => a * (1 - weight) + b * weight;
  return { w: mix(scores.w, photo.w), d: mix(scores.d, photo.d), c: photo.c === undefined ? scores.c : mix(scores.c, photo.c) };
}

type Decision = { dominant: Axis; warm: boolean; tie: boolean };

function seasonFor({ dominant, warm, tie }: Decision, { d, c }: Scores): string {
  if (dominant === "w") {
    // tie = true means "brighter/lighter side"
    if (warm) return tie ? "true-spring" : "true-autumn";
    return tie ? "true-winter" : "true-summer";
  }
  if (dominant === "d") {
    if (d >= 0) return warm ? "deep-autumn" : "deep-winter";
    return warm ? "light-spring" : "light-summer";
  }
  if (c >= 0) return warm ? "bright-spring" : "bright-winter";
  return warm ? "soft-autumn" : "soft-summer";
}

export type Confidence = "high" | "medium" | "low";

export type Classification = {
  season: string;
  /** Next most likely season when the result is not clear-cut. */
  runnerUp: string | null;
  confidence: Confidence;
  dominant: Axis;
};

/**
 * Classify scores into one of 12 seasons. The three decisions (dominant trait,
 * warm vs cool, and the tie-breaker within a temperature family) each have a margin;
 * the smallest margin sets the confidence, and flipping that decision gives the runner-up.
 */
/**
 * Far more questions touch temperature (veins, metal, white, outfit mood, glow color, sun)
 * than lightness or softness, so the normalized warmth score runs high. Weighting it
 * down when picking the dominant trait keeps genuinely light or soft people from being
 * pushed into the "True" seasons. Calibrated against tests/fixtures.ts.
 */
const WARMTH_DOMINANCE_WEIGHT = 0.7;

export function classify(scores: Scores): Classification {
  const { w, d, c } = scores;
  const ranked = (
    [
      ["w", Math.abs(w) * WARMTH_DOMINANCE_WEIGHT],
      ["d", Math.abs(d)],
      ["c", Math.abs(c)],
    ] as [Axis, number][]
  ).sort((a, b) => b[1] - a[1]);

  const warm = w >= 0;
  const tieValue = warm ? c - d : c + d;
  const decision: Decision = { dominant: ranked[0][0], warm, tie: tieValue >= 0 };
  const season = seasonFor(decision, scores);

  const margins: { kind: "dominant" | "temperature" | "tie"; value: number }[] = [
    { kind: "dominant", value: ranked[0][1] - ranked[1][1] },
    { kind: "temperature", value: Math.abs(w) },
  ];
  if (decision.dominant === "w") margins.push({ kind: "tie", value: Math.abs(tieValue) / 2 });
  const weakest = margins.reduce((a, b) => (b.value < a.value ? b : a));

  const flipped: Decision =
    weakest.kind === "dominant"
      ? { ...decision, dominant: ranked[1][0] }
      : weakest.kind === "temperature"
        ? { ...decision, warm: !warm }
        : { ...decision, tie: !decision.tie };
  let alt = seasonFor(flipped, scores);
  // Flipping the dominant axis to "w" needs the warm/cool tie-breaker; recompute it for that case.
  if (flipped.dominant === "w" && weakest.kind === "dominant") alt = seasonFor({ ...flipped, tie: tieValue >= 0 }, scores);

  const confidence: Confidence = weakest.value >= 0.15 ? "high" : weakest.value >= 0.06 ? "medium" : "low";
  return { season, runnerUp: confidence === "high" || alt === season ? null : alt, confidence, dominant: decision.dominant };
}

/** Kept for callers that only need the season slug. */
export function seasonFromScores(scores: Scores): string {
  return classify(scores).season;
}

export function describe({ w, d, c }: Scores) {
  const undertone = Math.abs(w) < 0.12 ? "Neutral" : w > 0 ? "Warm" : "Cool";
  const depth = d < -0.25 ? "Light" : d > 0.25 ? "Deep" : "Medium";
  const contrast = c < -0.25 ? "Low" : c > 0.25 ? "High" : "Medium";
  return { undertone, depth, contrast };
}

const dominantWords: Record<Axis, (s: Scores) => string> = {
  w: (s) => (s.w >= 0 ? "warmth" : "coolness"),
  d: (s) => (s.d >= 0 ? "depth" : "lightness"),
  c: (s) => (s.c >= 0 ? "brightness and contrast" : "softness"),
};

/** One-sentence "why you got this result" explanation. */
export function explain(scores: Scores, seasonName: string, dominant: Axis): string {
  const t = describe(scores);
  return `Your answers point to a ${t.undertone.toLowerCase()} undertone, ${t.depth.toLowerCase()} depth and ${t.contrast.toLowerCase()} contrast. Your strongest trait is ${dominantWords[dominant](scores)} — the hallmark of ${seasonName}.`;
}
