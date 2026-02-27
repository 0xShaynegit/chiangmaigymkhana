# Chiang Mai Gymkhana Club Website

A modern, responsive website for the historic Chiang Mai Gymkhana Club—a premier sports and social institution in Chiang Mai, Thailand since 1898.

## Features

- **Golf Course**: Championship 18-hole parkland golf course with pro shop and instruction
- **Tennis**: Professional courts with coaching programs and regular championships
- **Cricket**: Premier cricket grounds with regional tournaments and youth development
- **Dining & Events**: Restaurant, bar, and event spaces for celebrations and private occasions
- **Membership Information**: Multiple membership tiers to suit different needs
- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop

## Technical Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with CSS variables and responsive design
- **JavaScript** - Vanilla JS for interactivity (mobile menu, image gallery)
- **WebP Images** - Optimized image format for fast loading
- **GLightbox** - Lightweight image gallery and lightbox library
- **Cloudflare Workers** - Deployment and hosting

## Project Structure

```
chiangmaigymkhana/
├── index.html              # Homepage
├── pages/
│   ├── about.html         # About the club and membership
│   ├── golf.html          # Golf facilities and programs
│   ├── tennis.html        # Tennis courts and coaching
│   ├── cricket.html       # Cricket grounds and history
│   └── restaurant.html    # Dining and event information
├── css/
│   └── style.css          # Main stylesheet (responsive, 630+ lines)
├── js/
│   └── main.js            # Mobile menu toggle and gallery initialization
├── images/                # 67 WebP images (optimized)
├── favicon.ico            # Site icon (1898 club logo)
├── robots.txt             # SEO configuration
├── sitemap.xml            # XML sitemap for search engines
└── wrangler.jsonc         # Cloudflare Workers configuration
```

## Design System

The site uses a warm tropical color palette reflecting Chiang Mai's natural environment:

- **Primary**: Deep forest green (#2d5016)
- **Secondary**: Warm terracotta (#c9682f)
- **Accent**: Warm sand (#d4a574)
- **Background**: Cream/off-white (#f5f1e8)
- **Typography**: Georgia serif for headings, Segoe UI for body text

## Responsive Breakpoints

- **Desktop**: 1200px+ (full multi-column layouts)
- **Tablet**: 768px-1199px (adjusted grid and spacing)
- **Mobile**: Below 768px (stacked layouts, hamburger menu)
- **Small Mobile**: 480px and below (compact spacing and typography)

## Key Features

### Navigation
- Sticky header with logo and main navigation
- Mobile hamburger menu for screens below 768px
- Contact button links to Facebook Messenger
- Quick links footer with sections and pages

### Content Sections
- Split-content layouts with alternating image/text placement
- Image fades to background color on all edges
- Responsive image galleries with lightbox functionality
- Descriptive alt text for all images and accessibility

### SEO & Metadata
- Unique title and meta description on all pages
- Canonical URLs for each page
- Open Graph tags for social media sharing
- Complete XML sitemap and robots.txt configuration
- Proper heading hierarchy (h1-h6)

## Development

### Local Setup

1. Clone the repository
2. Open any HTML file in a web browser
3. No build process required—static files ready to serve

### Making Changes

- **Styling**: Edit `css/style.css` (uses CSS custom properties for theming)
- **Navigation/Content**: Edit HTML files directly
- **Images**: Replace WebP images in `images/` directory
- **Functionality**: Update JavaScript in `js/main.js`

### Testing

- Test responsive design at breakpoints: 1920px, 1024px, 768px, 480px, 375px
- Verify all links and external resources
- Test image gallery and mobile menu on actual devices
- Check console for any JavaScript errors

## Deployment

The site is configured for deployment on **Cloudflare Workers**:

```bash
# Install Cloudflare CLI
npm install -g wrangler

# Deploy to production
wrangler deploy
```

Configuration is in `wrangler.jsonc`:
- Assets directory: root directory
- Compatibility date: 2026-02-27
- No special environment variables required

### Custom Domain Setup

1. Update canonical URLs in HTML files to your domain
2. Update sitemap.xml with your domain
3. Update robots.txt sitemap reference
4. Configure domain in Cloudflare dashboard

## Performance

- **Image Optimization**: All images converted to WebP format for fast loading
- **CSS**: Single optimized stylesheet with no unused styles
- **JavaScript**: Minimal vanilla JS (no frameworks or heavy libraries)
- **CDN**: GLightbox loaded from CDN (jsDelivr)
- **Caching**: Configured via Cloudflare Workers

## SEO

- **Sitemap**: Auto-generated XML sitemap for search engines
- **Robots.txt**: Crawl directives and sitemap reference
- **Meta Tags**: Comprehensive title, description, and OG tags on all pages
- **Structured Data**: Semantic HTML5 structure
- **Mobile-Friendly**: Fully responsive design with mobile-first approach

## Accessibility

- **Alt Text**: Descriptive alt attributes on all images
- **ARIA Labels**: Labels on interactive elements (nav toggle, external links)
- **Semantic HTML**: Proper use of header, nav, main, footer, section elements
- **Color Contrast**: Sufficient contrast between text and backgrounds
- **Keyboard Navigation**: All interactive elements accessible via keyboard

## Contact

- **Phone**: +66 53 241035
- **Email**: gymkhanagolfclub@gmail.com
- **Messenger**: https://m.me/chiangmai.gymkhana
- **Address**: 349 Chiang Mai - Lamphun Road, Nong Hoi, Chiang Mai 50000, Thailand

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## History

The Chiang Mai Gymkhana Club was founded in 1898 and remains one of Thailand's premier sports and social institutions. This website honors that legacy while providing modern functionality for members, guests, and prospective members.

---

Built with care for the historic Chiang Mai Gymkhana Club community.
