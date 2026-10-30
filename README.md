# Color Analysis

A free, private color analysis website: a 16-question quiz (with an optional in-browser photo check) that places visitors in one of 12 seasons, plus season, comparison, guide, trust and legal pages.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4 and Lucide icons. No environment variables, API keys, database, accounts or backend. Every page is statically generated.

## Run it

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # scoring unit tests (Node's built-in test runner)
npm run lint
npm run build && npm start
```

## Deploy

Any Node host works; Vercel needs no configuration. Before launch:

1. **Set your domain** in `lib/site-config.ts` (`url`). Canonicals, sitemap, robots.txt and social previews use it. It is set to `https://www.coloranalyses.app`.
2. **Legal review:** the Privacy Policy and Terms contain `OWNER REVIEW` comments. Confirm your hosting provider, add a governing-law clause, and have the jurisdiction-specific sections (UK GDPR, PIPEDA, Australian Privacy Act, US state laws) checked by a qualified adviser.
3. **Image rights:** confirm you own or have a license for every photo in `public/images/`.
4. **Search Console:** submit `/sitemap.xml` after deploying.

## Project structure

| Folder | What's in it |
| --- | --- |
| `app/` | Routes, layout, `sitemap.ts`, `robots.ts`, `not-found.tsx`, icons |
| `components/` | Header, footer, quiz, photo tool, results, cookie banner and settings, breadcrumbs, FAQ, palette swatches, season views |
| `lib/` | `quiz-scoring.ts` (pure scoring), `color.ts`, `seasons.ts` helpers, `seo.ts`, `consent.ts`, `site-config.ts` |
| `data/` | Quiz questions, the 12 seasons, parent seasons, season details, comparisons, looks |
| `types/` | Shared TypeScript types |
| `tests/` | Scoring unit tests and the 12 archetype answer sets |
| `public/images/` | Photos (hero, season portraits, quiz tiles, before/after, season map) |

### How scoring works

`lib/quiz-scoring.ts` is pure TypeScript with no React, so it is unit-testable.

- Each answer nudges three axes: warmth (undertone), depth (value), and chroma/contrast.
- The strongest axis picks the season family and sub-season, using the 12-season model.
- Each decision has a margin. The smallest margin sets the confidence (Clear match, Likely match or Close call), and flipping that decision gives the "close second" season.
- Warmth is weighted at 0.7 when choosing the dominant trait, because more questions measure temperature than lightness or softness. This is calibrated against `tests/fixtures.ts`.
- The photo check blends in at 30%.

### Adding things

- **Quiz photo tile:** add `image: "/images/quiz/your-file.jpg"` to an answer in `data/quiz-questions.ts`.
- **Season portrait:** add an entry to `seasonPhotos` in `data/seasons.ts`.
- **Optional script (e.g. analytics):** set the flag in `siteConfig.services`, wrap the script in `<ConsentGate category="analytics">`, and update the Privacy and Cookie policies.

## Keyword map

Each keyword maps to exactly one page, to avoid cannibalization.

| Page | Primary keyword | Secondary |
| --- | --- | --- |
| `/` (with the quiz) | color analysis | color analysis quiz, color analysis test, free color analysis, colour analysis (test), personal color analysis, what season am I, skin tone color analysis |
| `/seasons` | 12 season color analysis | seasonal color analysis, color season analysis, color seasons |
| `/seasons/spring` … `/winter` | spring color analysis, etc. | light/true/bright spring, etc. |
| `/seasons/[sub-season]` | [season] color palette | [season] makeup, hair color, colors to avoid |
| `/skin-undertone-test` | skin undertone test | what undertone am I, warm or cool undertone |
| `/compare/[pair]` | [season] vs [season] | how to tell them apart |
| `/faq`, `/guides` | color analysis FAQ / guides | undertone vs skin tone, drape test |

No search volumes are included. Check them in Google Keyword Planner before building more pages.

## Test results (run on Oct 29, 2026)

- **Unit tests:** 26/26 pass. They cover all 12 archetypes, close-call runner-ups, the input range, multi-select averaging and photo blending.
- **Production build and type check:** 38 static pages, no errors.
- **Lint:** no warnings.
- **Crawl** (`next start`):
  - 32 indexable pages, all reachable through internal links.
  - Unique titles, descriptions and canonicals; exactly one H1 per page.
  - Valid JSON-LD, and the sitemap matches the crawled pages exactly.
  - No third-party resource loads.
  - All 8 old URLs return 308 redirects, and unknown pages return 404.
- **Browser end-to-end** (headless Chrome), 18/18 pass:
  - Cookie consent: the banner, accept/reject/save/withdraw, persistence, and the footer settings link.
  - Quiz: the full quiz path, Back, Retake, and the result linking to its season page.
  - Photo check: photo upload and sampling, with 0 network requests during the photo step.
  - Mobile: the menu opens, and there is no horizontal scroll at 390px.
- **Lighthouse (mobile):** homepage scored 94–95 performance; 100 accessibility, best practices and SEO.
  - This used `cpuSlowdownMultiplier=1`, because the test machine's CPU benchmark is about 500. The default setting assumes a much faster machine and overstates the slowdown.
  - Season and FAQ pages scored 92–97 performance and 100 accessibility and SEO.
