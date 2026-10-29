"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { rgbToHex, toLab, type RGB } from "@/lib/color";
import { IconCheck, IconClose, IconLock } from "./Icons";

export type PhotoReading = { w: number; d: number; c?: number; hex: string; summary: string };

type Target = "skin" | "hair" | "eyes";
type Sample = { rgb: RGB; x: number; y: number };

const targets: { id: Target; label: string; hint: string }[] = [
  { id: "skin", label: "Cheek", hint: "a clear spot on your cheek (avoid blush, shine and shadows)" },
  { id: "hair", label: "Hair", hint: "your hair near the root, in even light" },
  { id: "eyes", label: "Eyes", hint: "the colored part of your eye (iris)" },
];

const clamp = (n: number) => Math.max(-1, Math.min(1, n));

/**
 * Skin hue angle in Lab runs roughly 40° (pink/rosy) to 65° (golden/olive);
 * lightness runs ~80 (fair) to ~30 (deep). Hair and eye lightness give contrast.
 * Mapped onto the quiz's -1…1 axes.
 */
function readPhoto(samples: Partial<Record<Target, Sample>>): PhotoReading | { error: string } {
  const skin = samples.skin;
  if (!skin) return { error: "Tap your cheek first — it's the one sample we need." };
  const { L, a, b } = toLab(skin.rgb);
  if (L < 18) return { error: "That cheek spot looks too dark — try a well-lit part of your cheek." };
  if (L > 92) return { error: "That cheek spot looks washed out by light — try a spot without shine." };

  const hue = (Math.atan2(b, a) * 180) / Math.PI;
  const w = clamp((hue - 52) / 10);
  const d = clamp((62 - L) / 24);

  const others = [samples.hair, samples.eyes].filter(Boolean) as Sample[];
  const contrastDiff = others.length ? Math.max(...others.map((s) => Math.abs(L - toLab(s.rgb).L))) : null;
  const c = contrastDiff === null ? undefined : clamp((contrastDiff - 40) / 20);

  const tone = Math.abs(w) < 0.25 ? "neutral" : w > 0 ? "warm (golden)" : "cool (rosy)";
  const depth = d < -0.3 ? "light" : d > 0.3 ? "deep" : "medium";
  const contrast = c === undefined ? "" : `, ${c < -0.3 ? "low" : c > 0.3 ? "high" : "medium"} contrast`;
  return { w, d, c, hex: rgbToHex(skin.rgb), summary: `Reads ${tone}, ${depth} depth${contrast}` };
}

