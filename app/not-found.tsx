import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 text-center">
      <div className="container-x max-w-xl">
        <p className="text-6xl" aria-hidden="true">🎨</p>
        <h1 className="mt-4 text-4xl font-extrabold">This page went off-palette</h1>
        <p className="mt-4 text-lg text-muted">We couldn&apos;t find what you were looking for.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/seasons" className="btn-ghost">
            Browse the 12 seasons
          </Link>
        </div>
      </div>
    </section>
  );
}
