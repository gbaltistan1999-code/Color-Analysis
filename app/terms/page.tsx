import type { Metadata } from "next";
import LegalPage from "../LegalPage";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="October 28, 2026"
      sections={[
        {
          h: "For fun and inspiration",
          p: "Quiz results, palettes and tips are general suggestions based on seasonal color theory. They aren't professional styling, medical or dermatological advice.",
        },
        {
          h: "Free to use",
          p: "You're welcome to use the quiz and season pages for personal, non-commercial purposes at no cost.",
        },
        {
          h: "Accuracy",
          p: "Screens display colors differently, so swatches and HEX codes are approximate. Always check colors in person before buying.",
        },
        {
          h: "Content",
          p: "The text, illustrations and logo on this site are original. Please don't republish them without permission.",
        },
        {
          h: "No warranty",
          p: "The site is provided as is. We do our best to keep it working and accurate but can't guarantee it will always be available or error-free.",
        },
      ]}
    />
  );
}
