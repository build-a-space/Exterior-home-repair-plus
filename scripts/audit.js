// Page-type audit: averages key SEO/AEO signals for every template in dist/.
// Usage: npm run build && node scripts/audit.js
const fs = require('fs');
const path = require('path');
const DIST = path.join(__dirname, '..', 'dist');

const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') pages.push('/' + path.relative(DIST, d).replace(/\\/g, '/') + (d === DIST ? '' : '/'));
  }
})(DIST);

const type = (p) => {
  if (p === '/') return 'Home';
  if (/^\/service-areas\/[^/]+\/[^/]+\/$/.test(p)) return 'Town';
  if (/^\/service-areas\/[^/]+\/$/.test(p)) return 'County';
  if (p === '/service-areas/') return 'Areas index';
  if (/^\/resources\/[^/]+\/$/.test(p)) return 'Article';
  if (/^\/[^/]+\/[^/]+-county-nj\/$/.test(p)) return 'Service × county';
  if (/^\/[^/]+\/[^/]+-nj\/$/.test(p)) return 'Service × town';
  if (['/about/', '/contact/', '/faq/', '/resources/', '/services/', '/sitemap/', '/privacy-policy/', '/thank-you/'].includes(p)) return 'Page: ' + p;
  return 'Service hub';
};

const rows = {};
for (const p of pages) {
  const html = fs.readFileSync(path.join(DIST, p, 'index.html'), 'utf8');
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const text = main.replace(/<form[\s\S]*?<\/form>/g, ' ').replace(/<datalist[\s\S]*?<\/datalist>/g, ' ').replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
  const words = text.split(/\s+/).filter((w) => /[a-z]/i.test(w)).length;
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => JSON.parse(m[1])['@graph'] || []);
  const types = ld.map((n) => [].concat(n['@type']).join('+'));
  const r = {
    words,
    imgs: (main.match(/<img\b/g) || []).length,
    imgsAlt: (main.match(/<img\b[^>]*alt="[^"]+"/g) || []).length,
    h2: (main.match(/<h2\b/g) || []).length,
    internal: (main.match(/href="\/[^"]*"/g) || []).length,
    faqs: (main.match(/<details>/g) || []).length,
    answer: /class="answer"/.test(main) ? 1 : 0,
    ogPage: /og:image" content="[^"]*og-image\.jpg"/.test(html) ? 0 : 1,
    schema: [...new Set(types)].sort().join(', '),
  };
  (rows[type(p)] = rows[type(p)] || []).push(r);
}
const avg = (a, k) => (a.reduce((s, r) => s + r[k], 0) / a.length);
console.log('| Page type | Pages | Words | Images (alt) | H2s | Internal links | FAQs | Answer box | Own OG image | Schema types |');
console.log('|---|---|---|---|---|---|---|---|---|---|');
for (const [t, a] of Object.entries(rows).sort((x, y) => y[1].length - x[1].length)) {
  console.log(`| ${t} | ${a.length} | ${avg(a, 'words').toFixed(0)} | ${avg(a, 'imgs').toFixed(1)} (${avg(a, 'imgsAlt').toFixed(1)}) | ${avg(a, 'h2').toFixed(0)} | ${avg(a, 'internal').toFixed(0)} | ${avg(a, 'faqs').toFixed(0)} | ${avg(a, 'answer') ? 'yes' : 'no'} | ${avg(a, 'ogPage') ? 'yes' : 'no'} | ${a[0].schema} |`);
}
