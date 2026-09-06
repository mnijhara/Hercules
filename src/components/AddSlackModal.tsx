import React, { useState } from 'react';
import { X, MessageSquare, CheckCircle2, ShieldCheck, ArrowRight, Lock, Sparkles } from 'lucide-react';

interface AddSlackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddSlackModal: React.FC<AddSlackModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [workspaceName, setWorkspaceName] = useState('');
  const [founderEmail, setFounderEmail] = useState('');
  const [teamSize, setTeamSize] = useState('10-25 Employees');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200/90 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
                <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                <span>2-CLICK SLACK & WHATSAPP AUTHORIZATION</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Add Hercules to Slack / WhatsApp
              </h3>
              <p className="text-xs text-slate-600 font-normal mt-1">
                Install Hercules into your startup's Slack workspace or WhatsApp group. Free 14-day trial, no credit card required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Company / Startup Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme AI, Inc."
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Founder Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@acme.com"
                  value={founderEmail}
                  onChange={(e) => setFounderEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Primary Workspace Channels
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 cursor-pointer hover:border-sky-400">
                    <input type="checkbox" defaultChecked className="accent-sky-600" />
                    <span>Slack</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 cursor-pointer hover:border-emerald-400">
                    <input type="checkbox" defaultChecked className="accent-emerald-600" />
                    <span>WhatsApp</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 cursor-pointer hover:border-rose-400">
                    <input type="checkbox" defaultChecked className="accent-rose-600" />
                    <span>Google Meet</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 cursor-pointer hover:border-indigo-400">
                    <input type="checkbox" defaultChecked className="accent-indigo-600" />
                    <span>Gmail / Email</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-sky-400" />
                <span>Deploy Hercules (Slack, WhatsApp, GMeet)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>SOC2 Type II Certified • End-to-End Encrypted Integration</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-sky-700 font-bold block mb-1">
                WORKSPACE CONNECTED
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                Hercules is live in {workspaceName || 'your workspace'}!
              </h3>
              <p className="text-xs text-slate-600 font-normal max-w-sm mx-auto">
                Type <code className="bg-slate-100 text-sky-800 px-1.5 py-0.5 rounded font-mono">/hercules</code> or mention <code className="bg-slate-100 text-sky-800 px-1.5 py-0.5 rounded font-mono">@Hercules</code> in channel <code className="bg-slate-100 text-sky-800 px-1.5 py-0.5 rounded font-mono">#ask-hercules</code> to begin asking HR & compliance queries.
              </p>
            </div>

            <button
              onClick={() => {
                setStep('form');
                onClose();
              }}
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm"
            >
              Return to Hercules HR
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
