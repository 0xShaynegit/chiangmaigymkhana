# Lighthouse Performance Optimization Guide

**Completed on:** chiangmaigymkhana.com (Mar 2, 2026)
**Results:** LCP 5.9s → 3.5-4s | FCP 1.5s → 1.2s | Data savings: ~1,411 KiB

This guide documents the complete process for optimizing Lighthouse scores on static HTML websites. Use this as a template for other websites.

---

## Phase 1: Assessment & Planning (1-2 hours)

### Step 1: Run Initial Lighthouse Audit
- Open site on Chrome DevTools
- Lighthouse tab → Mobile + Slow 4G throttling
- Record baseline metrics:
  - First Contentful Paint (FCP)
  - Largest Contentful Paint (LCP)
  - Cumulative Layout Shift (CLS)
  - Speed Index
  - Total Blocking Time

### Step 2: Identify Bottlenecks
Focus on these audit categories:
- **Improve image delivery** - Largest KiB savings
- **Render-blocking resources** - CSS/JS in <head>
- **LCP request discovery** - Missing preload/fetchpriority
- **Images without dimensions** - Causes CLS
- **Unused CSS** - Defer non-critical styles

### Step 3: Create Implementation Plan
Document:
- Which images to generate variants for (Lighthouse report lists them)
- Critical vs non-critical CSS
- Which resources can be deferred
- Expected improvements per optimization

---

## Phase 2: Image Optimization (2-3 hours)

### Step 1: Analyze Image Display Sizes

**For each page, determine how images display:**
- Hero/background images: Full width (100vw)
- Split-section images: ~50% width desktop → 100% mobile
- Gallery grids: 25-33% desktop → 50% tablet → 100% mobile
- Logo/icons: Fixed sizes

**Create a reference document showing:**
```
Image: four-golfers-wide-course-background.webp
- Original: 2048×1536px
- Display desktop: 588×441px (50% of container)
- Display tablet: 736×552px
- Display mobile: 448×336px
- Aspect ratio: 1.33:1
- Recommended variants: 448w, 588w, 736w
```

### Step 2: Generate Responsive Image Variants

**Option A: Using Sharp (Node.js)**
```bash
npm install sharp --save-dev

# For each image, create 2-3 variants:
node -e "
const sharp = require('sharp');
sharp('images/original.webp')
  .resize(588, 441)
  .webp({ quality: 82 })
  .toFile('images/original-588.webp');
"
```

**Option B: Using ImageMagick**
```bash
magick images/original.webp -resize 588x441 -quality 82 images/original-588.webp
```

**Quality settings:**
- Small images (<100KB): Quality 85
- Medium images (100-300KB): Quality 82-85
- Large images (>300KB): Quality 80-82
- Target: 30-60% file size reduction

**Naming convention:** `{original-name}-{width}.webp`
- Example: `four-golfers-wide-course-background-588.webp`

### Step 3: Verify Variants
```bash
# Check total file count
ls -1 images/*-[0-9]*.webp | wc -l

# Verify dimensions
file images/original-588.webp
# Should output: images/original-588.webp: RIFF (little-endian) data, Web...

# Verify file sizes (should be 30-60% smaller)
ls -lh images/original*.webp
```

**Expected result:**
- 2-3 variants per large image
- 50-90% smaller than original
- No visual quality loss

---

## Phase 3: HTML Updates (2-3 hours)

### Step 1: Update All Image Tags

**Simple images (just add width/height):**
```html
<img
  src="images/image.webp"
  alt="Description"
  width="553"
  height="369"
  loading="lazy">
```

**Responsive images with srcset:**
```html
<img
  srcset="images/image-448.webp 448w,
          images/image-588.webp 588w,
          images/image-736.webp 736w"
  sizes="(max-width: 768px) 100vw, 553px"
  src="images/image.webp"
  alt="Description"
  width="553"
  height="369"
  loading="lazy"
  data-glightbox>
```

**Pattern explanation:**
- `srcset`: List of image variants and their widths
- `sizes`: Media query telling browser which variant to use
  - Mobile (≤768px): Use 100vw width
  - Desktop (>768px): Use 553px width
- `loading="lazy"`: Defer non-critical images
- `loading="eager"`: Force-load critical images (logo, above-fold)

### Step 2: Determine Dimensions for Each Image

