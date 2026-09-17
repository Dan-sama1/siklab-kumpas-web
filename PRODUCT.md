# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML/CSS/vanilla JS, no framework, no build step (user's choice; deploy target is Vercel Hobby, which serves the repo as static files). The 197 MB APK cannot live on Vercel (100 MB static-upload cap) and is served from this repo's GitHub Releases instead.

## Users

- **Thesis respondents** (primary): Deaf / hard-of-hearing Filipino Sign Language users and the hearing people they talk to — family, classmates, strangers in a shop or office. Described by the team as "not very techy". They arrive on a phone, need to get the app installed, and then need to know what it can do and how to hold it. Reading is on a phone screen, often outdoors or in a busy room.
- **Thesis panel / adviser** (secondary): evaluate the app and the printed user manual (the manual is an appendix in the thesis). They read on a laptop.

Everything on the page must survive the first audience; nothing on it is only for the second.

## Product Purpose

Siklab-Kumpas is an Android app that translates in both directions between Filipino Sign Language and spoken/written English, fully on-device: the camera reads a person's signs and speaks them; a hearing person's voice or typed text is signed back by an ASL avatar. It exists so a Deaf person and a hearing person can hold a conversation without an interpreter present.

The website exists to get the app onto a respondent's phone and teach them to use it. Success: a respondent taps one button, gets through Android's sideload dialogs without giving up, opens the app, and knows the "sign, rest, sign" rhythm and what vocabulary it understands before their first attempt. Secondary success: the user manual section prints cleanly for the thesis appendix.

## Positioning

- Bi-directional (sign → speech AND speech/text → sign), where most sign-language apps do one direction.
- Filipino Sign Language, not only ASL. The app also carries an ASL vocabulary and an ASL avatar.
- Everything runs on the phone: no account, no internet, no INTERNET permission at all. Nothing a user signs or says leaves the device.
- Built for a specific real situation: a Deaf person initiating a conversation with a hearing stranger (attention signal → spoken intro → live translation).

## Operating Context

- The app is sideloaded, not on Google Play. Android shows 3–4 warning dialogs during install (browser "this file can harm your device", "allow installs from this source", Play Protect). The site's install steps and screenshots are what get a respondent through them.
- Test/reference devices: Realme 9i (near-stock Android; all screenshots come from it) and a Xiaomi on HyperOS (extra prompts).
- Speech output depends on the phone's text-to-speech engine (defaults to `en-US`). A phone with no default TTS engine, or no Filipino voice installed, produces silence or wrong pronunciation — the manual must cover TTS setup.
- The panel reads the manual as a PDF printed from this page (Install steps + User manual, English, Letter). The PDF is not linked from the site.

## Capabilities and Constraints

**App facts (from the source, v1.0.0):**
- Home offers two profiles: **Inclusive Communicator** (Hearing / Speaking Users) → *Translation Hub* with three tabs — Voice (mic → text → ASL avatar), Text (type → spoken aloud + ASL avatar; voice-speed slider 0.5–1.6×), Camera (sign → text + speech). **Sign Language User** (Deaf / Mute Users) → *Initiator Mode* — "Signal for Conversation" (Flicker Lights = screen flash + torch; Play Audio Spiel = pre-recorded spoken messages such as "Hello, can I talk to you?" and "I am deaf, sign language is how I communicate"), then *Start Conversation* → camera recognition.
- Camera recognition: Start/Stop Recognition; framing guide ("Line up head and shoulders · hold the phone level"); starts on the front camera with a FRONT/BACK switch; a mode chip cycles **FSL WORDS → LETTERS → ASL WORDS** (default on open: ASL WORDS). Signs are buffered into a phrase, closed when the hands rest, rendered as English and spoken. Letters mode spells a word.
- First-run tours (4 steps each, Initiator and Hub), re-openable from the (?) button. Settings sheet: language English/Filipino. Sun/moon button toggles theme. Whole app UI is bilingual EN/FIL.
- Vocabulary: FSL words/phrases 105 (`fsl105_labels.txt`), FSL fingerspelling A–Z, ASL words recognized 56 (`asl_demo50_labels.txt`), ASL avatar clips 139 (A–Z + 112 words + IDLE, `avatar/clips/manifest.json`). All lists must be generated from those files, never typed.
- Requirements: Android 7.0+ (minSdk 24), camera + microphone permissions, a TTS engine. APK: `siklab-kumpas.apk`, 197 MB (206,671,687 bytes), SHA-256 `f92542299a879396311aeb7bd74172807c8cd608671fbf05d56f5ec03d989de4`, release-signed.
- Stable download URL: `https://github.com/Dan-sama1/siklab-kumpas-web/releases/latest/download/siklab-kumpas.apk` (direct download; no GitHub page shown).

