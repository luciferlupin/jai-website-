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

## 2026-07-30 — Hero arc, card, and milestone positioning

**Source and rendered evidence**

- Source visual truth: `/var/folders/sz/zr_fytr90z12zs7kynzxzg340000gn/T/TemporaryItems/NSIRD_screencaptureui_DgzADM/Screenshot 2026-07-30 at 10.09.23 AM.png`
- Source pixels: 1920 x 1080 including browser chrome; normalized page crop: 1728 x 881 resized to 1280 x 653 at 1x density.
- Normalized source: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-arc-source-normalized-1280x653.png`
- Browser-rendered implementation: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-arc-final-1280x653.png`
- Same-input side-by-side comparison: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-arc-source-vs-implementation.png`
- Comparison state: completed one-time process, with all four cards and milestone icons visible.

**Findings and fixes**

- P1 before fix: the desktop curve was too deep and low, the two inner cards were oversized relative to the journey, and the circular milestone icons did not sit on the rendered SVG path.
- Fix: matched the reference's shallow U-curve, high outer-card / low inner-card composition, and compact card proportions while retaining Curious Kaizer's existing card content and styling.
- Fix: replaced fixed marker top guesses with responsive cubic-Bezier coordinate calculations, keeping all four icon centers on the actual curve after resizing.
- Post-fix: the Discovery and Live cards sit above the two curve ends; Strategy and Prototype occupy the lower middle positions; all four milestones follow the curve from left to right.

**Required fidelity surfaces**

- Fonts and typography: intentionally unchanged outside the scaled process cards; the user's existing Curious Kaizer heading, CTA, and card typography remain active.
- Spacing and layout rhythm: arc width, depth, card anchors, milestone spacing, and outer-card clearances now follow the supplied composition.
- Colors and visual tokens: existing Curious Kaizer blue, green live state, white cards, shadows, and technical background remain unchanged.
- Image and icon quality: existing avatar images and Font Awesome workflow icons remain intact; the curve is a crisp 1.25 px vector stroke.
- Copy and content: no hero, navigation, CTA, card, trust-row, or later-section copy was changed.

**Responsive and regression checks**

- Desktop 1280 x 720: no horizontal overflow; all four cards complete once; milestones remain centered on the curve.
- Tablet 900 x 900: existing tablet composition remains intact with no horizontal overflow.
- Phone 390 x 844: existing single-stage phone process remains intact with no horizontal overflow.
- The edit is scoped to the desktop hero process arc, cards, and milestones; navigation, hero content, trust logos, and later sections are untouched.
- JavaScript syntax validation passed for `js/hero-process-sequence.js`.

**Comparison history**

- Pass 1 aligned the curve and card anchors but revealed markers visually overlapping the outer cards.
- Pass 2 corrected marker-to-curve math and verified exact icon centers on the curve.
- Pass 3 normalized card proportions and restored the source's high-outer / low-inner journey rhythm without changing the site's own content or styling.
- No actionable P0, P1, or P2 issue remains in the requested scope.

## 2026-07-30 — Enlarged and lowered hero process refinement

**Rendered evidence**

- Desktop implementation: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-arc-enlarged-lowered-1280x653.png`
- Source/implementation comparison: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-arc-source-vs-enlarged-lowered.png`
- Source and implementation were normalized to 1280 x 653 at 1x density.
- State: completed one-time process with all four desktop cards and milestones visible.

**Findings and fixes**

- P2 before fix: the process cards felt undersized and the overall card motion group sat slightly high.
- Fix: enlarged all four cards proportionally and lowered their desktop anchors without changing card content, animations, or surrounding hero elements.
- P2 before fix: enlarging the cards initially caused the first and last milestone circles to touch their card edges.
- Fix: lowered the visible vector curve by 24 px; the responsive cubic calculation then realigned every milestone center to that rendered curve.
- Post-fix outer-card clearance is 20.38 px at Discovery and 11.33 px at Launch, with no icon/card collision.

**Fidelity and regression checks**

- Typography, colors, images, icons, shadows, card content, and copy remain unchanged.
- Desktop 1280 x 720 has no horizontal overflow and completes with all milestones centered on the curve.
- Tablet 900 x 900 and phone 390 x 844 do not receive the desktop transform and have no horizontal overflow.
- Phone completion still stops with only the Launch card visible and the running state removed.
- The change remains scoped to the desktop hero process composition.
- No actionable P0, P1, or P2 issue remains in the requested scope.

## 2026-07-30 — Large-desktop card fill and node clearance

**Source and rendered evidence**

- Source visual truth: `/var/folders/sz/zr_fytr90z12zs7kynzxzg340000gn/T/TemporaryItems/NSIRD_screencaptureui_PpFmsX/Screenshot 2026-07-30 at 10.37.42 AM.png`
- Source page crop and implementation were normalized to 1905 x 1000 at 1x density.
- Normalized source: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-large-before-normalized-1905x1000.png`
- Browser-rendered implementation: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-large-cards-no-node-overlap-1905x1000.png`
- Same-input comparison: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-large-before-vs-after.png`
- State: completed one-time process with all four cards and milestones visible.

