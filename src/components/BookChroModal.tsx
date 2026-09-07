import React, { useEffect, useRef, useState } from 'react';
import { X, CheckCircle2, UserCheck, Send, Loader2, AlertCircle } from 'lucide-react';
import { useModalFocus } from './useModalFocus';

interface BookChroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookChroModal: React.FC<BookChroModalProps> = ({ isOpen, onClose }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('Org Design & Career Bands');
  const [teamSize, setTeamSize] = useState<string>('10 – 30 people');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const successRef = useRef<HTMLDivElement>(null);
  const dialogRef = useModalFocus(isOpen, onClose);

  useEffect(() => {
    if (!isOpen) return;
    setSubmitted(false);
    setError('');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          topic: selectedTopic,
          teamSize,
          notes: notes.trim(),
          source: 'fractional-chro-booking',
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || 'We could not submit your request.');
      }

      setName(name.trim());
      setEmail(email.trim());
      setPhone(phone.trim());
      setNotes(notes.trim());
      setSubmitted(true);
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not submit your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError('');
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    onClose();
  };

  const TOPICS = [
    'Org Design & Career Bands',
    'Executive Hiring & Compensation',
    'Employee Relations & Manager Support',
    'Founder Alignment & People Strategy',
    'Full Fractional CHRO Retainer',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-labelledby="hercules-chro-title">
      <div ref={dialogRef} tabIndex={-1} className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-white my-8 max-h-[90vh] flex flex-col outline-none">
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-indigo-950 border-b border-slate-800 flex items-start justify-between relative shrink-0">
          <div className="space-y-1 pr-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 text-xs font-mono font-bold">
              <UserCheck className="w-3.5 h-3.5" />
              <span>FRACTIONAL CHRO CONSULTATION</span>
            </div>
            <h3 id="hercules-chro-title" className="text-xl sm:text-2xl font-extrabold text-white pt-1">
              Talk to your Fractional CHRO
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              Tell us what is happening in your people function. We will use it to prepare for the conversation.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking form"
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {submitted ? (
            <div ref={successRef} tabIndex={-1} className="text-center py-8 space-y-4 outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-2xl" role="status" aria-live="polite">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-white">Request received</h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thanks <strong className="text-white">{name}</strong>. We have your request about <span className="text-sky-400 font-semibold">{selectedTopic}</span>. We will contact <strong className="text-white">{email}</strong> to arrange the next step.
              </p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                This form sends your details to the Hercules lead channel. It does not create a calendar booking until the team confirms a time with you.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-mono font-bold text-sky-400 uppercase tracking-wider mb-2">
                  1. What should your CHRO help with?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TOPICS.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      aria-pressed={selectedTopic === topic}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                        selectedTopic === topic
                          ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-md'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{topic}</span>
                      {selectedTopic === topic && <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-sky-400 uppercase tracking-wider mb-2">
                  2. Current team size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['1 – 10 people', '10 – 30 people', '30 – 50 people', '50+ people'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setTeamSize(size)}
                      aria-pressed={teamSize === size}
                      className={`py-2 px-3 rounded-lg border text-center text-xs font-semibold transition-all ${
                        teamSize === size
                          ? 'bg-sky-500 text-slate-950 border-sky-400 font-extrabold'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800">
                <label className="block text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                  3. Your details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1" htmlFor="chro-name">Your Name *</label>
                    <input id="chro-name" type="text" required autoComplete="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-400" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1" htmlFor="chro-email">Work Email *</label>
                    <input id="chro-email" type="email" required autoComplete="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1" htmlFor="chro-phone">Phone / WhatsApp *</label>
                    <input id="chro-phone" type="tel" required autoComplete="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-400" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1" htmlFor="chro-notes">Context / goal (optional)</label>
                    <input id="chro-notes" type="text" placeholder="What would make the conversation useful?" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-400" />
                  </div>
                </div>
              </div>

              {error && (
                <div role="alert" className="flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-3 text-xs text-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span>Conversation • No commitment</span>
                </div>

                <button type="submit" disabled={submitting} className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-sky-500/20 active:scale-95 flex items-center justify-center gap-2">
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>{submitting ? 'Sending…' : 'Request a CHRO conversation'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
