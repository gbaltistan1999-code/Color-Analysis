import { useId } from "react";
import type { Visual } from "@/lib/quiz";

/** Original SVG illustrations for quiz answer tiles. All fill their container. */

const svgProps = {
  className: "h-full w-full",
  preserveAspectRatio: "xMidYMid slice",
  "aria-hidden": true,
} as const;

function Hair({ colors }: { colors: [string, string, string] }) {
  const id = useId();
  const strands = Array.from({ length: 16 }, (_, i) => {
    const x = -30 + i * 16;
    return `M${x},-10 C${x + 34},40 ${x - 22},95 ${x + 14},145 S${x - 14},205 ${x + 22},240`;
  });
  return (
    <svg viewBox="0 0 200 200" {...svgProps}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={colors[0]} />
          <stop offset="0.5" stopColor={colors[1]} />
          <stop offset="1" stopColor={colors[2]} />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={colors[1]} />
      {strands.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={i % 3 === 0 ? colors[2] : `url(#${id})`} strokeWidth={i % 3 === 0 ? 10 : 18} strokeLinecap="round" opacity={0.95} />
      ))}
      {strands.filter((_, i) => i % 2).map((d, i) => (
        <path key={`h${i}`} d={d} fill="none" stroke={colors[0]} strokeWidth="3" strokeLinecap="round" opacity="0.55" transform="translate(6 0)" />
      ))}
    </svg>
  );
}

