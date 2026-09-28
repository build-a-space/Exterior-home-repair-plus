const site = require('./data/site');
const services = require('./data/services');
const articles = require('./data/articles');
const { counties, towns } = require('./data/areas');
const { characters, serviceAngles, angleKey } = require('./data/local');
const { layout, esc, tel } = require('./lib/layout');
const { icon } = require('./lib/icons');
const C = require('./lib/components');
const S = require('./lib/schema');

const townPath = (t) => `/service-areas/${t.county.slug}/${t.slug}/`;
const comboPath = (s, t) => `/${s.slug}/${t.slug}-nj/`;
const brandTitle = (base) => (base.length <= 38 ? `${base} | Exterior Home Repair Plus` : base.length <= 56 ? `${base} | EHR Plus` : base);
const titleCase = (str) => str.replace(/\b(and)\b/g, '&').replace(/\b\w/g, (c) => c.toUpperCase());
// Build a meta description from parts, keeping required parts and adding optional ones only while ≤ 158 chars.
const fitDesc = ([first, last], optional = []) => {
  let mid = '';
  for (const o of optional) if (`${first} ${mid}${o} ${last}`.length <= 158) mid += o + ' ';
  return `${first} ${mid}${last}`;
};
const hooks = {
  'roof-replacement': 'Full tear-offs, architectural shingles & high-wind installs.',
  'roof-repair': 'Leaks, missing shingles, flashing & emergency tarping.',
  siding: 'Vinyl, fiber cement & shake siding plus storm repairs.',
  gutters: 'Seamless gutters, downspouts & gutter guards.',
  windows: 'Energy-efficient double-hung, casement, bay & bow windows.',
  doors: 'Fiberglass & steel entry, patio and storm doors.',
  decks: 'Composite & wood decks, railings, stairs & repairs.',
  'soffit-fascia': 'Rotted fascia, vented soffit & aluminum/PVC wrap.',
  'storm-damage-repair': 'Emergency tarping, repairs & insurance claim help.',
  'exterior-painting': 'House painting, trim & staining with real prep.',
  'carpentry-wood-rot': 'Rotted trim, sills, door frames & porch repairs.',
  'power-washing': 'Soft washing for siding & roofs, decks and patios.',
};
const hookOf = (svc) => hooks[svc.slug];
const an = (w) => (/^[aeiou]/i.test(w) ? 'an' : 'a');
const listSentence = (arr) => (arr.length <= 1 ? arr.join('') : `${arr.slice(0, -1).join(', ')} and ${arr[arr.length - 1]}`);
const cleanSections = (t) => t.sections.map((x) => x.replace(/\s*\((border)\)/, ''));
// Stable pseudo-random pick so each town/service page gets its own phrasing.
const hash = (str) => [...str].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);
const pick = (arr, key) => arr[hash(key) % arr.length];

function hero({ eyebrow, h1, lead, form, crumbsAbove = false }) {
  return `<section class="hero${crumbsAbove ? ' hero-inner' : ''}">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
      <h1>${h1}</h1>
      <p class="lead">${lead}</p>
      <div class="hero-btns">
        <a class="btn btn-gold btn-lg" href="${tel}">${icon('phone')} ${site.phone}</a>
        <a class="btn btn-ghost btn-lg" href="#estimate">Free Estimate ${icon('arrow')}</a>
      </div>
      ${C.trustStrip()}
    </div>
    <div class="hero-form">${form}</div>
  </div>
</section>`;
}

const section = (inner, cls = '') => `<section class="section ${cls}"><div class="wrap">${inner}</div></section>`;
const secHead = (kicker, title, sub) => `<div class="sec-head">${kicker ? `<p class="kicker">${kicker}</p>` : ''}<h2>${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div>`;