**Site constraints (decided by the team, 2026-09-17):**
- One page, fixed section order: App title → Members → Purpose of the Study → Download → Install steps → User manual → About.
- English default with a Filipino toggle. Translated: Purpose, Download, Install, Manual, About. Not translated: app title, members. Vocabulary entries carry a Filipino translation beside every gloss in Filipino mode; the English gloss always stays visible because that is what the app displays.
- Light/dark follows the phone's setting only; no on-page theme toggle.
- No demo video, no analytics, no QR code, no link back from the app.
- Members: four placeholder names, no photos (real names supplied later by the team).
- Purpose and About: drafted from the codebase with bracketed placeholders for school / program / adviser / year; the team will paste the real abstract.

**Undecided:** the exact respondent group (which school / community) — not stated; do not claim one.

## Brand Commitments

- Name: **Siklab-Kumpas** (app label and window title; hyphenated, capital K). *Siklab* = spark/flare, *kumpas* = hand gesture/beat, in Filipino.
- Visual identity must match the app: accent orange `#FF6B01`; dark theme = black with a warm ember gradient (`#3B1C0E → #371817 → #2C1230 → #280D3A → #1E0F28`); light theme = `#F0F0F0` with lavender/pink tints (`#FFF3EA → #FBDFD5 → #F5E3F4 → #F3E1FB`); ink `#1A1A2E`; avatar purple `#6C63FF`; moon accent `#9810FA`; panels `#181818` / `#262626`.
- Assets (copied from the app repo): `App-Icon.svg`, `Wordmark.svg`, `FSL-User-Icon.svg`, `Hearing-Speaking-Icon.svg`.
- Voice: the app's own copy is plain, second-person, and bilingual ("Point and start", "Sign, rest, sign", "Let's Bridge the Gap" / "Tulay sa Pagitan"). The site keeps that register; no marketing superlatives, no invented claims.

## Evidence on Hand

- Real vocabulary lists and avatar manifest in the app repo (`flutter_app/assets/labels/*.txt`, `flutter_app/assets/avatar/clips/manifest.json`).
- Real bilingual tour copy in `flutter_app/lib/widgets/onboarding_tour.dart` (reuse verbatim).
- App UI mockups `design/ui_v2/UI.1–10.png` (design references only, not shipped screenshots).
- Screenshots: **none yet.** They will be captured on the Realme 9i over adb after the release is live. Until then the page uses clearly labelled placeholder frames; never fabricate a screenshot.
- Accuracy figures exist in code comments (e.g., FSL 97.19 % held-out) but are single-signer lab numbers — do not put them on the page.
- No testimonials, no press, no user counts. Do not invent any.

## Product Principles

1. **One button, then hold their hand.** The download is the only call to action; everything after it exists to get a non-technical person through Android's warnings and their first sign.
2. **Say only what the app does.** Every capability, number, and list on the page is traceable to the source or the label files.
3. **Bilingual is a feature, not a translation layer.** Filipino is shown with the same care as English, including the vocabulary, because the team wants respondents to see the language valued.
4. **Readable on a phone in daylight, printable for a panel.** Structure the manual so it works as a scroll and as pages.
5. **Nothing leaves the phone.** Privacy and offline operation are part of the product story and stay visible.

## Accessibility & Inclusion

- Primary readers include Deaf users, for whom written English/Filipino may be a second language: short sentences, one idea per step, screenshot for every step, no audio-only information.
- Everything must work without JavaScript except the language toggle (content for both languages is in the HTML).
- Respect `prefers-color-scheme` and `prefers-reduced-motion`; large touch targets; visible focus; sufficient contrast on both themes; language attributes switch with the toggle so screen readers pronounce Filipino correctly.
