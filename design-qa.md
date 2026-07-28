# Hero Process Arch QA

**Source visual truth**

- Reference: `/Users/harshitgoyal/jai website/hero-reference-positioning.png`
- Focused reference crop: `/Users/harshitgoyal/jai website/hero-moving-arch-reference-focus.jpg`
- Desktop viewport reference: `/Users/harshitgoyal/jai website/hero-viewport-reference.png`
- Target: a thin, shallow process arch that begins at the Discovery card's bottom-center and finishes at the Live card's bottom-center.

**Rendered implementation**

- Local route: `http://127.0.0.1:8080/index.html`
- Desktop moving-state capture: `/Users/harshitgoyal/jai website/hero-real-arch-desktop.jpg`
- Desktop completed-state capture: `/Users/harshitgoyal/jai website/hero-real-arch-full.jpg`
- Background-track removal capture: `/Users/harshitgoyal/jai website/hero-arch-no-background-track.jpg`
- Mobile capture: `/Users/harshitgoyal/jai website/hero-real-arch-mobile.jpg`
- Focused side-by-side comparison: `/Users/harshitgoyal/jai website/hero-real-arch-comparison.png`
- Desktop viewport capture: `/Users/harshitgoyal/jai website/hero-viewport-desktop-final.jpg`
- Desktop viewport comparison: `/Users/harshitgoyal/jai website/hero-viewport-desktop-comparison.png`
- One-time process contact sheet: `/Users/harshitgoyal/jai website/hero-process-sequence-contact-sheet.png`
- Mobile Card 2 stage: `/Users/harshitgoyal/jai website/hero-process-mobile-stage-2.jpg`
- Mobile completed stage: `/Users/harshitgoyal/jai website/hero-process-mobile-complete.jpg`

**Implementation evidence**

- The two raster arch images were removed from the homepage markup.
- The process line is one inline SVG with a vector path and `vector-effect: non-scaling-stroke`.
- The faint background track was removed; the SVG now contains only the moving 1.5 px progress path.
- The progress path animates from `stroke-dashoffset: 100` to `0` over 5.6 seconds.
- Live animation verification measured different dash offsets 700 ms apart: `14.4427px` then `3.86755px`.
- The hero cards remain crisp white while the surrounding canvas now uses the requested Wantace-style technical background.

**Geometry evidence**

- Desktop viewport: 1470 x 923 CSS px.
- Desktop left endpoint to Discovery bottom-center: 0 px horizontal and 0.14 px vertical difference.
- Desktop right endpoint to Live bottom-center: 0.03 px horizontal and 0.13 px vertical difference.
- Mobile viewport: 390 x 844 CSS px.
- Mobile left endpoint to Discovery bottom-center: 0 px horizontal and 0.14 px vertical difference.
- Mobile right endpoint to Live bottom-center: 0 px horizontal and 0.11 px vertical difference.
- No horizontal document overflow was found at either checked viewport.

**Desktop viewport match**

- Reference screenshot: 1920 x 1080 px including the 30 px Safari toolbar.
- Matched page viewport: 1920 x 1050 CSS px.
- Hero content begins at 150 px, service tags at 270 px, CTA at 381 px, and the journey flow at 280 px.
- Trust row begins at 748 px.
- The first portfolio row begins at 895 px, leaving the same partial next-section reveal visible at the bottom of the reference.
- The large-desktop hero is 787 px tall instead of forcing a second full viewport.
- The desktop-only changes are scoped to `min-width: 1200px`.
- Mobile regression at 390 x 844 retained the previous arch endpoint deltas and showed no horizontal overflow.

**Visual findings**

- The line is crisp at both checked sizes with round caps and geometric path rendering.
- During the partial animation state, the undrawn portion is fully clear with no transparent path visible behind it.
- Strategy and Prototype retain their existing content and now sit cleanly in sequence over the curve.
- The completed path is visually continuous from the first card to the last card.
- The rest of the hero, navigation, CTA, trust row, and page content remain unchanged.

**Interaction checks**

- The previously verified hero CTA still targets `contact.html`.
- Reduced-motion mode renders the completed arch without animation.
- The live preview was restored to the homepage at desktop size.

**One-time process sequence**

- At 0.25 seconds, Discovery is visible while Cards 2–4 remain hidden and the arch is fully clipped.
- At 1.80 seconds, the arch pauses at Strategy and Strategy reveals.
- At 3.40 seconds, the arch pauses at Prototype and Prototype reveals.
- At 5.10 seconds, the completed arch reaches Launch and Launch reveals.
- At 6.20 seconds, the flow state is `complete`; all four cards and both nodes are fully visible.
- At 8.20 seconds, the state is unchanged, confirming the sequence does not replay.
- On completion, the running class is removed and the arch, cards, scan line, status dots, prototype bars, badge, and confetti all report `animation: none`.
- Discovery avatars, Strategy scan/status, Prototype bars/status, Launch badge, and confetti each use one-time activity animations during their reveal.

**Responsive process geometry**

