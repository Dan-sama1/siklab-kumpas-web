---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Surface: index.html (the whole site is one page)

Mode: **Read** with one primary action. Visitor: a thesis respondent (Deaf or hearing, not technical) sent the link on their phone; secondary: the panel on a laptop, and the same page printed as the appendix PDF.

Job: download the APK, survive Android's four sideload dialogs, open the app, learn the two profiles and the "sign, rest, sign" rhythm, look up which words the app knows. Section order is pinned by the team: Title → Members → Purpose → Download → Install → Manual → About. Bilingual EN/FIL toggle in the header; Title and Members are not translated.

Content on hand: real vocabulary (label files + avatar manifest), real tour copy (EN/FIL), app SVG icons, app palette. Not on hand: Realme screenshots (placeholder frames until captured), real member names, real abstract.

## Direction contract

THESIS: The manual is a phone you are holding. Every instruction sits beside the exact screen it happens on, in a phone frame that stays put on a laptop and sits inline above each step on a phone. Refused: the marketing-hero-then-wall-of-text arrangement this category ships, where screenshots are decoration and the reader must map words to a screen they cannot see.

OWN-WORLD: The app's own material: ember gradient (black → #3B1C0E → #2C1230 → #280D3A) in dark, lavender-pink wash (#FFF3EA → #F5E3F4) in light, following the phone's setting; ink #1A1A2E on light, #F0F0F0 on dark; one accent, orange #FF6B01, spent on the Download button, step numerals, the active step's frame edge, and the language toggle's active side; purple #6C63FF reserved for the avatar/hearing lane, orange for the signer lane, mirroring the app's two profiles. Panels are rounded 18px on dark #181818/#262626 or white; chips are pill-shaped caps like the app's FSL WORDS / LETTERS / ASL WORDS chip. Type: a friendly geometric-humanist sans for body and a heavier weight of the same for numerals; no serif, no mono except SHA/version facts. The phone frame is a thin dark bezel with the Realme's 20:9 proportion. With all copy removed the page is still recognizable: a warm gradient, a phone outline, orange numerals down a rail.

STORY: "This is Siklab-Kumpas, made by these four people, for this reason. Tap the orange button. The four dialogs your phone will show look exactly like these; tap what we tap. Now here is each screen, what to press, and how to sign so the app hears you. These are the words it knows, in English and Filipino. This is who we are." The visitor leaves with the app installed and the rhythm in their hands.

FIRST VIEWPORT: Header row: app icon + "Siklab-Kumpas" wordmark left, EN | FIL segmented toggle right, and a compact orange Download pill that appears in the header once the real button scrolls off. Below, a compact cover: the title in 44px, the four member names as one line of chips, the purpose in two short sentences. Then the Download block: the orange Download button (full width on phones, 320px on desktop) with "v1.0.0 · 197 MB · Android 7.0+ · works offline" under it, and to its right the phone frame showing the Home screen placeholder — on desktop this frame is the sticky column that follows the reader through Install and Manual. The frame's first state is the Home screen; the button is the only orange thing above the fold besides numerals.

FORM: "Phone in hand" walkthrough — candidate 1 on my ordered list of seven, dealt as an alternate by seed e7a9b65b (lead was candidate 7, poster-then-appendix; the user chose 1). Signature interaction: as the reader scrolls the steps, the sticky phone frame swaps its screen (opacity + 2px blur crossfade, 200ms, ease-out) to the step currently in view, and that step's numeral fills orange; on phones the same frame renders inline above each step. Motion grammar: transform/opacity only, ≤250ms, ease-out `cubic-bezier(0.23,1,0.32,1)`; buttons scale 0.97 on press; reduced-motion drops the crossfade to an instant swap.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
