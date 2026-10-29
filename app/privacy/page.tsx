import type { Metadata } from "next";
import LegalPage from "../LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 28, 2026"
      sections={[
        {
          h: "The short version",
          p: "We don't ask for an account, name or email to use the quiz, and we don't collect your answers. Everything is calculated in your browser.",
        },
        {
          h: "Photos",
          p: "If you use the virtual drape, your photo is displayed using a temporary link that exists only inside your browser tab. It is never uploaded to a server, stored or shared, and it disappears when you leave the page.",
        },
        {
          h: "Preferences",
          p: "If you switch to dark mode, that choice is saved in your browser's local storage so the site remembers it. You can clear it at any time through your browser settings.",
        },
        {
          h: "Contacting us",
          p: "If you email us, we'll use your message and address only to reply to you.",
        },
        {
          h: "Changes",
          p: "If this policy changes, we'll update the date at the top of this page.",
        },
      ]}
    />
  );
}
