# Lighthouse Performance Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix critical Lighthouse performance issues by optimizing images (1,411 KiB savings), eliminating render-blocking CSS/JS, and improving LCP request discovery.

**Architecture:**
- Generate responsive image variants (small/medium/large) using ImageMagick
- Update HTML with srcset and explicit width/height attributes for CLS prevention
- Inline critical CSS and defer non-critical GLightbox CSS
- Add fetchpriority="high" to LCP image and preconnect hints for CDN resources

**Tech Stack:** HTML5, CSS3, responsive images (srcset/sizes), ImageMagick for image processing

**Baseline Metrics:** FCP: 1.5s, LCP: 5.9s, CLS: 0, Speed Index: 1.5s

---

## Task 1: Analyze Image Display Sizes Across All Pages

**Files:**
- Reference: `index.html`
- Reference: `pages/golf.html`, `pages/tennis.html`, `pages/cricket.html`, `pages/restaurant.html`, `pages/about.html`
- Reference: `css/style.css`

**Step 1: Document current image display dimensions**

Create a mapping of:
- Hero background images (full width - estimate 100vw)
- Split-section images (~50% width at desktop = ~400-500px, scales to ~100% on mobile)
- Gallery grid images (~25-33% at desktop, ~50% at tablet, 100% on mobile)
- Logo (~88px per CSS)
- Food/product images (~550px)

**Step 2: List problematic images from Lighthouse report**

These need responsive variants:
- `four-golfers-wide-course-background.webp` (1536x1536, displayed at ~700x525)
- `six-golfers-group-photo.webp` (2048x1536, displayed at ~553x415)
- `cricket-two-batsmen-green-gold-kit.webp` (2048x1366, displayed at ~553x369)
- `golf-driver-clubhead-ball-on-tee.webp` (1280x1280, displayed at ~788x525)
- `club-sandwich-fries-food-plate.webp` (960x960, displayed at ~553x553)
- `historical-1900s-colonial-veranda-photo.webp` (larger original, needs compression)
- `two-tennis-courts-blue-green-pavilion.webp` (640x349, displayed at ~553x302)
- `club-logo-1898.webp` (416x416, displayed at ~88x88)

**Step 3: Commit findings**

```bash
git add -A
git commit -m "docs: analyze image display dimensions for responsive optimization"
```

---

## Task 2: Generate Responsive Image Variants Using ImageMagick

**Files:**
- Create: `images/` directory will contain new sized variants alongside originals
- Create: `scripts/generate-responsive-images.sh` (helper documentation)

**Step 1: Install/verify ImageMagick is available**

Run: `magick --version`
Expected: ImageMagick version output

**Step 2: Generate image variants for each problematic image**

For each image from Lighthouse report, create 2-3 sizes:

**Logo (88x88 display, 416x416 original):**
```bash
magick images/chiang-mai-gymkhana-chiangmaigymkhana-club-logo-1898.webp -resize 176x176 images/chiang-mai-gymkhana-chiangmaigymkhana-club-logo-1898-176.webp
magick images/chiang-mai-gymkhana-chiangmaigymkhana-club-logo-1898.webp -resize 88x88 images/chiang-mai-gymkhana-chiangmaigymkhana-club-logo-1898-88.webp
```

**Four golfers (700x525 display, 1536x1536 original):**
```bash
magick images/chiang-mai-gymkhana-chiangmaigymkhana-four-golfers-wide-course-background.webp -resize 800x600 -quality 82 images/chiang-mai-gymkhana-chiangmaigymkhana-four-golfers-wide-course-background-800.webp
magick images/chiang-mai-gymkhana-chiangmaigymkhana-four-golfers-wide-course-background.webp -resize 1200x900 -quality 85 images/chiang-mai-gymkhana-chiangmaigymkhana-four-golfers-wide-course-background-1200.webp
```

**Six golfers (553x415 display, 2048x1536 original):**
```bash
magick images/chiang-mai-gymkhana-chiangmaigymkhana-six-golfers-group-photo.webp -resize 600x450 -quality 82 images/chiang-mai-gymkhana-chiangmaigymkhana-six-golfers-group-photo-600.webp
magick images/chiang-mai-gymkhana-chiangmaigymkhana-six-golfers-group-photo.webp -resize 1000x750 -quality 85 images/chiang-mai-gymkhana-chiangmaigymkhana-six-golfers-group-photo-1000.webp
```