// ---------------------------------------------------------------- Home
function home() {
  const path = '/';
  const title = 'Exterior Home Repair Plus | Jersey Shore Roofing & Siding';
  const description = 'Jersey Shore roofing, siding, gutters, windows, doors, decks & storm damage repair in Ocean, Monmouth & Atlantic County, NJ. Free estimates — call (908) 636-9745.';
  const faqs = [
    ['What areas do you serve?', 'We serve all of Ocean County, Monmouth County and Atlantic County, New Jersey — 109 municipalities in total, from Keansburg and Middletown down through Toms River, Long Beach Island, Atlantic City and Hammonton.'],
    ['Do you offer free estimates?', `Yes. Every estimate is free, written and itemized. Call ${site.phone} or fill out the form and we’ll schedule a visit.`],
    ['Do you handle storm damage and insurance claims?', 'Yes. We provide emergency tarping and board-up, document storm damage with photos and written estimates, and can meet your insurance adjuster at the property.'],
    ['Do you pull permits?', 'Yes. We obtain the required township construction permits for roofing, siding, windows, decks and other regulated work and schedule the inspections.'],
    ['What kind of homes do you work on?', 'Single-family homes, shore houses, elevated homes, townhomes, historic homes and small multi-family properties across the Jersey Shore.'],
  ];
  const body = `
${hero({
  eyebrow: 'Jersey Shore Exterior Contractor',
  h1: 'Roofing, Siding &amp; Exterior Repairs <span>Built for the Jersey Shore</span>',
  lead: 'Exterior Home Repair Plus protects homes across Ocean, Monmouth and Atlantic County with expert roofing, siding, gutters, windows, doors, decks and storm damage repair. Quality. Reliability. Results.',
  form: C.estimateForm(),
})}
${section(`${secHead('What we do', 'Complete Exterior Home Services', 'One trusted contractor for everything on the outside of your home — from the roof down to the deck.')}${C.serviceCards()}<p class="center mt"><a class="btn btn-dark" href="/services/">View all services ${icon('arrow')}</a></p>`)}
<section class="section section-dark">
  <div class="wrap split">
    <div>
      <p class="kicker">Why homeowners choose us</p>
      <h2>Shore homes take a beating. We build exteriors that fight back.</h2>
      <p>Salt air, nor’easters, wind-driven rain and humid summers are hard on every part of a home’s exterior. At Exterior Home Repair Plus we install every roof, wall and window with the Jersey Shore in mind — with proper flashing, high-wind fastening and corrosion-resistant materials — so the job lasts.</p>
      <p>Whether you need a single leak fixed in Toms River, new siding in Middletown or a full storm restoration in Brigantine, you get the same honest advice, clear pricing and careful workmanship.</p>
      <a class="btn btn-gold" href="/about/">About our company ${icon('arrow')}</a>
    </div>
    <div class="art-card">${C.heroArt()}</div>
  </div>
</section>
${section(`${secHead('The difference', 'Why Choose Exterior Home Repair Plus', '')}${C.whyUs()}`)}
${section(`${secHead('How it works', 'Simple, Straightforward Process', '')}${C.processSteps()}`, 'section-alt')}
${section(`${secHead('Where we work', 'Serving Ocean, Monmouth &amp; Atlantic County', 'Local crews covering 109 Jersey Shore towns — plus every neighborhood, beach block and lagoon in between.')}
<div class="county-cards">${counties
  .map((c) => `<a class="county-card" href="/service-areas/${c.slug}/"><span class="county-ico">${icon('pin')}</span><h3>${c.name}</h3><p>${c.towns.length} municipalities including ${listSentence(c.towns.slice(0, 5).map((t) => t.plainName))}.</p><span class="svc-more">View ${c.name} towns ${icon('arrow')}</span></a>`)
  .join('')}</div>
<div class="popular"><h3>Popular service areas</h3><ul class="chips">${['toms-river', 'brick', 'lakewood', 'jackson', 'berkeley-township', 'long-beach-township', 'point-pleasant', 'middletown', 'howell', 'wall-township', 'freehold-township', 'long-branch', 'asbury-park', 'egg-harbor-township', 'galloway-township', 'atlantic-city', 'margate-city', 'brigantine']
  .map((sl) => towns.find((t) => t.slug === sl))
  .map((t) => `<li><a href="${townPath(t)}">${esc(t.plainName)}</a></li>`)
  .join('')}</ul></div>`)}
${section(`${secHead('Homeowner resources', 'Tips From the Crew', '')}<div class="post-grid">${articles.slice(0, 3).map(articleCard).join('')}</div>`, 'section-alt')}
${section(`${secHead('FAQ', 'Common Questions', '')}${C.faqList(faqs)}`)}
${C.townDatalist()}`;
  return {
    path,
    html: layout({
      path, title, description, body, current: 'home', bodyClass: 'home',
      schema: [S.business(true), S.website(), S.webPage(path, title, description), C.faqSchema(faqs, path)],
    }),
  };
}

// ---------------------------------------------------------------- Services index
function servicesIndex() {
  const path = '/services/';
  const title = 'Exterior Home Services | Roofing, Siding & Gutters NJ';
  const description = 'Roofing, siding, gutters, windows, doors, decks, trim, painting, power washing & storm damage repair across Ocean, Monmouth & Atlantic County, NJ.';
  const body = `
${hero({ eyebrow: 'Our Services', h1: 'Exterior Home Repair &amp; Replacement Services', lead: 'From the ridge of your roof to the boards of your deck, we handle every part of your home’s exterior across Ocean, Monmouth and Atlantic County, NJ.', form: C.estimateForm(), crumbsAbove: true })}
${section(`${secHead('', 'Everything Outside Your Home, Handled by One Team', '')}${C.serviceCards()}`)}
${section(`${secHead('How it works', 'Our Process', '')}${C.processSteps()}`, 'section-alt')}
${C.townDatalist()}`;
  return {
    path,
    html: layout({
      path, title, description, body, current: 'services', breadcrumbs: [['Home', '/'], ['Services', path]],
      schema: [S.business(), S.webPage(path, title, description, 'CollectionPage'), { '@type': 'ItemList', itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: require('./lib/layout').abs(`/${s.slug}/`) })) }],
    }),
  };
}

