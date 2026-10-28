"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IconCheck, IconClose, IconLock } from "./Icons";

export type PhotoReading = { w: number; d: number; hex: string; summary: string };

const clamp = (n: number) => Math.max(-1, Math.min(1, n));

/** sRGB (0–255) → CIE Lab (D65). */
function toLab(r: number, g: number, b: number) {
  const lin = (c: number) => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const [R, G, B] = [lin(r), lin(g), lin(b)];
  const x = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047;
  const y = R * 0.2126 + G * 0.7152 + B * 0.0722;
  const z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  return { L: 116 * f(y) - 16, a: 500 * (f(x) - f(y)), b: 200 * (f(y) - f(z)) };
}

/**
 * Skin hue angle in Lab runs roughly 40° (pink/rosy) to 65° (golden/olive);
 * lightness runs ~80 (fair) to ~30 (deep). Mapped onto the quiz's -1…1 axes.
 */
function readSkin(r: number, g: number, b: number): PhotoReading | { error: string } {
  const { L, a, b: bb } = toLab(r, g, b);
  if (L < 18) return { error: "That spot looks too dark — try a well-lit part of your cheek." };
  if (L > 92) return { error: "That spot looks washed out by light — try a spot without shine." };
  const hue = (Math.atan2(bb, a) * 180) / Math.PI;
  const w = clamp((hue - 52) / 10);
  const d = clamp((62 - L) / 24);
  const hex = "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
  const tone = Math.abs(w) < 0.25 ? "neutral" : w > 0 ? "warm (golden)" : "cool (rosy)";
  const depth = d < -0.3 ? "light" : d > 0.3 ? "deep" : "medium";
  return { w, d, hex, summary: `Reads ${tone}, ${depth} depth` };
}

export default function PhotoStep({ onDone }: { onDone: (reading: PhotoReading | null) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [mark, setMark] = useState<{ x: number; y: number } | null>(null);
  const [reading, setReading] = useState<PhotoReading | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  const onFile = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      setImg(image);
    };
    image.src = url;
    setMark(null);
    setReading(null);
    setError(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const scale = Math.min(1, 720 / img.width);
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext("2d", { willReadFrequently: true })?.drawImage(img, 0, 0, canvas.width, canvas.height);
    setLoaded(true);
  }, [img]);

  const sampleAt = (fx: number, fy: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return;
    const size = Math.max(6, Math.round(canvas.width / 40));
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
    setMark({ x: fx, y: fy });
    const result = readSkin(r / n, g / n, b / n);
    if ("error" in result) {
      setError(result.error);
      setReading(null);
    } else {
      setError(null);
      setReading(result);
    }
  };

  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    sampleAt((e.clientX - rect.left) / rect.width, (e.clientY - rect.top) / rect.height);
  };

  return (
    <div className="card animate-reveal p-6 sm:p-8">
      <h2 className="text-2xl font-bold sm:text-3xl">Add a selfie for an extra check 📸</h2>
      <p className="mt-2 text-muted">
        Totally optional. You&apos;ll tap your cheek and we&apos;ll read your actual skin tone to fine-tune your undertone
        and depth.
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
          <p className="font-semibold">
            Tap a clear spot on your cheek <span className="font-normal text-muted">(avoid blush, shine and shadows)</span>
          </p>
          <div className="relative mt-3 overflow-hidden rounded-2xl">
            <canvas
              ref={canvasRef}
              onClick={onCanvasClick}
              className="block h-auto w-full cursor-crosshair"
              aria-label="Your photo. Click on your cheek to sample your skin tone."
            />
            {mark && (
              <span
                className="pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-[0_0_0_2px_#7C3AED]"
                style={{ left: `${mark.x * 100}%`, top: `${mark.y * 100}%`, background: reading?.hex ?? "transparent" }}
              />
            )}
          </div>
          {loaded && !mark && (
            <button type="button" onClick={() => sampleAt(0.38, 0.5)} className="mt-2 text-sm font-semibold text-primary underline">
              Can&apos;t tap? Sample the left-of-center area instead
            </button>
          )}
          <div aria-live="polite" className="mt-4">
            {error && <p className="rounded-xl bg-[#fef2f2] p-3 text-sm font-semibold text-[#b91c1c] dark:bg-[#3b1219] dark:text-[#fca5a5]">{error}</p>}
            {reading && (
              <div className="flex items-center gap-3 rounded-2xl bg-surface-2 p-3">
                <span className="h-10 w-10 shrink-0 rounded-full ring-2 ring-white" style={{ background: reading.hex }} />
                <p className="text-sm">
                  <span className="font-bold">{reading.summary}.</span>{" "}
                  <span className="text-muted">Tap another spot to re-check.</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 flex gap-3 rounded-2xl bg-[#fdf2f8] p-4 dark:bg-[#2a1a3a]">
        <IconLock className="mt-0.5 h-5 w-5 shrink-0 text-[#be185d] dark:text-[#f9a8d4]" />
        <p className="text-sm text-[#831843] dark:text-[#fbcfe8]">
          Your photo never leaves your device. It&apos;s read right here in your browser — nothing is uploaded or saved,
          and it&apos;s gone when you leave the page.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {reading ? (
          <button type="button" onClick={() => onDone(reading)} className="btn-primary w-full !py-4 text-lg">
            Use this reading & see my results
          </button>
        ) : (
          <label className="btn-primary w-full cursor-pointer !py-4 text-lg has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--ring)]">
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
            {img ? "Choose a different photo" : "Add a selfie"}
          </label>
        )}
        <button type="button" onClick={() => onDone(null)} className="btn-ghost w-full !py-4">
          Skip — show my results
        </button>
      </div>
    </div>
  );
}