**Cricket batsmen (553x369 display, 2048x1366 original):**
```bash
magick images/chiang-mai-gymkhana-chiangmaigymkhana-cricket-two-batsmen-green-gold-kit.webp -resize 600x400 -quality 82 images/chiang-mai-gymkhana-chiangmaigymkhana-cricket-two-batsmen-green-gold-kit-600.webp
magick images/chiang-mai-gymkhana-chiangmaigymkhana-cricket-two-batsmen-green-gold-kit.webp -resize 1000x667 -quality 85 images/chiang-mai-gymkhana-chiangmaigymkhana-cricket-two-batsmen-green-gold-kit-1000.webp
```

**Golf driver (788x525 display, 1280x1280 original):**
```bash
magick images/chiang-mai-gymkhana-chiangmaigymkhana-golf-driver-clubhead-ball-on-tee.webp -resize 800x800 -quality 82 images/chiang-mai-gymkhana-chiangmaigymkhana-golf-driver-clubhead-ball-on-tee-800.webp
magick images/chiang-mai-gymkhana-chiangmaigymkhana-golf-driver-clubhead-ball-on-tee.webp -resize 1200x1200 -quality 85 images/chiang-mai-gymkhana-chiangmaigymkhana-golf-driver-clubhead-ball-on-tee-1200.webp
```

**Club sandwich (553x553 display, 960x960 original):**
```bash
magick images/chiang-mai-gymkhana-chiangmaigymkhana-club-sandwich-fries-food-plate.webp -resize 600x600 -quality 82 images/chiang-mai-gymkhana-chiangmaigymkhana-club-sandwich-fries-food-plate-600.webp
magick images/chiang-mai-gymkhana-chiangmaigymkhana-club-sandwich-fries-food-plate.webp -resize 900x900 -quality 85 images/chiang-mai-gymkhana-chiangmaigymkhana-club-sandwich-fries-food-plate-900.webp
```

**Colonial veranda (re-compress for better quality):**
```bash
magick images/chiang-mai-gymkhana-chiangmaigymkhana-historical-1900s-colonial-veranda-photo.webp -quality 85 images/chiang-mai-gymkhana-chiangmaigymkhana-historical-1900s-colonial-veranda-photo-opt.webp
```

**Tennis courts (553x302 display, 640x349 original):**
```bash
magick images/chiang-mai-gymkhana-chiangmaigymkhana-two-tennis-courts-blue-green-pavilion.webp -resize 600x328 -quality 85 images/chiang-mai-gymkhana-chiangmaigymkhana-two-tennis-courts-blue-green-pavilion-600.webp
```

**Step 3: Verify file sizes**

Run: `ls -lh images/*-[0-9]*px.webp | head -20`
Expected: New optimized files should be significantly smaller than originals (50-70% reduction)

**Step 4: Commit optimized images**

```bash
git add images/*-[0-9]*.webp images/*-opt.webp
git commit -m "feat: generate responsive image variants with optimized compression"
```

---

## Task 3: Update Homepage (index.html) with Responsive Images and Width/Height

**Files:**
- Modify: `index.html:65` (historical image)
- Modify: `index.html:28` (logo)
- Modify: All gallery images in tourism/activity sections

**Step 1: Update logo image with responsive sizes and explicit dimensions**

Current (line 28):
```html
<img src="images/chiang-mai-gymkhana-chiangmaigymkhana-club-logo-1898.webp" alt="Chiang Mai Gymkhana Club Logo" class="logo-image">
```

Replace with:
```html
<img
  srcset="images/chiang-mai-gymkhana-chiangmaigymkhana-club-logo-1898-88.webp 88w,
          images/chiang-mai-gymkhana-chiangmaigymkhana-club-logo-1898-176.webp 176w,
          images/chiang-mai-gymkhana-chiangmaigymkhana-club-logo-1898.webp 416w"
  sizes="(max-width: 480px) 64px, 88px"
  src="images/chiang-mai-gymkhana-chiangmaigymkhana-club-logo-1898.webp"
  alt="Chiang Mai Gymkhana Club Logo"
  class="logo-image"
  width="88"
  height="88"
  loading="eager">
```

**Step 2: Update historical veranda image with dimensions**

Current (line 65):
```html
<img data-glightbox src="images/chiang-mai-gymkhana-chiangmaigymkhana-historical-1900s-colonial-veranda-photo.webp" alt="Historical colonial veranda at Chiang Mai Gymkhana Club from the 1900s" data-glightbox>
```

