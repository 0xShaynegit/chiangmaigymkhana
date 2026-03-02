# Image Display Dimensions Analysis
## Chiang Mai Gymkhana Club Website

**Date:** 2026-03-02
**Purpose:** Document all image display sizes to inform responsive image generation and optimization
**Status:** Complete analysis of all 6 HTML pages and CSS styling

---

## CSS Layout Analysis

### Hero Sections
- **Height:** `min-height: 600px` (desktop), `min-height: 400px` (tablet @ 768px)
- **Width:** Full viewport width (background images use `background-size: cover`)
- **Display:** Full-width background image with overlay
- **Viewport Coverage:** 100% width, 600px to 400px height depending on breakpoint

### Split-Content Sections
- **Layout:** 2-column grid at desktop, 1-column stack on mobile
- **Desktop Grid:** `grid-template-columns: 1fr 1fr` with `gap: 2rem` (spacing-2xl)
- **Image Container:** `.split-image` - takes 50% of container width
- **Max Container Width:** 1200px
- **Actual Display Width at Desktop:** Approximately 588px (1200px container - padding - gap divided by 2 columns)
- **Responsive Breakpoint:** 768px and below = single column (full width)

### Gallery Sections
- **Grid Layout:** `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
- **Desktop:** ~3-4 columns (1200px container width)
- **Tablet (768px):** ~2-3 columns
- **Mobile (480px):** 1 column
- **Aspect Ratio:** All gallery items set to `aspect-ratio: 1` (square)
- **Image Fit:** `object-fit: cover`

### Logo
- **Size:** `height: 50px; width: 50px`
- **Container:** `.logo-image` class
- **Display:** Flex layout in header

---

## Lighthouse-Flagged Images Analysis

### 1. four-golfers-wide-course-background.webp
**Original Size:** 2048 × 1536 px (aspect ratio 1.33:1)
**Location:** index.html, golf section (split-content, not gallery)
**Context:** `.split-image img` in split-content layout
**Note:** This is the wide-version (2048×1536) used in homepage golf section, not the four-golfers-group-photo-mixed.webp
**Lighthouse Flag:** This image is flagged by Lighthouse audit

**Display Analysis:**
- Desktop: ~50% of 1200px container = ~588px width
  - Aspect: 2048:1536 = 1.33:1
  - Display: 588px × 441px
- Tablet (768px): 100% width = ~736px width
  - Display: 736px × 552px
- Mobile (480px): 100% width with padding
  - Display: ~448px × 336px

**Recommended Responsive Variants:**
- 588px × 441px (desktop)
- 736px × 552px (tablet)
- 448px × 336px (mobile)

---

### 2. six-golfers-group-photo.webp
**Original Size:** 2048 × 1536 px
**Location:** index.html & golf.html, split sections
**Context:** `.split-image img` in split-content layout

**Display Analysis:**
- Desktop: ~50% of 1200px container = ~588px width, auto height (maintains aspect ratio)
  - Aspect: 2048:1536 = 1.33:1
  - Display: 588px × 441px
- Tablet (768px): 100% width = ~736px width (full container)
  - Display: 736px × 552px
- Mobile (480px): 100% width with padding
  - Display: ~448px × 336px

**Recommended Responsive Variants:**
- 588px × 441px (desktop)
- 736px × 552px (tablet)
- 448px × 336px (mobile)

---

### 3. cricket-two-batsmen-green-gold-kit.webp
**Original Size:** 2048 × 1366 px
**Location:** index.html & cricket.html, split sections
**Context:** `.split-image img` in split-content layout

**Display Analysis:**
- Desktop: ~50% of 1200px = ~588px width
  - Aspect: 2048:1366 = 1.50:1
  - Display: 588px × 392px
- Tablet (768px): 100% = ~736px
  - Display: 736px × 491px
- Mobile (480px): ~448px
  - Display: 448px × 299px

**Recommended Responsive Variants:**
- 588px × 392px (desktop)
- 736px × 491px (tablet)
- 448px × 299px (mobile)

---

### 4. golf-driver-clubhead-ball-on-tee.webp
**Original Size:** 1920 × 1280 px (aspect ratio 1.5:1)
**Location:** index.html, golf section (split-content)
**Context:** `.split-image img` in split-content layout
**Lighthouse Flag:** This image is flagged by Lighthouse audit

**Display Analysis:**
- Desktop: ~50% of 1200px container = ~588px width
  - Aspect: 1920:1280 = 1.5:1
  - Display: 588px × 392px
- Tablet (768px): 100% width = ~736px width
  - Display: 736px × 491px
- Mobile (480px): 100% width with padding
  - Display: ~448px × 299px

**Recommended Responsive Variants:**
- 588px × 392px (desktop)
- 736px × 491px (tablet)
- 448px × 299px (mobile)

---

### 5. club-sandwich-fries-food-plate.webp
**Original Size:** 960 × 960 px
**Location:** index.html & restaurant.html, split sections
**Context:** `.split-image img` in split-content layout

**Display Analysis:**
- Desktop: ~588px width (50% of container)
  - Aspect: 1:1
  - Display: 588px × 588px
- Tablet: ~736px width (100% of container)
  - Display: 736px × 736px
- Mobile: ~448px width
  - Display: 448px × 448px

**Recommended Responsive Variants:**
- 588px × 588px (desktop)
- 736px × 736px (tablet)
- 448px × 448px (mobile)

---

### 6. historical-1900s-colonial-veranda-photo.webp
**Original Size:** 510 × 295 px (aspect ratio 1.73:1)
**Location:** index.html & about.html, split sections
**Context:** `.split-image img` in split-content layout
**Lighthouse Flag:** This image is flagged by Lighthouse audit

**Display Analysis:**
- Desktop: ~50% of 1200px container = ~588px width
  - Aspect: 510:295 = 1.73:1
  - Display: 588px × 340px
- Tablet (768px): 100% width = ~736px width
  - Display: 736px × 426px
- Mobile (480px): 100% width with padding
  - Display: ~448px × 259px

**Recommended Responsive Variants:**
- 588px × 340px (desktop)
- 736px × 426px (tablet)
- 448px × 259px (mobile)

---

### 7. two-tennis-courts-blue-green-pavilion.webp
**Original Size:** 640 × 349 px
**Location:**
  - index.html: hero section (background image)
  - index.html: split-section (`.split-image img`)
  - tennis.html: hero section (background image)
  - tennis.html: split-section (`.split-image img`)
**Context:**
  1. Hero background-image (full width)
  2. Split-section image (50% desktop, 100% mobile)

**Display Analysis (as split-image):**
- Desktop: ~588px width
  - Aspect: 640:349 = 1.83:1
  - Display: 588px × 321px
- Tablet: ~736px width
  - Display: 736px × 402px
- Mobile: ~448px width
  - Display: 448px × 245px

**Display Analysis (as hero background):**
- Desktop: 100% width × 600px min-height
- Tablet: 100% width × 400px min-height
- Mobile: 100% width × 400px min-height

**Recommended Responsive Variants:**
For split-section:
- 588px × 321px (desktop)
- 736px × 402px (tablet)
- 448px × 245px (mobile)

For hero (background images):
- 1440px × 600px (desktop, assuming 1440px max width)
- 768px × 400px (tablet)
- 480px × 400px (mobile)

---

### 8. club-logo-1898.webp
**Original Size:** 416 × 416 px
**Location:** Header on all pages
**Context:** `.logo-image` class

**Display Analysis:**
- All breakpoints: Fixed 50px × 50px
- CSS: `height: 50px; width: 50px; object-fit: contain`

**Recommended Responsive Variants:**
- 50px × 50px (all sizes - logo standard display)
- PLUS generate 100px × 100px variant for high-DPI (2x) displays

---

## Additional Images Found (Not in Lighthouse Report)

### Hero Section Background Images
Used with `background-image` and `background-size: cover`:

1. **golf-fairway-long-view-blue-sky.webp** (golf.html hero)
2. **cricket-scoreboard-straycats-vs-cm-warriors.webp** (cricket.html hero)
3. **giant-tree-fairy-lights-ceremony-night.webp** (restaurant.html hero)
4. **giant-rain-tree-colonial-clubhouse.webp** (about.html hero)
5. **golf-course-fairway-blue-sky-sprinkler.webp** (index.html hero)

**All Hero Images Display:**
- Desktop: 100% width × 600px height
- Tablet: 100% width × 400px height
- Mobile: 100% width × 400px height (full viewport width)

**Recommended Responsive Variants for Each Hero:**
- 1440px × 600px (desktop)
- 768px × 400px (tablet)
- 480px × 400px (mobile)

### Split-Section Images (Non-Flagged)
Multiple images in split-content sections use same display pattern:
- golf-driving-range-covered-bays.webp
- golf-flatlay-glove-ball-putter.webp
- golf-driver-approaching-ball-sideview.webp
- golf-tournament-registration-megaphone.webp
- closeup-green-turf-texture.webp
- open-parkland-mature-trees.webp
- cricket-team-pink-jerseys-match-box-series.webp
- giant-tree-terrace-bistro-tables.webp
- outdoor-wedding-rustic-setup-chalkboard.webp

**All Use Same Display Pattern:**
- Desktop: 588px width (auto height)
- Tablet: 736px width (auto height)
- Mobile: 448px width (auto height)

### Wedding Gallery Images
9 images in restaurant.html gallery section, all square aspect ratio:
- wedding-ceremony-setup-under-giant-tree.webp
- evening-wedding-reception-fairy-lights.webp
- wedding-photoshoot-white-floral-tree.webp
- bride-groom-balloons-sunny-lawn.webp
- wedding-couple-seated-under-tree.webp
- outdoor-wedding-aisle-white-chairs.webp
- outdoor-ceremony-chairs-lights-dusk.webp
- large-outdoor-wedding-reception-dusk.webp
- wedding-group-white-floral-installation.webp

**Display Same as Gallery Items:**
- 300px × 300px (desktop)
- 375px × 375px (tablet)
- 448px × 448px (mobile)

### General Gallery Images (index.html gallery)
6 items in gallery grid, all aspect-ratio: 1:

**Display Pattern (same as all gallery images):**
- 300px × 300px (desktop, ~4 columns)
- 375px × 375px (tablet, ~2 columns)
- 448px × 448px (mobile, 1 column)

---

## Summary: Image Categories & Display Patterns

### Category 1: Hero Background Images
**Pattern:** Full-width background-image with background-size: cover
**Display Sizes:**
- Desktop (>768px): 1440px × 600px
- Tablet (768px): 768px × 400px
- Mobile (<480px): 480px × 400px

**Affected Images:** 5 hero sections across all pages

### Category 2: Split-Content Section Images
**Pattern:** img tag in .split-image, 50% width desktop, 100% mobile
**Display Sizes by Aspect Ratio:**

**For Square Images (aspect 1:1):**
- Desktop: 588px × 588px
- Tablet: 736px × 736px
- Mobile: 448px × 448px

**For 2048:1536 Aspect (1.33:1):**
- Desktop: 588px × 441px
- Tablet: 736px × 552px
- Mobile: 448px × 336px

**For 2048:1366 Aspect (1.50:1):**
- Desktop: 588px × 392px
- Tablet: 736px × 491px
- Mobile: 448px × 299px

**For 640:349 Aspect (1.83:1):**
- Desktop: 588px × 321px
- Tablet: 736px × 402px
- Mobile: 448px × 245px

**Affected Images:** 9+ images in split-sections

### Category 3: Gallery Grid Images
**Pattern:** img tag in .gallery-item with aspect-ratio: 1 and object-fit: cover
**Display Sizes:**
- Desktop: 300px × 300px (~4 columns)
- Tablet: 375px × 375px (~2 columns)
- Mobile: 448px × 448px (1 column)

**Affected Images:** 15+ gallery items (6 index + 9 wedding + all other galleries)

### Category 4: Logo
**Pattern:** img tag with fixed size
**Display Size:** 50px × 50px (all breakpoints)

**Affected Images:** 1 image (club-logo-1898.webp)

---

## File Size Optimization Targets

### Current Issues (from Lighthouse)
All 8 flagged images are oversized for their display contexts:
- **four-golfers-wide-course-background:** 1536×1536 → max display 448×448 (mobile)
- **six-golfers-group-photo:** 2048×1536 → max display 736×552 (tablet)
- **cricket-two-batsmen-green-gold-kit:** 2048×1366 → max display 736×491 (tablet)
- **golf-driver-clubhead-ball-on-tee:** 1280×1280 → max display 448×448 (mobile)
- **club-sandwich-fries-food-plate:** 960×960 → max display 736×736 (tablet)
- **historical-1900s-colonial-veranda-photo:** [size unknown] → varies by context
- **two-tennis-courts-blue-green-pavilion:** 640×349 → max display 736×402 (tablet) or full width for hero
- **club-logo-1898:** 416×416 → 50×50 (fixed, extreme mismatch)

### Optimization Strategy
For each image, create responsive variants:
1. **Largest needed:** For high-DPI desktop/tablet displays (2x scaling)
2. **Medium:** Standard desktop/tablet size
3. **Mobile:** Mobile/small screen size
4. **Thumbnail:** Optional for very small contexts

---

## Next Steps (Task 2)

Using this analysis, generate responsive image variants:

1. **Hero images** (5 total):
   - 1440×600 (desktop)
   - 768×400 (tablet)
   - 480×400 (mobile)

2. **Split-section images** (9+ images):
   - Generate variants based on their aspect ratios
   - Create tablet and mobile sizes alongside desktop

3. **Gallery images** (15+ images):
   - 300×300 (desktop)
   - 375×375 (tablet)
   - 448×448 (mobile)
   - 600×600 (2x desktop)
   - 750×750 (2x tablet)
   - 896×896 (2x mobile)

4. **Logo**:
   - 50×50 (current)
   - 100×100 (optional high-DPI)

All images should remain in WebP format to maintain current file size benefits.
