"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { describe, questions, score, seasonFromScores } from "@/lib/quiz";
import { getSeason } from "@/lib/seasons";
import { IconArrow, IconCheck, IconCopy } from "./Icons";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const q = questions[step];
  const progress = done ? 100 : Math.round((step / questions.length) * 100);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step, done]);

  const choose = (answerId: string) => {
    setAnswers((a) => ({ ...a, [q.id]: answerId }));
    // Brief pause so the selected state is visible before moving on.
    window.setTimeout(() => {
      if (step < questions.length - 1) setStep(step + 1);
      else setDone(true);
    }, 220);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setDone(false);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-sm font-semibold text-muted">
          <span>{done ? "All done!" : `Question ${step + 1} of ${questions.length}`}</span>
          <span>{progress}%</span>
        </div>
        <div
          className="h-3 overflow-hidden rounded-full bg-primary-soft"
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="h-full rounded-full transition-[width] duration-500"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg,#7C3AED,#EC4899,#FB923C)" }}
          />
        </div>
      </div>

      {done ? (
        <Result answers={answers} onRestart={restart} headingRef={headingRef} />
      ) : (
        <div key={q.id} className="card animate-reveal p-6 sm:p-8">
          <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold leading-snug outline-none sm:text-3xl">
            {q.title}
          </h2>
          <p className="mt-2 text-muted">{q.helper}</p>
          <fieldset className="mt-6">
            <legend className="sr-only">{q.title}</legend>
            <div className={`grid gap-3 ${q.answers.length > 3 ? "sm:grid-cols-2" : ""}`}>
              {q.answers.map((a) => {
                const selected = answers[q.id] === a.id;
                return (
                  <button
                    key={a.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => choose(a.id)}
                    className={`flex min-h-16 items-center gap-4 rounded-2xl border-2 p-4 text-left font-semibold transition hover:-translate-y-0.5 hover:border-primary ${
                      selected ? "border-primary bg-primary-soft" : "border-line bg-surface"
                    }`}
                  >
                    {a.swatches && (
                      <span className="flex shrink-0 -space-x-2" aria-hidden="true">
                        {a.swatches.map((s) => (
                          <span
                            key={s}
                            className="h-10 w-10 rounded-full border-2 border-white shadow dark:border-[#1c1430]"
                            style={{ background: s }}
                          />
                        ))}
                      </span>
                    )}
                    <span className="flex-1 text-ink">{a.label}</span>
                    {selected && <IconCheck className="h-5 w-5 text-primary" />}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="rounded-full px-4 py-2 font-semibold text-primary disabled:invisible"
            >
              ← Back
            </button>
            {answers[q.id] && step < questions.length - 1 && (
              <button type="button" onClick={() => setStep(step + 1)} className="rounded-full px-4 py-2 font-semibold text-primary">
                Next →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Result({
  answers,
  onRestart,
  headingRef,
}: {
  answers: Record<string, string>;
  onRestart: () => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  const scores = useMemo(() => score(answers), [answers]);
  const season = getSeason(seasonFromScores(scores))!;
  const traits = describe(scores);
  const [copied, setCopied] = useState<string | null>(null);

  // Deterministic burst layout so server/client renders match.
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
            style={
              {
                background: b.color,
                "--x": b.x,
                "--y": b.y,
                "--rot": b.rot,
                animationDelay: b.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="card animate-reveal overflow-hidden">
        <div className="p-6 text-center sm:p-8" style={{ background: "var(--grad-hero)" }}>
          <p className="text-sm font-bold uppercase tracking-wider text-muted">Your color season is</p>
          <h2 ref={headingRef} tabIndex={-1} className="mt-2 text-4xl font-extrabold outline-none sm:text-5xl" aria-live="polite">
            <span aria-hidden="true">{season.emoji} </span>
            {season.name}
          </h2>
          <p className="mt-2 text-lg font-semibold text-primary">{season.tagline}</p>
        </div>

        <div className="p-6 sm:p-8">
          <p className="leading-relaxed text-muted">{season.description}</p>

          <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
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

          <h3 className="mt-8 text-xl font-bold">Your palette 🎨</h3>
          <p className="text-sm text-muted">Tap a swatch to copy its HEX code.</p>
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

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-surface-2 p-5">
              <h3 className="font-bold">💄 Makeup ideas</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                {season.makeup.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-surface-2 p-5">
              <h3 className="font-bold">👗 Style tips</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                {season.style.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 rounded-2xl border border-line p-4 text-sm text-muted">
            Quiz results are a friendly starting point, not a professional diagnosis. Try a few palette colors near your
            face in daylight and trust your mirror.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`/seasons/${season.slug}`} className="btn-primary flex-1">
              See full {season.name} guide <IconArrow className="h-5 w-5" />
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
