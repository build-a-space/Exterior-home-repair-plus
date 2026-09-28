# Exterior Home Repair Plus — Website

SEO-first Node.js website for **Exterior Home Repair Plus** (Quality. Reliability. Results.) —
roofing, siding, gutters, windows, doors, decks, soffit & fascia, painting, wood rot repair,
power washing and storm damage repair across **Ocean, Monmouth & Atlantic County, NJ**.

📞 (908) 636-9745 · ✉️ Exteriorhomerepairplus@gmail.com

## How it works

A small Node build step (`build.js`) renders every page to plain static HTML in `dist/`, and an
Express server (`server.js`) serves it with gzip, clean URLs, caching and the estimate-form API.
No client-side framework — pages are fully rendered for Google and load fast.

```bash
npm install
npm run build     # generate dist/ (≈1,450 pages)
npm start         # http://localhost:3000
npm test          # build + SEO/link checks (titles, descriptions, H1s, canonicals, JSON-LD, broken links)
```

Set `SITE_URL` (see `.env.example`) to the real domain before deploying — canonicals, schema and
sitemaps use it. Set `NODE_ENV=production` to enable the HTTPS/canonical-host redirect.

## Pages generated

| Type | URL pattern | Count |
|---|---|---|
| Home, About, Contact, FAQ, Services, Service Areas, Resources, Privacy | `/`, `/about/`, … | 8 |
| Service hubs | `/roof-replacement/`, `/siding/`, … | 12 |
| County pages | `/service-areas/ocean-county/` | 3 |
| Town pages (all 109 municipalities + their sections/neighborhoods) | `/service-areas/ocean-county/toms-river/` | 109 |
| Service × town pages | `/roof-replacement/toms-river-nj/` | 1,308 |
| Resource articles | `/resources/…/` | 4 |

## SEO built in

- Unique title, meta description, H1 and canonical on every page (enforced by `npm test`)
- JSON-LD: `RoofingContractor` business, `WebSite`, `WebPage`, `Service` (with `areaServed`), `BreadcrumbList`, `FAQPage`, `Article`
- Local content per town: character-based copy (oceanfront, bay, historic, suburban, Pinelands, rural, city), neighborhoods served, local note, nearby-town links
- Dense internal linking: service ↔ town ↔ county ↔ nearby towns
- Split XML sitemaps (`/sitemap.xml` index → core, services, areas, local), `robots.txt`, Open Graph/Twitter cards, web manifest
- Fast: one CSS + one tiny JS file (content-hashed, cached 1 year), inline SVG icons, WebP logo, mobile sticky call bar

## Editing content

| What | File |
|---|---|
| Phone, email, hours, address, NJ HIC #, social links | `src/data/site.js` |
| Services (copy, FAQs, materials) | `src/data/services.js` |
| Counties, towns, neighborhoods, local notes | `src/data/areas.js` |
| Local-condition copy by town type | `src/data/local.js` |
| Articles | `src/data/articles.js` |
| Page templates | `src/pages.js`, `src/lib/*` |
| Design | `src/assets/css/site.css` |

Logo assets were generated from `brand/logo-source.jpg` with `npm run logo` (uses `sharp`).

## Estimate form

Posts to `/api/estimate` (JSON or regular form POST). Leads are appended to `leads.log`; set the
`SMTP_*` variables to also email each lead to `LEAD_TO`. Includes a honeypot and basic rate limiting.
