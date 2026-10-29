import Link from "next/link";
import FAQ, { type FaqItem } from "@/components/FAQ";
import SeasonCard from "@/components/SeasonCard";
import DrapeComparison from "@/components/DrapeComparison";
import { HeroIllustration, PaletteStrip } from "@/components/Illustrations";
import {
  IconArrow,
  IconBolt,
  IconBook,
  IconChat,
  IconClock,
  IconContrast,
  IconDrop,
  IconGift,
  IconHeart,
  IconLock,
  IconPalette,
  IconPhone,
  IconShield,
  IconSparkle,
  IconUserOff,
  IconWand,
} from "@/components/Icons";
import Quiz from "@/components/Quiz";
import { familyInfo } from "@/data/families";
import { seasons } from "@/data/seasons";
import { getSeason } from "@/lib/seasons";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import { faqLd, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Color Analysis — Free Color Season Quiz, No Signup",
  description:
    "Free color analysis quiz: find your color season, skin undertone and personal palette with HEX codes in about 3 minutes. No signup — answers and photos stay on your device.",
  path: "/",
  absoluteTitle: true,
});

const prepare = [
  { emoji: "☀️", title: "Natural daylight", body: "Sit facing a window. Indoor bulbs tint everything yellow or blue." },
  { emoji: "🧼", title: "Bare skin", body: "Skip makeup and self-tanner if you can — they mask your undertone." },
  { emoji: "💇", title: "Hair pulled back", body: "Keep dyed or highlighted hair away from your face; think about your natural color." },
  { emoji: "👕", title: "Neutral clothing", body: "Wear white, grey or black so a bright top doesn't reflect onto your skin." },
];

const calc = [
  { name: "Undertone", body: "Veins, jewelry, sun reaction and the whites you prefer show whether you lean warm, cool or neutral." },
  { name: "Value (depth)", body: "Your natural hair, eye and skin depth show how light or deep your overall coloring is." },
  { name: "Chroma (clarity)", body: "The colors that get you compliments show whether clear brights or soft, muted shades suit you." },
  { name: "Contrast", body: "How much your hair, skin and eyes stand apart decides whether bold or blended combinations work best." },
];

const factors = [
  { title: "Lighting", body: "Warm bulbs make everyone look warmer; overcast daylight is the most neutral." },
  { title: "Camera white balance", body: "Phones auto-correct color, which can shift a selfie warmer or cooler than real life." },
  { title: "Makeup and self-tanner", body: "Foundation and bronzer change the skin tone the photo check reads." },
  { title: "Hair dye", body: "Answer with your natural color — dyed hair can push you toward the wrong season." },
  { title: "Tanning", body: "A tan deepens your skin but doesn't change your undertone." },
  { title: "Screen settings", body: "Night mode and display settings change how swatches look on your screen." },
];

const steps = [
  {
    icon: IconChat,
    title: "Answer questions or add a selfie",
    body: "Tell us about your veins, hair, eyes and favorite colors — and add an optional selfie check at the end. About three minutes.",
  },
  {
    icon: IconWand,
    title: "We read your coloring",
    body: "Your answers are scored on undertone, depth and contrast — the three pillars of seasonal color theory.",
  },
  {
    icon: IconPalette,
    title: "Meet your season",
    body: "Get one of 12 seasons, plus a personal palette with HEX codes you can save or screenshot.",
  },
  {
    icon: IconShield,
    title: "Your privacy stays yours",
    body: "Everything runs right in your browser. Nothing is uploaded, stored or sold.",
  },
];

const features = [
  { icon: IconDrop, title: "Undertone & Season", body: "Learn whether you lean warm, cool or neutral — and which of the 12 seasons fits you best." },
  { icon: IconPalette, title: "Personal Palette", body: "Eight signature shades with names and HEX codes, ready for shopping or makeup matching." },
  { icon: IconContrast, title: "Contrast & Depth", body: "See how light or deep your coloring is and how much contrast your features carry." },
  { icon: IconSparkle, title: "Style & Makeup Tips", body: "Friendly pointers on metals, neutrals, lip colors and outfit pairings that suit you." },
];

const reasons = [
  { icon: IconBolt, title: "Instant results", body: "No waiting, no email gate. Your season appears the moment you finish." },
  { icon: IconBook, title: "Rooted in color theory", body: "Built on the well-known 12-season system used by stylists and image consultants." },
  { icon: IconClock, title: "Use it anytime", body: "Retake it after a new hair color or a summer tan and compare." },
  { icon: IconLock, title: "Private by design", body: "No accounts, no tracking of your answers. It all stays on your device." },
  { icon: IconPhone, title: "Works on any phone", body: "Big tap-friendly tiles and a layout that feels at home on small screens." },
  { icon: IconHeart, title: "Completely free", body: "Every season page, palette and tip is free to explore — no upsells." },
];

