import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Disclaimer",
  description:
    "Color Analysis results are approximate style guidance. Learn what affects accuracy and why an in-person draping session is the most reliable method.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      path="/disclaimer"
      updated="October 29, 2026"
      sections={[
        {
          h: "General information only",
          body: (
            <p>
              The quiz, photo check, season pages and guides on this site provide approximate style guidance for general
              informational purposes. They&apos;re a starting point for exploring colors — not a definitive diagnosis of your
              coloring.
            </p>
          ),
        },
        {
          h: "What affects accuracy",
          body: (
            <ul>
              <li>Lighting — warm bulbs, shade and direct sun all shift how colors look.</li>
              <li>Cameras — phones adjust white balance and color automatically.</li>
              <li>Screens — swatches and HEX codes look different on different displays and settings.</li>
              <li>Makeup, self-tanner, hair dye and a natural tan.</li>
              <li>How confidently you could answer each question.</li>
            </ul>
          ),
        },
        {
          h: "Not a professional service",
          body: (
            <p>
              The tool does not replace an in-person color analysis with a trained professional, which uses fabric draping in
              controlled light and remains the most accurate method. We don&apos;t hold ourselves out as certified color
              analysts.
            </p>
          ),
        },
        {
          h: "Not medical advice",
          body: (
            <p>
              The photo check reads color only. It does not assess skin health, skin conditions or any medical issue. If
              you&apos;re concerned about your skin, please see a healthcare professional.
            </p>
          ),
        },
        {
          h: "Your decisions",
          body: (
            <p>
              Any purchases or styling choices you make based on your results are your own. See our{" "}
              <Link href="/terms-and-conditions">Terms and Conditions</Link> for details.
            </p>
          ),
        },
      ]}
    />
  );
}
