#!/usr/bin/env node
// Static site generator: renders every page to /dist as plain HTML so search
// engines get fully-rendered, fast pages. Run `npm run build`.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

const { assetVersion } = require('./src/lib/layout');
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

function build() {
  const t0 = Date.now();
  fs.rmSync(DIST, { recursive: true, force: true });
  copyDir(path.join(SRC, 'assets'), path.join(DIST, 'assets'));

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

  // Sitemaps — split by page type so Search Console reports are easy to read.
  const today = new Date().toISOString().slice(0, 10);
  const indexable = pages.filter((p) => !p.path.endsWith('.html') && !/noindex/.test(p.html.slice(0, 2500)));
  const groups = { core: [], services: [], areas: [], local: [] };
  for (const p of indexable) {
    if (p.path.startsWith('/service-areas/')) groups.areas.push(p);
    else if (/^\/[^/]+\/[^/]+-nj\/$/.test(p.path)) groups.local.push(p);
    else if (p.path.split('/').length === 3 && !['/about/', '/contact/', '/faq/', '/resources/', '/services/', '/privacy-policy/'].includes(p.path) && p.path !== '/') groups.services.push(p);
    else groups.core.push(p);
  }
  const priority = (p) => (p.path === '/' ? '1.0' : groups.services.includes(p) ? '0.9' : /^\/service-areas\/[^/]+\/$/.test(p.path) ? '0.8' : groups.local.includes(p) ? '0.6' : '0.7');
  for (const [name, list] of Object.entries(groups)) {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${list
      .map((p) => `  <url><loc>${site.url}${p.path}</loc><lastmod>${today}</lastmod><priority>${priority(p)}</priority></url>`)
      .join('\n')}\n</urlset>\n`;
    fs.writeFileSync(path.join(DIST, `sitemap-${name}.xml`), xml);
  }
  fs.writeFileSync(
    path.join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(groups)
      .map((n) => `  <sitemap><loc>${site.url}/sitemap-${n}.xml</loc><lastmod>${today}</lastmod></sitemap>`)
      .join('\n')}\n</sitemapindex>\n`
  );

  fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /thank-you/\n\nSitemap: ${site.url}/sitemap.xml\n`);

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

  fs.writeFileSync(path.join(DIST, 'favicon.ico'), pngToIco(fs.readFileSync(path.join(SRC, 'assets/img/favicon-48.png')), 48));

  console.log(`Built ${pages.length} pages (${indexable.length} in sitemaps: ${Object.entries(groups).map(([k, v]) => `${k} ${v.length}`).join(', ')}) in ${Date.now() - t0}ms → dist/`);
}

build();
