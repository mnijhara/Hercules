import React, { useEffect, useState } from 'react';
import { X, MessageSquare, CheckCircle2, ShieldCheck, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useModalFocus } from './useModalFocus';

interface AddSlackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddSlackModal: React.FC<AddSlackModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [workspaceName, setWorkspaceName] = useState('');
  const [founderEmail, setFounderEmail] = useState('');
  const [teamSize, setTeamSize] = useState('10-25 Employees');
  const [channels, setChannels] = useState<string[]>(['Slack', 'WhatsApp', 'Google Meet', 'Gmail / Email']);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const dialogRef = useModalFocus(isOpen, onClose);

  useEffect(() => {
    if (!isOpen) return;
    setStep('form');
    setError('');
    setSubmitting(false);
    setWorkspaceName('');
    setFounderEmail('');
    setTeamSize('10-25 Employees');
    setChannels(['Slack', 'WhatsApp', 'Google Meet', 'Gmail / Email']);
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleChannel = (channel: string) => {
    setChannels((current) => current.includes(channel) ? current.filter((item) => item !== channel) : [...current, channel]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const cleanWorkspaceName = workspaceName.trim();
    const cleanFounderEmail = founderEmail.trim();
    if (!cleanWorkspaceName) {
      setError('Enter your company or startup name.');
      return;
    }
    if (!cleanFounderEmail) {
      setError('Enter your work email.');
      return;
    }
    if (channels.length === 0) {
      setError('Select at least one workspace channel.');
      return;
    }
    setSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanWorkspaceName,
          company: cleanWorkspaceName,
          email: cleanFounderEmail,
          teamSize,
          notes: `Requested workspace setup for: ${channels.join(', ')}`,
          source: 'workspace-deployment-request',
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || 'We could not submit the setup request.');
      }

      setWorkspaceName(cleanWorkspaceName);
      setFounderEmail(cleanFounderEmail);
      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not submit the setup request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep('form');
    setError('');
    setSubmitting(false);
    setWorkspaceName('');
    setFounderEmail('');
    setTeamSize('10-25 Employees');
    setChannels(['Slack', 'WhatsApp', 'Google Meet', 'Gmail / Email']);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-labelledby="hercules-workspace-title">
      <div ref={dialogRef} tabIndex={-1} className="bg-white border border-slate-200/90 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 outline-none">
        <button type="button" onClick={handleClose} aria-label="Close workspace setup form" className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors">
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
                <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                <span>WORKSPACE SETUP REQUEST</span>
              </div>
              <h3 id="hercules-workspace-title" className="text-2xl font-extrabold text-slate-900">Put Hercules in your workspace</h3>
              <p className="text-xs text-slate-600 font-normal mt-1">Tell us where your team works. We will coordinate the real integration and onboarding with you.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="workspace-company" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 block mb-1">Company / Startup Name *</label>
                <input id="workspace-company" type="text" required maxLength={160} autoComplete="organization" placeholder="Your company" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500" />
              </div>

              <div>
                <label htmlFor="workspace-email" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 block mb-1">Founder Work Email *</label>
                <input id="workspace-email" type="email" required maxLength={254} autoComplete="email" placeholder="you@company.com" value={founderEmail} onChange={(e) => setFounderEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500" />
              </div>

              <div>
                <label htmlFor="workspace-team-size" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 block mb-1">Team size</label>
                <select id="workspace-team-size" value={teamSize} onChange={(e) => setTeamSize(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500">
                  {['1-10 Employees', '10-25 Employees', '25-50 Employees', '50+ Employees'].map((size) => <option key={size}>{size}</option>)}
                </select>
              </div>

              <fieldset>
                <legend className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 block mb-1">Where should Hercules work?</legend>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Slack', 'WhatsApp', 'Google Meet', 'Gmail / Email'].map((channel) => (
                    <label key={channel} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 cursor-pointer hover:border-sky-400">
                      <input type="checkbox" checked={channels.includes(channel)} onChange={() => toggleChannel(channel)} className="accent-sky-600" />
                      <span>{channel}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {error && (
                <div role="alert" className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-3 text-xs text-rose-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button type="submit" disabled={submitting} className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin text-sky-400" /> : <MessageSquare className="w-4 h-4 text-sky-400" />}
                <span>{submitting ? 'Sending request…' : 'Request workspace setup'}</span>
                {!submitting && <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>We will confirm integration access before connecting any workspace.</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-6" role="status" aria-live="polite">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-sky-700 font-bold block mb-1">REQUEST RECEIVED</span>
              <h3 className="text-2xl font-extrabold text-slate-900">We’ll help set up Hercules</h3>
              <p className="text-xs text-slate-600 font-normal max-w-sm mx-auto">Your request for {workspaceName || 'your workspace'} has been sent. We will confirm the integration steps with {founderEmail} before anything is connected.</p>
            </div>
            <button type="button" onClick={handleClose} className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm">Return to Hercules</button>
          </div>
        )}
      </div>
    </div>
  );
};
