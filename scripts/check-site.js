// SEO / integrity checks over the built site. Run after `npm run build` (npm test does both).
const fs = require('fs');
const path = require('path');
const DIST = path.join(__dirname, '..', 'dist');

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) files.push(p);
  }
})(DIST);

const errors = [];
const warn = [];
const titles = new Map();
const descs = new Map();
const exists = (href) => {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean) return true;
  const f = path.join(DIST, clean);
  return fs.existsSync(clean.endsWith('/') ? path.join(f, 'index.html') : f);
};

for (const f of files) {
  const rel = '/' + path.relative(DIST, f).replace(/index\.html$/, '');
  const html = fs.readFileSync(f, 'utf8');
  const decode = (x) => x && x.replace(/&amp;/g, '&').replace(/&quot;/g, '"');
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1]);
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1]);
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (!title) errors.push(`${rel}: missing <title>`);
  if (!desc) errors.push(`${rel}: missing meta description`);
  if (h1s !== 1) errors.push(`${rel}: ${h1s} <h1> tags`);
  if (!/<link rel="canonical"/.test(html)) errors.push(`${rel}: missing canonical`);
  if (title && title.length > 70) warn.push(`${rel}: title ${title.length} chars`);
  if (desc && !/noindex/.test(html.slice(0, 3000)) && (desc.length > 170 || desc.length < 70)) warn.push(`${rel}: description ${desc.length} chars`);
  if (!/noindex/.test(html.slice(0, 3000))) {
    if (titles.has(title)) errors.push(`${rel}: duplicate title with ${titles.get(title)}`);
    titles.set(title, rel);
    if (descs.has(desc)) errors.push(`${rel}: duplicate description with ${descs.get(desc)}`);
    descs.set(desc, rel);
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]+"/.test(m[0])) errors.push(`${rel}: <img> without alt text`);
    if (!/\bwidth="\d+"/.test(m[0]) || !/\bheight="\d+"/.test(m[0])) errors.push(`${rel}: <img> without width/height`);
  }
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { errors.push(`${rel}: invalid JSON-LD`); }
  }
  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
    if (!exists(m[1].replace(/&amp;/g, '&'))) errors.push(`${rel}: broken link ${m[1]}`);
  }
}

console.log(`Checked ${files.length} HTML files.`);
if (warn.length) console.log(`${warn.length} warnings (first 10):\n  ` + warn.slice(0, 10).join('\n  '));
if (errors.length) {
  console.error(`${errors.length} errors (first 25):\n  ` + errors.slice(0, 25).join('\n  '));
  process.exit(1);
}
console.log('All checks passed ✔');
