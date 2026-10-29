import type { Swatch } from "@/types";

/** Labeled swatches — every color has its name and HEX in text, so nothing relies on color alone. */
export default function PaletteSwatches({ colors, label }: { colors: Swatch[]; label: string }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4" aria-label={label}>
      {colors.map((s) => (
        <li key={s.hex} className="card p-3">
          <span className="block h-24 rounded-xl ring-1 ring-black/5" style={{ background: s.hex }} aria-hidden="true" />
          <p className="mt-3 font-semibold">{s.name}</p>
          <p className="font-mono text-sm text-muted">{s.hex}</p>
        </li>
      ))}
    </ul>
  );
}