const faqs: FaqItem[] = [
  {
    q: "What is seasonal colour analysis?",
    a: "It's a way of grouping people by the natural colors of their skin, hair and eyes. Each 'season' shares a mix of undertone (warm or cool), depth (light or deep) and chroma (soft or bright), and a matching palette that tends to look harmonious.",
  },
  {
    q: "How accurate is an online quiz?",
    a: "A quiz is a great starting point, but it can't replace an in-person draping session under good lighting. Treat your result as a confident guess — then test a few colors from your palette in a mirror and trust what you see.",
  },
  {
    q: "Do I need to upload a photo?",
    a: "No. The quiz works entirely from your answers. At the end you can add an optional selfie check — it's processed only in your browser and is never uploaded or saved.",
  },
  {
    q: "Is my data saved anywhere?",
    a: "No. Your answers are processed in your browser and never sent to us. While you're mid-quiz, progress is kept in your browser's session storage so a refresh doesn't lose it; it's cleared when you finish or close the tab. We don't ask for a name, email or account.",
  },
  {
    q: "What if I'm between two seasons?",
    a: "That's really common! Neighboring seasons share colors. Read both season pages and focus on the shades that appear in both — those will be your safest bets.",
  },
  {
    q: "Can my season change?",
    a: "Your underlying undertone stays fairly steady, but hair color, tanning and aging can shift your depth and contrast. Feel free to retake the quiz whenever things change.",
  },
];

const trust = [
  { icon: IconGift, label: "100% free" },
  { icon: IconUserOff, label: "No signup" },
  { icon: IconLock, label: "Photos never leave your device" },
];