// ---------------------------------------------------------------- Service hub
function serviceHub(svc) {
  const path = `/${svc.slug}/`;
  const title = brandTitle(`${svc.name} | Jersey Shore NJ`);
  const description = fitDesc([`${svc.name} across Ocean, Monmouth & Atlantic County, NJ.`, `Free estimates: ${site.phone}.`], [hookOf(svc)]);
  const others = services.filter((s) => s !== svc);
  const body = `
${hero({ eyebrow: `${svc.short} · Jersey Shore, NJ`, h1: esc(svc.headline), lead: esc(svc.blurb) + ' Serving every town in Ocean, Monmouth and Atlantic County.', form: C.estimateForm({ service: svc.name }), crumbsAbove: true })}
<section class="section"><div class="wrap content-grid">
  <article class="prose">
    <h2>${esc(svc.name)} From a Local Jersey Shore Contractor</h2>
    <p>${esc(svc.intro)}</p>
    <h2>Signs You Need ${esc(svc.name)}</h2>
    ${C.checkList(svc.signs)}
    <h2>What’s Included</h2>
    ${C.checkList(svc.includes)}
    <h2>Built for Coastal New Jersey</h2>
    <p>${esc(serviceAngles[svc.slug].coastal)}</p>
    <p>${esc(serviceAngles[svc.slug].inland)}</p>
    <p>${esc(serviceAngles[svc.slug].historic)}</p>
  </article>
  ${sidebar(svc)}
</div></section>
${section(`${secHead('How it works', `Our ${esc(svc.short)} Process`, '')}${C.processSteps()}`, 'section-alt')}
${section(`${secHead('Service areas', `${esc(svc.name)} Near You`, `Choose your town for local ${esc(svc.keyword)} information.`)}${C.countyTownLinks((t) => comboPath(svc, t), (t) => t.plainName)}`)}
${section(`${secHead('FAQ', `${esc(svc.name)} Questions`, '')}${C.faqList(svc.faqs)}`, 'section-alt')}
${section(`${secHead('More services', 'Other Exterior Services', '')}<ul class="chips">${others.map((s) => `<li><a href="/${s.slug}/">${esc(s.name)}</a></li>`).join('')}</ul>`)}
${C.townDatalist()}`;
  return {
    path,
    html: layout({
      path, title, description, body, current: 'services', breadcrumbs: [['Home', '/'], ['Services', '/services/'], [svc.name, path]],
      schema: [S.business(), S.webPage(path, title, description), S.serviceSchema(svc, path), C.faqSchema(svc.faqs, path)],
    }),
  };
}

function sidebar(svc, town) {
  return `<aside class="sidebar">
    <div class="side-card side-cta">
      <h3>Talk to a pro today</h3>
      <p>Free, no-obligation ${esc(svc ? svc.keyword : 'exterior')} estimates${town ? ` in ${esc(town.plainName)}` : ''}.</p>
      <a class="btn btn-gold btn-block" href="${tel}">${icon('phone')} ${site.phone}</a>
      <a class="btn btn-outline btn-block" href="#estimate">Request online</a>
    </div>
    ${svc ? `<div class="side-card"><h3>Materials we install</h3>${C.checkList(svc.materials)}</div>` : ''}
    <div class="side-card"><h3>All services</h3><ul class="side-links">${services
      .map((s) => `<li><a href="${town ? comboPath(s, town) : `/${s.slug}/`}"${svc === s ? ' aria-current="page"' : ''}>${icon(s.icon)} ${esc(s.name)}</a></li>`)
      .join('')}</ul></div>
  </aside>`;
}

// ---------------------------------------------------------------- Areas index
function areasIndex() {
  const path = '/service-areas/';
  const title = 'Service Areas: Ocean, Monmouth & Atlantic County NJ';
  const description = 'Exterior Home Repair Plus serves all 109 towns in Ocean, Monmouth & Atlantic County, NJ — roofing, siding, gutters, windows, doors, decks and storm repair near you.';
  const body = `
${hero({ eyebrow: 'Service Areas', h1: 'Serving the Entire Jersey Shore', lead: 'We cover every municipality in Ocean, Monmouth and Atlantic County — and every neighborhood, section and village within them. Find your town below.', form: C.estimateForm(), crumbsAbove: true })}
${section(`<div class="county-cards">${counties
  .map((c) => `<a class="county-card" href="/service-areas/${c.slug}/"><span class="county-ico">${icon('pin')}</span><h2 class="h3">${c.name}</h2><p>${esc(c.intro.split('. ')[0])}.</p><span class="svc-more">${c.towns.length} towns ${icon('arrow')}</span></a>`)
  .join('')}</div>`)}
${section(`${secHead('All towns', 'Find Your Town', '')}${C.countyTownLinks(townPath)}`, 'section-alt')}
${C.townDatalist()}`;
  return { path, html: layout({ path, title, description, body, current: 'areas', breadcrumbs: [['Home', '/'], ['Service Areas', path]], schema: [S.business(true), S.webPage(path, title, description, 'CollectionPage')] }) };
}

