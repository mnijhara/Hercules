import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, UserCheck, Shield, Sparkles, Clock, Send, ArrowRight, MessageSquare } from 'lucide-react';

interface BookChroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookChroModal: React.FC<BookChroModalProps> = ({ isOpen, onClose }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('Org Design & Leveling');
  const [teamSize, setTeamSize] = useState<string>('10 – 30 employees');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    onClose();
  };

  const TOPICS = [
    { id: 'org-design', label: 'Org Design & Career Bands', icon: 'Briefcase' },
    { id: 'exec-comp', label: 'Executive Closing & VP Comp', icon: 'Rocket' },
    { id: 'posh-legal', label: 'POSH ICC & Statutory Audit', icon: 'Shield' },
    { id: 'founder-align', label: 'Founder Alignment & Conflict', icon: 'Users' },
    { id: 'full-retainer', label: 'Full Fractional CHRO Retainer', icon: 'Sparkles' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-white my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-indigo-950 border-b border-slate-800 flex items-start justify-between relative shrink-0">
          <div className="space-y-1 pr-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 text-xs font-mono font-bold">
              <UserCheck className="w-3.5 h-3.5" />
              <span>STRATEGIC FRACTIONAL CHRO CONSULTATION</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white pt-1">
              Book a 1-on-1 Strategic Session with Your Lead Fractional CHRO
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              Discuss your org strategy, executive compensation, POSH compliance, or full fractional HRBP needs.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-white">Strategic Session Confirmed!</h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you <strong className="text-white">{name}</strong>. Our Lead Fractional CHRO team has received your request regarding <span className="text-sky-400 font-semibold">{selectedTopic}</span> ({teamSize}). We will reach out to <strong className="text-white">{email}</strong> within 2 business hours to finalize your calendar invitation.
              </p>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 max-w-md mx-auto text-left space-y-2">
                <div className="font-bold text-sky-400 uppercase tracking-wider text-[10px] font-mono">
                  PRE-MEETING PREPARATION
                </div>
                <p>
                  Hercules AI is standing by. You can also deploy Hercules into your Slack or WhatsApp workspace to begin automated headcount & compliance tracking right away.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Step 1: Select Topic */}
              <div>
                <label className="block text-xs font-mono font-bold text-sky-400 uppercase tracking-wider mb-2">
                  1. What is your primary strategic HR challenge?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TOPICS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTopic(t.label)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                        selectedTopic === t.label
                          ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-md'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{t.label}</span>
                      {selectedTopic === t.label && <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Team Size */}
              <div>
                <label className="block text-xs font-mono font-bold text-sky-400 uppercase tracking-wider mb-2">
                  2. What is your current team size?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['1 – 10 people', '10 – 30 people', '30 – 50 people', '50+ people'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setTeamSize(size)}
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

              {/* Step 3: Contact Info */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <label className="block text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                  3. Your Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohan Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="rohan@startup.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Brief Context / Goals (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., Hiring VP Eng, need POSH ICC setup"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>30-min strategy session • No commitment</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-sky-500/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Confirm Fractional CHRO Booking</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
