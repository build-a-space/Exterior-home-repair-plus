// Production server: serves the pre-rendered site from /dist with clean URLs,
// long-lived asset caching, gzip, and the estimate-request endpoint.
const fs = require('fs');
const path = require('path');
const express = require('express');
const compression = require('compression');

// Minimal .env loader (no extra dependency).
const envFile = path.join(__dirname, '.env');
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const DIST = path.join(__dirname, 'dist');
if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.log('dist/ not found — building site first…');
  require('./build');
}

const site = require('./src/data/site');
const app = express();
app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(compression());

// Security headers
app.use((req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
    'Permissions-Policy': 'geolocation=(), camera=(), microphone=()',
  });
  next();
});

// Canonical host: redirect to SITE_URL's host (e.g. apex → www) and force HTTPS in production.
const canonical = new URL(site.url);
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'production') return next();
  const host = req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || req.protocol;
  if (host && (host !== canonical.host || proto !== canonical.protocol.replace(':', ''))) {
    return res.redirect(301, site.url + req.originalUrl);
  }
  next();
});

// Trailing-slash normalization for page URLs (/roofing → /roofing/).
app.use((req, res, next) => {
  if ((req.method === 'GET' || req.method === 'HEAD') && !req.path.endsWith('/') && !path.extname(req.path) && !req.path.startsWith('/api/')) {
    const q = req.url.slice(req.path.length);
    return res.redirect(301, req.path + '/' + q);
  }
  next();
});

app.use(
  express.static(DIST, {
    extensions: ['html'],
    redirect: false,
    setHeaders(res, file) {
      if (file.includes(`${path.sep}assets${path.sep}`)) res.set('Cache-Control', 'public, max-age=31536000, immutable');
      else if (file.endsWith('.html')) res.set('Cache-Control', 'public, max-age=300, must-revalidate');
      else res.set('Cache-Control', 'public, max-age=86400');
    },
  })
);

// ---- Estimate requests
app.use('/api', express.json({ limit: '20kb' }), express.urlencoded({ extended: false, limit: '20kb' }));

const hits = new Map(); // simple per-IP rate limit: 5 per 10 minutes
function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

let transporter = null;
if (process.env.SMTP_HOST) {
  const nodemailer = require('nodemailer');
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });
}

const clean = (v, max) => String(v || '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);

app.post('/api/estimate', async (req, res) => {
  const wantsJson = (req.get('accept') || '').includes('application/json');
  const fail = (code, error) => (wantsJson ? res.status(code).json({ error }) : res.status(code).send(error));
  const b = req.body || {};
  if (b.company) return wantsJson ? res.json({ ok: true }) : res.redirect(303, '/thank-you/'); // honeypot
  if (rateLimited(req.ip)) return fail(429, `Too many requests. Please call ${site.phone}.`);

  const lead = {
    name: clean(b.name, 80),
    phone: clean(b.phone, 30),
    email: clean(b.email, 120),
    town: clean(b.town, 80),
    service: clean(b.service, 80),
    message: String(b.message || '').trim().slice(0, 2000),
    page: clean(b.page, 200),
    at: new Date().toISOString(),
  };
  if (!lead.name || lead.phone.replace(/\D/g, '').length < 10 || !lead.town) {
    return fail(400, 'Please include your name, a valid phone number and your town.');
  }

  fs.appendFile(path.join(__dirname, 'leads.log'), JSON.stringify(lead) + '\n', () => {});

  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.LEAD_FROM || site.email,
        to: process.env.LEAD_TO || site.email,
        replyTo: lead.email || undefined,
        subject: `New estimate request: ${lead.service || 'Exterior work'} — ${lead.town}`,
        text: `Name: ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email}\nTown: ${lead.town}\nService: ${lead.service}\nPage: ${lead.page}\n\n${lead.message}`,
      });
    } catch (err) {
      console.error('Lead email failed:', err.message);
    }
  } else {
    console.log('New lead:', lead);
  }

  return wantsJson ? res.json({ ok: true }) : res.redirect(303, '/thank-you/');
});

app.get('/healthz', (req, res) => res.type('text').send('ok'));

app.use((req, res) => res.status(404).sendFile(path.join(DIST, '404.html')));

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`${site.name} running at http://localhost:${port}`));
