// Shared estimate-request handling for the Express server (server.js) and the
// Vercel serverless function (api/estimate.js).
const fs = require('fs');
const path = require('path');
const site = require('../data/site');

const hits = new Map(); // simple per-IP rate limit: 5 per 10 minutes (per server instance)
function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

let transporter;
function getTransporter() {
  if (transporter === undefined) {
    transporter = null;
    if (process.env.SMTP_HOST) {
      const nodemailer = require('nodemailer');
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
      });
    }
  }
  return transporter;
}

const clean = (v, max) => String(v || '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);

/**
 * Validates and delivers a lead. Returns { status, error? } — status 200 on success
 * (including silently-dropped honeypot spam).
 */
async function handleLead(body, ip) {
  const b = body || {};
  if (b.company) return { status: 200 }; // honeypot
  if (rateLimited(ip || 'unknown')) return { status: 429, error: `Too many requests. Please call ${site.phone}.` };

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
    return { status: 400, error: 'Please include your name, a valid phone number and your town.' };
  }

  // Local log file (skipped on Vercel, whose filesystem is read-only).
  if (!process.env.VERCEL) fs.appendFile(path.join(__dirname, '..', '..', 'leads.log'), JSON.stringify(lead) + '\n', () => {});

  const mailer = getTransporter();
  if (mailer) {
    try {
      await mailer.sendMail({
        from: process.env.LEAD_FROM || site.email,
        to: process.env.LEAD_TO || site.email,
        replyTo: lead.email || undefined,
        subject: `New estimate request: ${lead.service || 'Exterior work'} — ${lead.town}`,
        text: `Name: ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email}\nTown: ${lead.town}\nService: ${lead.service}\nPage: ${lead.page}\n\n${lead.message}`,
      });
    } catch (err) {
      console.error('Lead email failed:', err.message);
      return { status: 502, error: `We couldn’t send your request. Please call ${site.phone}.` };
    }
  } else {
    console.log('New lead:', JSON.stringify(lead));
  }
  return { status: 200 };
}

module.exports = { handleLead };
