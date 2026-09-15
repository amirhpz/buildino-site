# Buildino Landing Page — Design & Implementation Instructions

## 1. Mission

Create a premium, static, Persian-first landing website for **Buildino** that presents the product, its services, and its supported application capabilities in a complete, convincing, and visually exceptional way.

This must not look like a generic SaaS template. The landing page should feel like a carefully art-directed digital product experience: modern, architectural, fluid, high-end, and memorable.

The website is static for this phase. No backend integration is required.

---

## 2. Product Truth Comes From the Repository

Before writing marketing copy or implementing feature sections, inspect the Buildino repository and its existing project documentation.

Treat the repository, current database/schema documentation, mobile application code, product documentation, and approved design-system documentation as the source of truth.

Known current Buildino product direction includes a Persian-first resident experience, building/unit context, resident context switching, financial/status surfaces, activity/transaction presentation, and light/dark product semantics. However, do **not** assume that this short list is the entire product.

### Required content audit

Before implementation:

1. Locate the current Buildino product/domain documentation.
2. Inspect relevant schema/migrations/models or database documentation.
3. Inspect mobile feature folders, routes/navigation, backend modules, and existing product copy where useful.
4. Build an internal inventory of actual user-facing capabilities.
5. Group those capabilities into clear marketing categories.
6. Include all meaningful, currently supported product areas on the landing page.
7. Do not invent a feature merely because it is common in building-management software.
8. If a capability exists only as a future idea, do not present it as available unless the repository explicitly identifies it as planned and the UI labels it accordingly.

Potential areas worth checking for in the repository include:

- buildings, complexes, blocks, floors, units, ownership/residency
- resident context and multi-unit access
- charges, invoices, balances, payments, financial summaries, transaction/activity history
- service or maintenance requests
- announcements and resident communication
- notifications
- documents
- amenities, shared facilities, reservations, or bookings
- polls, voting, meetings, or community participation
- visitor/access-related functionality
- support, tickets, or issue tracking
- management/administration capabilities
- authentication, account, profile, and secure access

These are **audit targets, not permission to fabricate features**.

---

## 3. Audience and Brand Positioning

The website should communicate that Buildino turns fragmented residential/building-management tasks into one coherent digital experience.

The visual and content tone should feel:

- modern
- premium
- trustworthy
- intelligent
- calm
- highly polished
- technology-forward without becoming cold
- suitable for the Iranian market and Persian readers

Avoid overly corporate copy, exaggerated claims, empty startup buzzwords, and cliché phrases.

The page should make the product understandable even to a non-technical visitor.

---

## 4. Language and Direction

The **website UI and marketing copy must be Persian-first and RTL**.

Requirements:

- `<html lang="fa" dir="rtl">`
- use logical CSS properties where practical
- preserve correct RTL behavior at all breakpoints
- isolate Latin words, numbers, product names, phone values, and technical identifiers where needed
- do not create layouts that only look correct in LTR
- `Buildino` may remain Latin where appropriate
- Persian copy must sound natural and human, not machine-translated
- keep headings concise and confident
- keep body text readable and not unnecessarily verbose

---

## 5. Typography

Primary typeface: **IRANYekan Round / Iran Yekan Round**.

Rules:

- Use the actual project-provided licensed webfont files if they already exist in the repository.
- Do not download or redistribute an unlicensed copy of the font.
- If font files are not present, prepare clean `@font-face` declarations with clearly documented expected local asset paths and use a temporary system fallback.
- Use proper weight mapping rather than browser-synthesized bold where font weights are available.
- Use a restrained type scale with strong hierarchy.
- Avoid excessively bold Persian text.
- Headlines may use tighter tracking only where visually appropriate; never damage Persian shaping/readability.

Suggested fallback stack:

`"IRANYekanRound", "IRANYekan", Tahoma, Arial, sans-serif`

---

## 6. Core Color Palette

The brand palette is fixed around:

- `#5EEAD4` — luminous mint / highlight
- `#14B8A6` — primary teal
- `#1E3A5F` — deep blue
- `#0F172A` — deep slate / dark foundation

Use white, near-white neutrals, transparent/alpha variants, and derived tones only when needed for hierarchy, accessibility, surfaces, shadows, and theme construction.

Do not introduce unrelated accent colors.

### Light theme direction

- clean, airy, near-white canvas
- deep slate/navy typography
- teal as primary action/accent
- pale mint/teal atmospheric gradients
- translucent white glass surfaces
- soft blue/teal shadows and glows
- sufficient contrast at all times

