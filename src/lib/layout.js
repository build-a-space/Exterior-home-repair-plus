const site = require('../data/site');
const services = require('../data/services');
const { counties } = require('../data/areas');
const { icon } = require('./icons');

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (p) => site.url + p;
const tel = `tel:${site.phoneE164}`;

// Filled in by build.js with content hashes so CSS/JS can be cached forever.
const assetVersion = { css: '', js: '' };

const logoPicture = (cls, w, h, eager) => `<picture>
  <source srcset="/assets/img/logo-sm.webp 240w, /assets/img/logo.webp 480w" sizes="${w}px" type="image/webp">
  <img class="${cls}" src="/assets/img/logo-sm.png" width="${w}" height="${h}" alt="${esc(site.name)} logo" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
</picture>`;

function header(current) {
  const svcLinks = services.map((s) => `<li><a href="/${s.slug}/">${icon(s.icon)}<span>${esc(s.name)}</span></a></li>`).join('');
  const areaLinks = counties.map((c) => `<li><a href="/service-areas/${c.slug}/">${icon('pin')}<span>${esc(c.name)}</span></a></li>`).join('');
  const is = (k) => (current === k ? ' aria-current="page"' : '');
  return `<a class="skip" href="#main">Skip to content</a>
<div class="topbar">
  <div class="wrap topbar-in">
    <span class="topbar-areas">${icon('pin')} Serving Ocean, Monmouth &amp; Atlantic County, NJ</span>
    <a href="mailto:${site.email}" class="topbar-mail">${icon('mail')} ${esc(site.email)}</a>
  </div>
</div>
<header class="site-header" id="top">
  <div class="wrap header-in">
    <a class="brand" href="/" aria-label="${esc(site.name)} — home">
      ${logoPicture('brand-logo', 64, 64, true)}
      <span class="brand-text"><strong>Exterior Home Repair <em>+</em></strong><small>${esc(site.tagline)}</small></span>
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">${icon('menu', ' data-i="open"')}${icon('close', ' data-i="close"')}</button>
    <nav class="site-nav" id="site-nav" aria-label="Main">
      <ul class="nav-list">
        <li class="has-menu"><a href="/services/"${is('services')}>Services ${icon('chevron')}</a><ul class="menu menu-services">${svcLinks}<li class="menu-all"><a href="/services/">All exterior services →</a></li></ul></li>
        <li class="has-menu"><a href="/service-areas/"${is('areas')}>Service Areas ${icon('chevron')}</a><ul class="menu">${areaLinks}<li class="menu-all"><a href="/service-areas/">All 109 towns →</a></li></ul></li>
        <li><a href="/about/"${is('about')}>About</a></li>
        <li><a href="/resources/"${is('resources')}>Resources</a></li>
        <li><a href="/faq/"${is('faq')}>FAQ</a></li>
        <li><a href="/contact/"${is('contact')}>Contact</a></li>
      </ul>
      <div class="nav-cta">
        <a class="btn btn-ghost" href="${tel}">${icon('phone')} ${site.phone}</a>
        <a class="btn btn-gold" href="/contact/#estimate">Free Estimate</a>
      </div>
    </nav>
  </div>
</header>`;
}

