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

## 2026-08-13 — Apple-inspired industry solutions showcase

**Source and rendered evidence**

- Source visual truth: `/Users/harshitgoyal/Desktop/Screenshot 2026-08-13 at 11.46.58 AM.png`
- Browser-rendered desktop implementation: `/Users/harshitgoyal/jai website/design-reference/industry-apple/industry-after-1440x900.png`
- Browser-rendered mobile implementation: `/Users/harshitgoyal/jai website/design-reference/industry-apple/industry-mobile-390x844.png`
- Side-by-side comparison: `/Users/harshitgoyal/jai website/design-reference/industry-apple/industry-comparison.png`
- Verified viewports: 1440 x 900 desktop and 390 x 844 phone.

**Comparison history**

- P1 before fix: the six-item industry selector exceeded its available width and clipped the final `Legal & CA` item.
- Fix: rebuilt the selector as an equal-width six-column segmented control on desktop, three columns on tablet, and two columns on phone. All six industries are now fully visible with equal hit areas.
- P2 before fix: the main showcase used small type, tight internal spacing, and a visually flat card/window treatment that weakened hierarchy.
- Fix: added a larger editorial title hierarchy, aligned spacing rhythm, elevated translucent card surface, consistent feature rows, refined status/icon chips, a stronger CTA, and a deeper framed product-window presentation.
- P2 before fix: content and the UI mockup did not feel optically balanced inside the card.
- Fix: changed the desktop grid to a 0.92/1.08 split with responsive gutters, explicit minimum widths, and consistent vertical alignment.

**Required fidelity surfaces**

- Fonts and typography: existing site font families remain; only this section's size, weight, line height, and letter spacing were refined.
- Spacing and layout rhythm: heading, selector, card, content groups, features, CTA, and visual mockup now follow a consistent spacing system.
- Colors and visual tokens: existing blue, neutral, and green colors remain; the new surfaces use restrained translucent whites, subtle borders, and soft Apple-like shadows.
- Icons and content: all original Font Awesome icons, industry copy, SEO tags, proof badges, feature lists, CTA labels, and interactive mockups are preserved.

**Responsive and functional checks**

- The selector exposes every industry without clipping at desktop and phone widths.
- The `Legal & CA` control was clicked successfully and its matching stage rendered; switching back to Healthcare also succeeded.
- The 390 px layout shows the complete two-column industry selector and a single-column showcase card with no selector overflow.
- CSS cache-busting was updated to `industry-apple-20260813a` so visitors receive the revised stylesheet.
- `git diff --check` passes with no whitespace errors.
- No actionable P0, P1, or P2 finding remains in the requested scope.

## 2026-08-13 — Industry-specific software dashboard previews

**Source and rendered evidence**

- Source visual truth: `/Users/harshitgoyal/Desktop/Screenshot 2026-08-13 at 11.46.58 AM.png`
- Browser-rendered Healthcare dashboard: `/Users/harshitgoyal/jai website/design-reference/industry-software/healthcare-dashboard-1440x900.png`
- Browser-rendered Legal dashboard: `/Users/harshitgoyal/jai website/design-reference/industry-software/legal-dashboard-1440x900.png`
- Browser-rendered mobile state: `/Users/harshitgoyal/jai website/design-reference/industry-software/mobile-healthcare-390x844.png`
- Full-view comparison: `/Users/harshitgoyal/jai website/design-reference/industry-software/industry-software-comparison.png`
- CSS viewports: 1440 x 900 desktop and 390 x 844 phone at device scale 1.
- State: Healthcare active for the primary comparison; every other industry tab was activated separately.

**Comparison history**

- P1 before fix: every right-side preview was a sparse three-row composition that did not read as credible industry software.
- Fix: replaced all six previews with dense, industry-specific product dashboards containing contextual metrics, operational tables, statuses, workflows, and secondary control panels.
- P2 before fix: the same generic visual structure was repeated despite materially different industry workflows.
- Fix: Healthcare now shows OPD operations; Real Estate shows inventory and lead funnel; Manufacturing shows RFQs and production; Hospitality shows front desk and room state; E-Commerce shows orders and stock; Legal shows matters and vault activity.
- Post-fix evidence: the Healthcare and Legal screenshots visibly show distinct dashboard information architectures, while browser interaction checks confirmed the remaining four dashboard titles and core panels render after tab activation.