### Dark theme direction

- `#0F172A` as the main atmospheric foundation
- `#1E3A5F` for depth and secondary surfaces
- `#14B8A6` for primary interactive accents
- `#5EEAD4` for luminous highlights and selective glow
- translucent dark glass surfaces
- subtle borders rather than bright outlines
- gradients should feel deep, dimensional, and refined rather than neon-heavy

### Theme implementation

Define reusable CSS custom properties/tokens.

Do not scatter repeated hardcoded visual values throughout components.

Include a polished light/dark theme toggle.

Preferred behavior:

1. Use the user's saved preference if one exists.
2. Otherwise respect `prefers-color-scheme`.
3. Persist manual selection in `localStorage`.
4. Animate theme transitions subtly.
5. Avoid a flash of the wrong theme on initial load.

---

## 7. Visual Art Direction

The target is a highly premium visual experience combining:

- soft 3D forms
- abstract architectural geometry
- fluid/liquid shapes
- liquid morphism
- glass morphism
- layered translucent surfaces
- controlled blur
- soft radial gradients
- mesh-like gradient atmospheres
- depth through scale, overlap, light, and shadow
- tasteful reflection/highlight effects
- subtle noise/grain only if it improves material realism
- refined micro-interactions
- cinematic but restrained motion

The page must remain elegant. Do not turn it into a visual-effects demo.

### Glass morphism

Use glass deliberately for content layers that benefit from depth.

Good glass characteristics:

- believable background blur
- low-opacity borders
- subtle inner highlight
- controlled shadow
- adequate contrast
- different opacity in light vs dark theme

Do not place every section inside a glass card.

### Liquid morphism

Use organic, fluid forms as a recurring brand motif.

Possible techniques:

- animated SVG paths
- masked gradients
- pseudo-elements
- blurred gradient blobs
- displacement-like visual illusions
- layered CSS shapes
- lightweight canvas/WebGL only when justified

Liquid forms should complement the product, not obscure text.

### 3D

Use one or a few strong 3D moments rather than many random objects.

The hero may include a premium abstract 3D composition inspired by:

- architectural layers
- connected living spaces
- building/unit relationships
- modular blocks
- fluid glass geometry
- a stylized Buildino ecosystem

The composition should use the approved palette and react gently to pointer movement or scroll.

If a full WebGL implementation is used:

- lazy-load it
- pause it when off-screen
- provide a graceful non-WebGL/mobile fallback
- keep GPU cost reasonable
- never block initial content rendering

---

## 8. Motion Direction

Motion should feel intentional, smooth, and expensive.

Use a motion system rather than unrelated animation tricks.

Recommended motion layers:

### Ambient motion
- slow gradient drift
- subtle floating 3D forms
- soft liquid-shape morphing
- gentle glow movement

### Entrance motion
- hero headline reveal
- staggered supporting content
- app/device visual reveal
- navigation fade/slide
- restrained scale/blur transitions

### Scroll motion
- section reveal
- staggered feature cards
- slight depth/parallax
- masked text or image transitions
- sticky storytelling only if it genuinely improves the content

### Interaction motion
- magnetic or responsive CTA behavior in moderation
- card hover depth
- subtle 3D tilt
- icon micro-motion
- theme-toggle morph/rotation
- navigation underline/indicator transition

### Rules

- Prefer `transform` and `opacity` for frequent animation.
- Avoid layout-thrashing animation.
- Keep scroll smooth.
- Never animate every visible element.
- Avoid continuous high-frequency motion behind body text.
- Respect `prefers-reduced-motion`.
- On reduced-motion mode, remove parallax, heavy morphing, and nonessential continuous movement.

---

## 9. Page Architecture

The exact feature content must come from the repository audit, but the landing page should follow a strong narrative.

### A. Premium navigation

Include:

- Buildino brand/wordmark area
- anchored navigation to major sections
- light/dark toggle
- primary CTA
- responsive mobile menu
- translucent/sticky treatment that evolves slightly after scroll

Keep it simple and premium.

### B. Hero

The hero is the most important visual moment.

It should contain:

- concise Persian value proposition
- one supporting paragraph
- primary CTA
- secondary CTA or scroll/explore action
- premium product/app visual
- distinctive 3D/liquid composition
- subtle trust/value indicators if supported

Avoid generic skyline stock photos.

Prefer original generative geometry, application UI compositions, device mockups, or abstract product-specific visuals.

### C. Product overview / "why Buildino"

