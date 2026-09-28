// Measures how much visible page text is shared between each local page and its
// closest siblings (same service in the 6 nearest towns; other services in the same
// town; neighboring town pages). Score = shared 5-word phrases ÷ the smaller page's
// phrases (a strict measure). Goal: ≤ 20% shared (≥ 80% unique).
const fs = require('fs');
const path = require('path');
const DIST = path.join(__dirname, '..', 'dist');
const services = require('../src/data/services');
const { towns } = require('../src/data/areas');

// MODE=body measures only the written copy (article + FAQ), ignoring the form,
// sidebar and link lists; default measures everything inside <main>.
const BODY = process.env.MODE === 'body';
const cache = new Map();
function shingles(p) {
  if (cache.has(p)) return cache.get(p);
  let h = fs.readFileSync(path.join(DIST, p, 'index.html'), 'utf8');
  h = h.slice(h.indexOf('<main'), h.indexOf('</main>'));
  if (BODY) h = (h.match(/<article[\s\S]*?<\/article>/) || [''])[0] + ((h.match(/<div class="faq">[\s\S]*?<\/div><\/section>/) || [''])[0]);
  h = h
    .replace(/<form[\s\S]*?<\/form>/g, ' ').replace(/<datalist[\s\S]*?<\/datalist>/g, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ');
  const w = h.toLowerCase().split(/\W+/).filter(Boolean);
  const s = new Set();
  for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(' '));
  cache.set(p, s);
  return s;
}
function shared(a, b) {
  const A = shingles(a), B = shingles(b);
  let n = 0;
  for (const x of A) if (B.has(x)) n++;
  return n / Math.min(A.size, B.size);
}

const results = { 'service × town (same service, nearby towns)': [], 'service × town (same town, other services)': [], 'town pages (nearby towns)': [] };
for (const t of towns) {
  const tp = `service-areas/${t.county.slug}/${t.slug}`;
  for (const n of t.nearby) results['town pages (nearby towns)'].push([shared(tp, `service-areas/${n.county.slug}/${n.slug}`), tp, n.slug]);
  services.forEach((s, i) => {
    const p = `${s.slug}/${t.slug}-nj`;
    for (const n of t.nearby) results['service × town (same service, nearby towns)'].push([shared(p, `${s.slug}/${n.slug}-nj`), p, n.slug]);
    const o = services[(i + 1) % services.length];
    results['service × town (same town, other services)'].push([shared(p, `${o.slug}/${t.slug}-nj`), p, o.slug]);
  });
}

let fail = false;
for (const [label, rows] of Object.entries(results)) {
  rows.sort((a, b) => b[0] - a[0]);
  const avg = rows.reduce((s, r) => s + r[0], 0) / rows.length;
  const over = rows.filter((r) => r[0] > 0.2).length;
  console.log(`${BODY ? '[body copy] ' : '[whole page] '}${label}: ${rows.length} pairs · average ${(avg * 100).toFixed(1)}% shared · worst ${(rows[0][0] * 100).toFixed(1)}% (${rows[0][1]} vs ${rows[0][2]}) · ${over} pairs over 20%`);
  // Hard fail only on a clear regression; the goal (≤ 20%) is reported above.
  if (avg > 0.25) fail = true;
}
process.exitCode = fail ? 1 : 0;
