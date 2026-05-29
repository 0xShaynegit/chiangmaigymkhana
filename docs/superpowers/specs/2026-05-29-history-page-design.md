# History Page and Internal Linking Design

**Date:** 29/05/2026
**Project:** Chiang Mai Gymkhana Club website
**Scope:** New `/pages/history.html` page plus history content woven into existing pages

---

## Overview

The club has rich archival history content (11 source files) that currently sits unused in `_raw/archive/_history/`. This spec covers building a dedicated history page and integrating history content across the existing site via in-text links and callout boxes.

---

## History Page (`/pages/history.html`)

### Structure

Single long-scroll page with 8 anchor sections. A sticky anchor nav sits below the hero and links to each section by name.

### Hero Section

Full-width hero with a historical image (1901 teak foresters group photo or 1938 old clubhouse). Large display heading: "A Club Since 1898". Subheading draws from the founding context: jungle isolation, teak trade, colonial Chiang Mai. Anchor nav bar appears below.

### Anchor Nav

Links: Founding | Teak Wallahs | Architecture | Sport and Society | The Dark Years | Revival and the Sixes | The Club Today

### Section 1: The Founding (1898)

Source: `01-founding-1898.md`

April 5 1898. The 14 founding members, the four Great Teak Companies, British Consulate, W.J. Archer as first President. King Rama V land grant. The Foreign Cemetery as the fraternal twin born from the same royal decree. Pull quote from the founding document or W.A.R. Wood.

Images: 1901 group photo of teak foresters, founders memorial plaque, 1905 AFG Kerr photo.

### Section 2: The Teak Wallahs Era (1890-1910)

Source: `02-teak-wallahs-era.md`

The psychological necessity of the club. Month-long boat journey from Bangkok. No roads, no electricity. Nine months in deep jungle, elephants, malaria, tiger attacks. The Gymkhana as the only anchor of civilised life. Louis Leonowens. Literary immortality via W.A.R. Wood and Somerset Maugham.

Images: 1909 tennis club visit, 1909 Prince visit, 1931 plans.

### Section 3: The Architecture

Source: `03-architecture.md`

Colonial-Lanna fusion. Built to survive tropical heat before air conditioning. Solid teak construction. Clubhouse on stilts. The massive teak log pillars. The giant rain tree as living heritage. Club crest and wooden shield.

Images: Club crest wooden shield, old clubhouse 1966, giant rain tree photos.

### Section 4: Sport and Society

Sources: `04-sporting-legacy.md`, `05-squash-legacy.md`

Golf as the founding sport. Squash: Thailand's first court (teak-built, 1895/1898). Tennis from the earliest years (1909 lawn tennis visit). The role of sport in maintaining colonial identity and community. Literary references to the club in teak literature.

Images: 1909 lawn tennis club photo, historical golf images.

### Section 5: The Dark Years (1941-1946)

Source: `06-wwii-dark-years.md`

December 1941. Japanese Imperial Army enters Thailand. Thailand signs alliance with Japan. British and Australian members become enemy aliens overnight. The "walkout". Club requisitioned as a garrison. The interruption and what was lost.

Images: Any available archival photos from this era.

### Section 6: Revival and the Sixes

Sources: `07-sixes-spirit.md`, `STORY-The-Scoreboard-Journey.md`

Post-war recovery. 1970s-80s membership decline as teak families died out. The Chiang Mai International Cricket Sixes founded 1988. How the Sixes saved the club from financial oblivion. The scoreboard story: community, generosity, resilience after the 2024 floods.

Images: Vintage sixes cricket action photos, scoreboard photos, 2024 flood aftermath and restored field.

### Section 7: The Club Today

Brief section. 2024 floods and the recovery. Community pulling together. Looking toward the 150th anniversary. Tone is forward-looking and celebratory rather than dwelling on hardship.

Images: 2025 restored cricket field, 2026 sixes photos, current club facilities.

---

