# Record Robotics Home Page — Clone Design

**Date:** 2026-08-29
**Branch:** `JellyOfSpace-dev-branch`
**Source:** https://www.recordrobotics.org/

## Goal

Recreate the Record Robotics home page using only HTML, CSS, and JavaScript —
no build step, no framework, no package manager. The page must open by
double-clicking `index.html`. Every nav link points at a single shared
placeholder page.

## Decisions

| Decision         | Choice                               | Why                                                                                                    |
| ---------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Assets           | Downloaded into `assets/`            | Self-contained; no dependency on the Squarespace CDN staying up                                        |
| Other pages      | One shared `coming-soon.html`        | Only the home page is in scope; one stub is cheaper to keep in sync than nine                          |
| Fonts            | `@font-face` from local `.woff2`     | Page renders correctly with the network off                                                            |
| Header/footer    | Markup duplicated in both HTML files | `fetch`-based partials are CORS-blocked on `file://`; the header would silently vanish on double-click |
| Calendar + video | Left as real iframes                 | Cannot be made offline. These are the only two network-dependent elements                              |

## File Layout

```
index.html            home page
coming-soon.html      shared stub for all nav links
css/styles.css        single stylesheet
js/main.js            burger toggle, scroll reveal, stub page name
assets/img/           logo, hero photo, 14 sponsor logos
assets/fonts/         Familjen Grotesk + Arimo woff2
```

## Design Tokens

Sampled from the live site, not eyeballed.

```
--blue   #2660BD   section + button background
--gold   #FFB300   header bar, footer text
--ink    #1E2934   headings on white
--black  #000000   footer background

h2    43.65px / 48.61px, letter-spacing -0.873px
h3    34.43px
body  16px / 24px
button radius 10px, padding 24px 35.2px
breakpoint 800px
```

Headings: Familjen Grotesk. Body and nav: Arimo.

## Page Structure

1. **Header** — `position: fixed`, gold `#FFB300`, ~87px tall. Wordmark logo left;
   8 nav links; YouTube / Instagram / Facebook icons; blue DONATE pill.
   Collapses to a 3-bar black burger below 800px.
2. **Hero** — full-bleed team photo, ~705px tall, blue wash over it. The live
   site's section divider is an empty path (`M0,0`), so the hero ends flat —
   no clip-path required.
3. **Blue band** (`#2660BD`) — Meeting Times + Google Calendar iframe;
   2025-26 Season Recap; 2024-25 Season Recap + YouTube iframe; mission line.
   Hairline rules between groups.
4. **White band** — "Sponsors", then Platinum / Gold / Bronze. Platinum and Gold
   name their sponsors as headings; 8 Gold logos and 6 Bronze logos in a
   responsive grid.
5. **Footer** — black, gold text. Address, contact email, and a Follow column.

## JavaScript Scope

Deliberately minimal:

- Burger menu open/close below 800px
- `IntersectionObserver` fade-in on scroll, matching the original's reveal
- `coming-soon.html` reads the location hash (e.g. `#about-us`) to name the
  page the visitor was headed to, with a `hashchange` listener so stub-to-stub
  navigation re-renders

Images use native `loading="lazy"`. No JS involved in layout.

## Content

Section headings, sponsor names, meeting times, and contact details are
reproduced as-is — they are short factual strings, and reproducing them is what
makes this a clone. The one longer prose sentence (the mission line) is written
fresh in the same spirit rather than copied; the real copy can be pasted in.

## Out of Scope

- The eight real content pages
- The donate flow
- Any CMS, form handling, or analytics

## Verification

Load `index.html` in the browser at desktop (1280px) and mobile (375px) widths
and compare against the live site section by section. Confirm the page renders
with the network disabled apart from the two iframes.