// ---------------------------------------------------------------- County
function countyPage(c) {
  const path = `/service-areas/${c.slug}/`;
  const title = brandTitle(`${c.name} NJ Roofing, Siding & Exterior Repair`);
  const description = `Roofing, siding, gutters, windows, doors, decks & storm damage repair in all ${c.towns.length} ${c.name}, NJ towns. Local, insured & free estimates. Call ${site.phone}.`;
  const faqs = [
    [`Do you serve all of ${c.name}?`, `Yes — all ${c.towns.length} municipalities in ${c.name}, including ${listSentence(c.towns.slice(0, 6).map((t) => t.plainName))} and every neighborhood in between.`],
    [`What exterior problems are most common in ${c.name}?`, c.climate],
    ['How quickly can you come out for an estimate?', `In most cases we can schedule an inspection within a few days, and we prioritize active leaks and storm damage. Call ${site.phone}.`],
  ];
  const body = `
${hero({ eyebrow: `${c.name}, New Jersey`, h1: `Exterior Home Repair in ${c.name}, NJ`, lead: esc(c.intro), form: C.estimateForm(), crumbsAbove: true })}
<section class="section"><div class="wrap content-grid">
  <article class="prose">
    <h2>Exterior Contractor for Every ${esc(c.name)} Town</h2>
    <p>${esc(c.climate)}</p>
    <p>Whether you need a new roof, replacement siding, seamless gutters, energy-efficient windows, a new front door, a deck rebuild or emergency storm repair, Exterior Home Repair Plus brings the same careful workmanship to every job in ${esc(c.name)}. The county seat is ${esc(c.seat)}, and our crews work throughout the county every week.</p>
    <h2>Towns We Serve in ${esc(c.name)}</h2>
    <ul class="town-grid">${c.towns.map((t) => `<li><a href="${townPath(t)}"><strong>${esc(t.name)}</strong><small>${esc(cleanSections(t).slice(0, 3).join(' · '))}</small></a></li>`).join('')}</ul>
  </article>
  ${sidebar()}
</div></section>
${section(`${secHead('Services', `Our Services in ${esc(c.name)}`, '')}${C.serviceCards()}`, 'section-alt')}
${section(`${secHead('FAQ', `${esc(c.name)} Questions`, '')}${C.faqList(faqs)}`)}
${C.townDatalist()}`;
  return {
    path,
    html: layout({
      path, title, description, body, current: 'areas', breadcrumbs: [['Home', '/'], ['Service Areas', '/service-areas/'], [c.name, path]],
      schema: [S.business(), S.webPage(path, title, description), C.faqSchema(faqs, path)],
    }),
  };
}