**Findings and fixes**

- P1 before fix: the large-desktop cards were too small for the available hero height, leaving roughly 255 px of visually unused space before the trust row.
- Fix: restored the cards to near-native desktop width, enlarged their vertical workflow areas, and lowered the process curve into the available area.
- Post-fix: the remaining card-to-trust spacing is 136 px, creating a balanced handoff to the trust row without touching that row.
- P1 before fix: the Strategy and Build milestone positions could intersect enlarged cards.
- Fix: moved the Strategy milestone to a clear position before Card 2 and retained cubic path alignment for every node.
- Automated rectangle checks at 1905 x 1000 and 1280 x 720 report zero node/card intersections.

**Required fidelity and regression checks**

- Typography and copy: unchanged.
- Colors and visual tokens: unchanged.
- Images and icon assets: existing avatars and Font Awesome workflow icons remain unchanged and crisp.
- Spacing and layout rhythm: the enlarged cards now occupy the previously empty hero band while remaining separated from the trust row.
- Desktop 1905 x 1000 and 1280 x 720 have no horizontal overflow and complete the process once.
- Tablet 900 x 900 and phone 390 x 844 remain outside the desktop override and have no horizontal overflow.
- Navigation, CTA, trust row, hero copy, and later sections were not modified.
- No actionable P0, P1, or P2 issue remains in the requested scope.

## 2026-07-30 — Wantace process-arc geometry match

**Source and rendered evidence**

- Source visual truth: `/Users/harshitgoyal/Desktop/Screenshot 2026-07-30 at 10.44.37 AM.png`
- Source pixels: 1920 x 1080. Browser chrome was removed with a 1905 x 1000 crop beginning at y=30; no density resampling was used.
- Normalized source: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-wantace-reference-normalized-1905x1000.png`
- Browser-rendered implementation: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-wantace-exact-1905x1000.png`
- Full-view same-input comparison: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-wantace-exact-source-vs-implementation.png`
- Focused process-band comparison: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-wantace-exact-process-band.png`
- CSS viewport: 1905 x 1000 at device scale 1.
- State: one-time process animation completed; `.is-complete` present and `.is-running` absent.

**Comparison history**

- P1 before fix: the implementation used a wide, deep arc and oversized cards, so its milestone rhythm did not match the reference.
- Fix: matched the reference's 59.1%-wide shallow arc, its outer endpoints, four card dimensions, asymmetric high-outer/low-inner card placement, and three visible milestone circles.
- P2 before fix: the extra code milestone crowded the prototype card, and the Strategy milestone could touch its card at narrower desktop widths.
- Fix: removed the redundant desktop code milestone and added scoped Strategy-node offsets for 901-1400 px desktop widths.
- P2 found during normalized comparison: the complete process band sat 30 px below the browser-content coordinates in the source screenshot.
- Fix: moved only the desktop arc, cards, and calculated node path upward by 30 px.
- Post-fix evidence: the focused comparison shows matching arc endpoints, curvature, card centers, and milestone order; automated rectangle checks report zero node/card intersections at 1905, 1280, 1024, and 901 px widths.

**Required fidelity surfaces**

- Fonts and typography: existing Curious Kaizer typography and brand copy were intentionally preserved; card hierarchy remains readable at the matched reference scale.
- Spacing and layout rhythm: arc x=385.5, y=468.1, width=1117, height=86 at 1905 x 1000; the four cards occupy the same high-outer/low-inner rhythm as the normalized source.
- Colors and visual tokens: existing Curious Kaizer blue and hero background remain unchanged; only the process geometry was requested.
- Image and icon quality: existing avatar assets and Font Awesome workflow icons remain crisp; no placeholder or approximate replacement asset was introduced.
- Copy and content: Curious Kaizer card workflows and CTA copy remain unchanged.

**Responsive and functional checks**

- Desktop checks at 1905 x 1000, 1280 x 720, 1024 x 768, and 901 x 900 have no horizontal overflow and no node/card collisions.
- Phone 390 x 844 remains outside the desktop override, keeps its existing mobile process behavior, and has no horizontal overflow.
- The process completes once and stops; resize-driven curve alignment remains active.
- Navigation, CTA behavior, trust row, hero text, tablet/mobile presentation, and all later sections were not modified.
- Browser console errors checked: none.
- No actionable P0, P1, or P2 finding remains in the requested scope.

