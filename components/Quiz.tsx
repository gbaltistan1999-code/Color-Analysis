"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  blendPhoto,
  colorDistance,
  describe,
  phases,
  questions,
  score,
  seasonFromScores,
  struggleTips,
  type Phase,
  type Question,
  type Selections,
} from "@/lib/quiz";
import { familyExtras, getSeason, seasonPhoto, type Family, type Season } from "@/lib/seasons";
import { IconArrow, IconCheck, IconCopy } from "./Icons";
import PhotoStep, { type PhotoReading } from "./PhotoStep";
import QuizVisual from "./QuizVisuals";
import SeasonWheel from "./SeasonWheel";

type Step =
  | { t: "intro" }
  | { t: "reveal" }
  | { t: "question"; q: Question }
  | { t: "milestone"; phase: Phase }
  | { t: "photo" }
  | { t: "analyzing" }
  | { t: "result" };

const steps: Step[] = [
  { t: "intro" },
  { t: "reveal" },
  ...([1, 2, 3] as Phase[]).flatMap((phase): Step[] => [
    ...questions.filter((q) => q.phase === phase).map((q): Step => ({ t: "question", q })),
    { t: "milestone", phase },
  ]),
  { t: "photo" },
  { t: "analyzing" },
  { t: "result" },
];

const STORAGE_KEY = "huemuse-quiz";
const answeredBefore = (i: number) => steps.slice(0, i).filter((s) => s.t === "question").length;

function phaseOf(step: Step): string {
  if (step.t === "question") return phases[step.q.phase].name;
  if (step.t === "milestone") return phases[step.phase].name;
  if (step.t === "photo") return "Photo check";
  if (step.t === "reveal") return "Before we start";
  return "Your results";
}

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Selections>({});
  const [photo, setPhoto] = useState<PhotoReading | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);
  const step = steps[index];

  // Restore progress after a refresh (answers only — never the photo).
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved && typeof saved.index === "number") {
        setAnswers(saved.answers ?? {});
        setIndex(Math.min(saved.index, steps.findIndex((s) => s.t === "photo")));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ index, answers }));
    } catch {}
  }, [index, answers]);

  // Move focus and scroll to the new screen, but not on first load.
  useEffect(() => {
    if (!moved.current) return;
    const root = rootRef.current;
    root?.querySelector<HTMLElement>("h1, h2")?.focus();
    if (root && root.getBoundingClientRect().top < 0) root.scrollIntoView({ block: "start" });
  }, [index]);

  const go = useCallback((i: number) => {
    moved.current = true;
    setIndex(Math.max(0, Math.min(steps.length - 1, i)));
  }, []);
  const next = useCallback(() => go(index + 1), [go, index]);

  const restart = () => {
    setAnswers({});
    setPhoto(null);
    go(0);
  };

  const total = questions.length;
  const progress = Math.round((answeredBefore(index) / total) * 100);
  const showHeader = step.t !== "intro" && step.t !== "analyzing" && step.t !== "result";

  return (
    <div ref={rootRef} className="mx-auto w-full max-w-2xl scroll-mt-20">
      {showHeader && (
        <div className="mb-5">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-xl text-ink shadow-sm hover:text-primary"
              aria-label="Go back"
            >
              ←
            </button>
            <p className="font-display font-semibold text-ink">{phaseOf(step)}</p>
            <span className="w-10 text-right text-sm font-semibold text-muted">{progress}%</span>
          </div>
          <div
            className="mt-3 h-2.5 overflow-hidden rounded-full bg-primary-soft"
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{ width: `${Math.max(progress, 3)}%`, background: "linear-gradient(90deg,#7C3AED,#EC4899,#FB923C)" }}
            />
          </div>
        </div>
      )}

      {step.t === "intro" && <Intro onStart={next} />}
      {step.t === "reveal" && <Reveal onNext={next} />}
      {step.t === "question" && (
        <QuestionScreen
          key={step.q.id}
          q={step.q}
          value={answers[step.q.id]}
          onChange={(v) => setAnswers((a) => ({ ...a, [step.q.id]: v }))}
          onNext={next}
        />
      )}
      {step.t === "milestone" && (
        <Milestone
          phase={step.phase}
          percent={progress}
          onNext={next}
          onSkipPhoto={() => go(steps.findIndex((s) => s.t === "analyzing"))}
        />
      )}
      {step.t === "photo" && (
        <PhotoStep
          onDone={(r) => {
            setPhoto(r);
            next();
          }}
        />
      )}
      {step.t === "analyzing" && <Analyzing onDone={next} />}
      {step.t === "result" && <Result answers={answers} photo={photo} onRestart={restart} />}
    </div>
  );
}