**Required fidelity surfaces**

- Fonts and typography: existing Apple/Inter stack is preserved with a compact software UI hierarchy for headings, metrics, table labels, statuses, and supporting metadata.
- Spacing and layout rhythm: each preview follows a consistent summary, metric, workspace, table, and side-panel system without changing the outer section geometry.
- Colors and visual tokens: existing blue, green, white, and neutral tokens are preserved; semantic state colors are used consistently for live, approved, active, and pending states.
- Image and icon quality: the previous empty visual treatment is replaced with rendered software UI and existing Font Awesome interface icons; no placeholder images or raster assets are introduced.
- Copy and content: each software preview now uses industry-relevant, realistic operational copy while the original section headings, descriptions, features, and CTAs remain unchanged.

**Responsive and functional checks**

- All six industry tabs were activated successfully and rendered their matching software dashboard content.
- Healthcare, Real Estate, Manufacturing, Hospitality, E-Commerce, and Legal dashboard identifiers were verified in the browser.
- At 390 px the showcase remains single-column, retains the complete industry selector, and simplifies the dashboard to its primary metrics and operational table.
- Stylesheet cache-busting was advanced to `industry-software-20260813b`.
- `git diff --check` passes with no whitespace errors.
- No actionable P0, P1, or P2 finding remains in the requested scope.

## 2026-08-13 — Spatial custom software catalogue

**Source and rendered evidence**

- Source visual truth: `/Users/harshitgoyal/jai website/design-reference/spatial-systems/before-1440x900.png`
- Browser-rendered desktop implementation: `/Users/harshitgoyal/jai website/design-reference/spatial-systems/after-1440x900.png`
- Browser-rendered phone implementation: `/Users/harshitgoyal/jai website/design-reference/spatial-systems/mobile-390x844.png`
- Same-viewport full-view comparison: `/Users/harshitgoyal/jai website/design-reference/spatial-systems/comparison.png`
- Viewports: 1440 x 900 desktop and 390 x 844 phone at device scale 1.
- State: Business Software active for the primary comparison; Industry-Specific, Modern & High-Value, and View All Systems were activated separately.

**Comparison history**

- P1 before fix: the segmented category control exceeded its visible left boundary, clipping the Business Software label.
- Fix: rebuilt the control as a four-column desktop and two-column mobile grid with equal hit areas and no horizontal clipping.
- P1 before fix: software cards were visually generic text containers and did not communicate software architecture or workflow.
- Fix: every card now includes a compact spatial product panel with a live architecture state, system core, three-stage workflow, API readiness, and workflow-fit metric.
- P2 before fix: system descriptions lacked quickly scannable technical terms.
- Fix: added three curated keywords per software type, including domain terms such as payroll, RFID tracking, dispatch SLA, OCR search, SCORM, CAPA, metering, RAG search, and audit evidence.
- P2 before fix: typography, spacing, card depth, and footer affordances were visually flat.
- Fix: introduced a stronger Apple-style hierarchy, larger radii, restrained translucent surfaces, softer elevation, aligned card heights, clearer blueprint actions, and engineered-to-fit status labels.

**Required fidelity surfaces**

- Fonts and typography: the site font stack remains unchanged; the section now has a cleaner display hierarchy and compact software-interface labels.
- Spacing and layout rhythm: header, tabs, three-column catalogue, card internals, keywords, and footer actions follow a consistent spacing scale; tablet and phone layouts collapse predictably.
- Colors and visual tokens: existing Curious Kaizer blue and category accent colors are preserved with neutral Apple-style surfaces and semantic green live states.
- Image and icon quality: existing Font Awesome system icons remain crisp and are reused within the spatial panels; no placeholder imagery was introduced.
- Copy and content: all original system names, descriptions, counts, categories, and Request Blueprint links remain intact; curated keywords and architecture labels were added.

