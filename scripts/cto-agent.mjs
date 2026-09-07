import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const root = process.cwd();
const router = (process.env.AI_ROUTER_BASE_URL || 'https://getjobready-ai-proxy.mnijhara.workers.dev').replace(/\/$/, '');
const model = process.env.AI_ROUTER_MODEL || 'gemini-2.5-flash';
const timeoutMs = Number(process.env.AI_ROUTER_TIMEOUT_MS || 45000);

const files = execSync('git ls-files', { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)
  .filter((f) => /^(src\/|server\.ts$|package\.json$|vite\.config\.ts$|index\.html$|\.env\.example$)/.test(f))
  .filter((f) => !f.includes('assets/'));

const important = [
  'src/App.tsx', 'src/components/HeroSection.tsx', 'src/components/ProductOverviewSection.tsx',
  'src/components/ProblemSection.tsx', 'src/components/FeaturesPillarsSection.tsx',
  'src/components/HumanHandoverSection.tsx', 'src/components/HrAuditSection.tsx',
  'src/components/WorkspaceAIDemoSection.tsx', 'src/components/VoiceScreenSection.tsx',
  'src/components/ComplianceSection.tsx', 'src/components/PricingSection.tsx',
  'src/components/CallbackFormSection.tsx', 'src/components/Navbar.tsx', 'src/components/Footer.tsx',
  'src/data/herculesData.ts', 'server.ts', 'package.json', 'index.html'
];

function readFile(file) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) return '';
  const text = fs.readFileSync(full, 'utf8');
  return text.length > 24000 ? `${text.slice(0, 24000)}\n/* TRUNCATED FOR CTO REVIEW */` : text;
}

const snapshot = important.filter((f) => files.includes(f)).map((f) => `\n===== ${f} =====\n${readFile(f)}`).join('\n');

async function askAi(instruction) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${router}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.AI_ROUTER_API_KEY ? { Authorization: `Bearer ${process.env.AI_ROUTER_API_KEY}` } : {}),
      },
      body: JSON.stringify({
        model,
        temperature: 0.1,
        messages: [
          { role: 'system', content: `You are the autonomous CTO for Hercules, a Fractional CHRO service amplified by an AI HR workforce. Audit like a demanding founder, senior product leader, QA engineer and conversion-focused website owner. Hercules is NOT a compliance product. Preserve the existing Exhodos-inspired long-form visual structure. Fractional CHRO is the primary category; AI is the execution multiplier.\n\nYou must return ONLY valid JSON matching the requested schema. Never invent APIs, credentials, testimonials, customer logos, pricing facts or integrations. Never expose secrets. Prefer small, high-confidence fixes. Do not rewrite the whole site.` },
          { role: 'user', content: instruction },
        ],
      }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`AI router HTTP ${response.status}`);
    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) throw new Error('AI router returned no content');
    return String(text).replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
  } finally {
    clearTimeout(timer);
  }
}

async function checkUrl(url) {
  if (!url) return { url: null, status: 'not configured' };
  try {
    const r = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(10000) });
    return { url, status: r.status, ok: r.ok, contentType: r.headers.get('content-type') || '' };
  } catch (e) {
    return { url, status: 'error', ok: false, error: String(e.message || e) };
  }
}

const runtimeChecks = {
  app: await checkUrl(process.env.HERCULES_APP_URL),
  aiRouter: await checkUrl(`${router}/health`),
};

const auditPrompt = `Audit the current Hercules website and codebase. Think as the founder deciding whether to put this in front of a paying CEO tomorrow. Check: (1) positioning and whether Fractional CHRO is clearly primary, (2) consistency across every section, (3) CTA flow and whether buttons actually do something, (4) forms and API behavior, (5) AI architecture and failure states, (6) mobile/responsive risks visible from code, (7) accessibility/semantic issues, (8) dead or contradictory copy, (9) fake/demo claims that could damage trust, (10) obvious build/runtime errors, (11) performance risks, and (12) whether the user can understand the offer within 10 seconds. Runtime checks: ${JSON.stringify(runtimeChecks)}\n\nReturn this exact JSON schema: {"overall":"green|yellow|red","founder_summary":"...","findings":[{"severity":"critical|high|medium|low","area":"...","problem":"...","recommended_fix":"..."}],"changes":[{"path":"existing repo path","content":"COMPLETE new file content","reason":"..."}],"tests":["..."]}. You may propose at most 3 file changes and only when the fix is high-confidence. Do not change package dependencies unless absolutely necessary.\n\nCODEBASE:\n${snapshot}`;

let result;
try {
  result = JSON.parse(await askAi(auditPrompt));
} catch (e) {
  // External AI availability is a runtime dependency, not a repository failure.
  // Keep the scheduled CTO job green while making the blocker explicit and
  // continuing with repository-side validation in the normal CI workflow.
  console.error(`CTO AI audit blocked: ${e.message || e}`);
  console.log(JSON.stringify({
    runtimeChecks,
    overall: 'yellow',
    founder_summary: 'Autonomous AI review could not run because the configured AI router is unavailable. No AI-generated code changes were applied.',
    blocker: String(e.message || e),
    findings: [{
      severity: 'high',
      area: 'AI infrastructure',
      problem: `The configured AI router could not service the CTO audit. Health check: ${JSON.stringify(runtimeChecks.aiRouter)}.`,
      recommended_fix: 'Restore or correctly configure the shared Cloudflare AI router/API path and verify it with an authenticated health and chat request.',
    }],
    tests: ['Repository CI remains the source of truth for typecheck, production build and diff validation.'],
  }, null, 2));
  process.exit(0);
}

console.log(JSON.stringify({ runtimeChecks, overall: result.overall, founder_summary: result.founder_summary, findings: result.findings, tests: result.tests }, null, 2));

const changes = Array.isArray(result.changes) ? result.changes : [];
const safeChanges = changes.filter((change) => {
  if (!change?.path || typeof change.content !== 'string') return false;
  const p = change.path.replaceAll('\\', '/');
  return !p.startsWith('/') && !p.includes('..') && /^(src\/|server\.ts$|vite\.config\.ts$|index\.html$)/.test(p);
}).slice(0, 3);

for (const change of safeChanges) {
  const target = path.join(root, change.path);
  if (!fs.existsSync(target)) continue;
  fs.writeFileSync(target, change.content, 'utf8');
}

if (safeChanges.length) {
  try {
    execSync('npm run lint', { stdio: 'inherit' });
    execSync('npm run build', { stdio: 'inherit' });
    execSync('git diff --check', { stdio: 'inherit' });
  } catch (e) {
    console.error('CTO-generated changes failed validation; reverting them.');
    execSync('git restore -- ' + safeChanges.map((c) => c.path.replaceAll(' ', '\\ ')).join(' '));
    process.exit(2);
  }

  execSync('git config user.name "Hercules Autonomous CTO"');
  execSync('git config user.email "cto@users.noreply.github.com"');
  execSync('git add ' + safeChanges.map((c) => c.path.replaceAll(' ', '\\ ')).join(' '));
  execSync(`git commit -m "chore: autonomous CTO fixes"`);
  execSync('git push origin HEAD:main', { stdio: 'inherit' });
  console.log(`Autonomous CTO shipped ${safeChanges.length} validated fix(es).`);
} else {
  console.log('Autonomous CTO found no high-confidence code changes for this cycle.');
}
