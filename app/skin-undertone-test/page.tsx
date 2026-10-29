import type { Metadata } from "next";
import Link from "next/link";
import FAQ, { type FaqItem } from "@/components/FAQ";
import UndertoneTest, { SelfieDrape } from "@/components/UndertoneTest";
import { jsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Skin Undertone Test: Warm, Cool or Neutral? (Free)",
  description:
    "What undertone am I? Take this free skin undertone test — four quick checks plus a private virtual draping tool with your selfie. Find out if you're warm, cool or neutral.",
  alternates: { canonical: "/skin-undertone-test" },
};

const faqs: FaqItem[] = [
  {
    q: "What's the difference between skin tone and undertone?",
    a: "Skin tone is your surface color — fair, medium, deep — and it changes with a tan. Undertone is the subtle hue underneath (golden, pink or a mix) and stays the same your whole life.",
  },
  {
    q: "Do green veins mean a warm undertone?",
    a: "Usually, yes. Veins look green when seen through yellow-leaning skin, which points to a warm undertone. Blue or purple veins tend to point to cool. If you see both, you may be neutral.",
  },
  {
    q: "How does the virtual draping test work?",
    a: "You add a selfie and switch between warm and cool colors around your face. Look for the colors that even out your skin and brighten your eyes. Your photo stays in your browser — it's never uploaded.",
  },
  {
    q: "Can an olive undertone be warm or cool?",
    a: "Olive skin has a greenish cast and is often read as neutral. Many olive-skinned people do best with muted, slightly warm colors, but the draping test is the best way to check.",
  },
];

export default function UndertonePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        })}
      />
      <section style={{ background: "var(--grad-hero)" }}>
        <div className="container-x py-14 text-center">
          <span className="eyebrow">☀️ ❄️ Warm, cool or neutral?</span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Free Skin Undertone Test</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            What undertone am I? Your undertone is the subtle hue beneath your skin&apos;s surface. Four quick checks and
            a private virtual drape will point you in the right direction — no signup needed.
          </p>
        </div>
      </section>
      <div className="container-x max-w-3xl space-y-10 py-14">
        <UndertoneTest />
        <SelfieDrape />
        <section aria-labelledby="undertone-faq">
          <h2 id="undertone-faq" className="text-2xl font-bold">
            Undertone questions, answered
          </h2>
          <div className="mt-5">
            <FAQ items={faqs} />
          </div>
          <p className="mt-6 text-muted">
            Know your undertone? Take the{" "}
            <Link href="/quiz" className="font-semibold text-primary underline">
              free color analysis quiz
            </Link>{" "}
            to find your full color season, or read{" "}
            <Link href="/compare/warm-vs-cool-undertone" className="font-semibold text-primary underline">
              warm vs cool undertone
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
}