/* ── Screens ─────────────────────────────────────────────────────────── */

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="card animate-reveal p-6 text-center sm:p-10">
      <span className="eyebrow">🎨 Free · about 3 minutes · no signup</span>
      <h1 tabIndex={-1} className="mt-5 text-3xl font-extrabold outline-none sm:text-4xl">
        Let&apos;s find your color season
      </h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        Answer a few easy questions about your natural coloring and style, and we&apos;ll match you to one of 12 seasons
        — with a palette made for you.
      </p>
      <div className="mt-6 flex justify-center">
        <SeasonWheel size={240} />
      </div>
      <button type="button" onClick={onStart} className="btn-primary mt-8 w-full !py-4 text-lg sm:w-auto sm:!px-12">
        Start the quiz <IconArrow className="h-5 w-5" />
      </button>
    </div>
  );
}

const revealItems = [
  "Your season and palette direction",
  "The best colors to wear near your face",
  "Your go-to neutrals and accent colors",
  "Makeup shades that flatter you",
  "Hair colors that harmonize with you",
  "Jewelry and sunglasses tones",
];

function Reveal({ onNext }: { onNext: () => void }) {
  return (
    <div className="card animate-reveal overflow-hidden">
      <div className="relative h-40 sm:h-48">
        <Image src="/images/hero.jpg" alt="" fill sizes="672px" className="object-cover object-[70%_35%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-6 sm:p-8">
        <h2 tabIndex={-1} className="text-2xl font-bold outline-none sm:text-3xl">
          Here&apos;s what you&apos;ll unlock ✨
        </h2>
        <ul className="mt-5 space-y-2.5">
          {revealItems.map((item) => (
            <li key={item} className="flex items-center gap-3 rounded-2xl bg-surface-2 px-4 py-3 font-semibold">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-white">
                <IconCheck className="h-4 w-4" />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <button type="button" onClick={onNext} className="btn-primary mt-6 w-full !py-4 text-lg">
          Let&apos;s go
        </button>
      </div>
    </div>
  );
}

function QuestionScreen({
  q,
  value,
  onChange,
  onNext,
}: {
  q: Question;
  value: string | string[] | undefined;
  onChange: (v: string | string[]) => void;
  onNext: () => void;
}) {
  const multi = q.select === "multi";
  const selected = Array.isArray(value) ? value : value ? [value] : [];

  const pick = (id: string) => {
    if (!multi) {
      onChange(id);
      window.setTimeout(onNext, 260);
      return;
    }
    const answer = q.answers.find((a) => a.id === id)!;
    if (answer.exclusive) return onChange(selected.includes(id) ? [] : [id]);
    const without = selected.filter((s) => !q.answers.find((a) => a.id === s)?.exclusive);
    onChange(without.includes(id) ? without.filter((s) => s !== id) : [...without, id]);
  };

  const cols = q.layout === "list" ? "" : q.answers.length > 4 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2";

  return (
    <div className="card animate-reveal p-5 sm:p-8">
      <h2 tabIndex={-1} className="text-2xl font-bold leading-snug outline-none sm:text-3xl">
        {q.title}
      </h2>
      {q.helper && <p className="mt-2 text-muted">{q.helper}</p>}

      <fieldset className="mt-6">
        <legend className="sr-only">{q.title}</legend>
        <div className={`grid gap-3 ${cols}`}>
          {q.answers.map((a) => {
            const on = selected.includes(a.id);
            if (q.layout === "tiles") {
              return (
                <button
                  key={a.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => pick(a.id)}
                  className={`group relative overflow-hidden rounded-2xl text-left transition hover:-translate-y-0.5 ${
                    on ? "ring-4 ring-[#7C3AED]" : "ring-1 ring-line hover:ring-2 hover:ring-[#7C3AED]"
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                    {a.image ? (
                      <Image src={a.image} alt="" fill sizes="(min-width: 640px) 220px, 50vw" className="object-cover object-top" />
                    ) : (
                      a.visual && <QuizVisual visual={a.visual} />
                    )}
                  </div>
                  <span className="flex items-center gap-2.5 bg-[#1e1433] px-3 py-2.5 text-sm font-semibold text-white">
                    {a.swatch && (
                      <span className="h-6 w-6 shrink-0 rounded-full ring-2 ring-white/70" style={{ background: a.swatch }} aria-hidden="true" />
                    )}
                    {a.label}
                  </span>
                  {on && (
                    <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#7C3AED] text-white shadow">
                      <IconCheck className="h-4 w-4" />
                    </span>
                  )}
                </button>
              );
            }
            return (
              <button
                key={a.id}
                type="button"
                aria-pressed={on}
                onClick={() => pick(a.id)}
                className={`flex min-h-14 items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left font-semibold transition hover:-translate-y-0.5 hover:border-primary ${
                  on ? "border-primary bg-primary-soft" : "border-line bg-surface"
                } ${q.layout === "swatches" ? "" : "sm:min-h-16 sm:px-5"}`}
              >
                {a.swatch && (
                  <span
                    className="h-9 w-9 shrink-0 rounded-full ring-1 ring-black/10"
                    style={{ background: a.swatch }}
                    aria-hidden="true"
                  />
                )}
                <span className="flex-1 text-ink">{a.label}</span>
                {on && <IconCheck className="h-5 w-5 shrink-0 text-primary" />}
              </button>
            );
          })}
        </div>
      </fieldset>

      {(multi || selected.length > 0) && (
        <button
          type="button"
          onClick={onNext}
          disabled={selected.length === 0}
          className="btn-primary mt-6 w-full !py-4 text-lg disabled:pointer-events-none disabled:opacity-40"
        >
          Continue
        </button>
      )}
    </div>
  );
}

function Milestone({
  phase,
  percent,
  onNext,
  onSkipPhoto,
}: {
  phase: Phase;
  percent: number;
  onNext: () => void;
  onSkipPhoto: () => void;
}) {
  const info = phases[phase];
  return (
    <div className="card animate-reveal p-6 text-center sm:p-10">
      <div
        className="mx-auto flex h-28 w-28 items-center justify-center rounded-full text-3xl font-extrabold text-white shadow-xl"
        style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)" }}
      >
        {percent}%
      </div>
      <p className="mt-4 font-semibold text-muted">Part {phase} of 3 complete</p>

      <ol className="mx-auto mt-6 flex max-w-md items-start justify-between">
        {([1, 2, 3] as Phase[]).map((p, i) => {
          const done = p <= phase;
          return (
            <li key={p} className="relative flex flex-1 flex-col items-center gap-2">
              {i > 0 && (
                <span
                  className={`absolute right-1/2 top-4 h-1 w-full -translate-y-1/2 ${p <= phase ? "bg-[#7C3AED]" : "bg-primary-soft"}`}
                  aria-hidden="true"
                />
              )}
              <span
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                  done ? "border-[#7C3AED] bg-[#7C3AED] text-white" : "border-[#7C3AED] bg-surface"
                }`}
              >
                {done && <IconCheck className="h-4 w-4" />}
              </span>
              <span className={`text-xs font-semibold sm:text-sm ${done ? "text-primary" : "text-muted"}`}>
                {phases[p].name}
              </span>
            </li>
          );
        })}
      </ol>

      <h2 tabIndex={-1} className="mt-8 text-2xl font-bold outline-none sm:text-3xl">
        {info.done}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-muted">{info.next}</p>

      {phase < 3 ? (
        <button type="button" onClick={onNext} className="btn-primary mt-8 w-full !py-4 text-lg">
          Continue
        </button>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          <button type="button" onClick={onNext} className="btn-primary w-full !py-4 text-lg">
            📸 Add a selfie (optional)
          </button>
          <button type="button" onClick={onSkipPhoto} className="btn-ghost w-full !py-4">
            Skip — show my results
          </button>
        </div>
      )}
    </div>
  );
}

const analyzingSteps = ["Reading your undertone", "Weighing depth and contrast", "Matching your season", "Building your palette"];

function Analyzing({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduce ? 150 : 650;
    if (done >= analyzingSteps.length) {
      const t = window.setTimeout(onDone, reduce ? 100 : 500);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setDone((d) => d + 1), delay);
    return () => window.clearTimeout(t);
  }, [done, onDone]);

  return (
    <div className="card animate-reveal p-8 text-center sm:p-10">
      <div className="mx-auto flex justify-center">
        <div className="animate-spin [animation-duration:3s]">
          <SeasonWheel size={120} />
        </div>
      </div>
      <h2 tabIndex={-1} className="mt-6 text-2xl font-bold outline-none">
        Mixing your palette…
      </h2>
      <ul className="mx-auto mt-6 max-w-xs space-y-3 text-left" aria-live="polite">
        {analyzingSteps.map((s, i) => (
          <li key={s} className={`flex items-center gap-3 font-semibold transition ${i < done ? "text-ink" : "text-muted opacity-50"}`}>
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full ${i < done ? "bg-[#7C3AED] text-white" : "border-2 border-line"}`}
            >
              {i < done && <IconCheck className="h-3.5 w-3.5" />}
            </span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Result ──────────────────────────────────────────────────────────── */

function Result({
  answers,
  photo,
  onRestart,
}: {
  answers: Selections;
  photo: PhotoReading | null;
  onRestart: () => void;
}) {
  const scores = useMemo(() => blendPhoto(score(answers), photo), [answers, photo]);
  const season = getSeason(seasonFromScores(scores))!;
  const traits = describe(scores);
  const extras = familyExtras[season.family];
  const [copied, setCopied] = useState<string | null>(null);

  const struggle = typeof answers.struggle === "string" ? struggleTips[answers.struggle] : undefined;
  const top = season.palette.slice(0, 3).map((p) => p.name.toLowerCase());

  // Which accent colors the user said they like actually sit close to their palette?
  const accentQ = questions.find((q) => q.id === "accents")!;
  const accentIds = Array.isArray(answers.accents) ? answers.accents : [];
  const accents = accentQ.answers
    .filter((a) => a.swatch && accentIds.includes(a.id))
    .map((a) => ({
      ...a,
      fits: season.palette.some((p) => colorDistance(p.hex, a.swatch!) < 140),
    }));

  const burst = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const dist = 140 + (i % 4) * 40;
        return {
          color: season.palette[i % season.palette.length].hex,
          x: `${Math.round(Math.cos(angle) * dist)}px`,
          y: `${Math.round(Math.sin(angle) * dist)}px`,
          rot: `${(i * 47) % 360}deg`,
          delay: `${(i % 6) * 40}ms`,
        };
      }),
    [season]
  );

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {}
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-1/2 top-24 z-10" aria-hidden="true">
        {burst.map((b, i) => (
          <span
            key={i}
            className="swatch-burst absolute h-5 w-5 rounded-md"
            style={{ background: b.color, "--x": b.x, "--y": b.y, "--rot": b.rot, animationDelay: b.delay } as React.CSSProperties}
          />
        ))}
      </div>

      <ResultHero
        season={season}
        traits={traits}
        tip={struggle ? { title: struggle.title, body: struggle.body({ name: season.name, neutrals: season.neutrals.toLowerCase(), top }) } : undefined}
      />

      <div className="card animate-reveal mt-6 overflow-hidden">
        <div className="space-y-8 p-6 sm:p-8">
          {photo && (
            <div className="flex items-center gap-3 rounded-2xl border border-line p-4 text-sm">
              <span className="h-9 w-9 shrink-0 rounded-full ring-2 ring-white" style={{ background: photo.hex }} />
              <p>
                <span className="font-bold">Selfie check:</span> <span className="text-muted">{photo.summary}. We blended it into your undertone and depth.</span>
              </p>
            </div>
          )}

          <section>
            <h3 className="text-xl font-bold">Your best colors 🎨</h3>
            <p className="text-sm text-muted">Wear these near your face. Tap a swatch to copy its HEX code.</p>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {season.palette.map((s) => (
                <li key={s.hex}>
                  <button
                    type="button"
                    onClick={() => copy(s.hex)}
                    className="w-full rounded-2xl border border-line p-2 text-left transition hover:-translate-y-0.5 hover:border-primary"
                    aria-label={`Copy ${s.name} ${s.hex}`}
                  >
                    <span className="block h-16 rounded-xl ring-1 ring-black/5" style={{ background: s.hex }} />
                    <span className="mt-2 block text-sm font-semibold">{s.name}</span>
                    <span className="flex items-center gap-1 font-mono text-xs text-muted">
                      {copied === s.hex ? (
                        <>
                          <IconCheck className="h-3 w-3" /> Copied!
                        </>
                      ) : (
                        <>
                          <IconCopy className="h-3 w-3" /> {s.hex}
                        </>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {accents.length > 0 && (
            <section>
              <h3 className="text-xl font-bold">Your accent picks, checked ✅</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {accents.map((a) => (
                  <li key={a.id} className="flex items-center gap-3 rounded-2xl bg-surface-2 p-3 text-sm">
                    <span className="h-8 w-8 shrink-0 rounded-full ring-1 ring-black/10" style={{ background: a.swatch }} />
                    <span>
                      <span className="font-semibold">{a.label}</span>{" "}
                      <span className="text-muted">{a.fits ? "— great near your face" : "— better for bags, shoes or trousers"}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard title="🤍 Neutrals & metals">
              <p>
                <span className="font-semibold text-ink">Neutrals:</span> {season.neutrals}
              </p>
              <p className="mt-1">
                <span className="font-semibold text-ink">Metals:</span> {season.metals}
              </p>
            </InfoCard>
            <InfoCard title="🚫 Wear with care">
              <div className="mt-1 flex gap-2">
                {season.avoid.map((s) => (
                  <span key={s.hex} className="h-8 w-8 rounded-full ring-1 ring-black/10" style={{ background: s.hex }} title={s.name} />
                ))}
              </div>
              <p className="mt-2">{season.avoid.map((s) => s.name).join(", ")}</p>
            </InfoCard>
            <InfoCard title="💄 Makeup ideas">
              <ul className="list-disc space-y-1 pl-5">
                {season.makeup.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </InfoCard>
            <InfoCard title="👗 Style tips">
              <ul className="list-disc space-y-1 pl-5">
                {season.style.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </InfoCard>
            <InfoCard title="💇 Hair colors that harmonize">
              <p>{extras.hair}</p>
            </InfoCard>
            <InfoCard title="🕶️ Jewelry & sunglasses">
              <p>{extras.accessories}</p>
            </InfoCard>
          </div>

          <p className="rounded-2xl border border-line p-4 text-sm text-muted">
            Quiz results are a friendly starting point, not a professional diagnosis. Try a few palette colors near your
            face in daylight and trust your mirror.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={`/seasons/${season.slug}`} className="btn-primary flex-1">
              Full {season.name} guide <IconArrow className="h-5 w-5" />
            </Link>
            <button type="button" onClick={onRestart} className="btn-ghost flex-1">
              Retake quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const familyTheme: Record<Family, { bg: string; ink: string; line: string }> = {
  Spring: { bg: "#FFF6EA", ink: "#7C2D12", line: "#E9C9A8" },
  Summer: { bg: "#F1F4FA", ink: "#1E3A5F", line: "#C5D0E3" },
  Autumn: { bg: "#F5EFE4", ink: "#1F3A2E", line: "#CFC3A8" },
  Winter: { bg: "#F2F2F7", ink: "#1E1B4B", line: "#C9C8DA" },
};

const undertoneDot: Record<string, string> = { Warm: "#D4A24C", Cool: "#8AA6C9", Neutral: "#8A8B5C" };
const contrastHalves: Record<string, [string, string]> = {
  Low: ["#EDE3D1", "#9C8A6A"],
  Medium: ["#EDE3D1", "#5A4630"],
  High: ["#F7F7F7", "#151515"],
};

function DepthIcon({ depth }: { depth: string }) {
  if (depth === "Deep")
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9" aria-hidden="true">
        <path d="M19 14.5A7.5 7.5 0 1 1 9.5 5a6 6 0 0 0 9.5 9.5Z" fill="#4B3F72" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="h-9 w-9" aria-hidden="true">
      <circle cx="12" cy="12" r="5" fill={depth === "Light" ? "#F0C24B" : "#D99A3C"} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <line
            key={i}
            x1={12 + Math.cos(a) * 7.5}
            y1={12 + Math.sin(a) * 7.5}
            x2={12 + Math.cos(a) * 10}
            y2={12 + Math.sin(a) * 10}
            stroke={depth === "Light" ? "#F0C24B" : "#D99A3C"}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

function ResultHero({
  season,
  traits,
  tip,
}: {
  season: Season;
  traits: { undertone: string; depth: string; contrast: string };
  tip?: { title: string; body: string };
}) {
  const theme = familyTheme[season.family];
  const photo = seasonPhoto(season);
  const [lo, hi] = contrastHalves[traits.contrast];

  return (
    <section
      className="card animate-reveal relative overflow-hidden !border-0 dark:!bg-surface"
      style={{ background: theme.bg }}
      aria-labelledby="result-title"
    >
      {/* Photo: top banner on mobile, fading right panel on desktop */}
      <div className="relative h-60 sm:absolute sm:inset-y-0 sm:right-0 sm:h-auto sm:w-[46%]">
        <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 640px) 320px, 100vw" className={`object-cover ${photo.position}`} />
        <div
          className="absolute inset-0 hidden sm:block dark:!hidden"
          style={{ background: `linear-gradient(90deg, ${theme.bg} 0%, ${theme.bg}00 45%)` }}
        />
        <div
          className="absolute inset-0 sm:hidden dark:!hidden"
          style={{ background: `linear-gradient(0deg, ${theme.bg} 0%, ${theme.bg}00 40%)` }}
        />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-[var(--surface)] to-transparent to-40% dark:block sm:dark:bg-gradient-to-r" />
      </div>

      <div className="relative p-6 sm:w-[64%] sm:p-8">
        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-muted sm:text-sm">
          <span className="h-px w-8 bg-current opacity-50 sm:w-12" />
          Your color season is
          <span className="h-px w-8 bg-current opacity-50 sm:w-12" />
        </p>
        <h2
          id="result-title"
          tabIndex={-1}
          className="mt-4 inline-flex items-center gap-3 rounded-2xl border-2 bg-white/50 px-4 py-2 text-4xl font-extrabold outline-none sm:text-5xl dark:!border-line dark:!text-ink dark:bg-white/5"
          style={{ color: theme.ink, borderColor: theme.line }}
        >
          <span aria-hidden="true" className="text-3xl sm:text-4xl">
            {season.emoji}
          </span>
          {season.name}
        </h2>
        <p className="mt-3 text-lg font-semibold text-muted">{season.tagline}</p>

        <div className="mt-4 flex h-5 max-w-sm overflow-hidden rounded-full" aria-hidden="true">
          {season.palette.map((p) => (
            <span key={p.hex} className="flex-1" style={{ background: p.hex }} />
          ))}
        </div>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/80 sm:text-base">{season.description}</p>
      </div>

      <div className="relative px-6 pb-6 sm:px-8 sm:pb-8">
        <dl className="grid grid-cols-1 gap-3 sm:max-w-[78%] sm:grid-cols-3">
          <TraitCard label="Undertone" value={traits.undertone}>
            <span className="h-9 w-9 rounded-full" style={{ background: undertoneDot[traits.undertone] }} />
          </TraitCard>
          <TraitCard label="Depth" value={traits.depth}>
            <DepthIcon depth={traits.depth} />
          </TraitCard>
          <TraitCard label="Contrast" value={traits.contrast}>
            <span className="flex h-9 w-9 overflow-hidden rounded-full ring-1 ring-black/10">
              <span className="flex-1" style={{ background: lo }} />
              <span className="flex-1" style={{ background: hi }} />
            </span>
          </TraitCard>
        </dl>

        {tip && (
          <div
            className="mt-4 flex items-center gap-4 rounded-2xl p-4 text-white shadow-lg sm:p-5"
            style={{ background: "linear-gradient(100deg,#6D3FB8 0%,#9B4FA6 50%,#D9607A 100%)" }}
          >
            <span className="text-3xl" aria-hidden="true">
              💡
            </span>
            <span className="h-12 w-px shrink-0 bg-white/30" aria-hidden="true" />
            <div>
              <h3 className="font-bold sm:text-lg">{tip.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/90">{tip.body}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function TraitCard({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/70 p-3 backdrop-blur-sm dark:border-line dark:bg-surface-2">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center">{children}</span>
      <div>
        <dt className="text-[11px] font-bold uppercase tracking-wider text-muted">{label}</dt>
        <dd className="text-lg font-bold text-ink">{value}</dd>
      </div>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-surface-2 p-5">
      <h3 className="font-bold">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}