**Responsive and functional checks**

- All four category controls were exercised in the browser; Industry-Specific and Modern panels displayed their unique system cards, while View All exposed the combined catalogue.
- Browser inspection confirmed 94 rendered card instances across the category panels and their duplicated View All entries; all 94 received a spatial graphic and keyword row.
- The 390 px layout shows the complete two-column category control and single-column card catalogue without clipped labels.
- Stylesheet cache-busting was advanced to `spatial-systems-20260813c`.
- `git diff --check` passes with no whitespace errors.
- No actionable P0, P1, or P2 finding remains in the requested scope.

## 2026-08-13 — Useful platform comparison table

**Source and rendered evidence**

- Source visual truth: `/Users/harshitgoyal/jai website/design-reference/useful-comparison/reference.png`
- Browser-rendered desktop implementation: `/Users/harshitgoyal/jai website/design-reference/useful-comparison/after-1440x900.png`
- Browser-rendered phone implementation: `/Users/harshitgoyal/jai website/design-reference/useful-comparison/mobile-390x844.png`
- Normalized side-by-side comparison: `/Users/harshitgoyal/jai website/design-reference/useful-comparison/comparison.png`
- Viewports: 1440 x 900 desktop and 390 x 844 phone at device scale 1.
- State: comparison section entered the viewport, one-time row reveal completed, table at its initial horizontal position.

**Comparison history**

- P1 before fix: several claims were overly absolute or not decision-safe, including guaranteed response times, zero attack surface, universal plugin cost ranges and blanket platform security labels.
- Fix: replaced them with qualified, implementation-aware comparisons across best fit, Core Web Vitals control, workflow extensibility, security responsibility, technical SEO, portability, long-term cost and launch-speed trade-offs.
- P1 before fix: the table was framed as a universal ranking rather than a practical architecture decision tool.
- Fix: added an explicit best-fit row and a methodology note stating that results depend on implementation, hosting, content, apps, traffic and maintenance, and that the simplest suitable architecture should be chosen.
- P2 before fix: SEO content was limited to a vague local-search row.
- Fix: added precise technical SEO terminology covering LCP, INP, CLS, crawlability, indexation, canonicals, sitemaps, redirects, JSON-LD, structured data, programmatic pages and rendering strategy.
- P2 before fix: emoji markers, inline styles and a flat grid weakened consistency with the site's current visual system.
- Fix: replaced emoji with Font Awesome interface icons, moved styling into scoped CSS, added a translucent Apple-style shell, sticky decision column, highlighted custom-engineered column, compact keyword strip and restrained staggered row animation.

**Required fidelity surfaces**

- Fonts and typography: existing site fonts are preserved; title, decision factors, platform headers, primary findings and supporting qualifications now have distinct optical hierarchy.
- Spacing and layout rhythm: header, topic keywords, table toolbar, column headers, eight comparison rows and methodology note follow a consistent spacing system.
- Colors and visual tokens: existing Curious Kaizer blue, semantic green and caution amber are retained with neutral translucent surfaces and accessible text contrast.
- Image and icon quality: all table markers use the site's existing Font Awesome icon library; no emoji, placeholder artwork or raster replacements remain.
- Copy and content: comparison language is now specific, balanced and useful for platform selection rather than relying on unsupported guarantees.

**Responsive and functional checks**

- Browser inspection confirmed eight comparison rows and successful IntersectionObserver activation of the staggered reveal state.
- The table is keyboard-focusable, horizontally scrollable on narrow screens and exposes a visible `Swipe to compare all platforms` hint at 390 px.
- The first decision-factor column remains sticky while users compare the remaining platforms.
- Reduced-motion preferences disable the row animation and expose all rows immediately.
- Stylesheet cache-busting was advanced to `useful-comparison-20260813d`.
- `git diff --check` passes with no whitespace errors.
- No actionable P0, P1 or P2 finding remains in the requested scope.