export default function Home() {
  const example = getSeason("true-summer")!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Color Analysis Quiz",
            url: `${SITE_URL}/#quiz`,
            applicationCategory: "LifestyleApplication",
            operatingSystem: "Any",
            isAccessibleForFree: true,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            description: "Free online color analysis quiz with an optional private selfie check. No signup.",
          },
          { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
          faqLd(faqs),
        ])}
      />
      {/* 2. Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--grad-hero)" }}>
        <div className="container-x grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="eyebrow">🎨 Free seasonal color analysis</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-6xl">
              Color Analysis: find the colors that make you <span className="text-primary">glow</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
              Answer a handful of playful questions and we&apos;ll match you to one of 12 color seasons — complete with a
              personal palette, makeup ideas and style tips.
            </p>
            <a href="#quiz" className="btn-primary mt-8 !px-8 !py-4 text-lg">
              Take the Free Quiz <IconArrow className="h-5 w-5" />
            </a>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {trust.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-primary shadow-sm">
                    <Icon className="h-4 w-4" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <HeroIllustration />
        </div>
      </section>

      {/* Quiz */}
      <section id="quiz" aria-label="Color analysis quiz" className="scroll-mt-16 bg-surface-2 px-4 py-12 sm:py-16">
        <Quiz />
      </section>

      {/* What color analysis is */}
      <section className="py-20" aria-labelledby="what">
        <div className="container-x max-w-3xl">
          <h2 id="what" className="section-title">
            What is color analysis? 🎨
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
            <p>
              Color analysis (or colour analysis) is a way to find the clothing, makeup and hair colors that harmonize with
              your natural coloring — your skin, hair and eyes. The right shades near your face can make skin look clearer
              and eyes brighter; the wrong ones can cast shadows.
            </p>
            <p>
              Seasonal color analysis groups these palettes into four seasons — Spring, Summer, Autumn and Winter — each split
              into three sub-seasons, for 12 in total. Every season appears across all skin tones; it&apos;s about how colors
              interact with your features, not how light or dark your skin is.
            </p>
          </div>
        </div>
      </section>

      {/* 3. How it works */}
      <section className="py-20" aria-labelledby="how">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="how" className="section-title">
              How It Works ✨
            </h2>
            <p className="mt-4 text-lg text-muted">Four quick steps from curious to confident.</p>
          </div>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="card relative p-6">
                <span className="absolute -top-3 right-5 rounded-full bg-[#7C3AED] px-3 py-1 text-xs font-bold text-white">
                  Step {i + 1}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <Icon />
                </span>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How to prepare */}
      <section className="py-20" aria-labelledby="prepare">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="prepare" className="section-title">
              How to prepare 🪞
            </h2>
            <p className="mt-4 text-lg text-muted">Two minutes of setup makes your result far more reliable.</p>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {prepare.map((p) => (
              <li key={p.title} className="card p-6">
                <span className="text-3xl" aria-hidden="true">
                  {p.emoji}
                </span>
                <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How the result is calculated */}
      <section className="bg-surface-2 py-20" aria-labelledby="calc">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="calc" className="section-title">
              How your result is calculated 🧮
            </h2>
            <p className="mt-4 text-lg text-muted">
              Each answer nudges four characteristics. Whichever stands out most decides your season — and if two are nearly
              tied, we tell you the close second instead of pretending to be precise.
            </p>
          </div>
          <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {calc.map((c) => (
              <div key={c.name} className="card p-6">
                <dt className="text-lg font-bold">{c.name}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{c.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 4. What you'll get */}
      <section className="bg-surface-2 py-20" aria-labelledby="get">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="card mx-auto w-full max-w-md p-6 sm:p-8" aria-label="Example result card">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">Example result</p>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">
                {example.emoji}
              </span>
              <div>
                <h3 className="text-2xl font-extrabold">{example.name}</h3>
                <p className="text-sm text-muted">{example.tagline}</p>
              </div>
            </div>
            <dl className="mt-6 grid grid-cols-3 gap-2 text-center">
              {[
                ["Undertone", example.undertone],
                ["Depth", example.depth],
                ["Contrast", example.contrast],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-surface-2 p-2">
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">{k}</dt>
                  <dd className="mt-0.5 text-sm font-bold">{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-6 grid grid-cols-4 gap-3">
              {example.palette.map((s) => (
                <li key={s.hex} className="text-center">
                  <span className="block aspect-square rounded-xl shadow-inner ring-1 ring-black/5" style={{ background: s.hex }} />
                  <span className="mt-1 block font-mono text-[11px] text-muted">{s.hex}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 id="get" className="section-title">
              What You&apos;ll Get 🌟
            </h2>
            <p className="mt-4 text-lg text-muted">
              More than a label — a practical little color guide made just for you.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map(({ icon: Icon, title, body }) => (
                <div key={title} className="card p-5">
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-3 font-bold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Drape comparison */}
      <section className="py-20" aria-labelledby="drape">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="drape" className="section-title">
              Same face, different colors 👀
            </h2>
            <p className="mt-4 text-lg text-muted">
              The right shade near your face can brighten skin and soften shadows. The wrong one can make you look tired.
            </p>
          </div>
          <DrapeComparison />
        </div>
      </section>

      {/* 6. Why people love it */}
      <section className="bg-surface-2 py-20" aria-labelledby="why">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="why" className="section-title">
              Why People Love This Quiz 💜
            </h2>
            <p className="mt-4 text-lg text-muted">Made to be simple, kind and genuinely useful.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="card p-6">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                  style={{ background: ["#7C3AED", "#DB2777", "#EA580C", "#0F766E", "#2563EB", "#9333EA"][i] }}
                >
                  <Icon />
                </span>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Seasons */}
      <section className="py-20" aria-labelledby="seasons">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="seasons" className="section-title">
              Meet the 12 Seasons 🌈
            </h2>
            <p className="mt-4 text-lg text-muted">Every season has its own mood. Tap one to explore its full palette.</p>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {familyInfo.map((f) => (
              <li key={f.slug}>
                <Link
                  href={`/seasons/${f.slug}`}
                  className="block rounded-2xl border border-line bg-surface p-4 text-center font-semibold transition hover:border-primary hover:text-primary"
                >
                  <span aria-hidden="true">{f.emoji} </span>
                  {f.family}
                  <span className="block text-sm font-normal text-muted">{f.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {seasons.map((s) => (
              <SeasonCard key={s.slug} season={s} />
            ))}
          </div>
        </div>
      </section>

      {/* What can affect results */}
      <section className="py-20" aria-labelledby="factors">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="factors" className="section-title">
              What can affect your results
            </h2>
            <p className="mt-4 text-lg text-muted">
              An online colour analysis test is a strong starting point, but these can nudge it off course.
            </p>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {factors.map((x) => (
              <li key={x.title} className="rounded-2xl border border-line bg-surface p-5">
                <h3 className="font-bold">{x.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{x.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="bg-surface-2 py-20" aria-labelledby="faq">
        <div className="container-x max-w-3xl">
          <h2 id="faq" className="section-title text-center">
            Questions? We&apos;ve got answers 💬
          </h2>
          <div className="mt-10">
            <FAQ items={faqs} />
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="py-20">
        <div className="container-x">
          <div
            className="relative overflow-hidden rounded-[2rem] px-6 py-16 text-center text-white sm:px-12"
            style={{ background: "var(--grad-cta)" }}
          >
            <PaletteStrip
              colors={["#FDE68A", "#FDBA74", "#F9A8D4", "#C4B5FD", "#93C5FD", "#86EFAC"]}
              className="absolute inset-x-0 top-0 h-2 !rounded-none"
            />
            <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to meet your colors? 🎨</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              Two minutes, zero signups and a palette you&apos;ll actually use. Already know your season? Explore its{" "}
              <Link href="/seasons" className="font-semibold underline">
                full palette page
              </Link>
              .
            </p>
            <Link
              href="/#quiz"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-[#6D28D9] shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Start Your Free Color Analysis <IconArrow className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
