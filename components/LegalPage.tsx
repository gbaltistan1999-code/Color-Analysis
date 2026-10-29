import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";

/** Shared layout for About and the legal pages. */
export default function LegalPage({
  title,
  path,
  updated,
  intro,
  sections,
}: {
  title: string;
  path: string;
  updated?: string;
  intro?: ReactNode;
  sections: { h: string; body: ReactNode }[];
}) {
  return (
    <div className="container-x max-w-3xl py-12">
      <Breadcrumbs items={[{ name: title, path }]} />
      <h1 className="mt-4 text-4xl font-extrabold">{title}</h1>
      {updated && <p className="mt-2 text-sm text-muted">Last updated {updated}</p>}
      {intro && <div className="mt-5 text-lg leading-relaxed text-muted">{intro}</div>}
      <div className="card mt-8 space-y-8 p-6 sm:p-8">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-xl font-bold">{s.h}</h2>
            <div className="prose-legal mt-2 space-y-3 leading-relaxed text-muted">{s.body}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