## 2026-08-13 — Distinct industry mockups and architecture patterns

**Source and rendered evidence**

- Industry source visual: `/var/folders/sz/zr_fytr90z12zs7kynzxzg340000gn/T/TemporaryItems/NSIRD_screencaptureui_3AuK8r/Screenshot 2026-08-13 at 12.06.09 PM.png`
- Bespoke-system source visual: `/var/folders/sz/zr_fytr90z12zs7kynzxzg340000gn/T/TemporaryItems/NSIRD_screencaptureui_h5woO8/Screenshot 2026-08-13 at 12.07.19 PM.png`
- Six-state industry comparison: `/Users/harshitgoyal/jai website/design-reference/distinct-mockups/industry-six-state-contact-sheet.png`
- Updated Real Estate state: `/Users/harshitgoyal/jai website/design-reference/distinct-mockups/real-estate-final.png`
- Updated Hospitality state: `/Users/harshitgoyal/jai website/design-reference/distinct-mockups/hospitality-final.png`
- Architecture before/after comparison: `/Users/harshitgoyal/jai website/design-reference/distinct-mockups/systems-before-after.png`
- Mobile architecture capture: `/Users/harshitgoyal/jai website/design-reference/distinct-mockups/systems-mobile-390x844.png`
- Viewports: 1440 x 900 desktop and 390 x 844 phone at device scale 1.

**Comparison history**

- P1 before fix: all six industry previews used the same summary, KPI row and table/side-panel order, making different products feel like recoloured versions of one template.
- Fix: kept a clinical queue/capacity layout for Healthcare; moved Real Estate to a lead-funnel and property-inventory-first layout; built a dark industrial RFQ/production console; moved Hospitality to a warm front-desk and room-state workspace; created a violet commerce orders/inventory cockpit; and moved Legal to a secure vault/matter-first structure.
- P1 before fix: every bespoke-system card repeated the same core, three-step flow and fabricated workflow-fit percentage.
- Fix: removed the unsupported percentage and introduced six real software-architecture patterns: rules-based workflow engine, domain hub, layered application stack, event-driven orchestration, API gateway and modular service mesh.
- P2 before fix: colour treatment was nearly identical across every product and architecture card.
- Fix: introduced controlled blue, emerald, violet, amber, cyan and rose architecture palettes plus industry-specific clinical blue, property green, industrial charcoal/amber, hospitality sand, commerce violet and legal navy.
- Post-fix evidence: browser inspection confirmed all six industry states, all six architecture variants, 94 upgraded card instances, and no remaining `workflow fit` text.

**Required fidelity surfaces**

- Fonts and typography: existing site typography is preserved; product labels, architecture layers, services, events and supporting metadata use consistent compact UI weights.
- Spacing and layout rhythm: the outer cards remain aligned while internal information architecture now varies by product workflow; architecture diagrams retain equal visual height across the grid.
- Colors and visual tokens: all new colours remain restrained, accessible and compatible with the site's existing blue/neutral theme.
- Image and icon quality: real Font Awesome system and interface icons are reused throughout; no placeholder images, emoji or fabricated raster graphics were introduced.
- Copy and content: original system names, descriptions, keywords, CTAs and industry data are preserved; architecture labels now describe recognisable implementation patterns rather than arbitrary scores.

**Responsive and functional checks**

- All six industry tabs were activated and their matching themed product interfaces rendered successfully.
- Browser counts confirmed architecture variant distribution across all 94 rendered card instances: 16 workflow engines, 16 domain hubs, 16 layered stacks, 16 event-driven diagrams, 15 API gateways and 15 service meshes.
- The 390 px catalogue retains the complete category selector and readable workflow architecture without the removed fake percentage.
- Stylesheet cache-busting was advanced to `distinct-mockups-20260813f`.
- `git diff --check` passes with no whitespace errors.
- No actionable P0, P1 or P2 finding remains in the requested scope.

final result: passed

## Real Estate industry product-capture integration QA — 2026-08-13

**Source visual truth**