## 2026-07-30 — Lowered equal-card process and verified reveal sequence

**Source and rendered evidence**

- Source visual truth: `/var/folders/sz/zr_fytr90z12zs7kynzxzg340000gn/T/TemporaryItems/NSIRD_screencaptureui_BXJf4J/Screenshot 2026-07-30 at 10.53.33 AM.png`
- Source pixels: 1920 x 1080. Browser chrome was removed with a 1905 x 1000 crop beginning at y=30; no density resampling was used.
- Normalized source: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-spacing-before-normalized-1905x1000.png`
- Browser-rendered implementation: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-equal-cards-lowered-final-1905x1000.png`
- Same-input comparison: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-spacing-before-vs-equal-lowered.png`
- Focused five-stage animation evidence: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-sequence-five-stages.png`
- CSS viewport: 1905 x 1000 at device scale 1.
- Final state: `.process-sequence` has `data-process-state="complete"` and `data-active-stage="complete"`.

**Comparison history**

- P1 before fix: the four process cards rendered at visibly different dimensions and left an oversized empty band before the trust row.
- Fix: assigned every desktop card the same 190 x 154 base frame and the same 0.88 scale, producing matching 167.2 x 135.5 rendered frames. The arc and process cards were lowered into the unused area while the heading, tags, CTA, trust row, and later sections remained fixed.
- P1 before fix: `opacity: 1 !important` on every process card defeated the reveal keyframes, so later cards were already visible while the arc was still progressing.
- Fix: restored hidden initial states and retained the existing four-stop timing. Observed sequence: Discovery only, arc to Strategy and Strategy reveal, arc to Prototype and Prototype reveal, arc to Launch and Launch reveal, then a stable completed state.
- P2 during responsive QA: the larger Strategy and Launch cards initially touched their milestone circles.
- Fix: anchored the Strategy node 125 px before the Strategy card center and lifted the Launch card clear of its endpoint node. Automated rectangle checks report zero node/card collisions at 1905, 1280, 1024, and 901 px desktop widths.

**Required fidelity surfaces**

- Fonts and typography: unchanged; the existing Curious Kaizer type hierarchy and card labels are preserved.
- Spacing and layout rhythm: all desktop cards now share one size, the process fills more of the available hero height, and the final card-to-trust transition remains clear.
- Colors and visual tokens: unchanged; existing blue, green, shadows, and background treatment remain intact.
- Image and icon quality: existing avatar assets and Font Awesome process icons remain unchanged and sharp.
- Copy and content: all Curious Kaizer headings, CTA copy, workflow labels, and trust content remain unchanged.

**Responsive and functional checks**

- Desktop widths 1905, 1280, 1024, and 901 px have no horizontal overflow, trust-row collisions, or node/card collisions.
- Phone 390 x 844 stays outside the desktop equal-card override and has no horizontal overflow.
- Timed browser sampling confirmed card opacities progress 1/0/0/0, 1/1/0/0, 1/1/1/0, and 1/1/1/1 while the arc clip advances to each stop.
- The sequence completes once, removes the running state, and does not restart.
- Browser console errors checked: none.
- No actionable P0, P1, or P2 finding remains in the requested scope.

## 2026-07-30 — Card-centered arc endpoints and lowered third card

**Source and rendered evidence**

