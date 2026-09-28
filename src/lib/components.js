const site = require('../data/site');
const services = require('../data/services');
const { towns, counties } = require('../data/areas');
const { icon } = require('./icons');
const { esc, tel } = require('./layout');

function estimateForm({ service = '', town = '', heading = 'Get Your Free Estimate', sub = 'Tell us about your project — we’ll call you back fast.', id = 'estimate' } = {}) {
  const svcOptions = services.map((s) => `<option value="${esc(s.name)}"${s.name === service ? ' selected' : ''}>${esc(s.name)}</option>`).join('');
  return `<form class="estimate-form" id="${id}" action="/api/estimate" method="post" novalidate>
  <div class="form-head">
    <h2 class="form-title">${esc(heading)}</h2>
    <p>${esc(sub)}</p>
  </div>
  <div class="form-grid">
    <label><span>Full name *</span><input name="name" type="text" autocomplete="name" required maxlength="80"></label>
    <label><span>Phone *</span><input name="phone" type="tel" autocomplete="tel" required maxlength="30" inputmode="tel"></label>
    <label><span>Email</span><input name="email" type="email" autocomplete="email" maxlength="120"></label>
    <label><span>Town *</span><input name="town" type="text" list="town-list" required maxlength="80" value="${esc(town)}" autocomplete="address-level2"></label>
    <label class="span-2"><span>Service needed</span><select name="service"><option value="">Select a service…</option>${svcOptions}<option value="Other / Multiple">Other / Multiple services</option></select></label>
    <label class="span-2"><span>Project details</span><textarea name="message" rows="3" maxlength="2000" placeholder="E.g. leak over the kitchen after the last storm, siding is 25 years old…"></textarea></label>
    <label class="hp" aria-hidden="true"><span>Company</span><input name="company" type="text" tabindex="-1" autocomplete="off"></label>
    <input type="hidden" name="page" value="">
  </div>
  <button class="btn btn-gold btn-block btn-lg" type="submit">Request My Free Estimate ${icon('arrow')}</button>
  <p class="form-note">Prefer to talk? Call <a href="${tel}">${site.phone}</a>. We never share your information.</p>
  <div class="form-status" role="status" aria-live="polite"></div>
</form>`;
}

// One shared datalist per page (appended once at the end of body content).
const townDatalist = () => `<datalist id="town-list">${towns.map((t) => `<option value="${esc(t.plainName)}">`).join('')}</datalist>`;

const serviceCards = (townCtx) => `<div class="card-grid">${services
  .map((s) => {
    const href = townCtx ? `/${s.slug}/${townCtx.slug}-nj/` : `/${s.slug}/`;
    const title = townCtx ? `${s.name} in ${townCtx.plainName}` : s.name;
    return `<a class="svc-card" href="${href}">
    <span class="svc-ico">${icon(s.icon)}</span>
    <h3>${esc(title)}</h3>
    <p>${esc(s.blurb)}</p>
    <span class="svc-more">Learn more ${icon('arrow')}</span>
  </a>`;
  })
  .join('')}</div>`;

const trustStrip = () => `<ul class="trust">
  <li>${icon('clipboard')}<span><strong>Free</strong> written estimates</span></li>
  <li>${icon('shield')}<span><strong>Fully insured</strong> crews</span></li>
  <li>${icon('storm')}<span><strong>Storm &amp; emergency</strong> response</span></li>
  <li>${icon('pin')}<span><strong>3 counties</strong> · 109 towns</span></li>
</ul>`;

const whyUs = () => `<div class="why-grid">
  <div class="why"><span class="why-ico">${icon('users')}</span><h3>Local &amp; accountable</h3><p>We live and work at the Jersey Shore. You get a direct line to the people doing the work — not a call center.</p></div>
  <div class="why"><span class="why-ico">${icon('doc')}</span><h3>Clear, written estimates</h3><p>Every estimate spells out materials, scope and price line by line so you can compare apples to apples.</p></div>
  <div class="why"><span class="why-ico">${icon('wind')}</span><h3>Built for shore weather</h3><p>High-wind installation, corrosion-resistant fasteners and proper flashing — because coastal homes need more than the minimum.</p></div>
  <div class="why"><span class="why-ico">${icon('broom')}</span><h3>Clean, respectful job sites</h3><p>We protect your landscaping, keep the site tidy every day and haul away all debris when we’re done.</p></div>
  <div class="why"><span class="why-ico">${icon('clipboard')}</span><h3>Permits handled</h3><p>We pull the required township permits and schedule inspections so the job is done by the book.</p></div>
  <div class="why"><span class="why-ico">${icon('star')}</span><h3>Quality. Reliability. Results.</h3><p>It’s not just our tagline. We show up when we say we will and stand behind every job we do.</p></div>
</div>`;