- Supplied Aloha Estates superadmin dashboard: `/Users/harshitgoyal/jai website/images/aloha-estates-superadmin-dashboard.png`.
- Source pixels: 1920 × 1080 at the supplied image density.
- Intended state: Real Estate & Infra selected in the industry showcase.

**Rendered implementation evidence**

- Browser-rendered capture: `/Users/harshitgoyal/jai website/design-reference/industry-realestate-photo/implementation.png`.
- Implementation capture: 1280 × 720 pixels in the in-app browser's current desktop viewport.
- Combined source/implementation evidence: `/Users/harshitgoyal/jai website/design-reference/industry-realestate-photo/source-implementation-comparison.jpg`.
- The combined evidence was opened and visually inspected at original detail.

**Comparison history and findings**

- [P1] Earlier implementation used a fabricated deal-desk interface instead of the supplied Aloha Estates product capture.
  - Fix: replaced only the Real Estate mockup body with the real Aloha Estates superadmin dashboard image.
  - Post-fix evidence: the comparison shows the source dashboard's navigation, sales metrics, analytics chart, team status, workflow tasks and company activity feed inside the website card.
- [P2] The source includes the macOS menu bar, which should not appear inside the website's mock browser.
  - Fix: reused the existing non-destructive capture crop so the visible mockup begins with the Aloha Estates application interface.
  - Post-fix evidence: the dashboard fills the browser frame without stretching or exposing the macOS menu bar.
- [P2] The old mock-browser title described the replaced spatial visualizer.
  - Fix: updated only the Real Estate mock-browser title to `alohaestates.app/superadmin`.

**Required fidelity surfaces**

- Fonts and typography: the supplied product typography remains raster-faithful; the surrounding website typography is unchanged.
- Spacing and layout rhythm: the capture is centred in the existing Apple-style frame and aligns with the Real Estate copy column.
- Colors and visual tokens: the original monochrome Aloha Estates interface, green status details and red workflow indicators are preserved without filters.
- Image quality and asset fidelity: the original 1920 × 1080 PNG is used directly, remains linked at full resolution, and is neither stretched nor recreated.
- Copy and content: descriptive alt text identifies the visible analytics, pipeline, agent-status and activity workflows.

**Functional checks**

- Real Estate & Infra activation passed with `stage-realestate` as the selected pane.
- Image loaded at its full natural dimensions of 1920 × 1080 and is visible in the selected pane.
- Full-resolution image link opens in a new tab and includes an accessible label.
- Cache-busting advanced to `realestate-dashboard-photo-20260813l`.
- `git diff --check` passes.
- No actionable P0, P1 or P2 finding remains in the requested scope.

final result: passed

## Hotel industry product-capture integration QA — 2026-08-13

**Source visual truth**

- Supplied KaizerStays hotel PMS dashboard: `/Users/harshitgoyal/jai website/images/kaizerstays-pms-overview-dashboard.png`.
- Source pixels: 1920 × 1080 at the supplied image density.
- Intended state: Hotels & Dining selected in the industry showcase.

**Rendered implementation evidence**

- Browser-rendered capture: `/Users/harshitgoyal/jai website/design-reference/industry-hotel-photo/implementation.png`.
- Implementation capture: 1001 × 777 pixels in the in-app browser's current desktop viewport.
- Combined source/implementation evidence: `/Users/harshitgoyal/jai website/design-reference/industry-hotel-photo/source-implementation-comparison.jpg`.
- The combined evidence was opened and visually inspected at original detail.

**Comparison history and findings**

- [P1] Earlier implementation used a fabricated hospitality dashboard instead of the supplied KaizerStays product capture.
  - Fix: replaced only the Hotels & Dining mockup body with the real KaizerStays PMS overview image.
  - Post-fix evidence: the combined comparison shows the source dashboard's operations sidebar, arrival queue, room-status grid, housekeeping alerts and audit feed inside the website card.
