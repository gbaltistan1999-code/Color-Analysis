import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FamilyView from "@/components/FamilyView";
import SeasonView from "@/components/SeasonView";
import { familyInfo, getFamily } from "@/data/families";
import { seasons } from "@/data/seasons";
import { getSeason } from "@/lib/seasons";
import { pageMetadata } from "@/lib/seo";

/** Serves both the 4 parent seasons (/seasons/spring) and the 12 sub-seasons (/seasons/soft-autumn). */
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...familyInfo.map((f) => ({ slug: f.slug })), ...seasons.map((s) => ({ slug: s.slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const family = getFamily(slug);
  if (family) {
    // e.g. "Soft, True & Deep" — the real sub-season names, in palette order.
    const subs = seasons.filter((s) => s.family === family.family).map((s) => s.name.split(" ")[0]);
    return pageMetadata({
      title: `${family.family} Color Analysis: ${subs.slice(0, -1).join(", ")} & ${subs.at(-1)} ${family.family} Explained`,
      description: `${family.family} color analysis: what ${family.tagline.toLowerCase()} coloring means, the three ${family.family} sub-seasons and how to tell which one you are.`,
      path: `/seasons/${slug}`,
    });
  }
  const season = getSeason(slug);
  if (!season) return {};
  return pageMetadata({
    title: `${season.name} Color Palette: Best Colors, Makeup & Hair`,
    description: `${season.name} color palette with HEX codes: the best colors, colors to approach with care, makeup and lipstick, hair colors and how to tell if you're a ${season.name}.`,
    path: `/seasons/${season.slug}`,
  });
}

export default async function SeasonRoute({ params }: Props) {
  const { slug } = await params;
  const family = getFamily(slug);
  if (family) return <FamilyView info={family} />;
  const season = getSeason(slug);
  if (!season) notFound();
  return <SeasonView season={season} />;
}
