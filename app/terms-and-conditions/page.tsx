import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "Terms for using the Color Analysis website, quiz and photo tool: acceptable use, intellectual property, accuracy and liability.",
  path: "/terms-and-conditions",
});

// OWNER REVIEW: add your governing law / jurisdiction and have these terms checked by a qualified adviser before launch.
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      path="/terms-and-conditions"
      updated="October 29, 2026"
      intro={<p>By using this website you agree to these terms. If you don&apos;t agree, please don&apos;t use the site.</p>}
      sections={[
        {
          h: "Using the site",
          body: (
            <p>
              You may use the quiz, photo tool and season pages for free, for personal, non-commercial purposes. Please
              don&apos;t misuse the site — for example by attempting to disrupt it, scraping it at scale, or using it for anything
              unlawful.
            </p>
          ),
        },
        {
          h: "Intellectual property",
          body: (
            <p>
              The text, palettes, illustrations, logo and code on this site belong to Color Analysis or are used with
              permission or under license. You may share links to any page, but please don&apos;t republish our content or images
              without permission.
            </p>
          ),
        },
        {
          h: "Accuracy of results",
          body: (
            <>
              <p>
                Quiz and photo results are approximate style guidance. Lighting, cameras, screens, makeup, hair dye and tanning
                all affect how colors look, and the photo check only supports your quiz answers. Swatch colors and HEX codes
                will also look different on different screens.
              </p>
              <p>
                Results are not a substitute for an in-person professional color analysis, and they don&apos;t assess skin health
                or any medical condition. See our <Link href="/disclaimer">Disclaimer</Link>.
              </p>
            </>
          ),
        },
        {
          h: "Availability",
          body: (
            <p>
              We aim to keep the site available and working, but we can&apos;t guarantee it will always be online, error-free or
              unchanged. We may update, change or remove features at any time.
            </p>
          ),
        },
        {
          h: "Disclaimer of warranties",
          body: <p>The site is provided &quot;as is&quot; and &quot;as available&quot;, without warranties of any kind, to the extent permitted by law.</p>,
        },
        {
          h: "Limitation of liability",
          body: (
            <p>
              To the extent permitted by law, Color Analysis is not liable for any loss arising from your use of the site or
              reliance on its results — for example, purchases made based on a palette. Nothing in these terms limits liability
              that cannot be limited under applicable law, including consumer rights in your country.
            </p>
          ),
        },
        {
          h: "Privacy",
          body: (
            <p>
              How we handle information is explained in our <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
              <Link href="/cookie-policy">Cookie Policy</Link>.
            </p>
          ),
        },
        {
          h: "Changes to these terms",
          body: <p>We may update these terms; the date at the top shows the latest version. Continued use means you accept the changes.</p>,
        },
        {
          h: "Contact",
          body: (
            <p>
              Questions about these terms? Email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
