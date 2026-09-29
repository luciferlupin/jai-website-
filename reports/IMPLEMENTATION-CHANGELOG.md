# SEO implementation changelog

## Architecture and content

| Files | Problem | Change | Expected effect |
|---|---|---|---|
| `data/seo-content.json`, `scripts/build-seo.py` | Distinct commercial intents depended on one broad services page | Added a reviewed content model and deterministic page/sitemap generator with content gates | Clearer query-to-page mapping without programmatic city spam |
| Service pages (`website-development.html` through `speed-optimisation.html`) | Missing dedicated service explanations | Added scope, process, deliverables, limits, related links and supported Service JSON-LD | Better intent coverage and crawlable answers |
| `markets.html`, UAE/US/UK pages | International intent lacked factual landing pages | Added remote-delivery pages without office or NAP claims | Market relevance without false local signals |
| `industries*.html` | Industry expertise was scattered across portfolio and articles | Added workflow-focused hubs for supported industries | Stronger internal topical relationships |
| `guides*.html`, cost guides | Few answer-first resources supported service pages | Added planning, automation and cost-factor guides | More useful informational entry points |
| `hanboro-watches-website-case-study.html` | Work lacked a controlled proof format | Added an evidence-bounded case study with no invented outcome metrics | Safer proof and clearer service connection |
| `project-planner.html`, `js/project-planner.js` | Visitors lacked a structured requirements aid | Added a browser-only, copyable project brief generator | Useful conversion support without collecting the brief |
| `reports/keyword-map.csv` | Planned URLs did not match the implementation | Mapped implemented clusters to actual canonical URLs | Prevents cannibalization and planning drift |

## Trust, privacy and structured data

| Files | Problem | Change | Expected effect |
|---|---|---|---|
| `scripts/sanitize-public-claims.py`, public HTML | Ratings, delivery statistics, office signals and outcome claims lacked repository evidence | Removed or neutralized claims and retained proposal-dependent wording | Lower trust and policy risk |
| `scripts/sanitize-structured-data.py`, public HTML | LocalBusiness, reviews, ratings, FAQ and HowTo markup exceeded supported evidence or eligibility | Kept factual Organization, Service and Article entities; removed unsupported fields and types | Cleaner entity signals and fewer rich-result policy risks |
| `js/analytics-tracker.js` | Analytics and location data could load before permission | Added explicit opt-in, GPC/DNT handling, withdrawal, controlled event labels and no precise location collection | Data minimization and verifiable consent behavior |
| `contact.html` | WhatsApp handoff cleared the draft and could resemble a completed submission | Preserved the draft and tracked only the handoff after consent | More accurate conversion semantics |

## Crawl, deployment and performance

| Files | Problem | Change | Expected effect |
|---|---|---|---|
| `sitemap.xml`, `robots.txt`, `scripts/generate-sitemap.py` | Sitemap and crawler rules contained noisy or contradictory signals | Included canonical indexable URLs only; removed fake dates and bot-specific delays; added a repeatable sitemap generator | More deterministic crawling |
| `vercel.json`, `netlify.toml`, `.vercelignore` | Utility pages and source artifacts needed clearer handling | Added explicit noindex, security headers and deployment exclusions | Smaller public surface and safer defaults |
| `scripts/optimize-images.py`, `images/optimized/`, public HTML | Original image library was heavy | Generated 114 responsive WebP variants and wired them into markup while preserving originals | Lower delivered image bytes on supporting browsers |
| `css/seo-pages.css`, `css/privacy.css`, `js/seo-tools.js` | New content and privacy UI needed reusable presentation and behavior | Added shared responsive styling, navigation and consent UI support | Consistent rendering across new pages |

## Verification artifacts

- `scripts/seo-audit.mjs`: repeatable local technical audit.
- `scripts/crawl-live.py`: read-only live baseline crawler.
- `reports/seo/baseline-local.json`: repository baseline.
- `reports/seo/baseline-live.json`: production-origin baseline at audit time.
- `reports/seo/content-quality.json`: page-level content checks.
- `reports/seo/image-delivery.json`: source and variant inventory.
- `reports/seo/final-local.json`: final local findings.

No production deployment or search-engine submission was performed.