Explain the core problem and how Buildino consolidates building/residential tasks into one experience.

Use a visually strong layout rather than plain paragraphs.

### D. Complete capabilities section

This section is mandatory.

After auditing the repository:

- group the real capabilities into meaningful categories
- present all important capabilities, not only 3–4 marketing highlights
- use a premium bento-grid or modular layout
- give major capabilities larger visual emphasis
- keep each card concise
- use icons/mini-visualizations that match the feature
- include details without overwhelming the visitor

If the feature inventory is large, use:
- primary feature groups
- expandable secondary detail
- horizontally progressing narrative
- or a well-structured bento system

Do not hide core product capabilities merely to keep the page short.

### E. Interactive product showcase

Create one or more visually rich mock product surfaces that communicate how Buildino feels.

Possible examples, only when supported by actual product features:

- resident/building context selector
- financial summary
- payment/charge status
- recent activity
- request/service state
- announcement or notification
- building/unit information

The showcase may use recreated static UI cards rather than screenshots when real screenshots/assets are unavailable.

Do not misrepresent unavailable product screens as shipped functionality.

### F. Benefits / outcomes

Translate features into understandable outcomes for residents and/or managers.

Examples of outcome framing:

- less fragmented communication
- clearer financial visibility
- faster access to building services
- easier resident/building context management
- more transparent status tracking

Only claim outcomes that follow reasonably from actual features.

### G. How it works

Use a concise 3–4 step visual flow.

Example structure:
1. join/access Buildino
2. select your residence/unit
3. access relevant building services and information
4. follow status and activity from one place

Adjust based on repository truth.

### H. Trust / quality section

If supported by current implementation/docs, communicate relevant themes such as:

- secure authentication
- structured access
- reliable state/status visibility
- Persian-first experience
- light/dark support
- responsive mobile experience

Do not invent certifications, encryption claims, SLA figures, customer counts, or security guarantees.

### I. FAQ

Create a compact Persian FAQ based on actual product questions.

Use accessible expandable accordions.

### J. Final CTA

End with a highly polished CTA composition.

Use a strong visual payoff, not a generic rectangle with a button.

### K. Footer

Include:
- brand
- navigation
- contact/legal placeholders only where appropriate
- copyright
- theme-aware styling

Do not fabricate company addresses, phone numbers, social profiles, customer logos, partner logos, or legal registrations.

---

## 10. App / Device Mockups

A premium landing page should visually show Buildino.

If real approved screenshots are present in the repository, use them without distorting their UI.

If approved screenshots do not exist, create realistic **static UI concept compositions** based on the actual Buildino design language and actual supported product features.

Rules:

- clearly keep them consistent with Buildino's Persian/RTL identity
- use the landing palette
- avoid copying unrelated app designs
- do not show fake business metrics as real
- use realistic Persian labels
- use placeholder values that are obviously demonstrative
- keep mobile mockups crisp at retina resolutions

---

## 11. Responsive Behavior

The design must be intentionally composed for:

- 360px
- 390px
- 768px
- 1024px
- 1280–1440px
- 1920px+

Desktop should feel cinematic.

Mobile should feel deliberately redesigned, not simply stacked.

Requirements:

- no horizontal overflow
- no clipped Persian text
- no inaccessible off-screen controls
- 3D effects degrade gracefully on low-power/mobile devices
- touch targets remain comfortable
- navigation remains usable
- glass layers remain readable on small screens

---

## 12. Accessibility

Visual ambition must not break accessibility.

Required:

- semantic HTML landmarks
- visible keyboard focus
- keyboard-operable navigation/menu/theme toggle/FAQ
- accessible names for icon-only controls
- appropriate heading hierarchy
- image/visual alternatives where meaningful
- reasonable WCAG AA contrast for normal text and controls
- reduced-motion support
- avoid using color as the only information cue
- avoid unreadable text over moving/complex backgrounds

---

## 13. Performance

The site should feel fast despite the visual richness.

Requirements:

- optimize above-the-fold loading
- lazy-load heavy 3D/visual modules
- lazy-load noncritical images
- compress visual assets
- use responsive image sizes
- avoid giant video backgrounds
- avoid unbounded particle counts
- pause off-screen animation where possible
- minimize third-party scripts
- keep bundle size under control
- avoid animation frameworks when CSS is sufficient
- use GPU-friendly transforms carefully
- no scroll-jacking

The hero text and CTA must remain usable even if optional 3D fails to load.

---

## 14. SEO and Metadata

