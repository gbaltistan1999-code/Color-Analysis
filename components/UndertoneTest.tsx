"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const checks = [
  {
    id: "veins",
    q: "Your wrist veins look…",
    options: [
      { label: "Green / olive", v: 1 },
      { label: "Blue / purple", v: -1 },
      { label: "Hard to say", v: 0 },
    ],
  },
  {
    id: "metal",
    q: "You glow more in…",
    options: [
      { label: "Gold", v: 1 },
      { label: "Silver", v: -1 },
      { label: "Both equally", v: 0 },
    ],
  },
  {
    id: "paper",
    q: "Next to a sheet of white paper, your skin looks…",
    options: [
      { label: "Yellow, golden or peachy", v: 1 },
      { label: "Pink, rosy or bluish", v: -1 },
      { label: "Somewhere in between", v: 0 },
    ],
  },
  {
    id: "sun",
    q: "In the sun you usually…",
    options: [
      { label: "Tan golden", v: 1 },
      { label: "Turn pink or burn", v: -1 },
      { label: "A bit of both", v: 0 },
    ],
  },
];

const results = {
  warm: {
    title: "Warm undertone ☀️",
    body: "Your skin has golden, peachy or yellow hints. Earthy and golden colors and gold jewelry tend to flatter you.",
    seasons: ["warm-spring", "warm-autumn", "light-spring", "soft-autumn"],
  },
  cool: {
    title: "Cool undertone ❄️",
    body: "Your skin has pink, rosy or blue hints. Blue-based colors, jewel tones and silver jewelry tend to flatter you.",
    seasons: ["cool-summer", "cool-winter", "light-summer", "deep-winter"],
  },
  neutral: {
    title: "Neutral undertone 🌗",
    body: "You have a balance of warm and cool. You can wear a wide range — look to the 'soft' and 'bright' seasons.",
    seasons: ["soft-summer", "soft-autumn", "bright-spring", "bright-winter"],
  },
};

export default function UndertoneTest() {
  const [picked, setPicked] = useState<Record<string, number>>({});
  const complete = Object.keys(picked).length === checks.length;
  const total = Object.values(picked).reduce((a, b) => a + b, 0);
  const kind = total >= 2 ? "warm" : total <= -2 ? "cool" : "neutral";
  const r = results[kind];

  return (
    <div className="space-y-6">
      {checks.map((c, i) => (
        <fieldset key={c.id} className="card p-5 sm:p-6">
          <legend className="sr-only">{c.q}</legend>
          <p className="font-display text-lg font-bold" aria-hidden="true">
            {i + 1}. {c.q}
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {c.options.map((o) => {
              const checked = picked[c.id] === o.v;
              return (
                <label
                  key={o.label}
                  className={`cursor-pointer rounded-2xl border-2 px-4 py-3 text-center font-semibold transition has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--ring)] hover:border-primary ${
                    checked ? "border-primary bg-primary-soft text-primary" : "border-line"
                  }`}
                >
                  <input
                    type="radio"
                    name={c.id}
                    className="sr-only"
                    checked={checked}
                    onChange={() => setPicked((p) => ({ ...p, [c.id]: o.v }))}
                  />
                  {o.label}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div aria-live="polite">
        {complete && (
          <div className="card animate-reveal p-6 text-center sm:p-8" style={{ background: "var(--grad-hero)" }}>
            <h2 className="text-3xl font-extrabold">{r.title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">{r.body}</p>
            <p className="mt-5 text-sm font-semibold">Seasons worth exploring:</p>
            <ul className="mt-2 flex flex-wrap justify-center gap-2">
              {r.seasons.map((s) => (
                <li key={s}>
                  <Link
                    href={`/seasons/${s}`}
                    className="inline-block rounded-full bg-surface px-4 py-2 text-sm font-semibold text-primary shadow-sm hover:-translate-y-0.5"
                  >
                    {s.replace("-", " ").replace(/\b\w/g, (m) => m.toUpperCase())}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/quiz" className="btn-primary mt-6">
              Get your full season
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

const drapes = [
  { name: "Gold", hex: "#D4AF37", group: "Warm" },
  { name: "Silver", hex: "#C0C0C8", group: "Cool" },
  { name: "Coral", hex: "#FF7F61", group: "Warm" },
  { name: "Fuchsia", hex: "#C71585", group: "Cool" },
  { name: "Camel", hex: "#C19A6B", group: "Warm" },
  { name: "Icy Blue", hex: "#CFE8FF", group: "Cool" },
  { name: "Olive", hex: "#6B6B3A", group: "Warm" },
  { name: "Ruby", hex: "#9B1B30", group: "Cool" },
  { name: "Ivory", hex: "#FFF1D6", group: "Warm" },
  { name: "Pure White", hex: "#FFFFFF", group: "Cool" },
];

/** Virtual drape: the photo is shown via a local object URL and is never uploaded. */
export function SelfieDrape() {
  const [url, setUrl] = useState<string | null>(null);
  const [drape, setDrape] = useState(drapes[0]);

  useEffect(() => () => {
    if (url) URL.revokeObjectURL(url);
  }, [url]);

  const onFile = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    setUrl(URL.createObjectURL(file));
  };

  return (
    <div className="card p-6 sm:p-8">
      <h2 className="text-2xl font-bold">Try a virtual drape 📸</h2>
      <p className="mt-2 text-muted">
        Add a selfie taken in daylight, then flip between warm and cool colors around your face. Your photo stays in
        this browser tab — it&apos;s never uploaded or saved.
      </p>

      <label className="btn-ghost mt-5 cursor-pointer has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-[var(--ring)]">
        <input type="file" accept="image/*" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
        {url ? "Choose a different photo" : "Add a selfie"}
      </label>

      {url && (
        <div className="mt-6 grid items-start gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-3xl p-5 transition-colors duration-300 sm:p-7" style={{ background: drape.hex }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- local object URL */}
            <img src={url} alt="Your selfie framed by the selected drape color" className="aspect-[3/4] w-full rounded-2xl object-cover" />
          </div>
          <div>
            <p className="font-semibold">
              Now showing: {drape.name} <span className="text-muted">({drape.group})</span>
            </p>
            <div className="mt-3 grid grid-cols-5 gap-2" role="radiogroup" aria-label="Drape color">
              {drapes.map((d) => (
                <button
                  key={d.hex}
                  type="button"
                  role="radio"
                  aria-checked={d.hex === drape.hex}
                  aria-label={`${d.name} (${d.group})`}
                  onClick={() => setDrape(d)}
                  className={`aspect-square rounded-xl ring-1 ring-black/10 transition hover:scale-105 ${
                    d.hex === drape.hex ? "outline outline-3 outline-offset-2 outline-[var(--ring)]" : ""
                  }`}
                  style={{ background: d.hex }}
                />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Look for the colors that even out your skin and brighten your eyes. If the warm row wins, you likely lean
              warm; if the cool row wins, you likely lean cool.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