- [P2] The source includes the macOS menu bar, which should not appear inside the product mock browser.
  - Fix: reused the existing non-destructive product-capture crop so the browser frame begins with the KaizerStays application interface.
  - Post-fix evidence: the final implementation keeps the complete PMS workspace visible without stretching or exposing the macOS menu bar.
- [P2] The old mock-browser title referenced a generic direct-booking screen.
  - Fix: updated only the hotel mock-browser title to `kaizerstays.app/hotel-overview`.

**Required fidelity surfaces**

- Fonts and typography: the supplied dashboard typography remains raster-faithful; surrounding website typography and content are unchanged.
- Spacing and layout rhythm: the 16:9 capture is centred inside the existing Apple-style browser frame and aligned with the hotel card's text column.
- Colors and visual tokens: the source blue, green, amber and neutral PMS states are shown directly without filters in the default state.
- Image quality and asset fidelity: the original 1920 × 1080 PNG is used directly, remains available at full resolution, and is not stretched or recreated.
- Copy and content: descriptive alt text identifies the visible arrivals, room status, housekeeping and audit workflow.

**Functional checks**

- Hotels & Dining tab activation passed with `stage-hospitality` as the selected pane.
- Image loaded at its full natural dimensions of 1920 × 1080 and is visible in the selected pane.
- Full-resolution image link opens in a new tab and includes an accessible label.
- Cache-busting advanced to `hotel-dashboard-photo-20260813k`.
- No actionable P0, P1 or P2 finding remains in the requested scope.

final result: passed

## Bespoke systems architecture catalogue QA — 2026-08-13

**Requested scope**

- Redesigned only the Custom Software & Operating Systems card architecture previews.
- Preserved the section heading, four category tabs, system names, descriptions, keyword chips, blueprint links, navigation, backgrounds and all surrounding sections.

**Source and implementation comparison**

- Source visual truth: the user-provided earlier catalogue capture showing the repeated Core / Capture / Orchestrate / Control preview shell.
- Normalized before/after comparison: `/Users/harshitgoyal/jai website/design-reference/bespoke-architectures/before-after-comparison.jpg`.
- Final focused capture: `/Users/harshitgoyal/jai website/design-reference/bespoke-architectures/after.png`.
- Final all-systems capture: `/Users/harshitgoyal/jai website/design-reference/bespoke-architectures/all-systems.png`.

**Design and architecture findings**

- [P1] The previous catalogue repeated six generic diagrams across 47 systems and labelled them as live architecture, so materially different products looked interchangeable.
  - Fix: replaced the index-based six-card rotation with 47 tag-keyed solution blueprints and changed the label to Delivery blueprint so the visual does not imply a deployed customer integration.
  - Post-fix evidence: browser QA reports 47 unique systems, 47 unique architecture patterns and zero fallback patterns across all 94 rendered card instances.
- [P1] Architecture content did not express the actual operational boundary of each product.
  - Fix: every system now shows four domain-specific components plus its data foundation, runtime/orchestration layer and reliability/security signal.
  - Examples include HRMS role-scoped workforce records, WMS scanner-to-bin events, DMS OCR and e-sign routing, MES shop-floor event processing, SaaS metering and entitlements, and permission-aware RAG.
- [P2] The old visuals shared one information architecture with cosmetic colour changes.
  - Fix: introduced 14 topology families including secure core, event bus, hub, document pipeline, stack, AI pipeline, scheduler, realtime rail, gateway, edge mesh, ledger, automation, data pipeline and service mesh.
- [P2] Platform labels were generic.
  - Fix: blueprint metadata now uses credible, system-appropriate combinations of custom services, Supabase, Neon, Railway, Render, n8n and Zapier without claiming those are already live.

**Visual and functional checks**

- The Apple-like card shell, restrained shadows, compact status chips, readable service nodes and semantic accent colours remain consistent with the existing site language.
- All 94 rendered cards contain four component nodes and three foundation signals.
- The four tabs activate exactly one matching panel and expose 25, 10, 12 and 47 cards respectively.
- Browser console returned no errors.
- Reduced-motion handling disables the hover pulse animation.
- Stylesheet cache-busting advanced to `bespoke-architectures-20260813i`.
- `git diff --check` passes with no whitespace errors.
- No actionable P0, P1 or P2 finding remains in the requested scope.

