import type { Metadata } from "next";
import Link from "next/link";

// "Coming soon" pages are thin content; keep them out of search results until real posts exist.
export const metadata: Metadata = { title: "Blog", robots: { index: false, follow: true } };

export default function BlogPage() {
  return (
    <section className="py-24 text-center" style={{ background: "var(--grad-hero)" }}>
      <div className="container-x max-w-xl">
        <h1 className="text-4xl font-extrabold">The blog is coming soon ✨</h1>
        <p className="mt-4 text-lg text-muted">
          We&apos;re mixing up articles on color, style and makeup. In the meantime, our guides cover the essentials.
        </p>
        <Link href="/guides" className="btn-primary mt-8">
          Read the guides
        </Link>
      </div>
    </section>
  );
}