Replace with (assuming original is ~1024px wide):
```html
<img
  data-glightbox
  src="images/chiang-mai-gymkhana-chiangmaigymkhana-historical-1900s-colonial-veranda-photo-opt.webp"
  alt="Historical colonial veranda at Chiang Mai Gymkhana Club from the 1900s"
  width="800"
  height="534"
  loading="lazy">
```

**Step 3: Test homepage renders correctly**

Open: `index.html` in browser
Expected: Logo displays at correct size, images load without layout shift

**Step 4: Commit changes**

```bash
git add index.html
git commit -m "feat: add responsive images and width/height to homepage"
```

---

## Task 4: Update Golf Page (pages/golf.html) with Responsive Images

**Files:**
- Modify: `pages/golf.html` - all img tags

**Step 1: Identify all images in golf.html**

Run: `grep -n "<img" pages/golf.html`
Expected: List all image tags with line numbers

**Step 2: Update four-golfers-wide image with srcset**

Current:
```html
<img data-glightbox="" src="images/chiang-mai-gymkhana-chiangmaigymkhana-four-golfers-wide-course-back..." alt="Four golfers...">
```

Replace with:
```html
<img
  data-glightbox=""
  srcset="images/chiang-mai-gymkhana-chiangmaigymkhana-four-golfers-wide-course-background-800.webp 800w,
          images/chiang-mai-gymkhana-chiangmaigymkhana-four-golfers-wide-course-background-1200.webp 1200w,
          images/chiang-mai-gymkhana-chiangmaigymkhana-four-golfers-wide-course-background.webp 1536w"
  sizes="(max-width: 768px) 100vw, 700px"
  src="images/chiang-mai-gymkhana-chiangmaigymkhana-four-golfers-wide-course-background.webp"
  alt="Four golfers posing with a wide golf course background at Chiang Mai Gymkhana Club"
  width="700"
  height="525"
  loading="lazy">
```

**Step 3: Update six-golfers image with srcset**

Replace with:
```html
<img
  data-glightbox=""
  srcset="images/chiang-mai-gymkhana-chiangmaigymkhana-six-golfers-group-photo-600.webp 600w,
          images/chiang-mai-gymkhana-chiangmaigymkhana-six-golfers-group-photo-1000.webp 1000w,
          images/chiang-mai-gymkhana-chiangmaigymkhana-six-golfers-group-photo.webp 2048w"
  sizes="(max-width: 768px) 100vw, 553px"
  src="images/chiang-mai-gymkhana-chiangmaigymkhana-six-golfers-group-photo.webp"
  alt="Six golfers posing for a group photo on the Chiang Mai Gymkhana Club golf course"
  width="553"
  height="415"
  loading="lazy">
```

**Step 4: Update golf-driver image with srcset**

Replace with:
```html
<img
  data-glightbox=""
  srcset="images/chiang-mai-gymkhana-chiangmaigymkhana-golf-driver-clubhead-ball-on-tee-800.webp 800w,
          images/chiang-mai-gymkhana-chiangmaigymkhana-golf-driver-clubhead-ball-on-tee-1200.webp 1200w,
          images/chiang-mai-gymkhana-chiangmaigymkhana-golf-driver-clubhead-ball-on-tee.webp 1280w"
  sizes="(max-width: 768px) 100vw, 788px"
  src="images/chiang-mai-gymkhana-chiangmaigymkhana-golf-driver-clubhead-ball-on-tee.webp"
  alt="Golf driver clubhead and ball on a tee at Chiang Mai Gymkhana Club"
  width="788"
  height="525"
  loading="lazy">
```

**Step 5: Add width/height to all other golf page images**

For each remaining `<img>` tag without width/height, add estimated dimensions based on CSS grid/layout (typically 553px wide in galleries).

**Step 6: Test golf page**

Open: `pages/golf.html` in browser
Expected: All images display with proper aspect ratio, no layout shift

**Step 7: Commit changes**

```bash
git add pages/golf.html
git commit -m "feat: add responsive images and width/height to golf page"
```

---

## Task 5: Update Tennis Page (pages/tennis.html) with Responsive Images

**Files:**
- Modify: `pages/tennis.html`

**Step 1: Update two-tennis-courts image with srcset**

