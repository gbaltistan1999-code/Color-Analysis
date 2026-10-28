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
import { familyExtras, getSeason } from "@/lib/seasons";
import { IconArrow, IconCheck, IconCopy } from "./Icons";
import { PaletteStrip } from "./Illustrations";
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

      <div className="card animate-reveal overflow-hidden">
        <div className="p-6 text-center sm:p-8" style={{ background: "var(--grad-hero)" }}>
          <p className="text-sm font-bold uppercase tracking-wider text-muted">Your color season is</p>
          <h2 tabIndex={-1} className="mt-2 text-4xl font-extrabold outline-none sm:text-5xl">
            <span aria-hidden="true">{season.emoji} </span>
            {season.name}
          </h2>
          <p className="mt-2 text-lg font-semibold text-primary">{season.tagline}</p>
          <PaletteStrip colors={season.palette.map((p) => p.hex)} className="mx-auto mt-5 h-3 max-w-xs" />
        </div>

        <div className="space-y-8 p-6 sm:p-8">
          <p className="leading-relaxed text-muted">{season.description}</p>

          <dl className="grid grid-cols-3 gap-3 text-center">
            {[
              ["Undertone", traits.undertone],
              ["Depth", traits.depth],
              ["Contrast", traits.contrast],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-surface-2 p-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{k}</dt>
                <dd className="mt-1 font-bold">{v}</dd>
              </div>
            ))}
          </dl>

          {photo && (
            <div className="flex items-center gap-3 rounded-2xl border border-line p-4 text-sm">
              <span className="h-9 w-9 shrink-0 rounded-full ring-2 ring-white" style={{ background: photo.hex }} />
              <p>
                <span className="font-bold">Selfie check:</span> <span className="text-muted">{photo.summary}. We blended it into your undertone and depth.</span>
              </p>
            </div>
          )}

          {struggle && (
            <section className="rounded-2xl p-5 text-white" style={{ background: "var(--grad-cta)" }}>
              <h3 className="font-bold">💡 {struggle.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/90">
                {struggle.body({ name: season.name, neutrals: season.neutrals.toLowerCase(), top })}
              </p>
            </section>
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

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-surface-2 p-5">
      <h3 className="font-bold">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}