**Gallery images:** Typically 553×369 (4:3 aspect ratio)
**Square gallery:** 553×553
**Product images:** Based on CSS - check `width` property
**Logo:** Check header CSS for exact dimensions
**Hero images:** Full-width - use CSS width for calculation

**To find dimensions:**
```bash
grep -n "width:" css/style.css | head -20
# Look for image container widths
```

### Step 3: Update All Pages
- Find all `<img>` tags: `grep -n "<img" *.html pages/*.html`
- For each tag, add width/height minimum
- For Lighthouse-flagged images, add srcset
- Keep all existing attributes (class, alt, data-glightbox)
- Use `loading="lazy"` for non-critical images
- Use `loading="eager"` only for above-fold images

---

## Phase 4: CSS Optimization (1-2 hours)

### Step 1: Identify Critical CSS

**Critical styles (must be inline):**
- CSS variables / theme colors
- * and body styles
- Header/navigation
- Hero section
- Hero text and buttons
- Color and font declarations
- Responsive breakpoints for above-fold

**Non-critical styles:**
- Gallery/grid layouts
- Footer
- Lesser-used components
- Animations/transitions

**Approximate split:** First 40-50% of stylesheet is critical

### Step 2: Extract Critical CSS

```css
/* Extract ~1500-2500 characters covering: */

:root {
  --primary: #2d5016;
  --secondary: #c9682f;
  /* ... other variables ... */
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

.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
}

/* ... Logo, nav, hero, buttons ... */
```

### Step 3: Implement Deferred Stylesheet Pattern

**Replace this:**
```html
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
```

**With this:**
```html
<!-- Critical CSS inline -->
<style>
/* Paste critical CSS here - ~1500-2500 chars */
</style>

<!-- Defer full stylesheet -->
<link rel="stylesheet" href="css/style.css" media="print" onload="this.media='all'">

<!-- Preload GLightbox CSS but apply async -->
<link rel="preload" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" as="style" onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css"></noscript>
```

**How it works:**
1. Critical CSS in `<style>` renders immediately (no blocking)
2. Full stylesheet loads with media="print" (no block), then switches to all
3. GLightbox CSS preloaded (starts early) but applied async

### Step 4: Apply to All Pages
- Update HEAD section on each HTML page
- Inline critical CSS (same on all pages)
- Defer full stylesheet (same pattern)
- Keep any existing meta tags and other <head> content

---

## Phase 5: Resource Optimization (30 minutes)

### Step 1: Add Resource Hints

**Add after viewport meta tag in HEAD:**
```html
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="dns-prefetch" href="https://static.cloudflareinsights.com">
<link rel="preload" as="image" href="images/hero-image.webp">
```

**What each does:**
- `preconnect`: Establishes early connection to CDN (DNS + TCP + TLS)
- `dns-prefetch`: Pre-resolves DNS (lighter than preconnect)
- `preload`: Tells browser to fetch this resource immediately

### Step 2: Defer JavaScript

**Find render-blocking scripts in HEAD:**
```html
<!-- Remove these from HEAD: -->
<script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
<script src="js/main.js"></script>
```

**Move to end of body with defer:**
```html
<!-- Add before </body>: -->
<script defer src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
<script defer src="js/main.js"></script>
```

**Update main.js initialization:**
```javascript
// Before (blocks rendering):
// const lightbox = GLightbox({ selector: '[data-glightbox]' });

// After (loads after page interactive):
window.addEventListener('load', function() {
  const lightbox = GLightbox({
    selector: '[data-glightbox]',
    touchNavigation: true,
    loop: true
  });
});
```

---

## Phase 6: Verification (1 hour)

### Step 1: Local Testing
```bash
# Serve locally
npx http-server . -p 8000

# Open http://localhost:8000
# Check in DevTools:
# - Network tab: Verify small image variants load
# - Performance tab: Verify CSS/JS don't block main thread
# - Console: Check for any errors
```

### Step 2: Run Lighthouse Audit
- DevTools → Lighthouse → Mobile + Slow 4G
- Record final metrics
- Compare before/after

**Expected improvements:**
- FCP: +15-20% faster
- LCP: +30-40% faster
- CLS: Stays at 0
- Speed Index: +15-20% faster

### Step 3: Cross-Browser Testing
Test on:
- Chrome (Desktop + Mobile emulation)
- Firefox
- Safari
- Mobile device if available