- Desktop calculated clip stops: 62.404% at Strategy and 25.006% at Prototype.
- Tablet calculated clip stops: 72.849% at Strategy and 25.492% at Prototype.
- Mobile calculated clip stops: 82.348% at Strategy and 13.870% at Prototype.
- The stops are recalculated from the live card centers on resize instead of using fixed breakpoint guesses.
- Tablet at 768 x 900 retained endpoint deltas within 0.14 px and had no horizontal overflow.
- Mobile at 390 x 844 completed and remained stopped with all four cards visible and no horizontal overflow.

**Severity review**

- No actionable P0, P1, P2, or P3 issue remains for the requested one-time process sequence, responsive arch, card alignment, or desktop viewport framing.

## Wantace Homepage Background QA

**Source capture**

- Live source: `https://wantace.com/`
- Desktop source was captured top-to-bottom at 1920 x 1050 across 14 viewport stops.
- Mobile source was captured top-to-bottom at 390 x 844 across 27 viewport stops.
- Desktop source contact sheet: `/Users/harshitgoyal/jai website/design-reference/wantace/desktop-contact.jpg`
- Mobile source contact sheet: `/Users/harshitgoyal/jai website/design-reference/wantace/mobile-contact.jpg`

**Matched background system**

- Page canvas uses the source `#f0f0f0` gray.
- The opening viewport uses the locally hosted desktop and mobile circuit-art variants.
- Process, expertise, testimonials, and booking sections use the source 355 px repeating technical grid; mobile uses the source 296 px size.
- Technology and FAQ use the source transition dividers plus the responsive full-width circuit canvases.
- The built-work section uses the source alternate monochrome grid.
- The footer combines the source-style blue vertical gradient with the technical grid.
- All eight source background files are stored locally under `images/backgrounds/`; the live Wantace site is not hotlinked.

**Visual comparison**

- Desktop source/local comparison: `/Users/harshitgoyal/jai website/design-reference/wantace/desktop-source-local-compare.jpg`
- Mobile hero source/local comparison: `/Users/harshitgoyal/jai website/design-reference/wantace/mobile-top-source-local.jpg`
- Mobile section background audit: `/Users/harshitgoyal/jai website/design-reference/wantace/local-mobile-background-audit.jpg`
- Final desktop hero capture: `/Users/harshitgoyal/jai website/design-reference/wantace/local-desktop-final-top.jpg`

**Responsive and regression checks**

- Desktop verified at 1920 x 1050; document width is 1905 px inside the scrollbar with no horizontal overflow.
- Mobile verified at 390 x 844; document width is 375 px inside the scrollbar with no horizontal overflow.
- Browser console returned no warnings or errors.
- The hero process still reaches `is-complete`, removes the running state, and reports `animation: none`.
- Navigation, content, cards, arch geometry, CTA destinations, and section layout were not altered by the background implementation.
- Final local preview is open at the homepage hero.

## Hero Card Workflow and Mobile Stage QA

**Reference and local captures**

- Wantace mobile process reference: `/Users/harshitgoyal/jai website/design-reference/wantace/wantace-mobile-flow-contact.jpg`
- Local desktop workflow sequence: `/Users/harshitgoyal/jai website/design-reference/wantace/hero-workflows-desktop-new-contact.jpg`
- Local mobile workflow sequence: `/Users/harshitgoyal/jai website/design-reference/wantace/hero-workflows-mobile-contact.jpg`
- Final aligned desktop: `/Users/harshitgoyal/jai website/design-reference/wantace/hero-workflows-desktop-final-aligned.jpg`
- Final aligned tablet: `/Users/harshitgoyal/jai website/design-reference/wantace/hero-workflows-tablet-final-aligned.jpg`
- Final normal-entry phone layout: `/Users/harshitgoyal/jai website/design-reference/wantace/hero-workflows-mobile-base.jpg`

**Workflow content**

- Discovery Call now animates a two-person meeting connection with participant avatars, presence badges, call controls, and a live-call state.
- Strategy Plan now animates Goals, Priorities, and Roadmap planning tiles with a three-step sprint progress indicator.
- The former 48-hour card is now `4h Prototype` and animates UI, API, and QA build stages to 100%.
- Production Deploy now animates Code to Build to Live with a production version and final live status.
- Generic check nodes were replaced by purpose-specific Plan and Build icons.
- All micro-interactions run only during their assigned stage; the completed state reports no active animation names and does not replay.

**Responsive behavior**

- Desktop at 1920 x 1050 finishes with all four cards visible, no horizontal overflow, and the arch aligned to the first and last card bottom centers within 0.11 px vertically and 0.04 px horizontally.
- Tablet at 768 x 900 retains all four workflow cards, has no horizontal overflow, and keeps both arch endpoints within 0.58 px of their card centers.
- Phone at 390 x 844 follows the reference composition with one centered active card at a time and a dedicated Meet, Plan, Build, or Launch stage indicator below the line.
- At phone completion only Production Deploy remains visible, the sequence state is `complete`, active animation names are empty, and document width remains 375 px inside the 390 px viewport.
- Browser diagnostics returned no console warnings or errors.
- The implementation is scoped to the hero process; navigation, CTA destinations, trust content, portfolio, and later homepage sections remain unchanged.

