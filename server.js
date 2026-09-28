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
let ready = Promise.resolve();
if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.log('dist/ not found — building site first…');
  ready = require('./build');
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

const { handleLead } = require('./src/lib/leads');

app.post('/api/estimate', async (req, res) => {
  const wantsJson = (req.get('accept') || '').includes('application/json');
  const result = await handleLead(req.body, req.ip);
  if (result.status === 200) return wantsJson ? res.json({ ok: true }) : res.redirect(303, '/thank-you/');
  return wantsJson ? res.status(result.status).json({ error: result.error }) : res.status(result.status).send(result.error);
});

app.get('/healthz', (req, res) => res.type('text').send('ok'));

app.use((req, res) => res.status(404).sendFile(path.join(DIST, '404.html')));

const port = Number(process.env.PORT || 3000);
ready.then(() => app.listen(port, () => console.log(`${site.name} running at http://localhost:${port}`)));