final result: passed

## Industry workflow dashboard redesign QA — 2026-08-13

**Source visual truth and research grounding**

- Existing six-state implementation: `/Users/harshitgoyal/jai website/design-reference/distinct-mockups/industry-six-state-contact-sheet.png` (1800 x 920 px).
- Research references: KiviCare clinic operations on Behance; Landify real-estate CRM on Dribbble; Evrone's production-efficiency system on Behance; Hotel Shift Dashboard on Behance; Dash Store Admin on Dribbble; and Juris/Chronolex legal workflow case studies on Behance.
- The research was used for workflow hierarchy and realistic operational content, not copied artwork or branding.

**Rendered implementation evidence**

- Browser viewport and CSS viewport: 1280 x 720 px at device scale 1.
- State coverage: all six industry navigation tabs selected individually with exactly one active pane at a time.
- Full six-state implementation sheet: `/Users/harshitgoyal/jai website/design-reference/industry-workflows/six-workflows-contact-sheet.jpg` (1800 x 676 px).
- Normalized before/after comparison: `/Users/harshitgoyal/jai website/design-reference/industry-workflows/before-after-comparison.jpg` (1800 x 675 px).
- Focused captures: `healthcare.png`, `real-estate.png`, `manufacturing.png`, `hospitality.png`, `ecommerce.png`, and `legal.png` in `/Users/harshitgoyal/jai website/design-reference/industry-workflows/` (each 1280 x 720 px).

**Findings and comparison history**

- [P1] Earlier previews shared the same summary, three KPI cards, table and side panel, making six industries look like recoloured versions of one dashboard.
  - Fix: replaced that repeated shell with six different operating models: clinical care lanes and triage; property inventory and buyer pipeline; live MES production flow; room and arrival operations; fulfilment kanban and stock risk; and deadline-first matter/document control.
  - Post-fix evidence: the six-state sheet shows different information architecture, component families, visual density and content in every tab.
- [P2] The first commerce capture inherited an oversized product label because the product-name text node lacked a compact UI font size.
  - Fix: scoped the inventory product label to the commerce panel's compact type scale.
  - Post-fix evidence: `/Users/harshitgoyal/jai website/design-reference/industry-workflows/ecommerce.png` shows both SKU names aligned with the surrounding UI.

**Required fidelity surfaces**

- Fonts and typography: existing DM Sans site typography is preserved outside the mockups; each interface uses the same compact operational type system with readable weights and hierarchy.
- Spacing and layout rhythm: each dashboard fits the existing Apple studio frame, maintains consistent outer alignment and uses its own workflow-appropriate internal grid.
- Colors and tokens: clinic blue, property green, MES charcoal/amber, hospitality sand, commerce violet and legal navy remain restrained and semantically distinct.
- Image and icon quality: Font Awesome interface icons are used for recognizable actions and system states; no emoji, placeholder imagery, copied portfolio artwork or fabricated brand assets were introduced.
- Copy and content: every preview now contains domain-specific roles, statuses, records, operational metrics, exceptions and next actions rather than generic dashboard filler.

**Functional and responsive checks**

- All six tab buttons activated their correct preview in sequence.
- Browser console returned no errors.
- The stylesheet contains responsive one-column reductions for phone layouts; secondary side panels collapse while the core workflow remains visible.
- JavaScript syntax validation and `git diff --check` pass.
- Stylesheet cache-busting advanced to `industry-workflows-20260813h`.
- No actionable P0, P1 or P2 finding remains in the requested scope.

final result: passed

## Shared architecture-section typography QA — 2026-08-13

**Requested scope**

- Standardized the heading typography in the Industry-Specific Web Solutions, Custom Software & Operating Systems, and Architecture Decision Guide sections only.
- Preserved the industry interfaces, bespoke-system architecture cards, comparison table, section backgrounds, navigation and interactions.

