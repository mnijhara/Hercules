import React, { useRef, useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const CallbackFormSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail) return;

    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail, source: 'callback-form' }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Unable to submit the request');
      setName(trimmedName);
      setEmail(trimmedEmail);
      setSubmitted(true);
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to submit the request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="callback-form" className="py-12 sm:py-16 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b80_1px,transparent_0),linear-gradient(to_bottom,#1e293b80_1px,transparent_0)] bg-[size:3rem_3rem] opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-800 text-sky-400 text-xs font-mono font-bold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>GET STARTED WITH HERCULES</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Want Hercules in your workspace?
        </h2>

        <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto font-normal leading-relaxed mb-10">
          Leave your name and email and we&apos;ll reach out to get you set up across your HR workflows and workspace.
        </p>

        {submitted ? (
          <div ref={successRef} tabIndex={-1} role="status" aria-live="polite" className="p-8 rounded-3xl bg-slate-800/80 border border-emerald-500/40 max-w-lg mx-auto text-center space-y-3 animate-in fade-in outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Request received</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Thanks {name}. Your request has been sent to the Hercules team. We&apos;ll follow up at {email}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div className="text-left">
              <label htmlFor="callback-name" className="block text-xs font-semibold text-slate-300 mb-1.5">Name</label>
              <input
                id="callback-name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-slate-800/90 border border-slate-700 focus:border-sky-400 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>
            <div className="text-left">
              <label htmlFor="callback-email" className="block text-xs font-semibold text-slate-300 mb-1.5">Work email</label>
              <input
                id="callback-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-slate-800/90 border border-slate-700 focus:border-sky-400 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>

            {error && (
              <div role="alert" className="flex items-start gap-2 rounded-2xl border border-rose-500/40 bg-rose-950/40 px-4 py-3 text-left text-xs text-rose-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-extrabold text-sm uppercase tracking-wider transition-all shadow-xl shadow-sky-500/20 flex items-center justify-center gap-2"
            >
              <span>{submitting ? 'Sending…' : 'Request a callback'}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
