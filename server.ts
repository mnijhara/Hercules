import express from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const moduleDir = process.cwd();
const AI_ROUTER_BASE_URL = (process.env.AI_ROUTER_BASE_URL || 'https://getjobready-ai-proxy.mnijhara.workers.dev').replace(/\/$/, '');
const AI_ROUTER_MODEL = process.env.AI_ROUTER_MODEL || 'gemini-2.5-flash';
const AI_ROUTER_TIMEOUT_MS = Number(process.env.AI_ROUTER_TIMEOUT_MS || 30000);
const LEAD_WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL;
const TRUST_PROXY = process.env.TRUST_PROXY === 'true';
const LEAD_STORE_DIR = path.join(moduleDir, 'data');
const LEAD_STORE_PATH = path.join(LEAD_STORE_DIR, 'leads.jsonl');

const RATE_WINDOW_MS = 60_000;
const AI_REQUESTS_PER_WINDOW = 30;
const LEAD_REQUESTS_PER_WINDOW = 10;
const MAX_RATE_BUCKETS = 5_000;
const rateBuckets = new Map<string, { startedAt: number; count: number }>();

function clientKey(req: express.Request, bucket: string) { return `${bucket}:${req.ip || 'unknown'}`; }
function pruneRateBuckets(now: number) { if (rateBuckets.size <= MAX_RATE_BUCKETS) return; for (const [key, bucket] of rateBuckets) if (now - bucket.startedAt >= RATE_WINDOW_MS) rateBuckets.delete(key); }
function rateLimited(req: express.Request, bucket: string, limit: number) {
  const key = clientKey(req, bucket); const now = Date.now(); const current = rateBuckets.get(key);
  if (!current || now - current.startedAt >= RATE_WINDOW_MS) { pruneRateBuckets(now); rateBuckets.set(key, { startedAt: now, count: 1 }); return false; }
  current.count += 1; return current.count > limit;
}
function cleanText(value: unknown, maxLength: number) { return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''; }

async function storeLeadLocal(lead: Record<string, string>) {
  await fs.mkdir(LEAD_STORE_DIR, { recursive: true, mode: 0o700 });
  const payload = JSON.stringify({
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    ...lead,
  }) + '\n';
  await fs.appendFile(LEAD_STORE_PATH, payload, { encoding: 'utf8', mode: 0o600 });
}

async function callAiRouter(system: string, user: string) {
  const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), AI_ROUTER_TIMEOUT_MS);
  try {
    const response = await fetch(`${AI_ROUTER_BASE_URL}/v1/chat/completions`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(process.env.AI_ROUTER_API_KEY ? { Authorization: `Bearer ${process.env.AI_ROUTER_API_KEY}` } : {}) }, body: JSON.stringify({ model: AI_ROUTER_MODEL, messages: [{ role: 'system', content: system }, { role: 'user', content: user }], temperature: 0.2 }), signal: controller.signal });
    if (!response.ok) throw new Error(`AI router returned ${response.status}`);
    const data = await response.json() as any; const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('AI router returned no content'); return String(content);
  } finally { clearTimeout(timeout); }
}

