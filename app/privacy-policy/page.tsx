import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Color Analysis handles your data: quiz answers and photos are processed in your browser and never uploaded. What browser storage we use and your privacy rights.",
  path: "/privacy-policy",
});

// OWNER REVIEW: confirm your hosting provider and the jurisdiction-specific sections below with a qualified adviser before launch.
export default function PrivacyPolicyPage() {
  const email = siteConfig.contactEmail;
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      updated="October 29, 2026"
      intro={
        <p>
          This policy explains what information Color Analysis (&quot;we&quot;, &quot;us&quot;) handles when you use this website, and
          the choices you have. The short version: your quiz answers and photos stay on your device.
        </p>
      }
      sections={[
        {
          h: "Information we collect",
          body: (
            <ul>
              <li>
                <strong>Quiz answers:</strong> processed entirely in your browser. They are never sent to us or to anyone
                else.
              </li>
              <li>
                <strong>Photos:</strong> if you use the optional photo check or virtual drape, the image is read locally by
                your browser. It is never uploaded, transmitted or stored, and it&apos;s gone when you leave the page.
              </li>
              <li>
                <strong>Emails you send us:</strong> if you contact us, we receive your email address and whatever you write,
                and use them only to reply.
              </li>
              <li>
                <strong>Server logs:</strong> like almost every website, the hosting provider that delivers these pages may
                automatically record standard technical request data (such as IP address, browser type, page requested and
                time) for security and reliability. We don&apos;t use this to identify you.
              </li>
            </ul>
          ),
        },
        {
          h: "Browser storage we use",
          body: (
            <>
              <p>We use only necessary browser storage, described in detail in our <Link href="/cookie-policy">Cookie Policy</Link>:</p>
              <ul>
                <li>Your cookie consent choice (localStorage).</li>
                <li>Your light/dark theme preference, if you change it (localStorage).</li>
                <li>
                  Your in-progress quiz answers, so a refresh doesn&apos;t lose them (sessionStorage — cleared when you finish
                  the quiz or close the tab). Photos are never stored.
                </li>
              </ul>
            </>
          ),
        },
        {
          h: "Analytics, advertising and third parties",
          body: (
            <p>
              We do not use analytics, advertising, social media pixels or other tracking scripts. Fonts and images are served
              from this website itself, so loading a page doesn&apos;t contact third-party services. We don&apos;t sell or share
              personal information. If this ever changes, we&apos;ll update this policy and ask for consent first where required.
            </p>
          ),
        },
        {
          h: "Data retention",
          body: (
            <p>
              Quiz answers and photos are not retained by us at all. Emails are kept only as long as needed to respond and
              handle any follow-up, then deleted. Browser storage stays on your device until you clear it.
            </p>
          ),
        },
        {
          h: "Your rights",
          body: (
            <>
              <p>
                Because we hold almost no personal information, most requests can be answered quickly. Depending on where you
                live, you may have the following rights over any personal information we hold (such as an email you sent):
              </p>
              <ul>
                <li>
                  <strong>United Kingdom (UK GDPR):</strong> to access, correct, erase, restrict or object to processing of your
                  data, to data portability, and to complain to the Information Commissioner&apos;s Office (ICO).
                </li>
                <li>
                  <strong>Canada (PIPEDA):</strong> to access and correct your personal information, and to complain to the
                  Office of the Privacy Commissioner of Canada.
                </li>
                <li>
                  <strong>Australia (Privacy Act 1988):</strong> to access and correct your personal information, and to
                  complain to the Office of the Australian Information Commissioner (OAIC).
                </li>
                <li>
                  <strong>United States:</strong> depending on your state, privacy laws may give you rights to know about,
                  delete or correct your personal information.
                </li>
              </ul>
              <p>
                To make a request, email <a href={`mailto:${email}`}>{email}</a>.
              </p>
            </>
          ),
        },
        {
          h: "Children",
          body: (
            <p>
              This website is intended for adults and is not directed at children under 13 (or under 16 where local law
              requires). We don&apos;t knowingly collect personal information from children.
            </p>
          ),
        },
        {
          h: "Changes to this policy",
          body: <p>If this policy changes, we&apos;ll update the date at the top of this page.</p>,
        },
        {
          h: "Contact",
          body: (
            <p>
              Questions about privacy? Email <a href={`mailto:${email}`}>{email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
