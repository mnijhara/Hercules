import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// The production bundle is ESM (.js), while `dev` runs this source file through
// tsx. Use the project working directory for the bundled server so the sibling
// Vite `dist` directory resolves consistently in Hostinger's Node app.
const moduleDir = process.cwd();

const AI_ROUTER_BASE_URL = (process.env.AI_ROUTER_BASE_URL || 'https://getjobready-ai-proxy.mnijhara.workers.dev').replace(/\/$/, '');
const AI_ROUTER_MODEL = process.env.AI_ROUTER_MODEL || 'gemini-2.5-flash';
const AI_ROUTER_TIMEOUT_MS = Number(process.env.AI_ROUTER_TIMEOUT_MS || 30000);
const LEAD_WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL;
const TRUST_PROXY = process.env.TRUST_PROXY === 'true';

const RATE_WINDOW_MS = 60_000;
const AI_REQUESTS_PER_WINDOW = 30;
const LEAD_REQUESTS_PER_WINDOW = 10;
const MAX_RATE_BUCKETS = 5_000;
const rateBuckets = new Map<string, { startedAt: number; count: number }>();

function clientKey(req: express.Request, bucket: string) {
  return `${bucket}:${req.ip || 'unknown'}`;
}

function pruneRateBuckets(now: number) {
  if (rateBuckets.size <= MAX_RATE_BUCKETS) return;
  for (const [key, bucket] of rateBuckets) {
    if (now - bucket.startedAt >= RATE_WINDOW_MS) rateBuckets.delete(key);
  }
}

function rateLimited(req: express.Request, bucket: string, limit: number) {
  const key = clientKey(req, bucket);
  const now = Date.now();
  const current = rateBuckets.get(key);
  if (!current || now - current.startedAt >= RATE_WINDOW_MS) {
    pruneRateBuckets(now);
    rateBuckets.set(key, { startedAt: now, count: 1 });
    return false;
  }
  current.count += 1;
  return current.count > limit;
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

async function callAiRouter(system: string, user: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AI_ROUTER_TIMEOUT_MS);
  try {
    const response = await fetch(`${AI_ROUTER_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.AI_ROUTER_API_KEY ? { Authorization: `Bearer ${process.env.AI_ROUTER_API_KEY}` } : {}),
      },
      body: JSON.stringify({
        model: AI_ROUTER_MODEL,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
        temperature: 0.2,
      }),
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`AI router returned ${response.status}`);
    const data = await response.json() as any;
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('AI router returned no content');
    return String(content);
  } finally {
    clearTimeout(timeout);
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  // Hostinger normally sits behind a reverse proxy. Only trust forwarded client
  // IP headers when the deployment explicitly opts in, so rate limits are not
  // spoofable on direct deployments and can still distinguish real clients on
  // trusted proxy deployments.
  app.set('trust proxy', TRUST_PROXY);
  app.disable('x-powered-by');
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    if (process.env.NODE_ENV === 'production') {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
      res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'; img-src 'self' data: https://images.unsplash.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; connect-src 'self'",
      );
    }
    next();
  });
  app.use(express.json({ limit: '32kb' }));
  app.use('/api', (_req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    try {
      return new GoogleGenAI({ apiKey });
    } catch (err) {
      console.error('Failed to initialize GoogleGenAI client:', err);
      return null;
    }
  };

  app.post('/api/concierge', async (req, res) => {
    if (rateLimited(req, 'ai', AI_REQUESTS_PER_WINDOW)) return res.status(429).json({ error: 'Too many AI requests. Please try again shortly.' });
    try {
      const message = cleanText(req.body?.message, 4000);
      const context = req.body?.context && typeof req.body.context === 'object' ? req.body.context : {};
      if (!message) return res.status(400).json({ error: 'Message string is required' });
      const systemPrompt = `You are Hercules, the AI workforce supporting a Fractional CHRO for founders and CEOs. The Fractional CHRO owns judgement, strategy and sensitive decisions; you prepare, execute, follow up and surface what needs human attention. Be practical, concise and founder-friendly. Do not present Hercules as a compliance-only product. When legal or employment-law issues arise, flag that jurisdiction-specific professional advice may be required. End with 3 useful next actions.`;
      const prompt = `Founder context: ${JSON.stringify(context).slice(0, 8000)}\nFounder question: ${message}`;
      try {
        const reply = await callAiRouter(systemPrompt, prompt);
        return res.json({ reply, suggestions: ['Prepare this for my Fractional CHRO', 'Turn this into an HR workflow', 'Draft the message or document'] });
      } catch (routerError) {
        console.warn('AI router unavailable, trying direct Gemini fallback:', routerError);
        const ai = getAiClient();
        if (ai) {
          const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: `${systemPrompt}\n\n${prompt}` });
          return res.json({ reply: response.text || 'Hercules is ready to assist with your HR request.', suggestions: ['Prepare this for my Fractional CHRO', 'Turn this into an HR workflow', 'Draft the message or document'] });
        }
        throw routerError;
      }
    } catch (error: any) {
      console.error('Hercules AI Error:', error);
      return res.status(503).json({ error: 'AI service temporarily unavailable', reply: 'Hercules is temporarily unable to reach the AI workforce. Please try again shortly.', suggestions: ['Try again', 'Prepare this for my Fractional CHRO'] });
    }
  });

  app.post('/api/leads', async (req, res) => {
    if (rateLimited(req, 'lead', LEAD_REQUESTS_PER_WINDOW)) return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
    const name = cleanText(req.body?.name, 120); const email = cleanText(req.body?.email, 254); const phone = cleanText(req.body?.phone, 40); const company = cleanText(req.body?.company, 160); const topic = cleanText(req.body?.topic, 200); const teamSize = cleanText(req.body?.teamSize, 80); const notes = cleanText(req.body?.notes, 2000); const source = cleanText(req.body?.source, 80) || 'hercules-website';
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Enter a valid email address' });
    if (!LEAD_WEBHOOK_URL) return res.status(503).json({ error: 'Lead capture is not configured yet' });
    try {
      const response = await fetch(LEAD_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, phone, company, topic, teamSize, notes, source }), signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error(`Lead webhook returned ${response.status}`);
      return res.status(202).json({ ok: true });
    } catch (error) {
      console.error('Lead capture error:', error);
      return res.status(502).json({ error: 'Lead capture destination is unavailable' });
    }
  });

  app.get('/api/health', async (_req, res) => {
    let aiRouter = 'unreachable';
    try {
      const response = await fetch(`${AI_ROUTER_BASE_URL}/health`, { headers: { ...(process.env.AI_ROUTER_API_KEY ? { Authorization: `Bearer ${process.env.AI_ROUTER_API_KEY}` } : {}) }, signal: AbortSignal.timeout(5000) });
      aiRouter = response.ok ? 'ok' : `http_${response.status}`;
    } catch {}
    const status = aiRouter === 'ok' ? 'ok' : 'degraded';
    res.status(status === 'ok' ? 200 : 503).json({ status, name: 'Hercules Backend API', aiRouter, leadCapture: LEAD_WEBHOOK_URL ? 'configured' : 'not_configured' });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(moduleDir, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.listen(PORT, '0.0.0.0', () => console.log(`Hercules Server running on http://0.0.0.0:${PORT}`));
}

startServer();
