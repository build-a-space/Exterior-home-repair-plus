# Exterior Home Repair Plus — SEO / AEO Audit & Roadmap

_Last updated: 2026-09-28 · Site: https://www.exteriorhomerepairplus.com (live preview: https://exterior-home-repair-plus.vercel.app)_

Re-run the numbers any time with `npm run build && node scripts/audit.js` and `node scripts/check-uniqueness.js`.

---

## 1. Site map at a glance

| Section | URL pattern | Pages | Job it does |
|---|---|---|---|
| Home | `/` | 1 | Brand + all services + all counties; main conversion page |
| Service hubs | `/roof-replacement/` … | 12 | Rank for "[service] NJ / Jersey Shore"; feed county + town pages |
| Service × county | `/roof-replacement/ocean-county-nj/` | 36 | Rank for "[service] [county] NJ"; bridge between hub and towns |
| Service × town | `/roof-replacement/toms-river-nj/` | 1,308 | Rank for "[service] [town] NJ" — the local long-tail money pages |
| County pages | `/service-areas/ocean-county/` | 3 | Rank for "[county] exterior contractor"; list every town |
| Town pages | `/service-areas/ocean-county/toms-river/` | 109 | Rank for "[town] roofing / siding / contractor" |
| Areas index | `/service-areas/` | 1 | Directory of all 109 towns |
| Services index | `/services/` | 1 | Directory of all 12 services |
| Resources | `/resources/` + 12 articles | 13 | Informational / AEO questions ("how", "when", "should I") |
| About · Contact · FAQ | | 3 | Trust, conversion, broad Q&A |
| HTML sitemap | `/sitemap/` | 1 | Crawl path to every page |
| Utility | privacy, thank-you, 404 | 3 | — |

Supporting files: `/sitemap.xml` (index → core, services, areas, local; with image entries), `/robots.txt`, `/llms.txt`, `/site.webmanifest`.

---

## 2. Section rankings (after this round of fixes)

Scores are out of 10 for how well each section is set up to rank and to be quoted by AI answer engines, given what exists today. The biggest limiter everywhere is the same: **no real photos, reviews or project history yet** — that is what separates top competitors.

