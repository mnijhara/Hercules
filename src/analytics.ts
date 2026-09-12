const SESSION_KEY = 'hercules_analytics_session';

function sessionId() {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) { id = crypto.randomUUID(); localStorage.setItem(SESSION_KEY, id); }
    return id;
  } catch { return 'ephemeral'; }
}

export function track(event: 'page_view' | 'cta_click' | 'ai_prompt' | 'calculator_interaction' | 'demo_interaction', label?: string) {
  if (window.location.pathname === '/admin') return;
  const payload = {
    event,
    label: label?.trim().slice(0, 120) || '',
    path: window.location.pathname,
    sessionId: sessionId(),
    referrer: document.referrer ? (() => { try { return new URL(document.referrer).origin; } catch { return ''; } })() : '',
  };
  void fetch('/api/analytics/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => undefined);
}
