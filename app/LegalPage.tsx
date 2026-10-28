export default function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { h: string; p: string }[];
}) {
  return (
    <div className="container-x max-w-3xl py-14">
      <h1 className="text-4xl font-extrabold">{title}</h1>
      <p className="mt-2 text-sm text-muted">Last updated {updated}</p>
      <div className="card mt-8 space-y-6 p-6 sm:p-8">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-xl font-bold">{s.h}</h2>
            <p className="mt-2 leading-relaxed text-muted">{s.p}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