export default function PhotoStep({ onDone }: { onDone: (reading: PhotoReading | null) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [target, setTarget] = useState<Target>("skin");
  const [samples, setSamples] = useState<Partial<Record<Target, Sample>>>({});

  const result = samples.skin ? readPhoto(samples) : null;
  const reading = result && !("error" in result) ? result : null;
  const error = result && "error" in result ? result.error : null;

  const onFile = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    // Read locally via an object URL — the file never leaves the browser.
    const url = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      setImg(image);
    };
    image.src = url;
    setSamples({});
    setTarget("skin");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const scale = Math.min(1, 720 / img.width);
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext("2d", { willReadFrequently: true })?.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, [img]);

  const sampleAt = (fx: number, fy: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return;
    const size = Math.max(4, Math.round(canvas.width / (target === "eyes" ? 80 : 40)));
    const x = Math.round(fx * canvas.width - size / 2);
    const y = Math.round(fy * canvas.height - size / 2);
    const data = ctx.getImageData(Math.max(0, x), Math.max(0, y), size, size).data;
    let r = 0, g = 0, b = 0, n = 0;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      n++;
    }
    setSamples((s) => ({ ...s, [target]: { rgb: [r / n, g / n, b / n], x: fx, y: fy } }));
    // Move on to the next unsampled area to keep tapping simple.
    const next = targets.find((t) => t.id !== target && !samples[t.id]);
    if (next) setTarget(next.id);
  };

  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    sampleAt((e.clientX - rect.left) / rect.width, (e.clientY - rect.top) / rect.height);
  };

  const fileButton = (label: string, capture?: "user") => (
    <label className="btn-primary w-full cursor-pointer !py-4 text-lg has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--ring)]">
      <input type="file" accept="image/*" capture={capture} className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
      {label}
    </label>
  );

  return (
    <div className="card animate-reveal p-6 sm:p-8">
      <h2 tabIndex={-1} className="text-2xl font-bold outline-none sm:text-3xl">
        Add a selfie for an extra check 📸
      </h2>
      <p className="mt-2 text-muted">
        Totally optional. Tap your cheek (and, if you like, your hair and eyes) and we&apos;ll read your actual colors to
        fine-tune your undertone, depth and contrast. Lighting and cameras distort color, so this only supports your quiz
        answers — it doesn&apos;t override them.
      </p>

      {!img && (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { ok: true, title: "Good lighting", note: "Soft daylight, facing a window" },
              { ok: false, title: "Poor lighting", note: "Dim, yellow or harsh shadows" },
            ].map((t) => (
              <figure key={t.title} className="text-center">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src="/images/hero.jpg"
                    alt=""
                    fill
                    sizes="(min-width: 640px) 280px, 45vw"
                    className="object-cover object-[78%_40%]"
                    style={t.ok ? undefined : { filter: "brightness(0.45) sepia(0.6) contrast(1.25) saturate(1.3)" }}
                  />
                  {!t.ok && <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />}
                  <span
                    className={`absolute bottom-2 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full text-white shadow-lg ${
                      t.ok ? "bg-[#16a34a]" : "bg-[#dc2626]"
                    }`}
                  >
                    {t.ok ? <IconCheck className="h-5 w-5" /> : <IconClose className="h-5 w-5" />}
                  </span>
                </div>
                <figcaption className="mt-2">
                  <span className="block font-semibold">{t.title}</span>
                  <span className="text-sm text-muted">{t.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">Tip: no makeup, no filters, and hair pulled back from your cheeks.</p>
        </>
      )}

      {img && (
        <div className="mt-6">
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="What are you sampling?">
            {targets.map((t) => (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={target === t.id}
                onClick={() => setTarget(t.id)}
                className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
                  target === t.id ? "border-primary bg-primary-soft text-primary" : "border-line"
                }`}
              >
                {samples[t.id] ? (
                  <span className="h-4 w-4 rounded-full ring-1 ring-black/20" style={{ background: rgbToHex(samples[t.id]!.rgb) }} />
                ) : null}
                {t.label}
                {t.id === "skin" ? "" : <span className="font-normal text-muted">(optional)</span>}
              </button>
            ))}
          </div>
          <p className="mt-3 font-semibold">
            Tap {targets.find((t) => t.id === target)!.hint}
          </p>
          <div className="relative mt-3 overflow-hidden rounded-2xl">
            <canvas
              ref={canvasRef}
              onClick={onCanvasClick}
              className="block h-auto w-full cursor-crosshair"
              aria-label="Your photo. Click on the selected area to sample its color."
            />
            {targets.map((t) => {
              const s = samples[t.id];
              return s ? (
                <span
                  key={t.id}
                  className="pointer-events-none absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white text-[10px] font-bold text-white shadow-[0_0_0_2px_#7C3AED]"
                  style={{ left: `${s.x * 100}%`, top: `${s.y * 100}%`, background: rgbToHex(s.rgb) }}
                >
                  <span className="sr-only">{t.label} sample</span>
                </span>
              ) : null;
            })}
          </div>
          {!samples.skin && (
            <button type="button" onClick={() => sampleAt(0.38, 0.5)} className="mt-2 text-sm font-semibold text-primary underline">
              Can&apos;t tap? Sample the left-of-center area as your cheek instead
            </button>
          )}
          <div aria-live="polite" className="mt-4">
            {error && (
              <p className="rounded-xl bg-[#fef2f2] p-3 text-sm font-semibold text-[#b91c1c] dark:bg-[#3b1219] dark:text-[#fca5a5]">{error}</p>
            )}
            {reading && (
              <div className="flex items-center gap-3 rounded-2xl bg-surface-2 p-3">
                <span className="h-10 w-10 shrink-0 rounded-full ring-2 ring-white" style={{ background: reading.hex }} />
                <p className="text-sm">
                  <span className="font-bold">{reading.summary}.</span>{" "}
                  <span className="text-muted">Tap again to re-check any area.</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 flex gap-3 rounded-2xl bg-[#fdf2f8] p-4 dark:bg-[#2a1a3a]">
        <IconLock className="mt-0.5 h-5 w-5 shrink-0 text-[#be185d] dark:text-[#f9a8d4]" />
        <p className="text-sm text-[#831843] dark:text-[#fbcfe8]">
          Your photo never leaves your device. It&apos;s read right here in your browser — nothing is uploaded, sent or
          saved, and it&apos;s gone when you leave the page.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {reading ? (
          <button type="button" onClick={() => onDone(reading)} className="btn-primary w-full !py-4 text-lg">
            Use this reading &amp; see my results
          </button>
        ) : img ? (
          fileButton("Choose a different photo")
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {fileButton("Take a selfie", "user")}
            {fileButton("Upload a photo")}
          </div>
        )}
        <button type="button" onClick={() => onDone(null)} className="btn-ghost w-full !py-4">
          Skip — show my results
        </button>
      </div>
    </div>
  );
}
