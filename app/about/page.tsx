import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "About Color Analysis: a free, private color analysis quiz built on the seasonal color system. How the tool works, where the method comes from, and its limits.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <LegalPage
      title="About Us"
      path="/about"
      intro={
        <p>
          Color Analysis is a free website that helps you find the clothing, makeup and hair colors that suit your natural
          coloring. There&apos;s no signup, no paywall and no account — the quiz and the optional photo check run entirely in
          your browser.
        </p>
      }
      sections={[
        {
          h: "What we offer",
          body: (
            <ul>
              <li>
                A <Link href="/#quiz">color analysis quiz</Link> that places you in one of 12 seasons, with a confidence level and
                a close second when your answers sit on a border.
              </li>
              <li>An optional selfie check that samples skin, hair and eye colors on your device.</li>
              <li>
                A page for each of the <Link href="/seasons">12 seasons</Link> and four parent seasons, with palettes, HEX codes,
                makeup, hair and jewelry suggestions.
              </li>
              <li>
                A <Link href="/skin-undertone-test">skin undertone test</Link>, side-by-side season comparisons and beginner{" "}
                <Link href="/guides">guides</Link>.
              </li>
            </ul>
          ),
        },
        {
          h: "How the quiz works",
          body: (
            <>
              <p>
                Each answer nudges four characteristics used in seasonal color analysis: undertone (warm or cool), value
                (light or deep), chroma (bright or soft) and contrast. The characteristic that stands out most decides your
                season family and sub-season. If two characteristics are nearly tied, the result says so and names the
                runner-up, rather than presenting a falsely precise answer.
              </p>
              <p>
                The scoring is plain, deterministic logic — not an AI model — and it&apos;s explained on the{" "}
                <Link href="/#calc">homepage</Link>. The photo check is weighted at 30% because lighting and cameras distort
                color.
              </p>
            </>
          ),
        },
        {
          h: "Where seasonal color analysis comes from",
          body: (
            <>
              <p>
                The idea traces back to Johannes Itten (1888–1967), a Swiss painter and Bauhaus teacher who observed that his
                students&apos; favorite color combinations tended to echo their own coloring, and who described color
                harmonies in seasonal terms. American color consultant Suzanne Caygill developed a seasonal approach to
                personal color in the mid-20th century, and Carole Jackson&apos;s 1980 book <em>Color Me Beautiful</em>{" "}
                brought the four-season system to a wide audience.
              </p>
              <p>
                Later practitioners expanded the four seasons into 12 sub-seasons (and some systems into 16) to better fit
                people who sit between the classic groups. This site uses the widely used 12-season model.
              </p>
            </>
          ),
        },
        {
          h: "What we don't do",
          body: (
            <ul>
              <li>We don&apos;t upload, store or sell your quiz answers or photos.</li>
              <li>We don&apos;t run analytics, advertising or tracking scripts.</li>
              <li>We don&apos;t publish invented reviews, ratings, testimonials or user numbers.</li>
              <li>
                We don&apos;t claim the quiz replaces an in-person draping session with a trained color analyst — see our{" "}
                <Link href="/disclaimer">disclaimer</Link>.
              </li>
            </ul>
          ),
        },
        {
          h: "Inclusive by design",
          body: (
            <p>
              Every season includes people of every skin depth and background. Seasons describe how colors interact with
              your features — not how light or dark your skin is — and no season is better than another.
            </p>
          ),
        },
        {
          h: "Contact",
          body: (
            <p>
              Questions, corrections or feedback are welcome at{" "}
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>, or through the{" "}
              <Link href="/contact">contact page</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
