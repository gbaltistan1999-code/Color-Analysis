/**
 * Unit tests for the pure scoring module. Run with `npm test`
 * (Node's built-in test runner with TypeScript type stripping — no extra packages).
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { questions } from "../data/quiz-questions.ts";
import { seasons } from "../data/seasons.ts";
import { blendPhoto, classify, describe as describeTraits, explain, score } from "../lib/quiz-scoring.ts";
import { archetypes } from "./fixtures.ts";

describe("score()", () => {
  it("returns zeros when nothing is answered", () => {
    assert.deepEqual(score({}, questions), { w: 0, d: 0, c: 0 });
  });

  it("keeps every axis within [-1, 1] for all 12 archetypes", () => {
    for (const sel of Object.values(archetypes)) {
      for (const v of Object.values(score(sel, questions))) assert.ok(v >= -1 && v <= 1, `out of range: ${v}`);
    }
  });

  it("averages multi-select answers so picking more colors doesn't count more", () => {
    const one = score({ accents: ["red"] }, questions);
    const two = score({ accents: ["red", "red"] }, questions);
    assert.deepEqual(one, two);
  });

  it("ignores unknown question ids and answer ids", () => {
    assert.deepEqual(score({ nope: "x", hair: "not-a-real-answer" }, questions), { w: 0, d: 0, c: 0 });
  });
});

describe("classify()", () => {
  it("has an archetype for every season", () => {
    assert.deepEqual(Object.keys(archetypes).sort(), seasons.map((s) => s.slug).sort());
  });

  for (const [expected, sel] of Object.entries(archetypes)) {
    it(`maps the ${expected} archetype to ${expected}`, () => {
      assert.equal(classify(score(sel, questions)).season, expected);
    });
  }

  it("reports high confidence and no runner-up for a clear-cut result", () => {
    const r = classify({ w: -0.4, d: 0.05, c: -0.9 });
    assert.equal(r.season, "soft-summer");
    assert.equal(r.confidence, "high");
    assert.equal(r.runnerUp, null);
  });

  it("offers a runner-up when warm vs cool is a coin flip", () => {
    const r = classify({ w: 0.02, d: 0.1, c: -0.8 });
    assert.equal(r.season, "soft-autumn");
    assert.equal(r.confidence, "low");
    assert.equal(r.runnerUp, "soft-summer");
  });

  it("offers a runner-up when two traits are nearly tied", () => {
    const r = classify({ w: -0.2, d: -0.5, c: -0.48 });
    assert.equal(r.season, "light-summer");
    assert.notEqual(r.confidence, "high");
    assert.equal(r.runnerUp, "soft-summer");
  });

  it("never names the same season as its own runner-up", () => {
    for (const sel of Object.values(archetypes)) {
      const r = classify(score(sel, questions));
      assert.notEqual(r.runnerUp, r.season);
    }
  });

  it("can reach all 12 seasons", () => {
    const reached = new Set<string>();
    for (let w = -1; w <= 1; w += 0.1)
      for (let d = -1; d <= 1; d += 0.1) for (let c = -1; c <= 1; c += 0.1) reached.add(classify({ w, d, c }).season);
    assert.equal(reached.size, 12);
  });
});

describe("blendPhoto()", () => {
  it("returns the quiz scores unchanged without a photo", () => {
    const s = { w: 0.4, d: -0.2, c: 0.1 };
    assert.deepEqual(blendPhoto(s, null), s);
  });

  it("blends the photo in at 30% and leaves chroma alone unless contrast was sampled", () => {
    const out = blendPhoto({ w: 1, d: 0, c: 0.5 }, { w: 0, d: 1 });
    assert.ok(Math.abs(out.w - 0.7) < 1e-9);
    assert.ok(Math.abs(out.d - 0.3) < 1e-9);
    assert.equal(out.c, 0.5);
  });
});

describe("describe() and explain()", () => {
  it("labels near-zero warmth as a neutral undertone", () => {
    assert.equal(describeTraits({ w: 0.05, d: 0, c: 0 }).undertone, "Neutral");
  });

  it("mentions the season name and the dominant trait", () => {
    const text = explain({ w: 0.1, d: 0, c: -0.8 }, "Soft Autumn", "c");
    assert.match(text, /Soft Autumn/);
    assert.match(text, /softness/);
  });
});
