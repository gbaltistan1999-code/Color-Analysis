import Link from "next/link";

export { SITE_NAME } from "@/lib/site";
import { SITE_NAME } from "@/lib/site";

/** Original mark: a six-petal color wheel around a white center. */
export function LogoMark({ size = 36 }: { size?: number }) {
  const petals = ["#7C3AED", "#EC4899", "#FB923C", "#FACC15", "#22C55E", "#3B82F6"];
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      {petals.map((c, i) => (
        <ellipse
          key={c}
          cx="20"
          cy="10.5"
          rx="6"
          ry="9"
          fill={c}
          opacity="0.92"
          transform={`rotate(${i * 60} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="6.5" fill="#fff" />
      <circle cx="20" cy="20" r="3" fill="#7C3AED" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label={`${SITE_NAME} home`}>
      <LogoMark />
      <span className="font-display text-xl font-extrabold tracking-tight text-ink">
        Hue<span className="text-primary">Muse</span>
      </span>
    </Link>
  );
}
