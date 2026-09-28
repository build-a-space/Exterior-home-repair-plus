/**
 * One-time helper: turns the logo screenshot in /brand into web-ready assets.
 * Crops the badge, knocks out the white background (edge flood-fill) and
 * writes PNG/WebP versions + favicons into src/assets/img.
 * Usage: npm i --no-save sharp && node scripts/process-logo.js
 */
const path = require('path');
const sharp = require('sharp');

const SRC = path.join(__dirname, '..', 'brand', 'logo-source.jpg');
const OUT = path.join(__dirname, '..', 'src', 'assets', 'img');

async function knockout(region) {
  const { data, info } = await sharp(SRC).extract(region).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const seen = new Uint8Array(w * h);
  const isBg = (i) => {
    const p = i * 4;
    const r = data[p], g = data[p + 1], b = data[p + 2];
    return r > 200 && g > 200 && b > 200 && Math.max(r, g, b) - Math.min(r, g, b) < 30;
  };
  const stack = [];
  for (let x = 0; x < w; x++) { stack.push(x, (h - 1) * w + x); }
  for (let y = 0; y < h; y++) { stack.push(y * w, y * w + w - 1); }
  while (stack.length) {
    const i = stack.pop();
    if (seen[i] || !isBg(i)) continue;
    seen[i] = 1;
    data[i * 4 + 3] = 0;
    const x = i % w, y = (i / w) | 0;
    if (x > 0) stack.push(i - 1);
    if (x < w - 1) stack.push(i + 1);
    if (y > 0) stack.push(i - w);
    if (y < h - 1) stack.push(i + w);
  }
  // soften the fringe: partially transparent for light pixels touching knocked-out ones
  for (let i = 0; i < w * h; i++) {
    if (seen[i]) continue;
    const x = i % w, y = (i / w) | 0;
    const near = (x > 0 && seen[i - 1]) || (x < w - 1 && seen[i + 1]) || (y > 0 && seen[i - w]) || (y < h - 1 && seen[i + w]);
    if (near) {
      const p = i * 4;
      const lum = (data[p] + data[p + 1] + data[p + 2]) / 3;
      if (lum > 150) data[p + 3] = Math.round(255 * (1 - (lum - 150) / 105));
    }
  }
  return sharp(data, { raw: { width: w, height: h, channels: 4 } }).trim();
}

(async () => {
  const badge = await knockout({ left: 0, top: 288, width: 640, height: 604 });
  const badgeBuf = await badge.png().toBuffer();
  await sharp(badgeBuf).resize({ width: 480 }).png({ compressionLevel: 9, palette: true }).toFile(path.join(OUT, 'logo.png'));
  await sharp(badgeBuf).resize({ width: 480 }).webp({ quality: 88 }).toFile(path.join(OUT, 'logo.webp'));
  await sharp(badgeBuf).resize({ width: 240 }).webp({ quality: 88 }).toFile(path.join(OUT, 'logo-sm.webp'));
  await sharp(badgeBuf).resize({ width: 240 }).png({ compressionLevel: 9, palette: true }).toFile(path.join(OUT, 'logo-sm.png'));

  const full = await knockout({ left: 0, top: 286, width: 640, height: 820 });
  await full.webp({ quality: 88 }).toFile(path.join(OUT, 'logo-full.webp'));
  

  // Social share image 1200x630 on brand charcoal
  const ogLogo = await sharp(badgeBuf).resize({ height: 520 }).png().toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#101418' } })
    .composite([{ input: ogLogo, gravity: 'center' }])
    .jpeg({ quality: 86 }).toFile(path.join(OUT, 'og-image.jpg'));

  // Favicons (square, from the badge)
  const sq = await sharp(badgeBuf).resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  await sharp(sq).resize(180, 180).flatten({ background: '#101418' }).png().toFile(path.join(OUT, 'apple-touch-icon.png'));
  await sharp(sq).resize(192, 192).png({ palette: true }).toFile(path.join(OUT, 'icon-192.png'));
  await sharp(sq).resize(512, 512).png({ palette: true }).toFile(path.join(OUT, 'icon-512.png'));
  await sharp(sq).resize(48, 48).png().toFile(path.join(OUT, 'favicon-48.png'));
  console.log('Logo assets written to', OUT);
})();
