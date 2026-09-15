# Codex Implementation Prompt — Buildino Landing Page

Implement the Buildino landing website now.

First, read and follow `BUILDINO_LANDING_PAGE_INSTRUCTIONS.md` as the authoritative landing-page specification. Do not treat it as inspiration; treat it as the acceptance contract for this task.

## Goal

Build a static, Persian-first, fully RTL landing page for the **Buildino** application that presents the product and its real supported capabilities comprehensively and looks exceptionally premium.

The final result should feel art-directed and launch-ready rather than like a generic SaaS template.

## Mandatory visual identity

Use this brand palette as the foundation:

- `#5EEAD4`
- `#14B8A6`
- `#1E3A5F`
- `#0F172A`

Create both polished **light and dark themes** with a working theme toggle.

Use **Iran Yekan Round / IRANYekan Round** as the primary font. Reuse licensed font assets already present in the repository. If they are missing, create clean local `@font-face` hooks and a fallback stack, but do not download or redistribute an unlicensed font.

The site must use:

- premium 3D/abstract shapes
- soft layered gradients
- liquid morphism
- glass morphism
- refined depth, blur, highlights, and shadows
- professional scroll and entrance animations
- sophisticated transitions and micro-interactions
- restrained pointer/parallax interaction where useful

Keep it elegant and performant. Do not turn the page into a particle-effects demo.

## Product-content requirement

Before writing the landing-page copy, inspect the repository to understand Buildino.

Audit the relevant:

- product/docs files
- database/schema/migrations/models
- mobile feature folders
- routes/navigation
- backend modules
- existing Persian product copy
- approved design-system documentation

Determine the real Buildino feature set and service areas.

Known product direction includes the Persian resident experience, building/unit context, resident context switching, financial/status surfaces, and transaction/activity presentation, but this is not a complete feature list.

Find and include the complete meaningful set of user-facing product capabilities that currently exist in the repository. Group them into understandable marketing categories.

Do **not** fabricate common building-management features that are not supported by repository evidence.

Do **not** fabricate:
- customer counts
- testimonials
- awards
- partner logos
- company addresses
- phone numbers
- security certifications
- production URLs
- performance claims

## Page narrative

Create a coherent premium one-page experience with, at minimum:

1. sticky/translucent responsive navigation
2. visually extraordinary hero
3. concise Buildino value proposition
4. strong "why Buildino" product overview
5. comprehensive capability/feature showcase
6. interactive/static Buildino product UI showcase
7. benefits/outcomes section
8. concise "how it works" flow
9. trust/quality section using only supported claims
10. Persian FAQ
11. premium final CTA
12. polished footer

The capabilities section must be substantial. Do not reduce the product to six generic cards. Use a bento/modular information architecture that can show the full product scope without becoming cluttered.

## Hero direction

Make the hero the signature visual moment.

Create an original Buildino-specific composition using the approved palette, such as architectural/modular 3D geometry, layered glass structures, connected living-space forms, or a fluid abstract representation of buildings/units/resident services.

Combine it with realistic Buildino UI/device compositions where appropriate.

Avoid generic stock photography and generic dashboard templates.

If WebGL/Three.js materially improves the hero, it is allowed. Lazy-load heavy 3D, provide a graceful fallback, and do not block the hero text/CTA.

## RTL and Persian quality

The final website content must be Persian and natural.

Implement RTL from the beginning:

- `<html lang="fa" dir="rtl">`
- logical spacing/layout
- correct mixed Persian/Latin behavior
- correct mobile navigation
- no LTR-first hacks
- no clipped Persian text

## Theme behavior

Implement a real theme system:

- default to saved user preference
- otherwise respect system color preference
- persist manual selection
- avoid initial wrong-theme flash
- use a polished animated transition
- maintain strong contrast in both modes

## Motion quality

Use a coherent motion language:

- hero reveal choreography
- scroll-based staggered section reveals
- subtle parallax/depth
- liquid/gradient ambient movement
- premium hover/focus/press feedback
- restrained card tilt or depth where useful
- theme-toggle motion

Use `transform`/`opacity` for frequent animation and honor `prefers-reduced-motion`.

No scroll-jacking.

## Responsive quality

Deliberately design and verify at:

- 360 / 390 px
- 768 px
- 1024 px
- 1440 px
- large desktop

Do not simply stack the desktop layout on mobile. Recompose complex visual sections for smaller screens.

## Technical approach

Inspect the repo first and reuse an existing web stack if available.

If there is no web app, create a self-contained `landing/` project using a lean modern stack such as Vite + React + TypeScript with a centralized CSS-variable token layer.

Do not add a heavyweight component library or a prebuilt landing template.

Use extra dependencies only when they materially improve the result.

If a relevant frontend/web-design/motion skill is available in the environment, you may install and use it after checking its instructions. Do not install random or overlapping skills.

## Quality gates

Before finishing:

- build/typecheck/lint with the available relevant commands
- fix implementation-caused errors
- verify light and dark themes
- verify Persian RTL on mobile and desktop
- verify keyboard accessibility
- verify reduced-motion behavior
- verify no horizontal overflow
- verify heavy visuals degrade gracefully
- verify every public product feature claim against repository evidence
- visually inspect desktop and mobile with browser/screenshot tooling if available
- refine any section that still looks generic, flat, cluttered, or unfinished

Do not stop after planning or after a rough first pass. Implement the finished page.

## Final response

When complete, give me a concise implementation report containing:

- what you built
- product feature groups included
- major visual/motion systems
- files changed
- dependencies added and why
- commands run and results
- exact local run command
- any missing assets I need to provide

Do not ask for confirmation unless a missing repository asset or hard technical blocker makes implementation impossible.
