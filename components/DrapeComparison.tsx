import Image from "next/image";

/*
 * Real photo of one model (Jake Nackos, Unsplash License), shown twice with a
 * different fabric drape laid over her shoulders — the way an in-person draping
 * session works. The SVG drape uses the photo's own 900×1132 coordinate space.
 */
const PHOTO = { src: "/images/drape-model.jpg", width: 900, height: 1132 };

const DRAPE_PATH =
  "M0,1132 L0,962 C70,902 170,852 262,826 C296,915 354,996 440,1008 C526,996 572,905 588,796 C700,818 820,872 900,950 L900,1132 Z";

const panels = [
  {
    key: "before",
    label: "Before",
    verdict: "✗ Unflattering color",
    verdictClass: "text-[#b91c1c] dark:text-[#f87171]",
    caption: "Mustard casts a yellow tint, making skin look sallow and shadows more noticeable.",
    alt: "Woman wearing a mustard drape that dulls her complexion",
    colors: ["#C9A227", "#8A6E12"],
    // Mimics the color a drape reflects onto the face.
    photoFilter: "saturate(0.85) brightness(0.97) sepia(0.12)",
  },
  {
    key: "after",
    label: "After",
    verdict: "✓ Flattering color",
    verdictClass: "text-[#15803d] dark:text-[#4ade80]",
    caption: "Cool rose brightens her skin, makes her eyes pop and adds a natural healthy glow.",
    alt: "The same woman wearing a rose drape that brightens her complexion",
    colors: ["#E58FB0", "#C2386B"],
    photoFilter: "saturate(1.05) brightness(1.03)",
  },
];

function Drape({ id, colors }: { id: string; colors: string[] }) {
  return (
    <svg
      viewBox={`0 0 ${PHOTO.width} ${PHOTO.height}`}
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.72" stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
        <linearGradient id={`${id}-folds`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.22" />
          <stop offset="0.18" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="0.3" stopColor="#000" stopOpacity="0.08" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="0.7" stopColor="#000" stopOpacity="0.08" />
          <stop offset="0.84" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="-4" stdDeviation="6" floodColor="#000" floodOpacity="0.18" />
        </filter>
      </defs>
      <path d={DRAPE_PATH} fill={`url(#${id}-fill)`} filter={`url(#${id}-shadow)`} />
      <path d={DRAPE_PATH} fill={`url(#${id}-folds)`} />
    </svg>
  );
}

export default function DrapeComparison() {
  return (
    <>
      <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
        {panels.map((p) => (
          <figure key={p.key} className="card overflow-hidden">
            <div className="relative" style={{ aspectRatio: `${PHOTO.width} / ${PHOTO.height}` }}>
              <Image
                src={PHOTO.src}
                alt={p.alt}
                fill
                sizes="(min-width: 640px) 448px, 100vw"
                className="object-cover"
                style={{ filter: p.photoFilter }}
              />
              <Drape id={`drape-${p.key}`} colors={p.colors} />
              <span
                className="absolute inset-x-0 bottom-6 text-center font-display text-4xl font-extrabold uppercase tracking-wide text-white sm:text-5xl"
                style={{ textShadow: "0 2px 16px rgb(0 0 0 / 0.45)" }}
              >
                {p.label}
              </span>
            </div>
            <figcaption className="p-5">
              <p className={`font-bold ${p.verdictClass}`}>{p.verdict}</p>
              <p className="mt-1 text-sm text-muted">{p.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        Same photo with a simulated fabric drape, for illustration. Photo:{" "}
        <a
          href="https://unsplash.com/photos/IF9TK5Uy-KI"
          className="underline hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jake Nackos on Unsplash
        </a>
        .
      </p>
    </>
  );
}
