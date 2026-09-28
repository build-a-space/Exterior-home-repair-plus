// Vercel serverless function for the estimate form (POST /api/estimate).
const { handleLead } = require('../src/lib/leads');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const wantsJson = (req.headers.accept || '').includes('application/json');
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress;
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = Object.fromEntries(new URLSearchParams(body)); }
  }
  const result = await handleLead(body, ip);
  if (result.status === 200) {
    if (wantsJson) return res.status(200).json({ ok: true });
    res.statusCode = 303;
    res.setHeader('Location', '/thank-you/');
    return res.end();
  }
  return wantsJson ? res.status(result.status).json({ error: result.error }) : res.status(result.status).send(result.error);
};
