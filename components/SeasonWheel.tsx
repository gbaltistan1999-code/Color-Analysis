import { seasons } from "@/lib/seasons";

/** Annular sector path between radii r0..r1 and angles a0..a1 (radians). */
function sector(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) {
  const p = (r: number, a: number) => `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M${p(r1, a0)} A${r1},${r1} 0 ${large} 1 ${p(r1, a1)} L${p(r0, a1)} A${r0},${r0} 0 ${large} 0 ${p(r0, a0)} Z`;
}

/** The 12 seasons as a color wheel: each wedge shows three colors from that season's palette. */
export default function SeasonWheel({ size = 260 }: { size?: number }) {
  const c = 100;
  const step = (Math.PI * 2) / seasons.length;
  const rings = [
    [44, 62],
    [62, 80],
    [80, 98],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" role="img" aria-label="Color wheel of the 12 seasons">
      {seasons.map((s, i) => {
        const a0 = -Math.PI / 2 + i * step + 0.012;
        const a1 = a0 + step - 0.024;
        return (
          <g key={s.slug}>
            <title>{s.name}</title>
            {rings.map(([r0, r1], j) => (
              <path key={j} d={sector(c, c, r0, r1, a0, a1)} fill={s.palette[[0, 2, 4][j]].hex} />
            ))}
          </g>
        );
      })}
      <circle cx={c} cy={c} r="42" fill="var(--surface)" />
      <text x={c} y={c - 2} textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--text)" fontFamily="var(--font-heading)">
        12
      </text>
      <text x={c} y={c + 14} textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--muted)">
        seasons
      </text>
    </svg>
  );
}
