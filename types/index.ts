/** Shared types for season content, quiz data and scoring. */

export type Swatch = { name: string; hex: string };

export type Family = "Spring" | "Summer" | "Autumn" | "Winter";

export type Season = {
  slug: string;
  name: string;
  family: Family;
  emoji: string;
  tagline: string;
  description: string;
  undertone: "Warm" | "Cool" | "Neutral-warm" | "Neutral-cool";
  depth: "Light" | "Medium" | "Deep" | "Light to medium" | "Medium to deep";
  contrast: "Low" | "Medium" | "High";
  palette: Swatch[];
  avoid: Swatch[];
  metals: string;
  neutrals: string;
  makeup: string[];
  style: string[];
};


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

export type Selections = Record<string, string | string[]>;

/** Normalized axis scores in [-1, 1]: w = warmth, d = depth (value), c = chroma/contrast. */
export type Scores = { w: number; d: number; c: number };

export type StruggleTip = {
  title: string;
  body: (s: { name: string; neutrals: string; top: string[] }) => string;
};