**Typography alignment**

- All three sections now use the site's loaded DM Sans display and body stacks.
- Blue eyebrow lines share the same light 300 weight, responsive scale, line height, letter spacing and colour.
- Uppercase primary headings share the same responsive scale, 300 weight, balanced wrapping and dark ink colour.
- Supporting paragraphs share the same size, line height, width and muted text colour.
- The custom-system emphasis line and the comparison guide pill/keyword chips retain their meaning while using the same family and controlled weights.
- Added scoped phone typography rules so the large titles reduce cleanly without changing card layouts.

**Rendered checks**

- Browser confirmed all three `.ck-aligned-section-heading` instances render on the live local preview.
- Industry heading capture: `/Users/harshitgoyal/jai website/design-reference/aligned-headings/industry.png`
- Custom systems heading capture: `/Users/harshitgoyal/jai website/design-reference/aligned-headings/custom-systems.png`
- Comparison heading capture: `/Users/harshitgoyal/jai website/design-reference/aligned-headings/comparison.png`
- All six comparison keyword chips remain visible and aligned.
- Stylesheet cache-busting advanced to `aligned-headings-20260813g`.
- `git diff --check` passes with no whitespace errors.

final result: passed

## Legal industry product-capture integration QA — 2026-08-13

**Source visual truth**

- Supplied Advocate super-admin dashboard: `/Users/harshitgoyal/jai website/images/advocate-super-admin-dashboard.png`.
- Source pixels: 1920 × 1080 at the supplied image density.
- Intended state: Legal, CA & Consultancies selected in the industry showcase.

**Rendered implementation evidence**

- Browser-rendered capture: `/Users/harshitgoyal/jai website/design-reference/industry-legal-photo/implementation.png`.
- Implementation capture: 1035 × 777 pixels in the in-app browser's current desktop viewport.
- Combined source/implementation evidence: `/Users/harshitgoyal/jai website/design-reference/industry-legal-photo/source-implementation-comparison.jpg` (1280 × 1488).
- Focused-region comparison was not required because the dashboard image and its complete browser-style frame are clearly readable in the combined evidence.

**Comparison history and findings**

- [P1] Earlier implementation used a fabricated NotaryCore dashboard instead of the supplied product capture.
  - Fix: replaced only the Legal/CA mockup body with the real Advocate dashboard image.
  - Post-fix evidence: the combined comparison shows the same sidebar, metric cards, application table and Advocate branding inside the website mockup.
- [P2] A first fitting pass left unnecessary vertical space around the 16:9 product capture.
  - Fix: allowed the Legal studio window to size to the source aspect ratio and vertically centred it in the visual column.
  - Post-fix evidence: the final implementation screenshot shows the complete dashboard at its native proportions without stretching.
- [P2] The old mock-browser title still referenced NotaryCore.
  - Fix: updated the isolated Legal mock-browser title to `advocate.app/super-admin`.

**Required fidelity surfaces**

- Fonts and typography: the supplied dashboard typography remains raster-faithful; surrounding website typography is unchanged.
- Spacing and layout rhythm: the capture is centred, preserves its 1920:1050 content crop and uses the existing Apple-style window radius and elevation.
- Colors and visual tokens: the supplied navy, blue, green and violet dashboard accents are preserved without filters in the default state.
- Image quality and asset fidelity: the original 1920 × 1080 PNG is used directly; the macOS menu bar is removed by a non-destructive CSS crop, with no stretching or recreation.
- Copy and content: the product screenshot content is unchanged; alt text describes the visible Advocate dashboard, and the full-resolution image remains accessible from the mockup.

**Functional checks**

- Legal/CA tab activation passed with exactly one active industry pane.
- Image loaded at its full natural dimensions of 1920 × 1080.
- Full-resolution image link and accessible alt text are present.
- Browser console returned no errors.
- Cache-busting advanced to `legal-dashboard-photo-20260813j`.
- `git diff --check` passes.
- No actionable P0, P1 or P2 finding remains in the requested scope.

final result: passed
