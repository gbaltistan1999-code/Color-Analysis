import Link from "next/link";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description: "Color Analysis uses only necessary browser storage — no tracking cookies, analytics or advertising. See exactly what's stored and how to change it.",
  path: "/cookie-policy",
});

const storage = [
  { name: "cookie-consent", type: "localStorage", purpose: "Remembers your cookie choices so the banner doesn't reappear.", duration: "Until you clear it or withdraw consent" },
  { name: "theme", type: "localStorage", purpose: "Remembers light or dark mode, only if you switch it.", duration: "Until you clear it" },
  { name: "color-analysis-quiz", type: "sessionStorage", purpose: "Keeps in-progress quiz answers so a refresh doesn't lose them. Never includes photos.", duration: "Cleared when you finish the quiz or close the tab" },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      path="/cookie-policy"
      updated="October 29, 2026"
      intro={
        <p>
          This site does not set tracking cookies. It uses a small amount of browser storage (localStorage and
          sessionStorage, which work like cookies) that&apos;s needed for the site to work.
        </p>
      }
      sections={[
        {
          h: "Necessary storage",
          body: (
            <>
              <p>These items are needed for the site to work and are always on:</p>
              <div className="overflow-x-auto rounded-xl border border-line">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="bg-surface-2 text-ink">
                    <tr>
                      <th scope="col" className="p-3">Name</th>
                      <th scope="col" className="p-3">Type</th>
                      <th scope="col" className="p-3">Purpose</th>
                      <th scope="col" className="p-3">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {storage.map((s) => (
                      <tr key={s.name} className="border-t border-line">
                        <td className="p-3 font-mono text-xs text-ink">{s.name}</td>
                        <td className="p-3">{s.type}</td>
                        <td className="p-3">{s.purpose}</td>
                        <td className="p-3">{s.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ),
        },
        {
          h: "Analytics and marketing",
          body: (
            <p>
              {siteConfig.services.analytics || siteConfig.services.marketing
                ? "Optional analytics or marketing tools run only if you allow them in Cookie Settings."
                : "None are installed. The Analytics and Marketing switches in Cookie Settings are off by default and would only control such tools if they were added in future — and this policy would be updated first."}
            </p>
          ),
        },
        {
          h: "Third-party cookies",
          body: <p>There are none. Fonts and images are served from this website itself.</p>,
        },
        {
          h: "Changing or withdrawing your choice",
          body: (
            <>
              <p>You can review, change or withdraw your choice at any time:</p>
              <CookieSettingsButton className="btn-ghost !py-2 text-sm" />
              <p>
                You can also clear site data in your browser settings at any time. See the{" "}
                <Link href="/privacy-policy">Privacy Policy</Link> for more on how we handle information.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
