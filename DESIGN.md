---
name: Siklab-Kumpas site
description: The app's own ember-and-lavender world, carried onto one bilingual page that walks a respondent from download to their first sign.
colors:
  spark-orange: "#FF6B01"
  spark-ink: "#C24E00"
  spark-lift: "#FF8A3D"
  on-orange: "#1A1A2E"
  avatar-purple: "#6C63FF"
  avatar-purple-ink: "#4B43D6"
  avatar-purple-lift: "#9D97FF"
  ink: "#1A1A2E"
  ink-2: "#4B4860"
  ink-3: "#5E5A70"
  light-ground: "#F0F0F0"
  light-panel: "#FFFFFF"
  light-panel-2: "#F7F1F7"
  dark-ground: "#000000"
  dark-panel: "#181818"
  dark-panel-2: "#262626"
  dark-ink: "#F0F0F0"
  dark-ink-2: "#C9C4D2"
  dark-ink-3: "#9C97AA"
  bezel: "#141418"
typography:
  display:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 1.8rem + 2.2vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(1.7rem, 1.35rem + 1.4vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 1.15rem + 0.6vw, 1.55rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  subtitle:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 800
    letterSpacing: "0.12em"
  gloss:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.86rem"
    fontWeight: 700
    letterSpacing: "0.03em"
rounded:
  chip: "999px"
  sm: "10px"
  md: "16px"
  panel: "18px"
  phone: "34px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "40px"
  section: "clamp(32px, 5vw, 56px)"
components:
  button-primary:
    backgroundColor: "{colors.spark-orange}"
    textColor: "{colors.on-orange}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  pill-download:
    backgroundColor: "{colors.spark-orange}"
    textColor: "{colors.on-orange}"
    rounded: "{rounded.chip}"
    padding: "8px 14px 8px 12px"
  segmented-language:
    backgroundColor: "{colors.light-panel-2}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.chip}"
    padding: "3px"
  segmented-language-active:
    backgroundColor: "{colors.spark-orange}"
    textColor: "{colors.on-orange}"
    rounded: "{rounded.chip}"
    padding: "5px 12px"
  chip-mode:
    backgroundColor: "rgba(255, 107, 1, 0.10)"
    textColor: "{colors.spark-ink}"
    rounded: "{rounded.chip}"
    padding: "2px 10px"
  chip-toc:
    backgroundColor: "{colors.light-panel}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.chip}"
    padding: "7px 12px"
  panel:
    backgroundColor: "{colors.light-panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "20px"
  vocab-tile:
    backgroundColor: "{colors.light-panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "7px 10px"
  input-search:
    backgroundColor: "{colors.light-panel}"
    textColor: "{colors.ink}"
    rounded: "14px"
    padding: "10px 14px"
  step-numeral:
    backgroundColor: "{colors.light-panel}"
    textColor: "{colors.spark-ink}"
    rounded: "{rounded.chip}"
    size: "40px"
  step-numeral-active:
    backgroundColor: "{colors.spark-orange}"
    textColor: "{colors.on-orange}"
    rounded: "{rounded.chip}"
    size: "40px"
---

# Design System: Siklab-Kumpas site

## Overview

**Creative North Star: "The Phone in Your Hand"**

The site is the app's own material, not a brochure about it. It inherits Siklab-Kumpas's two grounds — black lit from within by an ember gradient in the dark, a lavender-and-peach wash in the light — and its one accent, the spark orange the app spends on every button. The page follows the phone's light/dark setting and never offers its own switch, so what a respondent sees on the site is the world they will meet inside the app a minute later.

Everything is arranged around a phone frame. On a laptop the frame stays put at the right while the instructions scroll past it, swapping its screen to whichever step is nearest the reading line; on a phone the frame sits inline under each step heading, before the words that tell the reader what to tap. Text is short, second-person and bilingual (English default, Filipino by toggle), set in a single friendly sans at a generous size, because the primary reader is a Deaf or hearing respondent who is not technical and may be reading their second language outdoors.

Density is calm: one column of copy held to a 66-character measure, section spacing that breathes, and a single moment of motion (the frame's crossfade). Confirmed rejections: no marketing hero, no white text on the brand orange (it fails contrast), no on-page theme toggle, no kickers or eyebrow labels, no emoji or glyph icons.

**Key Characteristics:**
- The app's exact gradient stops for both grounds; orange is the only accent, purple appears solely for the hearing person's lane
- A dark-bezel phone frame (9:20, 34px radius) is the recurring container for every screenshot
- Ink-on-orange for every accent surface (button, pill, toggle, numerals)
- One face — Figtree, self-hosted variable 300–900 — from 900 display down to 700 tracked glosses
- Both languages live in the HTML; a toggle shows one, so the page reads without JavaScript and prints in English

## Colors

Two grounds from the app, one spark, and a reserved purple; everything else is ink at three strengths.

### Primary
- **Spark Orange** (#FF6B01): the app's accent, spent on the Download button, the header pill, the active side of the language toggle, step numerals, the active step heading, the framing-guide dashes and the focus ring. Never used as text on white.
- **Spark Ink** (#C24E00): the same hue darkened for text and icons on light surfaces (links, requirement icons, counts, active step headings). In the dark theme the text role lifts to **Spark Lift** (#FF8A3D).
- **On-Orange** (#1A1A2E): the only text colour allowed on Spark Orange, in both themes (6.4:1).

### Secondary
- **Avatar Purple** (#6C63FF): the app's avatar colour, used once on the page — the "Translation Hub — for the hearing person" lane and its tint (rgba 108,99,255 / 0.10 light, 0.16 dark). Text on light uses **Avatar Purple Ink** (#4B43D6); on dark **Avatar Purple Lift** (#9D97FF).

### Neutral
- **Ink** (#1A1A2E) / **Dark Ink** (#F0F0F0): headings and body.
- **Ink 2** (#4B4860) / **Dark Ink 2** (#C9C4D2): secondary copy, list text, nav links, facts.
- **Ink 3** (#5E5A70) / **Dark Ink 3** (#9C97AA): labels, placeholder notes, counts inside groups, footer. Minimum 5:1 on the light wash.
- **Light Ground** (#F0F0F0) under the wash `#FFF3EA → #FBDFD5 → #FADFDF → #F5E3F4 → #F3E1FB → #F4E4F7 → #FCF3FB`; **Dark Ground** (#000000) under the ember `#000 → #3B1C0E → #371817 → #2C1230 → #280D3A → #1E0F28 → #110D13 → #000`.
- **Light Panel** (#FFFFFF) and **Light Panel 2** (#F7F1F7); **Dark Panel** (#181818) and **Dark Panel 2** (#262626): chips, tiles, cards, the search field, the toggle track.
- **Line**: rgba(26,26,46,0.12) light / rgba(240,240,240,0.14) dark for hairlines and chip borders.
- **Bezel** (#141418 light / #0A0A0C dark): the phone frame.

### Named Rules
**The Ink-on-Orange Rule.** Spark Orange never carries white text. Anything set on it — button label, numeral, toggle — is On-Orange ink.
**The One Purple Rule.** Purple marks the hearing person's lane and nothing else; the signer's lane and every action stay orange.
**The Phone Decides Rule.** Light or dark follows `prefers-color-scheme`; the page ships no theme control of its own.

## Typography

**Display Font:** Figtree (with system-ui, sans-serif)
**Body Font:** Figtree
**Label/Mono Font:** ui-monospace stack (`Cascadia Mono`, Consolas, Menlo) — only for the APK filename and the SHA-256

**Character:** One geometric-humanist sans at every level, self-hosted as a variable font (weights 300–900, latin + latin-ext so Filipino diacritics render). Hierarchy comes from weight and size, never from a second face; numerals are tabular everywhere (`font-feature-settings: "tnum"`).

### Hierarchy
- **Display** (900, clamp(2.3rem, 1.8rem + 2.2vw, 3.5rem), 1.0, −0.035em): the cover title only.
- **Headline** (800, clamp(1.7rem, 1.35rem + 1.4vw, 2.25rem), 1.15, −0.015em): section headings — Purpose, Download, Install steps, User manual, About.
- **Title** (700, clamp(1.3rem, 1.15rem + 0.6vw, 1.55rem), 1.15): manual parts, each with its numeral; install-step titles use 1.2rem with zero tracking.
- **Subtitle** (700, 1.125rem, 1.15): step headings inside a part; turns Spark Ink while the step is active on the stage.
- **Body** (400, 1.0625rem, 1.55): copy, held to a 66ch measure; secondary copy in Ink 2.
- **Label** (800, 0.8rem, +0.12em, uppercase): the MEMBERS label and the SHA-256 label only.
- **Gloss** (700, 0.86rem, +0.03em, uppercase as the app prints it): vocabulary entries, with the Filipino meaning beneath in Ink 2 at the same size.

### Named Rules
**The One Face Rule.** Figtree carries every role; a second face would be a second voice the app does not have.
**The Sixty-Six Rule.** Paragraphs and lists never exceed 66ch, at every breakpoint.

## Layout

A single centred column of at most 1120px with a 20px gutter (16px under 720px). The cover, Purpose and About are single-column; the walkthrough (Download → Install → Manual) is a two-column grid from 1000px: copy on the left, a 280–300px sticky column on the right holding one phone frame (`top: 84px`, offset for the 64px sticky header). Below 1000px the right column disappears and each step shows its own inline frame, centred, directly under the step heading.

The sticky header is 64px on wide screens; under 860px it wraps to a second row carrying the four section links as a horizontally scrollable strip, and every anchor target carries `scroll-margin-top` (84px / 112px) so headings never land under it. Sections are separated by a hairline and `clamp(32px, 5vw, 56px)` of padding; inside a part, steps sit 18px apart and manual parts 40px apart. Install steps indent 60px to make room for the 40px numeral. The vocabulary is an auto-fill grid of 168px-minimum tiles.

Print (`@page` Letter, 20mm × 18mm) shows only Install and the Manual in English, each step as a two-column grid (copy, 38mm phone), the vocabulary in four columns, with a generated title line and the download URL.

## Elevation & Depth

Depth is tonal: panels sit on the gradient by contrast, not by shadow. Two things cast real shadows — the phone frame and the orange call-to-action — and both shadows carry an offset and a soft blur; the CTA shadow is orange-tinted on the light wash and neutral black in the dark theme so it never reads as a glow. The sticky header is a translucent panel with `backdrop-filter: saturate(160%) blur(14px)`, the one place blur is used, because it must stay legible over scrolled content.

### Shadow Vocabulary
- **Phone** (`box-shadow: 0 18px 40px -18px rgba(44,18,48,0.45)` light / `0 22px 44px -18px rgba(0,0,0,0.7)` dark): the bezel only.
- **CTA** (`box-shadow: 0 16px 34px -14px rgba(255,107,1,0.55)` light / `0 16px 34px -14px rgba(0,0,0,0.7)` dark): the Download button and header pill.

### Named Rules
**The Two Shadows Rule.** Only the phone and the call-to-action are lifted; everything else is flat on the ground.

## Shapes

Rounded, in the app's proportions: chips and toggles are full pills (999px); tiles, code blocks and lane bars are 10–12px; the Download button 16px; panels and callouts 18px (the app's dialog radius); the phone bezel 34px outside, 26px for the screen inside, with a 10px punch-hole at the top. Hairlines are 1px at 12–14% alpha; no element carries a coloured side stripe. The dashed head-and-shoulders silhouette (3px orange, 9/8 dash) is the page's one drawn figure and reappears as the screenshot placeholder.

## Components

### Buttons
- **Shape:** rounded (16px); the header pill is a full pill.
- **Primary (Download):** Spark Orange fill, On-Orange ink, 800 weight at 1.2rem, 14px × 24px padding, full width up to 380px, drawn download-arrow icon at 1.35em.
- **Hover / Focus:** `translateY(-1px)` on hover (pointer devices only), `scale(0.97)` on press over 160ms `cubic-bezier(0.23,1,0.32,1)`; focus is the shared 3px orange ring at 3px offset.
- **Header pill:** same colours at 0.92rem; hidden while the real button is on screen; icon-only under 480px.

### Chips
- **Style:** pills. Members and TOC chips are Light Panel on a hairline border, Ink 2 text at 600; mode chips (FSL WORDS · LETTERS · ASL WORDS) are the orange tint with Spark Ink text at 800 and +0.05em, mirroring the app's camera chip.
- **State:** the language toggle's active side fills Spark Orange with On-Orange ink; TOC chips take an orange border on hover.

### Cards / Containers
- **Corner Style:** 18px.
- **Background:** Light/Dark Panel; the two profile cards add a top-down tint (orange for the signer, purple for the hearing person) fading to the panel at 70%.
- **Shadow Strategy:** none (see Elevation).
- **Border:** none; callouts are a flat orange tint.
- **Internal Padding:** 18–20px.

### Inputs / Fields
- **Style:** Light Panel, hairline border, 14px radius, drawn search icon in Ink 3, orange caret.
- **Focus:** border turns Spark Orange; no glow.
- **Status:** a live-region line under the field states the match count in the current language.

### Navigation
- **Style:** sticky translucent header — app icon (34px, 9px radius) + name at 800, section links at 600 in Ink 2 with an orange-tint hover, the EN | FIL segmented control and the download pill at the right. Under 860px the links move to a second scrollable row; under 480px the pill drops its label.

### Phone Frame (signature)
A `figure.phone`: 236px wide inline, 280–300px as the sticky stage; bezel padding 8px, screenshot at 9:20 with `object-fit: cover`, a caption pinned to the bottom over a black gradient, and a "Screenshot coming / Paparating ang screenshot" pill while the frame carries `data-placeholder`. The stage crossfades between screens (opacity + 2px blur, 220ms ease-out, two stacked images so the old screen stays until the new one is painted), dims to 35% when the copy no longer refers to a screen, and swaps instantly under `prefers-reduced-motion`.

### Step Numerals
40px circles: Light Panel with a 2px Spark Orange ring and Spark Ink digit at rest; Spark Orange fill with On-Orange digit while the step is active. Manual parts use a 30px filled numeral beside their title.

## Do's and Don'ts

### Do:
- **Do** set anything on Spark Orange in On-Orange ink (#1A1A2E); white on the orange is 2.9:1.
- **Do** keep both languages in the markup as sibling `lang="en"` / `lang="fil"` elements and let `html[data-lang]` choose; never render one language from JavaScript alone.
- **Do** give every screenshot the phone frame, its caption, and the placeholder pill until a real capture replaces it.
- **Do** hold copy to the 66ch measure and 1.55 line-height; respondents read this on a phone in daylight.
- **Do** animate only transform, opacity and filter, ≤250ms, with `cubic-bezier(0.23,1,0.32,1)`, and honour `prefers-reduced-motion`.

### Don't:
- **Don't** add a theme toggle; the phone's setting decides.
- **Don't** introduce a second accent — purple exists only for the hearing person's lane.
- **Don't** use kickers, eyebrow labels, gradient text, coloured side stripes, hard offset shadows, or emoji/glyph icons; icons are drawn 24px SVG at 2px round stroke.
- **Don't** shadow panels, chips or tiles; only the phone and the call-to-action are lifted.
- **Don't** put the stage's direction contract or any design notes into the served HTML.
