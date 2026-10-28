import Image from "next/image";

// BEFORE / AFTER labels are part of the photos themselves.
const PHOTO = { width: 820, height: 804 };

const panels = [
  {
    key: "before",
    src: "/images/drape-before.jpg",
    verdict: "✗ Unflattering color",
    verdictClass: "text-[#b91c1c] dark:text-[#f87171]",
    caption: "A muted greige washes her out — skin looks flat and tired, and her features fade.",
    alt: "Before: woman with long brown hair wearing a muted greige shirt that washes out her complexion",
  },
  {
    key: "after",
    src: "/images/drape-after.jpg",
    verdict: "✓ Flattering color",
    verdictClass: "text-[#15803d] dark:text-[#4ade80]",
    caption: "Soft lavender brings out a rosy glow, brightens her eyes and evens out her skin.",
    alt: "After: the same woman wearing a lavender blazer that brightens her complexion",
  },
];

export default function DrapeComparison() {
  return (
    <>
      <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
        {panels.map((p) => (
          <figure key={p.key} className="card overflow-hidden">
            <Image
              src={p.src}
              alt={p.alt}
              width={PHOTO.width}
              height={PHOTO.height}
              sizes="(min-width: 640px) 448px, 100vw"
              className="h-auto w-full"
            />
            <figcaption className="p-5">
              <p className={`font-bold ${p.verdictClass}`}>{p.verdict}</p>
              <p className="mt-1 text-sm text-muted">{p.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        Illustrative example. Lighting and background also differ between the two photos.
      </p>
    </>
  );
}
