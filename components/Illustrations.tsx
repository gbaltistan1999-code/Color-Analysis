import Image from "next/image";
import type { CSSProperties } from "react";

type FaceProps = {
  drape: string;
  drapeShade?: string;
  /** "glow" adds warmth and highlights; "dull" adds grey shadows to show an unflattering drape. */
  mood?: "glow" | "dull" | "neutral";
  className?: string;
  title?: string;
};

/** A stylized, neutral face silhouette wearing a color drape. Pure SVG, no external images. */
export function DrapedFace({ drape, drapeShade, mood = "neutral", className, title }: FaceProps) {
  const id = `f${drape.replace("#", "")}${mood}`;
  return (
    <svg viewBox="0 0 240 260" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <defs>
        <radialGradient id={`${id}-skin`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F3CDB4" />
          <stop offset="100%" stopColor="#DFA889" />
        </radialGradient>
        <linearGradient id={`${id}-drape`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={drape} />
          <stop offset="100%" stopColor={drapeShade ?? drape} />
        </linearGradient>
      </defs>

      {/* hair back */}
      <path d="M58 118c-6-58 26-92 64-92s70 32 62 94c-2 22-4 40-10 52H70c-8-14-11-32-12-54Z" fill="#4A3024" />
      {/* neck */}
      <path d="M100 168h40v34h-40z" fill={`url(#${id}-skin)`} />
      {/* drape */}
      <path d="M14 260c4-42 34-68 76-74 10 10 50 10 60 0 42 6 72 32 76 74Z" fill={`url(#${id}-drape)`} />
      <path d="M90 186c10 14 50 14 60 0" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="3" />
      {/* face */}
      <ellipse cx="120" cy="116" rx="50" ry="60" fill={`url(#${id}-skin)`} />
      {/* fringe */}
      <path d="M70 104c6-38 30-52 56-52 26 0 42 14 46 40-20-14-46-18-72-6-10 5-20 12-30 18Z" fill="#4A3024" />
      {/* eyes */}
      <ellipse cx="100" cy="118" rx="5" ry="6" fill="#3A2A22" />
      <ellipse cx="140" cy="118" rx="5" ry="6" fill="#3A2A22" />
      <path d="M90 106q10-6 20 0M130 106q10-6 20 0" stroke="#4A3024" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* nose + mouth */}
      <path d="M120 122q-4 14 0 18" stroke="#C98C6E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M106 150q14 10 28 0" stroke="#C2566B" strokeWidth="4" fill="none" strokeLinecap="round" />

      {mood === "glow" && (
        <>
          <ellipse cx="94" cy="138" rx="11" ry="7" fill="#FF8FA3" opacity="0.45" />
          <ellipse cx="146" cy="138" rx="11" ry="7" fill="#FF8FA3" opacity="0.45" />
          <ellipse cx="120" cy="96" rx="22" ry="10" fill="#fff" opacity="0.28" />
          <ellipse cx="120" cy="116" rx="50" ry="60" fill="#FFD7A8" opacity="0.12" />
        </>
      )}
      {mood === "dull" && (
        <>
          <ellipse cx="120" cy="116" rx="50" ry="60" fill="#7D8B9C" opacity="0.28" />
          <path d="M90 128q10 6 20 0M130 128q10 6 20 0" stroke="#6B5E66" strokeWidth="4" opacity="0.45" fill="none" strokeLinecap="round" />
          <ellipse cx="120" cy="166" rx="22" ry="6" fill="#5B5170" opacity="0.25" />
        </>
      )}
    </svg>
  );
}

const floaters: { c: string; style: CSSProperties }[] = [
  { c: "#7C3AED", style: { top: "0%", right: "0%", ["--r" as string]: "10deg", animationDelay: "0s" } },
  { c: "#F472B6", style: { top: "38%", right: "-2%", ["--r" as string]: "-8deg", animationDelay: "1.2s" } },
  { c: "#FB923C", style: { bottom: "0%", left: "0%", ["--r" as string]: "8deg", animationDelay: "0.6s" } },
  { c: "#22C55E", style: { bottom: "6%", right: "4%", ["--r" as string]: "-10deg", animationDelay: "1.8s" } },
];

export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-md px-4 py-6 sm:px-6">
      <div
        className="rounded-[2rem] p-1.5 shadow-2xl"
        style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899, #FB923C)" }}
      >
        <Image
          src="/images/hero.jpg"
          alt="Smiling woman holding a fan of pastel color swatches beside her face"
          width={1284}
          height={1225}
          priority
          sizes="(min-width: 768px) 448px, 100vw"
          className="h-auto w-full rounded-[1.65rem]"
        />
      </div>
      {floaters.map((f) => (
        <div
          key={f.c}
          aria-hidden="true"
          className="animate-float absolute w-12 rounded-xl bg-white p-1 shadow-lg sm:w-16 dark:bg-[#2e2150]"
          style={f.style}
        >
          <div className="h-8 rounded-lg sm:h-10" style={{ background: f.c }} />
          <div className="mt-1 h-1 w-2/3 rounded-full bg-black/10 dark:bg-white/20" />
        </div>
      ))}
    </div>
  );
}

export function PaletteStrip({ colors, className = "h-3" }: { colors: string[]; className?: string }) {
  return (
    <div className={`flex overflow-hidden rounded-full ${className}`} aria-hidden="true">
      {colors.map((c, i) => (
        <span key={`${c}${i}`} className="flex-1" style={{ background: c }} />
      ))}
    </div>
  );
}
