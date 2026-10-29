import Image from "next/image";
import type { CSSProperties } from "react";

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
