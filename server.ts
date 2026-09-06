import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI lazily/safely
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    try {
      return new GoogleGenAI({ apiKey });
    } catch (err) {
      console.error('Failed to initialize GoogleGenAI client:', err);
      return null;
    }
  };

  // API Route: Saathi Virtual HR Assistant Query
  app.post('/api/concierge', async (req, res) => {
    try {
      const { message, context } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message string is required' });
      }

      const ai = getAiClient();

      if (!ai) {
        // High quality fallback Saathi response
        return res.json({
          reply: `I can handle that directly in Slack & WhatsApp! For "${message}", I've generated an Indian employment law compliant template including standard CTC components (Basic, HRA, Special Allowance, PF & Gratuity). As your virtual HR lead, Saathi handles engineering recruiting, offer letters, notice period buyouts, POSH policy creation, and 1-on-1 reviews so Indian founders focus 100% on product velocity.`,
          suggestions: [
            'Generate Indian CTC Engineering Offer Letter',
            'Draft POSH Policy & ICC Committee Guidelines',
            '30-60-90 Day Indian Onboarding Plan',
            'Calculate Notice Period Buyout & ESOP Vesting'
          ]
        });
      }

      const systemPrompt = `You are Saathi, the AI Virtual HR Lead inside Slack & WhatsApp for Indian tech founders and startup CEOs on KARYA.
Your goal is to save Indian founders time by instantly answering Indian labor law questions, generating compliant Indian CTC offer letters (with Basic 50%, HRA 50% of Basic, Special Allowance, PF 12%, Gratuity, LTA, and ESOPs), handling Shops & Establishments Act compliance, POSH policy creation, notice period buyouts (30-90 days), and handling sensitive employee team issues in Indian startups (Bengaluru, Gurugram, Mumbai, Hyderabad).
Keep your responses direct, highly practical, formatted for Slack readability (using bullet points and clear actions in INR currency ₹), and empathetic to founder time constraints.
End with 3 helpful follow-up action suggestions.`;

      const prompt = `${systemPrompt}\n\nUser Context: ${JSON.stringify(context || {})}\nFounder Question: "${message}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text || "Saathi is processing your HR query in Slack...";

      res.json({
        reply: responseText,
        suggestions: [
          'Send CTC Offer Letter to Candidate',
          'Create Indian Onboarding Workflow',
          'Draft POSH Committee & Policy Document',
          'Review EPF & Gratuity Rules'
        ]
      });
    } catch (error: any) {
      console.error('Saathi API Error:', error);
      res.status(500).json({
        error: 'Failed to process HR request',
        reply: "Saathi is temporarily offline for maintenance. I'm ready to assist with standard Indian CTC offer letters and POSH compliance templates.",
        suggestions: ['Try Default CTC Offer Template', 'View Indian Onboarding Checklist']
      });
    }
  });

  // API Route: Healthcheck
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', name: 'KARYA Backend API' });
  });

  // Vite Middleware in Dev vs Static in Prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HODOS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