// ---------------------------------------------------------------- Town
function townPage(t) {
  const path = townPath(t);
  const ch = characters[t.character];
  const secs = cleanSections(t);
  const title = brandTitle(`Roofing, Siding & Exterior Repair ${t.plainName}, NJ`);
  const description = `Exterior home repair in ${t.plainName}, ${t.county.name} NJ — roofing, siding, gutters, windows, doors, decks & storm repair. Free estimates: ${site.phone}.`;
  const faqs = [
    [`Do you serve all of ${t.plainName}?`, `Yes. We work throughout ${t.plainName}${secs.length > 1 ? `, including ${listSentence(secs)}` : ''}, and in nearby ${listSentence(t.nearby.slice(0, 4).map((n) => n.plainName))}.`],
    [`What exterior issues are common for ${t.plainName} homes?`, `${ch.housing} The most common issues we see are: ${ch.challenges.map((x) => x.toLowerCase()).join('; ')}.`],
    [`Do you offer free estimates in ${t.plainName}?`, `Absolutely. Call ${site.phone} or request an estimate online and we’ll schedule a visit to your ${t.plainName} home.`],
  ];
  const body = `
${hero({ eyebrow: `${esc(t.plainName)} · ${esc(t.county.name)}, NJ`, h1: `Roofing, Siding &amp; Exterior Repair in ${esc(t.plainName)}, NJ`, lead: `${esc(t.note)} Exterior Home Repair Plus is the local contractor ${esc(t.plainName)} homeowners call for roofing, siding, gutters, windows, doors, decks and storm damage repair.`, form: C.estimateForm({ town: t.plainName }), crumbsAbove: true })}
<section class="section"><div class="wrap content-grid">
  <article class="prose">
    <h2>Your ${esc(t.plainName)} Exterior Home Experts</h2>
    <p>${esc(t.plainName)} is ${an(ch.label)} ${esc(ch.label)} community in ${esc(t.county.name)}. ${esc(ch.housing)}</p>
    <p>${esc(ch.tip)}</p>
    <h3>Common exterior challenges in ${esc(t.plainName)}</h3>
    ${C.checkList(ch.challenges)}
    ${secs.length ? `<h3>Neighborhoods &amp; sections we serve</h3><ul class="chips chips-plain">${secs.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>` : ''}
  </article>
  ${sidebar(null, t)}
</div></section>
${section(`${secHead('Services', `Exterior Services in ${esc(t.plainName)}, NJ`, 'Select a service to learn how we handle it for homes in your area.')}${C.serviceCards(t)}`, 'section-alt')}
${section(`${secHead('Nearby', `Also Serving Near ${esc(t.plainName)}`, '')}<ul class="chips">${t.nearby.map((n) => `<li><a href="${townPath(n)}">${esc(n.plainName)}</a></li>`).join('')}<li><a href="/service-areas/${t.county.slug}/">All ${esc(t.county.name)} towns</a></li></ul>`)}
${section(`${secHead('FAQ', `${esc(t.plainName)} Exterior Repair FAQ`, '')}${C.faqList(faqs)}`, 'section-alt')}
${C.townDatalist()}`;
  return {
    path,
    html: layout({
      path, title, description, body, current: 'areas',
      breadcrumbs: [['Home', '/'], ['Service Areas', '/service-areas/'], [t.county.name, `/service-areas/${t.county.slug}/`], [t.plainName, path]],
      schema: [S.business(), S.webPage(path, title, description), C.faqSchema(faqs, path)],
    }),
  };
}

// ---------------------------------------------------------------- Service × Town
function comboPage(svc, t) {
  const path = comboPath(svc, t);
  const ch = characters[t.character];
  const secs = cleanSections(t);
  const angle = serviceAngles[svc.slug][angleKey(t.character)];
  const name = t.plainName;
  const title = brandTitle(`${titleCase(svc.keyword)} in ${name}, NJ`);
  const description = fitDesc([`${titleCase(svc.keyword)} in ${name}, NJ.`, `Free estimates: ${site.phone}.`], [hookOf(svc), `Local ${t.county.name} crew.`]);
  const openers = [
    `Looking for ${svc.keyword} in ${name}? Exterior Home Repair Plus serves homeowners throughout ${name} and the rest of ${t.county.name} with ${svc.name.toLowerCase()} done right the first time.`,
    `${name} homeowners count on Exterior Home Repair Plus for dependable ${svc.keyword} — honest advice, clear written pricing and crews who treat your home like their own.`,
    `When your ${name} home needs ${svc.keyword}, you want a local contractor who understands ${t.county.name} weather and building requirements. That’s exactly what we bring to every job.`,
    `From ${secs[0] || name} to every corner of town, Exterior Home Repair Plus provides professional ${svc.keyword} for ${name}, NJ homes of every age and style.`,
  ];
  const whyLines = [
    `${svc.name} in ${an(ch.label)} ${ch.label} town like ${name} is different from anywhere else.`,
    `Homes in ${name} face conditions that make quality ${svc.keyword} especially important.`,
    `Every ${name} property is different, but the local conditions are the same.`,
  ];
  const faqs = [
    ...svc.faqs.slice(0, 3),
    [`Do you provide ${svc.keyword} throughout ${name}?`, `Yes. We provide ${svc.name.toLowerCase()} across ${name}${secs.length > 1 ? `, including ${listSentence(secs)}` : ''}, and in nearby ${listSentence(t.nearby.slice(0, 3).map((n) => n.plainName))}.`],
    [`How do I get a ${svc.keyword} estimate in ${name}?`, `Call ${site.phone} or fill out the form on this page. We’ll schedule a free on-site inspection at your ${name} home and give you a written, itemized estimate.`],
  ];
  const others = services.filter((s) => s !== svc);
  const body = `
${hero({ eyebrow: `${esc(svc.short)} · ${esc(name)}, NJ`, h1: `${esc(svc.name)} in ${esc(name)}, NJ`, lead: esc(pick(openers, svc.slug + t.slug)), form: C.estimateForm({ service: svc.name, town: name }), crumbsAbove: true })}
<section class="section"><div class="wrap content-grid">
  <article class="prose">
    <h2>${esc(svc.headline)} in ${esc(name)}</h2>
    <p>${esc(svc.intro)}</p>
    <h2>Why ${esc(name)} Homes Need It Done Right</h2>
    <p>${esc(pick(whyLines, t.slug + svc.slug))} ${esc(t.note)}</p>
    <p>${esc(angle)}</p>
    <div class="callout">${icon('pin')}<div><strong>Local conditions in ${esc(name)}:</strong> ${esc(ch.challenges.slice(0, 3).join(' · '))}</div></div>
    <h2>Signs Your ${esc(name)} Home Needs ${esc(svc.short)} Work</h2>
    ${C.checkList(svc.signs)}
    <h2>Our ${esc(svc.name)} Services Include</h2>
    ${C.checkList(svc.includes)}
    ${secs.length ? `<h2>Areas We Serve in ${esc(name)}</h2><p>We provide ${esc(svc.keyword)} in every part of ${esc(name)}, including:</p><ul class="chips chips-plain">${secs.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>` : ''}
  </article>
  ${sidebar(svc, t)}
</div></section>
${section(`${secHead('How it works', 'Our Process', '')}${C.processSteps()}`, 'section-alt')}
${section(`${secHead('FAQ', `${esc(svc.name)} in ${esc(name)}: FAQ`, '')}${C.faqList(faqs)}`)}
${section(`<div class="link-cols">
  <div><h2 class="h3">${esc(svc.name)} Near ${esc(name)}</h2><ul class="chips">${t.nearby.map((n) => `<li><a href="${comboPath(svc, n)}">${esc(svc.short)} in ${esc(n.plainName)}</a></li>`).join('')}</ul></div>
  <div><h2 class="h3">More Services in ${esc(name)}</h2><ul class="chips">${others.map((s) => `<li><a href="${comboPath(s, t)}">${esc(s.name)}</a></li>`).join('')}</ul></div>
</div>
<p class="center mt"><a href="${townPath(t)}">All exterior services in ${esc(name)}</a> · <a href="/${svc.slug}/">${esc(svc.name)} across the Jersey Shore</a></p>`, 'section-alt')}
${C.townDatalist()}`;
  return {
    path,
    html: layout({
      path, title, description, body, current: 'services',
      breadcrumbs: [['Home', '/'], [svc.name, `/${svc.slug}/`], [`${name}, NJ`, path]],
      schema: [S.business(), S.webPage(path, title, description), S.serviceSchema(svc, path, { name, containedIn: t.county.name }), C.faqSchema(faqs, path)],
    }),
  };
}

// ---------------------------------------------------------------- About
function about() {
  const path = '/about/';
  const title = 'About Us | Exterior Home Repair Plus | Jersey Shore NJ';
  const description = 'Meet Exterior Home Repair Plus — a local Jersey Shore exterior contractor for roofing, siding, gutters, windows, doors & decks. Quality. Reliability. Results.';
  const body = `
${hero({ eyebrow: 'About Us', h1: 'Quality. Reliability. Results.', lead: 'Exterior Home Repair Plus is a Jersey Shore exterior contractor serving homeowners in Ocean, Monmouth and Atlantic County with roofing, siding, gutters, windows, doors, decks and storm damage repair.', form: C.estimateForm(), crumbsAbove: true })}
<section class="section"><div class="wrap content-grid">
  <article class="prose">
    <h2>Local Exterior Experts Who Show Up</h2>
    <p>We started Exterior Home Repair Plus with a simple idea: homeowners deserve a contractor who answers the phone, shows up when promised, explains the work in plain English and stands behind the finished job. Too many people at the shore have been burned by storm chasers and no-shows. We’re here to be the opposite of that.</p>
    <p>Our name says it all. We focus on the <strong>exterior</strong> of your home — the systems that keep weather out — and the <strong>plus</strong> is everything that comes with it: honest advice, clean job sites, clear pricing and follow-through.</p>
    <h2>What We Stand For</h2>
    <h3>Quality</h3>
    <p>We follow manufacturer specifications, use materials suited to coastal conditions and never cut corners on the parts you can’t see — underlayment, flashing, fasteners and house wrap.</p>
    <h3>Reliability</h3>
    <p>We return calls, keep appointments and communicate throughout the job. When weather changes the schedule, you’ll hear it from us first.</p>
    <h3>Results</h3>
    <p>A home that looks great, stays dry and holds its value. We walk every finished job with the homeowner to make sure you’re completely satisfied.</p>
    <h2>Where We Work</h2>
    <p>We serve all 109 municipalities in <a href="/service-areas/ocean-county/">Ocean County</a>, <a href="/service-areas/monmouth-county/">Monmouth County</a> and <a href="/service-areas/atlantic-county/">Atlantic County</a>, New Jersey — from the Bayshore to Long Beach Island to Atlantic City and out to the Pinelands.</p>
  </article>
  ${sidebar()}
</div></section>
${section(`${secHead('The difference', 'Why Homeowners Choose Us', '')}${C.whyUs()}`, 'section-alt')}
${C.townDatalist()}`;
  return { path, html: layout({ path, title, description, body, current: 'about', breadcrumbs: [['Home', '/'], ['About', path]], schema: [S.business(true), S.webPage(path, title, description, 'AboutPage')] }) };
}

// ---------------------------------------------------------------- Contact
function contact() {
  const path = '/contact/';
  const title = 'Free Estimates & Contact | Exterior Home Repair Plus';
  const description = `Request a free roofing, siding, gutter, window, door or deck estimate anywhere in Ocean, Monmouth or Atlantic County, NJ. Call ${site.phone} or email us.`;
  const hours = site.hours.map((h) => `<li><span>${esc(h.days)}</span><span>${esc(h.close ? `${h.open} – ${h.close}` : h.open)}</span></li>`).join('');
  const body = `
<section class="section contact-hero">
  <div class="wrap contact-grid">
    <div>
      <p class="eyebrow">Contact Us</p>
      <h1>Get Your Free Estimate</h1>
      <p class="lead">Tell us about your project and we’ll get back to you quickly — usually the same business day. For active leaks or storm damage, please call.</p>
      <ul class="contact-list">
        <li><span class="ci">${icon('phone')}</span><div><strong>Call or text</strong><a href="${tel}">${site.phone}</a></div></li>
        <li><span class="ci">${icon('mail')}</span><div><strong>Email</strong><a href="mailto:${site.email}">${esc(site.email)}</a></div></li>
        <li><span class="ci">${icon('pin')}</span><div><strong>Service area</strong><span>Ocean, Monmouth &amp; Atlantic County, NJ</span></div></li>
      </ul>
      <div class="side-card"><h2 class="h3">${icon('clock')} Hours</h2><ul class="footer-hours dark">${hours}</ul></div>
    </div>
    <div>${C.estimateForm({ heading: 'Request a Free Estimate' })}</div>
  </div>
</section>
${C.townDatalist()}`;
  return { path, html: layout({ path, title, description, body, current: 'contact', breadcrumbs: [['Home', '/'], ['Contact', path]], schema: [S.business(true), S.webPage(path, title, description, 'ContactPage')] }) };
}

// ---------------------------------------------------------------- FAQ
function faqPage() {
  const path = '/faq/';
  const title = 'Roofing, Siding & Exterior Repair FAQ | EHR Plus';
  const description = 'Answers to common questions about roofing, siding, gutters, windows, doors, decks, permits, storm damage and insurance for Jersey Shore homeowners.';
  const general = [
    ['What areas do you serve?', 'All of Ocean County, Monmouth County and Atlantic County, New Jersey.'],
    ['Are estimates really free?', 'Yes. Inspections and written estimates are always free and there’s no obligation.'],
    ['Do you handle permits?', 'Yes. We obtain the required township construction permits and schedule inspections.'],
    ['What happens if it rains during my project?', 'We watch the forecast closely and never leave your home open to the weather. If rain moves in, we secure and protect the work area and pick back up when conditions allow.'],
  ];
  const all = [...general, ...services.flatMap((s) => s.faqs.slice(0, 2))];
  const body = `
${hero({ eyebrow: 'FAQ', h1: 'Frequently Asked Questions', lead: 'Straight answers about exterior home repair at the Jersey Shore. Don’t see your question? Call us at ' + site.phone + '.', form: C.estimateForm(), crumbsAbove: true })}
${section(`${secHead('', 'General Questions', '')}${C.faqList(general)}`)}
${services.map((s, i) => section(`${secHead('', `${esc(s.name)}`, `<a href="/${s.slug}/">Learn more about ${esc(s.name.toLowerCase())} →</a>`)}${C.faqList(s.faqs.slice(0, 2))}`, i % 2 ? '' : 'section-alt')).join('')}
${C.townDatalist()}`;
  return { path, html: layout({ path, title, description, body, current: 'faq', breadcrumbs: [['Home', '/'], ['FAQ', path]], schema: [S.business(), S.webPage(path, title, description), C.faqSchema(all, path)] }) };
}

// ---------------------------------------------------------------- Resources
function articleCard(a) {
  return `<a class="post-card" href="/resources/${a.slug}/"><time datetime="${a.date}">${new Date(a.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time><h3>${esc(a.title)}</h3><p>${esc(a.description)}</p><span class="svc-more">Read article ${icon('arrow')}</span></a>`;
}

function resourcesIndex() {
  const path = '/resources/';
  const title = 'Homeowner Resources & Exterior Repair Tips | EHR Plus';
  const description = 'Practical roofing, siding, gutter and storm-preparation advice for homeowners in Ocean, Monmouth and Atlantic County, NJ.';
  const body = `
<section class="section page-head"><div class="wrap"><p class="eyebrow">Resources</p><h1>Homeowner Resources</h1><p class="lead">Practical advice from our crew on protecting your Jersey Shore home.</p></div></section>
${section(`<div class="post-grid">${articles.map(articleCard).join('')}</div>`)}`;
  return { path, html: layout({ path, title, description, body, current: 'resources', breadcrumbs: [['Home', '/'], ['Resources', path]], schema: [S.business(), S.webPage(path, title, description, 'CollectionPage')] }) };
}

function articlePage(a) {
  const path = `/resources/${a.slug}/`;
  const title = brandTitle(a.title);
  const rel = a.services.map((sl) => services.find((s) => s.slug === sl));
  const body = `
<section class="section page-head"><div class="wrap narrow"><p class="eyebrow">Homeowner Resources</p><h1>${esc(a.title)}</h1><p class="meta">By ${esc(site.name)} · <time datetime="${a.date}">${new Date(a.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time></p></div></section>
<section class="section"><div class="wrap content-grid">
  <article class="prose">${a.body}
    <div class="callout">${icon('phone')}<div><strong>Have a question about your home?</strong> Call <a href="${tel}">${site.phone}</a> — we’re happy to help, even if you’re not ready for an estimate.</div></div>
  </article>
  <aside class="sidebar">
    <div class="side-card side-cta"><h3>Free estimates</h3><p>Serving Ocean, Monmouth &amp; Atlantic County.</p><a class="btn btn-gold btn-block" href="${tel}">${icon('phone')} ${site.phone}</a><a class="btn btn-outline btn-block" href="/contact/#estimate">Request online</a></div>
    <div class="side-card"><h3>Related services</h3><ul class="side-links">${rel.map((s) => `<li><a href="/${s.slug}/">${icon(s.icon)} ${esc(s.name)}</a></li>`).join('')}</ul></div>
    <div class="side-card"><h3>More articles</h3><ul class="side-links">${articles.filter((x) => x !== a).map((x) => `<li><a href="/resources/${x.slug}/">${esc(x.title)}</a></li>`).join('')}</ul></div>
  </aside>
</div></section>`;
  return {
    path,
    html: layout({
      path, title, description: a.description, body, current: 'resources', ogType: 'article',
      breadcrumbs: [['Home', '/'], ['Resources', '/resources/'], [a.title, path]],
      schema: [S.business(), S.webPage(path, a.title, a.description), { '@type': 'Article', '@id': require('./lib/layout').abs(path) + '#article', headline: a.title, description: a.description, datePublished: a.date, dateModified: a.date, author: { '@id': S.BIZ_ID }, publisher: { '@id': S.BIZ_ID }, image: require('./lib/layout').abs('/assets/img/og-image.jpg'), mainEntityOfPage: require('./lib/layout').abs(path) }],
    }),
  };
}

// ---------------------------------------------------------------- Utility pages
function simplePage(path, title, description, h1, inner, opts = {}) {
  const body = `<section class="section page-head"><div class="wrap narrow"><h1>${h1}</h1></div></section><section class="section"><div class="wrap narrow prose">${inner}</div></section>`;
  return { path, html: layout({ path, title, description, body, noindex: opts.noindex, breadcrumbs: opts.noCrumbs ? null : [['Home', '/'], [h1, path]] }) };
}

function utilityPages() {
  return [
    simplePage('/thank-you/', 'Thank You | Exterior Home Repair Plus', 'Thanks for contacting Exterior Home Repair Plus.', 'Thank You!', `<p class="lead">We received your request and will be in touch shortly — usually the same business day.</p><p>Need us sooner? Call <a href="${tel}">${site.phone}</a>.</p><p><a class="btn btn-gold" href="/">Back to home</a></p>`, { noindex: true, noCrumbs: true }),
    simplePage('/privacy-policy/', 'Privacy Policy | Exterior Home Repair Plus', 'How Exterior Home Repair Plus collects and uses information submitted through this website.', 'Privacy Policy', `
<p>This website is operated by ${esc(site.name)}. We respect your privacy.</p>
<h2>Information we collect</h2><p>When you submit an estimate request we collect the information you provide — such as your name, phone number, email address, town and project details — so we can respond to your request.</p>
<h2>How we use it</h2><p>We use your information only to contact you about your project and provide our services. We do not sell or rent your personal information.</p>
<h2>Cookies &amp; analytics</h2><p>We may use basic analytics to understand how visitors use the site. These tools may set cookies in your browser.</p>
<h2>Contact</h2><p>Questions? Email <a href="mailto:${site.email}">${esc(site.email)}</a> or call <a href="${tel}">${site.phone}</a>.</p>`),
  ];
}

function notFound() {
  const inner = `<p class="lead">Sorry, we couldn’t find that page. It may have moved.</p><p><a class="btn btn-gold" href="/">Go to the home page</a> <a class="btn btn-outline" href="/services/">Browse services</a> <a class="btn btn-outline" href="/service-areas/">Find your town</a></p><p>Or call us at <a href="${tel}">${site.phone}</a>.</p>`;
  const p = simplePage('/404.html', 'Page Not Found | Exterior Home Repair Plus', 'Page not found.', 'Page Not Found', inner, { noindex: true, noCrumbs: true });
  return p;
}

function allPages() {
  const pages = [home(), servicesIndex(), areasIndex(), about(), contact(), faqPage(), resourcesIndex()];
  services.forEach((s) => pages.push(serviceHub(s)));
  counties.forEach((c) => pages.push(countyPage(c)));
  towns.forEach((t) => pages.push(townPage(t)));
  services.forEach((s) => towns.forEach((t) => pages.push(comboPage(s, t))));
  articles.forEach((a) => pages.push(articlePage(a)));
  pages.push(...utilityPages());
  pages.push(notFound());
  return pages;
}

module.exports = { allPages };