- Source visual truth: `/var/folders/sz/zr_fytr90z12zs7kynzxzg340000gn/T/TemporaryItems/NSIRD_screencaptureui_sweubu/Screenshot 2026-07-30 at 11.03.28 AM.png`
- The source browser region was cropped from the framed desktop screenshot to 847 x 860 at 1x density.
- Normalized source: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-endpoint-source-crop-847x860.png`
- Browser-rendered implementation: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-connected-endpoints-final-top-847x860.png`
- Same-input comparison: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-endpoint-source-vs-final.png`
- State: completed one-time process at the top of the page.

**Comparison history**

- P1 before fix: the visible curve extended beyond the outer milestone circles instead of beginning and ending at them.
- Fix: the SVG now begins at 26.6% and ends at 74.3%, exactly matching the horizontal centers of the first and last cards. The video and tick nodes use those same coordinates.
- P1 before fix: the node-alignment calculation subtracted half the node height even though the node already uses a centered transform, placing node centers 17 px above the rendered curve.
- Fix: removed the double offset. At 847 x 860, measured arc-to-node deltas are 0 px on both x and y for the start and end.
- P2 before fix: the Launch card used a right-position rule that was overridden at the 601-900 px layout, so its center did not align with the tick endpoint.
- Fix: anchored the Launch card directly at 74.3% with an explicit left position. First-card/video and last-card/tick center deltas are now 0 px.
- P2 before fix: Card 3 remained visually high and could touch the ending milestone region.
- Fix: lowered Card 3 by 40 px relative to Card 2. The final layout has no unintended node/card collision.

**Required fidelity surfaces**

- Fonts and typography: unchanged.
- Spacing and layout rhythm: the curve now originates and terminates at the bottom-center milestone of its outer cards; Card 3 is visibly lower.
- Colors and visual tokens: unchanged.
- Image and icon quality: existing avatars and Font Awesome milestone icons remain unchanged and crisp.
- Copy and content: unchanged.

**Responsive and functional checks**

- Exact card-center, node-center, and arc-endpoint alignment was verified at 1905, 1280, 1024, 901, and 847 px widths.
- No horizontal overflow was introduced at those widths.
- The 390 px phone layout remains outside the new 601 px minimum and is unchanged.
- The one-time process still completes and stops.
- Browser console errors checked: none.
- No actionable P0, P1, or P2 finding remains in the requested scope.

## 2026-07-30 — Card 3 slight upward adjustment

**Source and rendered evidence**

- Source visual truth: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-connected-endpoints-final-top-847x860.png`
- Browser-rendered implementation: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-card3-slightly-up-847x860.png`
- CSS viewport: 847 x 860 at device scale 1.
- State: completed one-time process at the top of the page.
- Focused comparison was sufficient because the request changes one existing desktop card coordinate only; the previous full-view source comparison remains `/Users/harshitgoyal/jai website/design-reference/section-heading-system/hero-endpoint-source-vs-final.png`.

**Findings and verification**

- Requested refinement: Card 3 moved upward by 15 px, from `top: 237px` to `top: 222px`.
- Card 3 remains 25 px lower than Card 2, preserving the intended stepped process flow without over-lifting it.
- Fonts and typography, colors and visual tokens, image/icon quality, copy/content, card size, horizontal placement, arch geometry, node positions, and animation timing are unchanged.
- Browser measurement confirmed equal Card 2/Card 3 rendered dimensions, no node/card collisions, no horizontal overflow, all four cards visible after completion, and the process still finishes once in its `complete` state.
- Browser console errors checked: none.
- No actionable P0, P1, or P2 finding remains in the requested scope.

## 2026-08-05 — Homepage Case Studies aligned to Portfolio layout

**Source and rendered evidence**

- Source visual truth: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/portfolio-layout-reference-1280x900.png`
- Browser-rendered implementation: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/case-studies-portfolio-layout-1280x900.png`
- Same-input comparison: `/Users/harshitgoyal/jai website/design-reference/section-heading-system/portfolio-reference-vs-home-case-studies.png`
- CSS viewport: 1280 x 900 at device scale 1.
- State: homepage Case Studies heading and first project row visible; Portfolio page first project row used as the visual reference.

**Comparison history**

- P1 before fix: homepage projects were enclosed in large white rounded cards with heavy internal padding, while the Portfolio reference uses open two-column project rows on the page background.
- Fix: scoped the homepage Case Studies cards to the Portfolio row geometry: content-left/image-right grid, transparent project surface, full-width visual frame, subtle row divider, Portfolio typography scale, and matching vertical rhythm.
- Post-fix: the project row composition, image proportion, content alignment, background treatment, border radius, shadow treatment, and section spacing follow the Portfolio reference while retaining the homepage's original project copy and checklist content.

**Required fidelity surfaces**

- Fonts and typography: the existing site font stack is preserved; project brand, title, checklist hierarchy, weight, line height, and spacing now follow the Portfolio detail presentation.
- Spacing and layout rhythm: desktop rows use the Portfolio 1fr/1.2fr split, 4rem column gap, 6rem row gap, and 4rem divider spacing.
- Colors and visual tokens: project shells are transparent, visual frames use the Portfolio neutral surface and border, and existing brand accent colors remain intact.
- Image quality and asset fidelity: every original project image is reused at its natural ratio with no crop, replacement, placeholder, or generated asset.
- Copy and content: the Case Studies label, heading, subtitle, project names, titles, checklist copy, and image alt text are unchanged.

**Responsive and regression checks**

- The scoped mobile rule collapses each project row to one column below 768 px while retaining the Portfolio order: content first, image second.
- Desktop browser measurement confirmed a 1152 px row, 494.5/593.5 px columns, no horizontal overflow, a transparent project surface, zero card shadow, and the expected divider treatment.
- The change is contained inside `.portfolio-case-studies`; navigation, hero, earlier homepage sections, footer, Portfolio page, and project content are untouched.
- Browser console errors checked: none.
- No actionable P0, P1, or P2 finding remains in the requested scope.

final result: passed
