// Generates social-share (Open Graph) images and raster copies of the service
// illustrations at build time. Needs `sharp`; if it is missing the build still
// succeeds and pages fall back to the default share image.
const fs = require('fs');
const path = require('path');
const { art } = require('./illustrations');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Break a title into lines of at most `max` characters.
function wrap(text, max) {
  const lines = [];
  let line = '';
  for (const w of text.split(' ')) {
    if ((line + ' ' + w).trim().length > max && line) { lines.push(line); line = w; } else line = (line + ' ' + w).trim();
  }
  if (line) lines.push(line);
  return lines;
}

function card({ title, subtitle }) {
  // Left column (x 70–600) holds text; the illustration sits at right.
  const all = wrap(title.toUpperCase(), 15);
  const lines = all.slice(0, 4);
  if (all.length > 4) lines[3] += '…';
  const size = lines.length > 3 ? 48 : lines.length > 2 ? 54 : 60;
  const lh = size * 1.1;
  const top = 300 - ((lines.length - 1) * lh) / 2;
  const tspans = lines.map((l, i) => `<tspan x="70" dy="${i ? lh : 0}">${esc(l)}</tspan>`).join('');
  const sub = wrap(subtitle, 32).slice(0, 2).map((l, i) => `<tspan x="70" dy="${i ? 34 : 0}">${esc(l)}</tspan>`).join('');
  const subY = top + (lines.length - 1) * lh + 62;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#101418"/>
  <rect x="0" y="600" width="400" height="30" fill="#1f5fbf"/><rect x="400" y="600" width="400" height="30" fill="#f4b41a"/><rect x="800" y="600" width="400" height="30" fill="#c9ced6"/>
  <rect x="70" y="${top - size - 22}" width="90" height="6" fill="#f4b41a"/>
  <text x="70" y="${top}" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="${size}" fill="#ffffff">${tspans}</text>
  <text x="70" y="${subY}" font-family="DejaVu Sans, Arial, sans-serif" font-size="26" fill="#f4b41a">${sub}</text>
  <text x="70" y="560" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="28" fill="#c9ced6">(908) 636-9745 · Free Estimates</text>
</svg>`;
}

async function generate(DIST, SRC, jobs) {
  let sharp;
  try { sharp = require('sharp'); } catch { console.warn('sharp not installed — skipping share images'); return new Set(); }
  const outDir = path.join(DIST, 'assets/img/og');
  const svcDir = path.join(DIST, 'assets/img/services');
  fs.mkdirSync(outDir, { recursive: true });
  const logo = await sharp(path.join(SRC, 'assets/img/logo.png')).resize({ height: 240 }).png().toBuffer();

  // Raster copies of every illustration (for image search and schema).
  await Promise.all(Object.entries(art).map(([slug, svg]) => sharp(Buffer.from(svg)).resize(800, 450).jpeg({ quality: 82 }).toFile(path.join(svcDir, `${slug}.jpg`))));

  const made = new Set();
  await Promise.all(jobs.map(async (j) => {
    const illo = await sharp(Buffer.from(art[j.artKey] || art.home)).resize(480, 270).png().toBuffer();
    await sharp(Buffer.from(card(j)))
      .composite([{ input: illo, left: 660, top: 300 }, { input: logo, left: 800, top: 30 }])
      .jpeg({ quality: 84 })
      .toFile(path.join(outDir, `${j.key}.jpg`));
    made.add(j.key);
  }));
  return made;
}

module.exports = { generate };