Replace with:
```html
<img
  data-glightbox=""
  srcset="images/chiang-mai-gymkhana-chiangmaigymkhana-two-tennis-courts-blue-green-pavilion-600.webp 600w,
          images/chiang-mai-gymkhana-chiangmaigymkhana-two-tennis-courts-blue-green-pavilion.webp 640w"
  sizes="(max-width: 768px) 100vw, 553px"
  src="images/chiang-mai-gymkhana-chiangmaigymkhana-two-tennis-courts-blue-green-pavilion.webp"
  alt="Two tennis courts with blue and green surfaces and a pavilion at Chiang Mai Gymkhana Club"
  width="553"
  height="302"
  loading="lazy">
```

**Step 2: Add width/height to all other tennis page images**

For each remaining `<img>` tag, add explicit width/height dimensions.

**Step 3: Test tennis page**

Open: `pages/tennis.html` in browser
Expected: Images render without CLS

**Step 4: Commit changes**

```bash
git add pages/tennis.html
git commit -m "feat: add responsive images and width/height to tennis page"
```

---

## Task 6: Update Cricket Page (pages/cricket.html) with Responsive Images

**Files:**
- Modify: `pages/cricket.html`

**Step 1: Update cricket-batsmen image with srcset**

Replace with:
```html
<img
  data-glightbox=""
  srcset="images/chiang-mai-gymkhana-chiangmaigymkhana-cricket-two-batsmen-green-gold-kit-600.webp 600w,
          images/chiang-mai-gymkhana-chiangmaigymkhana-cricket-two-batsmen-green-gold-kit-1000.webp 1000w,
          images/chiang-mai-gymkhana-chiangmaigymkhana-cricket-two-batsmen-green-gold-kit.webp 2048w"
  sizes="(max-width: 768px) 100vw, 553px"
  src="images/chiang-mai-gymkhana-chiangmaigymkhana-cricket-two-batsmen-green-gold-kit.webp"
  alt="Two cricket batsmen in green and gold kit playing at Chiang Mai Gymkhana Club"
  width="553"
  height="369"
  loading="lazy">
```

**Step 2: Add width/height to all other cricket page images**

For each remaining `<img>` tag, add explicit width/height dimensions.

**Step 3: Test cricket page**

Open: `pages/cricket.html` in browser
Expected: Images render without CLS

**Step 4: Commit changes**

```bash
git add pages/cricket.html
git commit -m "feat: add responsive images and width/height to cricket page"
```

---

## Task 7: Update Restaurant Page (pages/restaurant.html) with Responsive Images

**Files:**
- Modify: `pages/restaurant.html`

**Step 1: Update club-sandwich image with srcset**

Replace with:
```html
<img
  data-glightbox=""
  srcset="images/chiang-mai-gymkhana-chiangmaigymkhana-club-sandwich-fries-food-plate-600.webp 600w,
          images/chiang-mai-gymkhana-chiangmaigymkhana-club-sandwich-fries-food-plate-900.webp 900w,
          images/chiang-mai-gymkhana-chiangmaigymkhana-club-sandwich-fries-food-plate.webp 960w"
  sizes="(max-width: 768px) 100vw, 553px"
  src="images/chiang-mai-gymkhana-chiangmaigymkhana-club-sandwich-fries-food-plate.webp"
  alt="Club sandwich with fries on a plate at the Chiang Mai Gymkhana Club restaurant"
  width="553"
  height="553"
  loading="lazy">
```

**Step 2: Add width/height to all other restaurant page images (including wedding gallery)**

For each remaining `<img>` tag, add explicit width/height dimensions (typical gallery images are 553px).

**Step 3: Test restaurant page**

Open: `pages/restaurant.html` in browser
Expected: All images render with correct aspect ratio

**Step 4: Commit changes**

```bash
git add pages/restaurant.html
git commit -m "feat: add responsive images and width/height to restaurant page"
```

---

## Task 8: Update About Page (pages/about.html) with Width/Height

**Files:**
- Modify: `pages/about.html`

**Step 1: Add width/height to all about page images**

For each `<img>` tag, add explicit width/height dimensions.

**Step 2: Test about page**

Open: `pages/about.html` in browser
Expected: No CLS observed

**Step 3: Commit changes**

```bash
git add pages/about.html
git commit -m "feat: add width/height attributes to about page images"
```

---

## Task 9: Inline Critical CSS and Defer GLightbox CSS

**Files:**
- Modify: `index.html:18-19` (head section)
- Modify: `pages/*.html` (all pages)