For this static phase, include:

- meaningful Persian `<title>`
- Persian meta description
- viewport configuration
- canonical placeholder only if the real production URL is known
- Open Graph metadata with safe placeholders where assets are missing
- theme-color metadata that responds reasonably to theme
- semantic content structure
- favicon/app icon only from approved project assets

Do not fabricate production URLs.

---

## 15. Technical Direction

First inspect the repository and reuse an existing web stack if one already exists.

If no web frontend exists, create a self-contained static landing application in a clearly named directory such as:

`landing/`

Preferred default for a new isolated implementation:

- Vite
- React
- TypeScript
- componentized CSS with CSS custom properties/tokens

Use additional libraries only when they produce meaningful quality improvements.

Possible examples:

- a lightweight motion/animation library for complex choreography
- Three.js for a justified hero 3D composition

Do not install a large UI component library or generic template framework just to accelerate implementation.

Do not use a prebuilt landing-page template.

### Skill usage

If the environment provides a relevant high-quality frontend, web-design, motion, or UI implementation skill, you are allowed to install/use it.

Before doing so:

1. inspect its instructions
2. verify it fits this task
3. avoid unnecessary or overlapping skills
4. do not let a skill override this document or Buildino repository truth

---

## 16. Web Design Tokens

Create a small landing-page token layer using CSS variables.

At minimum define:

- brand colors
- light/dark surfaces
- primary/secondary text
- border/glass colors
- gradient stops
- radii
- shadows
- blur levels
- spacing scale
- content widths
- animation durations/easings
- z-index layers

Keep decorative values centralized where reasonable.

Avoid arbitrary component-by-component visual drift.

---

## 17. Visual Quality Bar

The design should be good enough to feel suitable for:

- a major product launch
- a premium app showcase
- a design-award portfolio
- a polished modern Iranian technology brand

A technically correct but visually average result is not acceptable.

Reject these patterns:

- generic Tailwind/SaaS template appearance
- a hero plus six identical icon cards
- random gradients with no hierarchy
- excessive neon
- giant empty headings with weak content
- overuse of glass cards
- excessive blur that reduces legibility
- decorative 3D unrelated to Buildino
- excessive particle effects
- stock-photo dependency
- animation on every object
- repetitive rounded rectangles
- inconsistent border radii
- fake dashboards containing unsupported features
- English-first layout translated into Persian at the end

---

## 18. Interaction Details

At minimum implement:

- working anchor navigation
- active/scroll-aware nav state if appropriate
- responsive menu
- light/dark toggle
- smooth in-page navigation
- FAQ accordion
- CTA hover/focus/pressed states
- polished card interactions
- motion-safe scroll reveals

Static does not mean visually inert.

---

## 19. Validation Before Completion

Before reporting the task complete:

1. Run the available install/build/typecheck/lint commands relevant to the chosen stack.
2. Fix build errors and obvious warnings caused by the implementation.
3. Verify both light and dark themes.
4. Verify Persian RTL at mobile and desktop sizes.
5. Check that no section horizontally overflows.
6. Check reduced-motion behavior.
7. Check keyboard navigation.
8. Check the site without WebGL/optional 3D where possible.
9. Verify all major product features shown are supported by repository evidence.
10. Verify no fabricated customer numbers, awards, partners, addresses, testimonials, or product claims were introduced.
11. If browser/screenshot tooling is available, visually inspect at least desktop and mobile and refine obvious composition issues.

Do not stop at a first-pass implementation if the visual result is clearly generic or unfinished.

---

## 20. Completion Report

At the end, report only useful implementation information:

- what was built
- feature/content groups included
- major visual/interaction systems implemented
- files/directories changed
- dependencies added and why
- commands run and their results
- how to run the landing page locally
- any missing user-provided assets, especially the licensed Iran Yekan Round font or approved screenshots

Do not produce unnecessary project-management documentation.

---

## 21. Non-Negotiable Summary

- Persian-first
- RTL from the beginning
- Iran Yekan Round
- light + dark themes
- palette anchored to `#5EEAD4`, `#14B8A6`, `#1E3A5F`, `#0F172A`
- premium 3D visual direction
- liquid morphism
- glass morphism
- sophisticated gradients
- professional animation and transitions
- static implementation for now
- fully responsive
- accessible
- performant
- product capabilities must come from the Buildino repository
- complete feature coverage, not a shallow three-card overview
- no fabricated features or business claims
- no generic template look
- visual excellence is a core acceptance criterion