| Rank | Section | Score | Strengths | What holds it back |
|---|---|---|---|---|
| 1 | Service hubs | 8.5 | Answer box, illustration, cost factors, timing, county links, 5 FAQs, Service + FAQ + HowTo schema, own share image | No real project photos or reviews |
| 2 | Service × town (1,308) | 8 | ~80% unique local copy, answer box, fact box, neighborhoods, distances to nearby towns, 5 FAQs, full schema | Illustration shared per service; no town-specific photos/reviews |
| 3 | Service × county (36) — new | 8 | Groups every town by area type with tailored advice, links to all towns, ItemList schema | New pages — need time to be crawled |
| 4 | Town pages (109) | 7.5 | Answer box, fact box, neighborhoods, nearby towns, 12 service cards with images, own share image | No local photos, reviews or landmarks-based content |
| 5 | Articles (12) | 7.5 | Answer box, FAQ + Article schema, image, internal links to services | Only 12; competitors publish continuously |
| 6 | Home | 7.5 | Answer box, all services with images, counties, FAQ, WebSite + business schema | No reviews/testimonials, no real photos, no trust badges (HIC #, insurance) |
| 7 | County pages (3) | 7.5 | Answer box, towns grouped by area type, county-specific service cards, ItemList | — |
| 8 | FAQ | 7 | 28 Q&As with FAQPage schema | Some answers generic |
| 9 | Contact | 7 | Now has answer box, process, service area, FAQ | No map / address (service-area business) |
| 10 | About | 6 | Answer box, logo, values | No team, owner story, years in business, license #, photos |

---

### Measured, per page type (averages)

| Page type | Pages | Words | Images (alt) | H2s | Internal links | FAQs | Answer box | Own OG image | Schema types |
|---|---|---|---|---|---|---|---|---|---|
| Service × town | 1308 | 734 | 1.0 (1.0) | 10 | 22 | 4 | yes | yes | BreadcrumbList, FAQPage, RoofingContractor+HomeAndConstructionBusiness, Service, WebPage |
| Town | 109 | 719 | 13.0 (13.0) | 8 | 36 | 3 | yes | yes | BreadcrumbList, FAQPage, ItemList, RoofingContractor+HomeAndConstructionBusiness, WebPage |
| Service × county | 36 | 824 | 1.0 (1.0) | 6 | 51 | 4 | yes | yes | BreadcrumbList, FAQPage, ItemList, RoofingContractor+HomeAndConstructionBusiness, Service, WebPage |
| Service hub | 12 | 1000 | 1.0 (1.0) | 12 | 140 | 5 | yes | yes | BreadcrumbList, FAQPage, HowTo, RoofingContractor+HomeAndConstructionBusiness, Service, WebPage |
| Article | 12 | 504 | 1.0 (1.0) | 6 | 14 | 3 | yes | yes | Article, BreadcrumbList, FAQPage, RoofingContractor+HomeAndConstructionBusiness, WebPage |
| County | 3 | 1236 | 13.0 (13.0) | 6 | 99 | 4 | yes | yes | BreadcrumbList, FAQPage, ItemList, RoofingContractor+HomeAndConstructionBusiness, WebPage |
| Page: /about/ | 1 | 486 | 1.0 (1.0) | 5 | 16 | 0 | yes | yes | AboutPage, BreadcrumbList, RoofingContractor+HomeAndConstructionBusiness |
| Page: /contact/ | 1 | 313 | 1.0 (1.0) | 5 | 11 | 4 | yes | yes | BreadcrumbList, ContactPage, FAQPage, RoofingContractor+HomeAndConstructionBusiness |
| Page: /faq/ | 1 | 1173 | 1.0 (1.0) | 14 | 13 | 28 | no | yes | BreadcrumbList, FAQPage, RoofingContractor+HomeAndConstructionBusiness, WebPage |
| Home | 1 | 1082 | 16.0 (16.0) | 8 | 38 | 5 | yes | yes | FAQPage, RoofingContractor+HomeAndConstructionBusiness, WebPage, WebSite |
| Page: /privacy-policy/ | 1 | 109 | 0.0 (0.0) | 4 | 1 | 0 | no | no | BreadcrumbList |
| Page: /resources/ | 1 | 451 | 12.0 (12.0) | 0 | 13 | 0 | no | yes | BreadcrumbList, CollectionPage, ItemList, RoofingContractor+HomeAndConstructionBusiness |
| Areas index | 1 | 400 | 1.0 (1.0) | 5 | 116 | 0 | yes | yes | BreadcrumbList, CollectionPage, ItemList, RoofingContractor+HomeAndConstructionBusiness |
| Page: /services/ | 1 | 406 | 12.0 (12.0) | 3 | 13 | 0 | no | yes | BreadcrumbList, CollectionPage, ItemList, RoofingContractor+HomeAndConstructionBusiness |
| Page: /sitemap/ | 1 | 8245 | 0.0 (0.0) | 6 | 1487 | 109 | no | no | BreadcrumbList, CollectionPage, RoofingContractor+HomeAndConstructionBusiness |
| Page: /thank-you/ | 1 | 24 | 0.0 (0.0) | 0 | 1 | 0 | no | no |  |

### Content uniqueness between sibling pages
```
[whole page] service × town (same service, nearby towns): 7848 pairs · average 21.1% shared · worst 43.3% (gutters/eatontown-nj vs shrewsbury-township) · 4280 pairs over 20%
[whole page] service × town (same town, other services): 1308 pairs · average 19.4% shared · worst 38.3% (soffit-fascia/south-toms-river-nj vs storm-damage-repair) · 532 pairs over 20%
[whole page] town pages (nearby towns): 654 pairs · average 17.0% shared · worst 29.7% (service-areas/monmouth-county/eatontown vs shrewsbury-township) · 130 pairs over 20%
```
Averages are ~80% unique; small neighboring towns with few recorded neighborhoods are the weakest pairs. Adding real local content (project photos, reviews, job notes per town) is what pushes these further.

## 3. Technical checklist

| Item | Status |
|---|---|
| Unique title + meta description on every page | ✅ enforced by `npm test` |
| One H1 per page, canonical tag, breadcrumbs (visible + schema) | ✅ |
| Structured data | ✅ `RoofingContractor` business (logo ImageObject, hours, areas), `WebSite`, `WebPage` (speakable, primary image, dateModified), `Service` (image, areaServed), `FAQPage`, `BreadcrumbList`, `HowTo` (service hubs), `ItemList` (index/county/town pages), `Article` (image, author) |
| Images with alt text + width/height | ✅ every template (check fails build if missing) |
| Per-page social share images | ✅ 190+ generated at build (services, counties, towns, articles, core pages) |
| Image sitemap entries | ✅ |
| Self-hosted fonts (no Google Fonts request) | ✅ faster first paint |
| Mobile-friendly, sticky call bar | ✅ |
| Real 404s (no soft 404s) | ✅ |
| HTTPS + www canonical | ✅ once Hostinger DNS points to Vercel |
| `llms.txt` for AI assistants | ✅ |
| Content uniqueness between sibling pages | ✅ ~80% unique average (`scripts/check-uniqueness.js`) |

### Schema notes
- The business is marked up as a **service-area business** (no street address). Google's LocalBusiness rich result prefers a full address; if the business has a real office, add it in `src/data/site.js` and it flows everywhere.
- No `aggregateRating`/`Review` markup on purpose — Google penalizes self-serving or invented reviews. Add real reviews first (see roadmap).
- FAQ rich results are now shown mostly for authoritative government/health sites, but FAQ markup still helps AI answer engines understand the Q&A.

---

## 4. Competitor-side roadmap (what moves rankings next)

Ordered by impact for a Jersey Shore exterior contractor.

### A. Off-site (you / the business) — highest impact
1. **Google Business Profile** — claim/verify; categories *Roofing contractor* (primary), *Siding contractor*, *Gutter service*, *Window installation service*, *Deck builder*; add service areas (all 3 counties); same name/phone as the site; link to the site; post weekly.
2. **Reviews** — ask every customer; aim for a steady flow (e.g. 4–8/month). Reply to all. Then we add real testimonials to the site.
3. **Citations** — consistent Name / Phone / URL on Bing Places, Apple Business Connect, Yelp, BBB, Angi, HomeAdvisor, Houzz, Nextdoor, Facebook, local chambers of commerce.
4. **NJ HIC registration number** — display on the site (field ready in `site.js`); it's a trust signal and legally required on contracts.
5. **Backlinks** — manufacturer contractor directories (e.g. shingle/siding brands you install), local sponsorships, supplier "find a contractor" pages, local news/storm coverage.

### B. On-site content (I can do as material arrives)
1. **Real project photos** — replace illustrations per service; add a **Project gallery** with town-tagged jobs (`/projects/…`) — the strongest local-relevance signal competitors use.
2. **Testimonials** with town names → review schema only when they are genuine.
3. **More resources** — 2–4 articles/month targeting questions (cost guides once real pricing ranges are confirmed, material comparisons, seasonal checklists).
4. **Manufacturer certifications / warranties** page once confirmed.
5. **Financing** page if offered.
6. **Emergency / 24-hour storm** landing page if the business offers after-hours response.

### C. Measurement (next step you mentioned)
1. Add analytics (GA4 or Plausible) — I'll wire the snippet into `layout.js` and track calls, form submits (`generate_lead` event already fires) and click-to-call.
2. Google Search Console + Bing Webmaster Tools — verify the domain, submit `/sitemap.xml`, watch Coverage and Performance. I'll use that data to rewrite titles/descriptions for pages with impressions but low click-through, and to find towns/services worth deeper content.

---

## 5. Changes made in this round
See section 2 — plus: 36 new service × county pages, 8 new articles, answer boxes on every major template, images on every template, per-page share images, self-hosted fonts, image sitemap, richer schema (ImageObject logo, Service images, HowTo, ItemList, Article images/author), contact page rebuilt, county pages expanded.
