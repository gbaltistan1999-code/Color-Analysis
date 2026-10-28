import type { Metadata } from "next";
import UndertoneTest, { SelfieDrape } from "@/components/UndertoneTest";

export const metadata: Metadata = {
  title: "Undertone Test",
  description: "Find out if your skin has a warm, cool or neutral undertone with four quick checks and a private virtual drape.",
};

export default function UndertonePage() {
  return (
    <>
      <section style={{ background: "var(--grad-hero)" }}>
        <div className="container-x py-14 text-center">
          <span className="eyebrow">☀️ ❄️ Warm, cool or neutral?</span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Quick Undertone Test</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Your undertone is the subtle hue beneath your skin&apos;s surface. Four quick checks will point you in the
            right direction.
          </p>
        </div>
      </section>
      <div className="container-x max-w-3xl space-y-10 py-14">
        <UndertoneTest />
        <SelfieDrape />
      </div>
    </>
  );
}