## Original Desktop Card Restoration QA

**Source and implementation evidence**

- Source visual truth: the original committed desktop section styles rendered from `HEAD`.
- Source contact sheet: `/Users/harshitgoyal/jai website/design-reference/desktop-card-restore/original-contact.png`
- Restored implementation contact sheet: `/Users/harshitgoyal/jai website/design-reference/desktop-card-restore/after-contact.png`
- Same-input comparison, original left and restored right: `/Users/harshitgoyal/jai website/design-reference/desktop-card-restore/original-left-restored-right.png`
- Browser viewport: 1315 x 842 CSS px at desktop density.
- Source and implementation contact sheets: 1240 x 1191 px each; combined comparison: 2480 x 1191 px.

**Audit findings and fix**

- P1 before fix: a Wantace-inspired desktop composition override replaced the original process timeline, stacked capability cards, bento proportions, built-work grid, portfolio cards, FAQ cards, booking card, section spacing, and desktop header sizing.
- Fix: retired that desktop-only override while retaining the requested technical background, hero process workflow, and phone-only single-stage composition.
- Post-fix visual evidence shows the original vertical process timeline, large stacked capability cards, original bento grid, built-work cards, case-study layout, FAQ accordion, booking section, testimonials, and footer styling.

**Fidelity checks**

- Fonts and typography: original section heading, card title, body-copy, and badge rules are active again.
- Spacing and layout rhythm: original grids, sticky stacking, card dimensions, section heights, padding, radii, and shadows are active again.
- Colors and visual tokens: original card colors and state colors match; the previously requested technical page background remains intentionally applied.
- Image quality and assets: original project images, crops, browser mockups, and portfolio artwork remain unchanged.
- Copy and content: no desktop section copy was changed.
- Computed-style comparison across process, capabilities, bento, built-work, portfolio, FAQ, and booking selectors returned zero differences from the original committed card rules.
- Desktop hero regression at 1315 x 842 completes once with all four workflow cards visible, the phone stage hidden, no active animations after completion, and no horizontal overflow.
- Browser diagnostics returned no warnings or errors; JavaScript syntax and `git diff --check` passed.

**Comparison history**

- First comparison identified the desktop composition override as the shared cause of the card-style regression.
- After retiring the override, the same selectors matched the original computed card styles exactly and the visual comparison showed no remaining P0, P1, or P2 card-style mismatch.

## 2026-07-29 — Site-wide visual consistency

**Scope**

- Reused the homepage footer across all 24 public HTML pages through the shared site script.
- Removed decorative footer stars everywhere.
- Applied the homepage technical background canvas to every non-home page.
- Preserved desktop navigation, card proportions, horizontal capability layouts, and the technology orbit through the tablet range above 768px.
- Removed the white technology-orbit edge masks.
- Removed the capability card border and restored enough trailing sticky space for the seventh card to settle into the same overlap position as cards one through six.

**Responsive checks**

- Desktop: 1315 x 842 CSS px — full navigation, horizontal capability cards, 760px technology orbit, four-column footer, no horizontal overflow.
- Tablet: 900 x 900 CSS px — desktop navigation and card composition retained, four-column footer retained, no horizontal overflow.
- Phone: 390 x 844 CSS px — mobile navigation and phone process stage retained, single-column footer retained, no horizontal overflow.

**Cross-page checks**

- Runtime inspection passed on Services, Contact, Portfolio, Pricing, Privacy, and a representative blog article.
- Each checked page received `home-wantace-background shared-home-background`, the shared `footer-wantace`, zero footer sparkles, and the homepage grid image.
- All public page references to `js/scripts.js` use the same cache-busted version so the shared footer and background initialize immediately.

**Visual and code evidence**

- Before/after comparison: `/Users/harshitgoyal/jai website/design-reference/site-consistency-fix/before-after-comparison.png`
- Desktop capability stack: `/Users/harshitgoyal/jai website/design-reference/site-consistency-fix/after-expertise.png`
- Seventh-card final overlap: `/Users/harshitgoyal/jai website/design-reference/site-consistency-fix/after-seventh-card.png`
- Technology orbit without white masks: `/Users/harshitgoyal/jai website/design-reference/site-consistency-fix/after-technology.png`
- Shared Services footer: `/Users/harshitgoyal/jai website/design-reference/site-consistency-fix/after-services-footer.png`
- Tablet capability stack: `/Users/harshitgoyal/jai website/design-reference/site-consistency-fix/after-tablet-expertise.png`
- Tablet technology orbit: `/Users/harshitgoyal/jai website/design-reference/site-consistency-fix/after-tablet-technology.png`
- `node --check js/scripts.js`, `node --check js/hero-process-sequence.js`, and `git diff --check` passed.
- Browser diagnostics returned no warnings or errors.

final result: passed
