#!/usr/bin/env node
// Static site generator: renders every page to /dist as plain HTML so search
// engines get fully-rendered, fast pages. Run `npm run build`.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

const { assetVersion, ogAvailable } = require('./src/lib/layout');
const site = require('./src/data/site');

const hashOf = (file) => crypto.createHash('md5').update(fs.readFileSync(file)).digest('hex').slice(0, 10);

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, entry.name);
    const b = path.join(to, entry.name);
    entry.isDirectory() ? copyDir(a, b) : fs.copyFileSync(a, b);
  }
}

// Wrap a PNG in an ICO container (valid for all modern browsers).
function pngToIco(pngBuf, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt8(size >= 256 ? 0 : size, 6);
  header.writeUInt8(size >= 256 ? 0 : size, 7);
  header.writeUInt8(0, 8);
  header.writeUInt8(0, 9);
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(pngBuf.length, 14);
  header.writeUInt32LE(22, 18);
  return Buffer.concat([header, pngBuf]);
}

async function build() {
  const t0 = Date.now();
  fs.rmSync(DIST, { recursive: true, force: true });
  copyDir(path.join(SRC, 'assets'), path.join(DIST, 'assets'));

  // Illustrations + per-page share images (before rendering, so pages know which exist).
  const { art } = require('./src/lib/illustrations');
  fs.mkdirSync(path.join(DIST, 'assets/img/services'), { recursive: true });
  for (const [slug, svg] of Object.entries(art)) fs.writeFileSync(path.join(DIST, 'assets/img/services', `${slug}.svg`), svg);
  const { ogJobs } = require('./src/lib/og-jobs');
  const made = await require('./src/lib/og').generate(DIST, SRC, ogJobs());
  for (const k of made) ogAvailable.add(k);

  assetVersion.css = hashOf(path.join(SRC, 'assets/css/site.css'));
  assetVersion.js = hashOf(path.join(SRC, 'assets/js/site.js'));

  // Require after asset hashes are set (layout reads them at render time).
  const { allPages } = require('./src/pages');
  const pages = allPages();

  const seen = new Set();
  for (const p of pages) {
    if (seen.has(p.path)) throw new Error('Duplicate page path: ' + p.path);
    seen.add(p.path);
    const out = p.path.endsWith('.html') ? path.join(DIST, p.path) : path.join(DIST, p.path, 'index.html');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, p.html);
  }

  // One flat sitemap with page URLs only (simplest for Search Console to fetch and read).
  const today = new Date().toISOString().slice(0, 10);
  const indexable = pages.filter((p) => !p.path.endsWith('.html') && !/noindex/.test(p.html.slice(0, 2500)));
  const isHub = (p) => p.path.split('/').length === 3 && p.path !== '/' && !['/about/', '/contact/', '/faq/', '/resources/', '/services/', '/privacy-policy/', '/sitemap/'].includes(p.path);
  const priority = (p) => (p.path === '/' ? '1.0' : isHub(p) ? '0.9' : /^\/service-areas\/[^/]+\/$/.test(p.path) ? '0.8' : /^\/[^/]+\/[^/]+-nj\/$/.test(p.path) ? '0.6' : '0.7');
  const order = (p) => (p.path === '/' ? 0 : isHub(p) ? 1 : p.path.startsWith('/service-areas/') ? 2 : /-nj\/$/.test(p.path) ? 3 : 1.5);
  const sorted = indexable.slice().sort((x, y) => order(x) - order(y));
  fs.writeFileSync(
    path.join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sorted
      .map((p) => `  <url><loc>${site.url}${p.path}</loc><lastmod>${today}</lastmod><priority>${priority(p)}</priority></url>`)
      .join('\n')}\n</urlset>\n`
  );

  fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /thank-you/\n\n# Plain-language site summary for AI assistants: ${site.url}/llms.txt\nSitemap: ${site.url}/sitemap.xml\n`);

  fs.writeFileSync(
    path.join(DIST, 'site.webmanifest'),
    JSON.stringify({
      name: site.name,
      short_name: 'EHR Plus',
      start_url: '/',
      display: 'standalone',
      background_color: '#101418',
      theme_color: '#101418',
      icons: [
        { src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    }, null, 2)
  );


  // llms.txt — plain-language summary for AI answer engines (https://llmstxt.org)
  const services = require('./src/data/services');
  const { counties } = require('./src/data/areas');
  const articles = require('./src/data/articles');
  fs.writeFileSync(path.join(DIST, 'llms.txt'), [
    `# ${site.name}`,
    '',
    `> ${site.name} is an exterior home repair contractor serving Ocean County, Monmouth County and Atlantic County, New Jersey (109 municipalities). Services: ${services.map((s) => s.name.toLowerCase()).join(', ')}. Phone ${site.phone}, email ${site.email}. Free written estimates.`,
    '',
    '## Services',
    ...services.map((s) => `- [${s.name}](${site.url}/${s.slug}/): ${s.blurb}`),
    '',
    '## Service areas',
    ...counties.map((c) => `- [${c.name}, NJ](${site.url}/service-areas/${c.slug}/): ${c.towns.map((t) => t.plainName).join(', ')}`),
    '',
    '## Pages for each service in each county and town',
    `- County pattern: ${site.url}/{service}/{county}-nj/ — e.g. ${site.url}/roof-replacement/ocean-county-nj/`,
    `- Pattern: ${site.url}/{service}/{town}-nj/ — e.g. ${site.url}/roof-replacement/toms-river-nj/`,
    `- Full list: ${site.url}/sitemap/`,
    '',
    '## Resources',
    ...articles.map((a) => `- [${a.title}](${site.url}/resources/${a.slug}/): ${a.description}`),
    '',
    '## Contact',
    `- [Contact & free estimates](${site.url}/contact/)`,
    `- Hours: ${site.hours.map((h) => `${h.days} ${h.close ? `${h.open}–${h.close}` : h.open}`).join('; ')}`,
    '',
  ].join('\n'));

  fs.writeFileSync(path.join(DIST, 'favicon.ico'), pngToIco(fs.readFileSync(path.join(SRC, 'assets/img/favicon-48.png')), 48));

  console.log(`Built ${pages.length} pages (${indexable.length} in sitemap.xml) in ${Date.now() - t0}ms → dist/`);
}

module.exports = build().catch((err) => {
  console.error(err);
  process.exit(1);
});