const processSteps = () => `<ol class="steps">
  <li><span class="step-n">1</span><h3>Call or request online</h3><p>Reach us at ${site.phone} or send the form. We’ll schedule a convenient time to see your home.</p></li>
  <li><span class="step-n">2</span><h3>Free on-site inspection</h3><p>We inspect, take photos and explain exactly what we find — the good and the bad.</p></li>
  <li><span class="step-n">3</span><h3>Written estimate</h3><p>You get a clear, itemized proposal with material options. No pressure, no gimmicks.</p></li>
  <li><span class="step-n">4</span><h3>Expert installation</h3><p>Our crew completes the work efficiently, cleans up daily and walks the finished job with you.</p></li>
</ol>`;

const faqList = (faqs) => `<div class="faq">${faqs
  .map(([q, a]) => `<details><summary>${esc(q)}${icon('chevron')}</summary><div class="faq-a"><p>${esc(a)}</p></div></details>`)
  .join('')}</div>`;

const faqSchema = (faqs, pagePath) => ({
  '@type': 'FAQPage',
  '@id': require('./layout').abs(pagePath) + '#faq',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

const countyTownLinks = (hrefFor, labelFor) => `<div class="county-cols">${counties
  .map((c) => `<div class="county-col">
  <h3><a href="/service-areas/${c.slug}/">${esc(c.name)}</a></h3>
  <ul class="town-list">${c.towns.map((t) => `<li><a href="${hrefFor(t)}">${esc(labelFor ? labelFor(t) : t.name)}</a></li>`).join('')}</ul>
</div>`)
  .join('')}</div>`;

const checkList = (items) => `<ul class="checks">${items.map((i) => `<li>${icon('check')}<span>${esc(i)}</span></li>`).join('')}</ul>`;

const heroArt = () => `<svg class="hero-art" viewBox="0 0 600 400" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="roofG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#3a4552"/><stop offset="1" stop-color="#232b34"/></linearGradient>
    <linearGradient id="wallG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#5d6773"/><stop offset="1" stop-color="#454e59"/></linearGradient>
  </defs>
  <path d="M0 360h600v40H0z" fill="#0b0e11" opacity=".6"/>
  <g stroke="#0b0e11" stroke-width="3">
    <path d="M110 200 300 70l190 130z" fill="url(#roofG)"/>
    <path d="M140 200h320v160H140z" fill="url(#wallG)"/>
    <g stroke="#0b0e11" stroke-width="1.5" opacity=".35">${Array.from({ length: 11 }, (_, i) => `<path d="M140 ${215 + i * 13}h320"/>`).join('')}</g>
    <path d="M255 250h90v110h-90z" fill="#1c232b"/>
    <path d="M170 225h60v55h-60zM370 225h60v55h-60z" fill="#f4b41a"/>
    <path d="M200 225v55M170 252h60M400 225v55M370 252h60" stroke-width="2"/>
    <path d="M365 95h26v50h-26z" fill="#6b5b4b"/>
    <path d="M280 125h40v40h-40z" fill="#f4b41a"/>
    <path d="M300 125v40M280 145h40" stroke-width="2"/>
  </g>
  <path d="M96 204 300 62l204 142" fill="none" stroke="#f4b41a" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M130 200h340" stroke="#1f5fbf" stroke-width="6"/>
  <path d="M470 200v140" stroke="#c9ced6" stroke-width="5"/>
  <g stroke="#c9ced6" stroke-width="4" stroke-linecap="round"><path d="M505 110l30 150"/><path d="M535 110l30 150"/><path d="M510 135h28M515 160h28M520 185h28M525 210h28M530 235h28"/></g>
</svg>`;

module.exports = { estimateForm, townDatalist, serviceCards, trustStrip, whyUs, processSteps, faqList, faqSchema, countyTownLinks, checkList, heroArt };