async function startServer() {
  const app = express(); const PORT = Number(process.env.PORT || 3000);
  await fs.mkdir(LEAD_STORE_DIR, { recursive: true, mode: 0o700 }).catch(() => undefined);
  app.set('trust proxy', TRUST_PROXY); app.disable('x-powered-by');
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    if (process.env.NODE_ENV === 'production') {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
      res.setHeader('Content-Security-Policy', "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'; img-src 'self' data: https://images.unsplash.com; media-src 'self' blob: https://github.com https://objects.githubusercontent.com https://release-assets.githubusercontent.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; connect-src 'self'");
    }
    next();
  });
  app.use(express.json({ limit: '32kb' }));
  app.use('/api', (_req, res, next) => { res.setHeader('Cache-Control', 'no-store'); next(); });

  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY; if (!apiKey) return null;
    try { return new GoogleGenAI({ apiKey }); } catch (err) { console.error('Failed to initialize GoogleGenAI client:', err); return null; }
  };

  app.post('/api/concierge', async (req, res) => {
    if (rateLimited(req, 'ai', AI_REQUESTS_PER_WINDOW)) return res.status(429).json({ error: 'Too many AI requests. Please try again shortly.' });
    try {
      const message = cleanText(req.body?.message, 4000); const context = req.body?.context && typeof req.body.context === 'object' ? req.body.context : {};
      if (!message) return res.status(400).json({ error: 'Message string is required' });
      const systemPrompt = `You are Hercules, the AI workforce supporting a Fractional CHRO for founders and CEOs. The Fractional CHRO owns judgement, strategy and sensitive decisions; you prepare, execute, follow up and surface what needs human attention. Be practical, concise and founder-friendly. Do not present Hercules as a compliance-only product. When legal or employment-law issues arise, flag that jurisdiction-specific professional advice may be required. End with 3 useful next actions.`;
      const prompt = `Founder context: ${JSON.stringify(context).slice(0, 8000)}\\nFounder question: ${message}`;
      try { const reply = await callAiRouter(systemPrompt, prompt); return res.json({ reply, suggestions: ['Prepare this for my Fractional CHRO', 'Turn this into an HR workflow', 'Draft the message or document'] }); }
      catch (routerError) {
        console.warn('AI router unavailable, trying direct Gemini fallback:', routerError); const ai = getAiClient();
        if (ai) { const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: `${systemPrompt}\\n\\n${prompt}` }); return res.json({ reply: response.text || 'Hercules is ready to assist with your HR request.', suggestions: ['Prepare this for my Fractional CHRO', 'Turn this into an HR workflow', 'Draft the message or document'] }); }
        throw routerError;
      }
    } catch (error: any) { console.error('Hercules AI Error:', error); return res.status(503).json({ error: 'AI service temporarily unavailable', reply: 'Hercules is temporarily unable to reach the AI workforce. Please try again shortly.', suggestions: ['Try again', 'Prepare this for my Fractional CHRO'] }); }
  });

  app.post('/api/leads', async (req, res) => {
    if (rateLimited(req, 'lead', LEAD_REQUESTS_PER_WINDOW)) return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
    const lead = {
      name: cleanText(req.body?.name, 120),
      email: cleanText(req.body?.email, 254),
      phone: cleanText(req.body?.phone, 40),
      company: cleanText(req.body?.company, 160),
      topic: cleanText(req.body?.topic, 200),
      teamSize: cleanText(req.body?.teamSize, 80),
      notes: cleanText(req.body?.notes, 2000),
      source: cleanText(req.body?.source, 80) || 'hercules-website',
    };
    if (!lead.name || !lead.email) return res.status(400).json({ error: 'Name and email are required' });
    if (!/^\S+@\S+\.\S+$/.test(lead.email)) return res.status(400).json({ error: 'Enter a valid email address' });

    if (LEAD_WEBHOOK_URL) {
      try {
        const response = await fetch(LEAD_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead), signal: AbortSignal.timeout(10000) });
        if (!response.ok) throw new Error(`Lead webhook returned ${response.status}`);
        return res.status(202).json({ ok: true, delivery: 'webhook' });
      } catch (error) {
        console.error('Lead webhook delivery failed; using local inbox fallback:', error);
      }
    }

    try {
      await storeLeadLocal(lead);
      return res.status(202).json({ ok: true, delivery: 'local_inbox' });
    } catch (error) {
      console.error('Local lead storage failed:', error);
      return res.status(503).json({ error: 'Lead capture is temporarily unavailable. Please try again shortly.' });
    }
  });

  app.get('/api/health', async (_req, res) => {
    let aiRouter = 'unreachable';
    try { const response = await fetch(`${AI_ROUTER_BASE_URL}/health`, { headers: { ...(process.env.AI_ROUTER_API_KEY ? { Authorization: `Bearer ${process.env.AI_ROUTER_API_KEY}` } : {}) }, signal: AbortSignal.timeout(5000) }); aiRouter = response.ok ? 'ok' : `http_${response.status}`; } catch {}
    const leadCapture = LEAD_WEBHOOK_URL ? 'webhook_configured_with_local_fallback' : 'local_inbox';
    const status = aiRouter === 'ok' ? 'ok' : 'degraded';
    res.status(status === 'ok' ? 200 : 503).json({ status, name: 'Hercules Backend API', aiRouter, leadCapture });
  });

  if (process.env.NODE_ENV !== 'production') { const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' }); app.use(vite.middlewares); }
  else { app.use(express.static(path.join(moduleDir, 'dist'), { maxAge: '1h', index: 'index.html' })); app.get('*', (_req, res) => res.sendFile(path.join(moduleDir, 'dist', 'index.html'))); }
  app.listen(PORT, () => console.log(`Hercules server running on port ${PORT}`));
}

startServer().catch((error) => { console.error('Failed to start Hercules:', error); process.exit(1); });
