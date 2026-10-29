import Link from "next/link";
import { breadcrumbLd, jsonLd } from "@/lib/seo";

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. The last item is the current page. */
export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbLd(trail))} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {trail.map((it, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={it.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page">{it.name}</span>
                ) : (
                  <>
                    <Link href={it.path} className="font-semibold text-primary hover:underline">
                      {it.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