function footer() {
  const hours = site.hours.map((h) => `<li><span>${esc(h.days)}</span><span>${esc(h.close ? `${h.open} – ${h.close}` : h.open)}</span></li>`).join('');
  const social = Object.entries(site.social).filter(([, v]) => v).map(([k, v]) => `<a href="${esc(v)}" rel="noopener" target="_blank">${k[0].toUpperCase() + k.slice(1)}</a>`).join('');
  return `<section class="cta-band">
  <div class="wrap cta-band-in">
    <div>
      <h2>Ready to protect your home?</h2>
      <p>Free, no-pressure estimates for roofing, siding, gutters, windows, doors, decks and storm repairs across the Jersey Shore.</p>
    </div>
    <div class="cta-band-btns">
      <a class="btn btn-dark btn-lg" href="${tel}">${icon('phone')} Call ${site.phone}</a>
      <a class="btn btn-outline-dark btn-lg" href="/contact/#estimate">Request an Estimate</a>
    </div>
  </div>
</section>
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      ${logoPicture('footer-logo', 140, 140, false)}
      <p>${esc(site.name)} is a Jersey Shore exterior contractor specializing in roofing, siding, gutters, windows, doors, decks and storm damage repair. ${esc(site.tagline)}</p>
      <ul class="footer-contact">
        <li><a href="${tel}">${icon('phone')} ${site.phone}</a></li>
        <li><a href="mailto:${site.email}">${icon('mail')} ${esc(site.email)}</a></li>
        <li>${icon('pin')} Ocean, Monmouth &amp; Atlantic County, NJ</li>
        ${site.hicNumber ? `<li>${icon('shield')} NJ HIC Reg. #${esc(site.hicNumber)}</li>` : ''}
      </ul>
      ${social ? `<div class="footer-social">${social}</div>` : ''}
    </div>
    <div>
      <h3>Services</h3>
      <ul class="footer-links">${services.map((s) => `<li><a href="/${s.slug}/">${esc(s.name)}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h3>Service Areas</h3>
      <ul class="footer-links">
        ${counties.map((c) => `<li><a href="/service-areas/${c.slug}/">${esc(c.name)}</a></li>`).join('')}
        <li><a href="/service-areas/ocean-county/toms-river/">Toms River</a></li>
        <li><a href="/service-areas/ocean-county/brick/">Brick</a></li>
        <li><a href="/service-areas/monmouth-county/middletown/">Middletown</a></li>
        <li><a href="/service-areas/monmouth-county/wall-township/">Wall Township</a></li>
        <li><a href="/service-areas/atlantic-county/egg-harbor-township/">Egg Harbor Township</a></li>
        <li><a href="/service-areas/">All service areas →</a></li>
      </ul>
      <h3 class="mt">Company</h3>
      <ul class="footer-links">
        <li><a href="/about/">About Us</a></li>
        <li><a href="/resources/">Homeowner Resources</a></li>
        <li><a href="/faq/">FAQ</a></li>
        <li><a href="/contact/">Contact</a></li>
      </ul>
    </div>
    <div>
      <h3>Hours</h3>
      <ul class="footer-hours">${hours}</ul>
      <p class="footer-note">Storm emergency? Call anytime — we’ll get back to you as fast as possible.</p>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="wrap footer-bottom-in">
      <span>© <span data-year>${new Date().getFullYear()}</span> ${esc(site.name)}. All rights reserved.</span>
      <span><a href="/privacy-policy/">Privacy Policy</a> · <a href="/sitemap.xml">Sitemap</a></span>
    </div>
  </div>
</footer>
<div class="mobile-bar" role="navigation" aria-label="Quick contact">
  <a href="${tel}" class="mobile-call">${icon('phone')} Call Now</a>
  <a href="/contact/#estimate" class="mobile-quote">${icon('clipboard')} Free Estimate</a>
</div>`;
}

/**
 * page: { path, title, description, h1?, body, schema?:[], current?, noindex?, ogType?, breadcrumbs?:[[name, path]] }
 */
function layout(page) {
  const canonical = abs(page.path);
  const graph = [...(page.schema || [])];
  if (page.breadcrumbs && page.breadcrumbs.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumbs.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(p) })),
    });
  }
  const jsonld = graph.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>` : '';
  return `<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${canonical}">
${page.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">'}
<meta name="geo.region" content="US-NJ">
<meta name="theme-color" content="#101418">
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${abs('/assets/img/og-image.jpg')}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${abs('/assets/img/og-image.jpg')}">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/assets/img/icon-192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap">
<link rel="stylesheet" href="/assets/css/site.css?v=${assetVersion.css}">
${jsonld}
</head>
<body class="${page.bodyClass || ''}">
${header(page.current)}
<main id="main">
${page.breadcrumbs && page.breadcrumbs.length > 1 ? breadcrumbNav(page.breadcrumbs) : ''}
${page.body}
</main>
${footer()}
<script src="/assets/js/site.js?v=${assetVersion.js}" defer></script>
</body>
</html>`;
}

function breadcrumbNav(crumbs) {
  return `<nav class="crumbs" aria-label="Breadcrumb"><div class="wrap"><ol>${crumbs
    .map(([name, p], i) => (i === crumbs.length - 1 ? `<li aria-current="page">${esc(name)}</li>` : `<li><a href="${p}">${esc(name)}</a></li>`))
    .join('')}</ol></div></nav>`;
}

module.exports = { layout, esc, abs, tel, assetVersion, logoPicture };