function EyeArt({ iris, ring }: { iris: string; ring: string }) {
  const id = useId();
  const fibers = Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2;
    return { x1: 100 + Math.cos(a) * 13, y1: 75 + Math.sin(a) * 13, x2: 100 + Math.cos(a) * 31, y2: 75 + Math.sin(a) * 31 };
  });
  return (
    <svg viewBox="0 0 200 150" {...svgProps}>
      <defs>
        <linearGradient id={`${id}-skin`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EBC7AC" />
          <stop offset="1" stopColor="#D9A88A" />
        </linearGradient>
        <radialGradient id={`${id}-iris`}>
          <stop offset="0.3" stopColor={iris} stopOpacity="0.8" />
          <stop offset="0.75" stopColor={iris} />
          <stop offset="1" stopColor={ring} />
        </radialGradient>
        <clipPath id={`${id}-clip`}>
          <path d="M22,78 Q100,18 178,78 Q100,132 22,78Z" />
        </clipPath>
      </defs>
      <rect width="200" height="150" fill={`url(#${id}-skin)`} />
      <path d="M30,40 Q100,8 172,36" stroke="#5B3F2E" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.85" />
      <path d="M22,78 Q100,18 178,78 Q100,132 22,78Z" fill="#F8F3EF" />
      <g clipPath={`url(#${id}-clip)`}>
        <circle cx="100" cy="75" r="34" fill={`url(#${id}-iris)`} />
        {fibers.map((f, i) => (
          <line key={i} {...f} stroke={ring} strokeWidth="1.2" opacity="0.35" />
        ))}
        <circle cx="100" cy="75" r="12.5" fill="#0B0908" />
        <circle cx="111" cy="64" r="5.5" fill="#fff" opacity="0.9" />
        <path d="M22,78 Q100,18 178,78" fill="none" stroke="#000" strokeOpacity="0.18" strokeWidth="14" />
      </g>
      <path d="M22,78 Q100,18 178,78" fill="none" stroke="#2B1D16" strokeWidth="4.5" strokeLinecap="round" />
      {[40, 58, 78, 100, 122, 142, 160].map((x, i) => (
        <path key={x} d={`M${x},${[64, 52, 44, 41, 44, 52, 64][i]} l${(x - 100) / 12},-11`} stroke="#2B1D16" strokeWidth="2.5" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function EyeMix() {
  const eyes: [string, string][] = [
    ["#6E9FCB", "#2F4E73"],
    ["#9C8445", "#4F5A2E"],
    ["#8FA876", "#3F5536"],
    ["#4A2C1A", "#1F120A"],
  ];
  return (
    <div className="grid h-full w-full grid-cols-2 gap-0.5 bg-white/60">
      {eyes.map(([i, r]) => (
        <div key={i} className="overflow-hidden">
          <EyeArt iris={i} ring={r} />
        </div>
      ))}
    </div>
  );
}

function Skin({ tone, shade }: { tone: string; shade: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 200 200" {...svgProps}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tone} />
          <stop offset="1" stopColor={shade} />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="#F3ECE6" />
      <path d="M20,210 C24,160 58,142 82,136 L82,112 L118,112 L118,136 C142,142 176,160 180,210Z" fill={`url(#${id})`} />
      <ellipse cx="100" cy="80" rx="40" ry="50" fill={`url(#${id})`} />
      <ellipse cx="86" cy="62" rx="14" ry="9" fill="#fff" opacity="0.18" />
      <path d="M62,170 L62,200 M138,170 L138,200" stroke="#E7DCCF" strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
}

function Tee({ colors }: { colors: string[] }) {
  const id = useId();
  const shape =
    "M52,62 L82,46 Q100,60 118,46 L148,62 L174,96 L152,110 L146,100 L146,184 L54,184 L54,100 L48,110 L26,96 Z";
  return (
    <svg viewBox="0 0 200 200" {...svgProps}>
      <defs>
        <clipPath id={`${id}-l`}>
          <rect x="0" y="0" width="100" height="200" />
        </clipPath>
        <clipPath id={`${id}-r`}>
          <rect x="100" y="0" width="100" height="200" />
        </clipPath>
        <linearGradient id={`${id}-sh`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.07" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.07" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="#E9DFD4" />
      {colors.length === 1 ? (
        <path d={shape} fill={colors[0]} />
      ) : (
        <>
          <path d={shape} fill={colors[0]} clipPath={`url(#${id}-l)`} />
          <path d={shape} fill={colors[1]} clipPath={`url(#${id}-r)`} />
        </>
      )}
      <path d={shape} fill={`url(#${id}-sh)`} stroke="#000" strokeOpacity="0.08" />
      <path d="M82,46 Q100,60 118,46" fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="3" />
    </svg>
  );
}

function Fabric({ colors }: { colors: string[] }) {
  const id = useId();
  const spots = [
    { cx: 76, cy: 78, r: 54 },
    { cx: 132, cy: 90, r: 48 },
    { cx: 98, cy: 140, r: 46 },
  ];
  return (
    <svg viewBox="0 0 200 200" {...svgProps}>
      <defs>
        {colors.map((c, i) => (
          <radialGradient key={c} id={`${id}-${i}`} cx="35%" cy="30%" r="80%">
            <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.18" />
          </radialGradient>
        ))}
        <filter id={`${id}-s`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.2" />
        </filter>
      </defs>
      <rect width="200" height="200" fill="#F1EAE2" />
      {spots.map((s, i) => (
        <g key={i} filter={`url(#${id}-s)`}>
          <circle {...s} fill={colors[i % colors.length]} />
          <circle {...s} fill={`url(#${id}-${i % colors.length})`} />
        </g>
      ))}
    </svg>
  );
}

function Outfit({ top, layer, bottom }: { top: string; layer: string; bottom: string }) {
  return (
    <svg viewBox="0 0 200 200" {...svgProps}>
      <rect width="200" height="200" fill="#F1EAE2" />
      {/* trousers */}
      <path d="M70,118 L130,118 L136,196 L106,196 L100,140 L94,196 L64,196 Z" fill={bottom} />
      {/* blouse */}
      <path d="M66,44 L86,36 Q100,48 114,36 L134,44 L140,122 L60,122 Z" fill={top} stroke="#000" strokeOpacity="0.08" />
      <path d="M86,36 L100,62 L114,36" fill="none" stroke="#000" strokeOpacity="0.15" strokeWidth="2" />
      {/* open cardigan + sleeves */}
      <path d="M66,44 L86,36 L92,124 L62,124 Z" fill={layer} />
      <path d="M134,44 L114,36 L108,124 L138,124 Z" fill={layer} />
      <path d="M66,44 L46,58 L40,118 L54,120 L60,72 Z" fill={layer} />
      <path d="M134,44 L154,58 L160,118 L146,120 L140,72 Z" fill={layer} />
      <path d="M0,200 L200,200" stroke="#000" strokeOpacity="0.06" strokeWidth="6" />
    </svg>
  );
}

/** Two interlocking rings; each entry is a [highlight, shadow] metal gradient. */
function Metal({ rings }: { rings: [string, string][] }) {
  const id = useId();
  const second = rings[1] ?? rings[0];
  return (
    <svg viewBox="0 0 200 200" {...svgProps}>
      <defs>
        {[rings[0], second].map(([a, b], i) => (
          <linearGradient key={i} id={`${id}-${i}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="0.5" stopColor={b} />
            <stop offset="1" stopColor={a} />
          </linearGradient>
        ))}
      </defs>
      <rect width="200" height="200" fill="#F4EFEA" />
      <circle cx="82" cy="100" r="40" fill="none" stroke={`url(#${id}-0)`} strokeWidth="13" />
      <circle cx="124" cy="100" r="34" fill="none" stroke={`url(#${id}-1)`} strokeWidth="12" />
    </svg>
  );
}

function Pair({ colors }: { colors: [string, string] }) {
  return (
    <svg viewBox="0 0 200 200" {...svgProps}>
      <rect width="200" height="200" fill="#F4EFEA" />
      <circle cx="78" cy="100" r="52" fill={colors[0]} />
      <circle cx="126" cy="100" r="52" fill={colors[1]} stroke="#F4EFEA" strokeWidth="4" />
    </svg>
  );
}

export default function QuizVisual({ visual }: { visual: Visual }) {
  switch (visual.kind) {
    case "hair":
      return <Hair colors={visual.colors} />;
    case "eye":
      return <EyeArt iris={visual.iris} ring={visual.ring} />;
    case "eyeMix":
      return <EyeMix />;
    case "skin":
      return <Skin tone={visual.tone} shade={visual.shade} />;
    case "tee":
      return <Tee colors={visual.colors} />;
    case "fabric":
      return <Fabric colors={visual.colors} />;
    case "outfit":
      return <Outfit {...visual} />;
    case "metal":
      return <Metal rings={visual.rings} />;
    case "pair":
      return <Pair colors={visual.colors} />;
    case "text":
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#F6EFE8] to-[#EDE3F7] text-5xl" aria-hidden="true">
          {visual.text}
        </div>
      );
  }
}
