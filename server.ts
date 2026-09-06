import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AI_ROUTER_BASE_URL = (process.env.AI_ROUTER_BASE_URL || 'https://getjobready-ai-proxy.mnijhara.workers.dev').replace(/\/$/, '');
const AI_ROUTER_MODEL = process.env.AI_ROUTER_MODEL || 'gemini-2.5-flash';
const AI_ROUTER_TIMEOUT_MS = Number(process.env.AI_ROUTER_TIMEOUT_MS || 30000);

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
  const PORT = 3000;

  app.use(express.json());

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
    try {
      const { message, context } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message string is required' });
      }

      const systemPrompt = `You are Hercules, the AI workforce supporting a Fractional CHRO for founders and CEOs. The Fractional CHRO owns judgement, strategy and sensitive decisions; you prepare, execute, follow up and surface what needs human attention. Be practical, concise and founder-friendly. Do not present Hercules as a compliance-only product. When legal or employment-law issues arise, flag that jurisdiction-specific professional advice may be required. End with 3 useful next actions.`;
      const prompt = `Founder context: ${JSON.stringify(context || {})}\nFounder question: ${message}`;

      try {
        const reply = await callAiRouter(systemPrompt, prompt);
        return res.json({
          reply,
          suggestions: ['Prepare this for my Fractional CHRO', 'Turn this into an HR workflow', 'Draft the message or document'],
        });
      } catch (routerError) {
        console.warn('AI router unavailable, trying direct Gemini fallback:', routerError);
        const ai = getAiClient();
        if (ai) {
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${systemPrompt}\n\n${prompt}`,
          });
          return res.json({
            reply: response.text || 'Hercules is ready to assist with your HR request.',
            suggestions: ['Prepare this for my Fractional CHRO', 'Turn this into an HR workflow', 'Draft the message or document'],
          });
        }
        throw routerError;
      }
    } catch (error: any) {
      console.error('Hercules AI Error:', error);
      return res.status(503).json({
        error: 'AI service temporarily unavailable',
        reply: 'Hercules is temporarily unable to reach the AI workforce. Please try again shortly.',
        suggestions: ['Try again', 'Prepare this for my Fractional CHRO'],
      });
    }
  });

  app.get('/api/health', async (_req, res) => {
    let aiRouter = 'unreachable';
    try {
      const response = await fetch(`${AI_ROUTER_BASE_URL}/health`, { signal: AbortSignal.timeout(5000) });
      aiRouter = response.ok ? 'ok' : `http_${response.status}`;
    } catch {
      // Health remains useful even if the external AI router is unavailable.
    }
    res.json({ status: 'ok', name: 'Hercules Backend API', aiRouter });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Hercules Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