## Internal Linking Strategy

### Home Page (2 new sections)

**Section: "A Club Since 1898"**
Position: After the main hero, before or after the sports intro sections.
Content: 3-4 sentences on the founding, Somerset Maugham quote, one founding-era image.
Link: "Explore the full history" linking to `/pages/history.html`.

**Section: "Stories from the Club"**
Position: Lower on the homepage, above footer.
Content: 3 visual callout cards with brief teasers:
- The Teak Wallahs (links to `history.html#teak-wallahs`)
- The Dark Years (links to `history.html#dark-years`)
- The Spirit of the Sixes (links to `history.html#sixes`)

### About Page

Most significant history integration outside the history page itself.

- Expand founding section: the 14 founders, the teak companies, the land grant
- Add architecture notes: teak construction, Colonial-Lanna fusion, the rain tree
- Add Foreign Cemetery connection paragraph
- In-text links throughout to relevant history page anchors
- Tone: authoritative club history, suitable for members and prospective members

### Cricket Page

**In-text paragraph** in the existing cricket content:
Short paragraph on Sixes origins (1988, saving the club from decline), linking to `history.html#sixes`.

**Callout box: "The Scoreboard Story"**
2-3 sentences on the scoreboard's journey through the 2024 floods and community restoration. Links to `history.html#sixes`.

### Golf Page

**In-text paragraph** added to the golf history or club overview section:
Short paragraph on golf as the founding sport of the Gymkhana, colonial origins. Links to `history.html#founding`.

### Tennis Page

**In-text mention** in the facilities or history section:
One paragraph noting squash as Thailand's first court (teak-built, 1895/1898). Links to `history.html#sport-society`.

### Restaurant Page

**Callout box: colonial dining heritage**
2-3 sentences on the colonial dining room, the arched architecture, the giant rain tree as the backdrop to a century of celebrations. Links to `history.html#architecture`.

---

## Images

The history page will use historical photos heavily. Key images already in `/images/`:
- `chiangmaigymkhana-group-photo-of-teak-foresters-...1901.webp`
- `chiangmaigymkhana-1909-visit-of-the-Lawn-Tennis-Club1.webp`
- `chiangmaigymkhana-1909-visit-of-the-Prince-Son-of-Rama-5.webp`
- `chiangmaigymkhana-1931-plans.webp`
- `chiangmaigymkhana-1966-old-clubhouse.webp`
- `chiangmaigymkhana-Old-Gymkhana-Clubhouse-January-1-1938-...webp`
- `chiangmaigymkhana-Rugby-at-Gymkhana-1960s.webp`
- `chiangmaigymkhana-founders-memorial-plaque-1898.webp`
- `chiangmaigymkhana-club-crest-wooden-shield-1898.webp`
- Vintage and modern sixes cricket series (1992 through 2026)
- Flood and restoration photos (2024-2025)

The additional 100 images (squash courts, driving range etc.) will be integrated in a later phase focused on improving the general site imagery.

---

## Anchor IDs

| Section | Anchor ID |
|---|---|
| The Founding | `#founding` |
| Teak Wallahs Era | `#teak-wallahs` |
| Architecture | `#architecture` |
| Sport and Society | `#sport-society` |
| The Dark Years | `#dark-years` |
| Revival and the Sixes | `#sixes` |
| The Club Today | `#today` |

---

## Files to Create or Modify

| File | Action |
|---|---|
| `pages/history.html` | Create new |
| `index.html` | Add 2 sections |
| `pages/about.html` | Expand history content, add in-text links |
| `pages/cricket.html` | Add paragraph + callout box |
| `pages/golf.html` | Add in-text paragraph |
| `pages/tennis.html` | Add in-text mention |
| `pages/restaurant.html` | Add callout box |

---

## Out of Scope (Later Phase)

- Adding 100 new images (squash, driving range) to existing pages
- Modern day photo gallery expansion
- Any structural changes to CSS or navigation