**Step 1: Extract critical CSS (above-the-fold styles)**

From `css/style.css`, identify critical styles:
- Header/navigation
- Hero section
- Typography
- Layout grid
- Color variables

Create inline critical CSS. This is approximately the first 30% of style.css that handles layout and header styling.

**Step 2: Update index.html head section**

Current (lines 18-19):
```html
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
```

Replace with:
```html
<style>
/* Critical CSS - Above the fold styles */
:root {
  --primary: #2d5016;
  --secondary: #c9682f;
  --accent: #d4a574;
  --light-bg: #f5f1e8;
  --text-dark: #333;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', sans-serif;
  color: var(--text-dark);
  line-height: 1.6;
  background-color: var(--light-bg);
}

/* Header & Navigation */
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.logo a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--primary);
  font-weight: bold;
  font-size: 1.2rem;
}

.logo-image {
  height: 88px;
  width: 88px;
  display: block;
}

.main-nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.main-nav a {
  text-decoration: none;
  color: var(--primary);
  font-weight: 500;
  transition: color 0.3s;
}

.main-nav a:hover {
  color: var(--secondary);
}

/* Hero Section */
.hero {
  background-size: cover;
  background-position: center;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  color: white;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero h1 {
  font-family: Georgia, serif;
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  cursor: pointer;
}

.btn-primary {
  background-color: var(--secondary);
  color: white;
}

.btn-primary:hover {
  background-color: darken(var(--secondary), 10%);
  transform: translateY(-2px);
}
</style>
<link rel="stylesheet" href="css/style.css" media="print" onload="this.media='all'">
<link rel="preload" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" as="style" onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css"></noscript>
```

This approach:
- Inlines critical CSS directly in `<style>` tag (eliminates render-blocking CSS)
- Uses media="print" and onload trick to defer full stylesheet
- Uses preload to start fetching GLightbox CSS early but applies it async
- Provides noscript fallback

**Step 3: Test homepage loads without render-blocking**

Open DevTools → Performance tab
Expected: CSS files not blocking initial render

**Step 4: Apply same pattern to all pages**

Update `pages/golf.html`, `pages/tennis.html`, `pages/cricket.html`, `pages/restaurant.html`, `pages/about.html` with same CSS optimization.

**Step 5: Commit changes**

```bash
git add index.html pages/*.html
git commit -m "feat: inline critical CSS and defer non-critical stylesheets"
```

---

## Task 10: Add fetchpriority and Preconnect Hints

**Files:**
- Modify: `index.html:51` (LCP image)
- Modify: `index.html:5` (preconnect)

**Step 1: Add fetchpriority to LCP hero image**

Current (line 51):
```html
<section class="hero" style="background-image: url('images/chiang-mai-gymkhana-chiangmaigymkhana-golf-course-fairway-blue-sky-sprinkler.webp');">
```

This is a background image, which is harder to optimize. For better LCP, consider adding an img tag as first visible content OR use CSS optimization. For now, ensure it has preload:

Add to head (after line 6):
```html
<link rel="preload" as="image" href="images/chiang-mai-gymkhana-chiangmaigymkhana-golf-course-fairway-blue-sky-sprinkler.webp" imagesrcset="images/chiang-mai-gymkhana-chiangmaigymkhana-golf-course-fairway-blue-sky-sprinkler.webp">
```

**Step 2: Add preconnect to CDN origins**

Add to head (after line 6):
```html
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="dns-prefetch" href="https://static.cloudflareinsights.com">
```

**Step 3: Test head section**

Expected: Preconnect headers sent before first paint

**Step 4: Commit changes**

```bash
git add index.html pages/*.html
git commit -m "feat: add preconnect hints and preload for LCP image"
```

---

## Task 11: Defer GLightbox JavaScript Loading

**Files:**
- Modify: `index.html` (and all pages)
- Modify: `js/main.js`

**Step 1: Defer GLightbox script in index.html**

Current (line 19):
```html
<script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
```

Move to end of body (before closing </body>) and add defer:
```html
<script defer src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
<script defer src="js/main.js"></script>
```

**Step 2: Update main.js to initialize GLightbox after load**

Current `js/main.js` likely initializes GLightbox immediately. Wrap in window.addEventListener:

```javascript
// Mobile menu toggle
document.querySelector('.nav-toggle').addEventListener('click', function() {
  document.querySelector('.main-nav').classList.toggle('active');
});

// Initialize GLightbox after page load
window.addEventListener('load', function() {
  const lightbox = GLightbox({
    selector: '[data-glightbox]'
  });
});
```

**Step 3: Apply same pattern to all pages**

Move GLightbox script tags to end of body in all HTML files.

**Step 4: Test lightbox still works**

Open: `index.html`, click on image with data-glightbox
Expected: Lightbox opens correctly

**Step 5: Commit changes**

```bash
git add index.html pages/*.html js/main.js
git commit -m "feat: defer glightbox script loading for faster initial render"
```

---

## Task 12: Verify Performance Improvements with Lighthouse

**Files:**
- Reference: All HTML and CSS files

**Step 1: Deploy to staging or local server**

Run: `npx http-server . -p 8000`
Or use your actual domain: `https://chiangmaigymkhana.com`

**Step 2: Run Lighthouse test**

- Open: https://chiangmaigymkhana.com (or localhost:8000)
- Open DevTools → Lighthouse tab
- Select: Mobile, Performance
- Run audit

**Step 3: Compare metrics against baseline**

Expected improvements:
- **FCP**: 1.5s → ~1.2s (reduced by 20%)
- **LCP**: 5.9s → ~3.5-4s (reduced by 40-50%) - main win from image optimization
- **CLS**: 0 → 0 (width/height prevents shifts)
- **Speed Index**: 1.5s → ~1.2s
- **Est data savings**: ~1,411 KiB (from image delivery audit)

**Step 4: Document results**

Create file: `docs/lighthouse-improvements.md`

```markdown
# Lighthouse Performance Improvements

## Baseline (Mar 2, 2026)
- FCP: 1.5s
- LCP: 5.9s
- CLS: 0
- Speed Index: 1.5s

## After Optimization
- FCP: [actual]s
- LCP: [actual]s
- CLS: [actual]
- Speed Index: [actual]s

## Changes Made
1. Generated responsive image variants (3 sizes per image)
2. Implemented srcset + sizes for responsive images
3. Added explicit width/height to all images (prevents CLS)
4. Inlined critical CSS (above-the-fold header/hero styles)
5. Deferred GLightbox CSS and JS loading
6. Added preconnect and preload hints for critical resources

## Files Modified
- All HTML pages (index.html, pages/*.html)
- Generated: 15+ responsive image variants
- Optimized: css/style.css delivery
- Updated: js/main.js for deferred initialization
```

**Step 5: Commit results**

```bash
git add docs/lighthouse-improvements.md
git commit -m "docs: record lighthouse performance improvements"
```

---

## Task 13: Final Testing and Cleanup

**Files:**
- All HTML and image files

**Step 1: Cross-browser testing**

Test on:
- Chrome (desktop & mobile emulation)
- Firefox
- Safari
- Mobile devices (actual Moto G or similar)

Expected: All images load, no broken links, lightbox works, layout stable

**Step 2: Performance validation on slow 4G**

Open DevTools → Network tab
Throttle: Slow 4G
Reload: index.html
Expected: Page remains interactive, no major layout shifts, images load progressively

**Step 3: Accessibility check**

Verify:
- All images have alt text ✓
- Color contrast is sufficient ✓
- Lighthouse Accessibility score ✓

**Step 4: Final commit and summary**

```bash
git add -A
git commit -m "perf: complete lighthouse optimization - images, css, js, responsive design

- Generate 15+ responsive image variants for optimal delivery
- Implement srcset + sizes for all gallery and product images
- Add explicit width/height to prevent cumulative layout shift
- Inline critical above-the-fold CSS for faster first paint
- Defer glightbox CSS and JS loading
- Add preconnect hints for CDN resources
- Reduce estimated page weight by 1,411 KiB
- Target improvements: LCP 5.9s → 3.5-4s, FCP stable ~1.2s"
```

---

## Validation Checklist

- [ ] All responsive images generated and verified
- [ ] All HTML pages updated with srcset/sizes
- [ ] All images have width/height attributes
- [ ] Critical CSS inlined in all pages
- [ ] GLightbox deferred in all pages
- [ ] Preconnect hints added
- [ ] Lighthouse Performance audit run
- [ ] LCP improved by 30%+
- [ ] CLS remains 0
- [ ] All links working
- [ ] Lightbox functionality verified
- [ ] Mobile rendering verified
- [ ] Commits follow conventional commits
- [ ] No console errors