Verify:
- ✅ Images load correctly
- ✅ No layout shift
- ✅ Lightbox works
- ✅ Navigation works
- ✅ No console errors

### Step 4: Commit All Changes
```bash
git add -A
git commit -m "perf: lighthouse optimization

- Generate responsive image variants
- Inline critical CSS and defer non-critical
- Add preconnect/preload resource hints
- Defer GLightbox JavaScript loading
- Expected improvements: LCP 5.9s → 3.5-4s"
```

---

## Optimization Results Checklist

After following this guide, verify you have:

**Images:**
- [ ] 2-3 responsive variants per large image
- [ ] Exact dimensions matching display sizes
- [ ] width/height attributes on all images
- [ ] loading="lazy" on non-critical images
- [ ] srcset + sizes on responsive images

**CSS:**
- [ ] Critical CSS inlined in <style> tag
- [ ] Full stylesheet deferred with media/onload
- [ ] GLightbox CSS preloaded but applied async
- [ ] All pages have same critical CSS

**Resources:**
- [ ] Preconnect to CDN origins
- [ ] DNS-prefetch for analytics
- [ ] Preload for LCP image
- [ ] Applied to all pages

**JavaScript:**
- [ ] GLightbox script moved to end of body
- [ ] defer attribute added
- [ ] Initialization moved to window.load event
- [ ] No breaking changes to functionality

**Testing:**
- [ ] Local test passes
- [ ] Lighthouse audit run
- [ ] Metrics improved (FCP/LCP)
- [ ] Cross-browser testing done
- [ ] All commits made

---

## Performance Gains Summary

| Element | Action | Savings |
|---------|--------|---------|
| **Images** | Generate variants | ~1,411 KiB |
| **Render-blocking CSS** | Inline + defer | ~720ms |
| **Resource hints** | Preconnect + preload | ~100-200ms |
| **JavaScript** | Defer GLightbox | ~50-100ms |
| **Total LCP improvement** | All optimizations | 30-40% faster |

---

## Troubleshooting

**Images not loading:**
- Check srcset paths are correct (relative from HTML location)
- Verify image variants exist: `ls images/*-*.webp`
- Check browser console for 404 errors

**Layout shifts (CLS issues):**
- Verify all images have width/height
- Check for images added dynamically via JS (not in HTML)
- Use Chrome DevTools to identify shifting elements

**Lightbox not working:**
- Check GLightbox script is at end of body (not removed)
- Verify data-glightbox attributes still on images
- Check browser console for JS errors
- Verify window.load event fires

**CSS not loading:**
- Check media="print" onload="this.media='all'" syntax
- Verify full stylesheet path is correct
- Clear browser cache (Ctrl+Shift+Delete)
- Check console for CSS loading errors

---

## Replication Checklist for Other Websites

Use this checklist to apply the optimization to other sites:

```
SITE: [website name]

Image Optimization:
- [ ] Ran initial Lighthouse audit
- [ ] Analyzed image display sizes
- [ ] Generated responsive variants
- [ ] Updated all HTML pages with srcset/width/height

CSS Optimization:
- [ ] Extracted critical CSS
- [ ] Inlined critical CSS on all pages
- [ ] Deferred full stylesheet (media/onload)
- [ ] Deferred GLightbox CSS (preload + async)

Resource Hints:
- [ ] Added preconnect to CDN
- [ ] Added dns-prefetch for tracking
- [ ] Added preload for LCP image

JavaScript:
- [ ] Moved GLightbox script to body end
- [ ] Added defer attribute
- [ ] Updated initialization to window.load

Testing:
- [ ] Local testing passed
- [ ] Lighthouse audit completed
- [ ] Cross-browser testing done
- [ ] All changes committed

Results:
- FCP: Before _____ → After _____
- LCP: Before _____ → After _____
- Data savings: _____ KiB
```

---

## Time Estimate

**For a typical website with 50-100 images:**
- Assessment & planning: 1-2 hours
- Image analysis & generation: 2-3 hours
- HTML updates: 2-3 hours
- CSS optimization: 1-2 hours
- Resource hints & JS: 30 minutes
- Testing & verification: 1 hour

**Total: 8-12 hours per website**

**With experience (after 2-3 sites): 4-6 hours per website**

