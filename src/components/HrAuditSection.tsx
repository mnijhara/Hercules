import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, ClipboardCheck, Sparkles, UserCheck } from 'lucide-react';

interface HrAuditSectionProps {
  onOpenBookModal: () => void;
  onOpenSlackModal: () => void;
}

type Choice = 'yes' | 'partial' | 'no';

export const HrAuditSection: React.FC<HrAuditSectionProps> = ({ onOpenBookModal, onOpenSlackModal }) => {
  const [headcount, setHeadcount] = useState(18);
  const [hasCorePolicies, setHasCorePolicies] = useState<Choice>('partial');
  const [hasStructuredHiring, setHasStructuredHiring] = useState<Choice>('partial');
  const [hasManagerRhythm, setHasManagerRhythm] = useState<Choice>('no');

  const score = useMemo(() => {
    const headcountPoints = headcount >= 50 ? 15 : headcount >= 25 ? 10 : 5;
    const points = (value: Choice) => value === 'no' ? 25 : value === 'partial' ? 15 : 0;
    return Math.min(90, 10 + headcountPoints + points(hasCorePolicies) + points(hasStructuredHiring) + points(hasManagerRhythm));
  }, [headcount, hasCorePolicies, hasStructuredHiring, hasManagerRhythm]);

  const readiness = score >= 65
    ? { label: 'NEEDS ATTENTION', className: 'text-amber-400 bg-amber-500/10 border-amber-500/30' }
    : score >= 40
      ? { label: 'DEVELOPING', className: 'text-sky-300 bg-sky-500/10 border-sky-500/30' }
      : { label: 'SOLID FOUNDATION', className: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };

  return (
    <section id="hr-audit" className="py-16 sm:py-24 bg-slate-900 border-t border-slate-800 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono font-bold mb-4">
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>INTERACTIVE PEOPLE OPS CHECK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">How ready is your people function for the next stage?</h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Use a few practical inputs to spot where your people operating rhythm may need more structure. Hercules AI can organize the work, while your Fractional CHRO helps prioritize the decisions that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 text-sky-400"><Sparkles className="w-4 h-4" /><span>Your current operating rhythm</span></h3>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="headcount" className="text-xs font-semibold text-slate-300">Current team size</label>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">{headcount} people</span>
              </div>
              <input id="headcount" aria-label="Current team size" type="range" min="2" max="100" value={headcount} onChange={(event) => setHeadcount(Number(event.target.value))} className="w-full accent-sky-400 bg-slate-800 rounded-lg cursor-pointer h-2" />
            </div>
            <AuditChoice label="Core people policies and documentation" value={hasCorePolicies} onChange={setHasCorePolicies} />
            <AuditChoice label="Structured hiring and onboarding workflow" value={hasStructuredHiring} onChange={setHasStructuredHiring} />
            <AuditChoice label="Consistent manager and performance rhythm" value={hasManagerRhythm} onChange={setHasManagerRhythm} />
          </div>

          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">READINESS SNAPSHOT</span>
              <div className="flex items-center justify-between gap-3">
                <span className="text-3xl font-extrabold font-mono">{score}/100</span>
                <span className={`px-3 py-1 rounded-full border text-[11px] font-bold font-mono ${readiness.className}`}>{readiness.label}</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden"><div className="h-full bg-sky-400 transition-all duration-500 rounded-full" style={{ width: `${score}%` }} /></div>
              <p className="text-[11px] text-slate-500 pt-1">This is a directional self-assessment, not legal, compliance, or employment advice.</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">Where Hercules can help</h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" /><span>Turn recurring HR work into clear workflows, checklists and follow-ups.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" /><span>Prepare hiring, onboarding and manager-support work for review.</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" /><span>Escalate sensitive or consequential people decisions to the Fractional CHRO.</span></li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2.5">
              <button type="button" onClick={onOpenBookModal} className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"><UserCheck className="w-4 h-4" /><span>Discuss with a Fractional CHRO</span></button>
              <button type="button" onClick={onOpenSlackModal} className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 border border-slate-700"><span>Explore the AI workforce</span><ArrowRight className="w-3.5 h-3.5 text-sky-400" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface AuditChoiceProps { label: string; value: Choice; onChange: (value: Choice) => void; }

const AuditChoice: React.FC<AuditChoiceProps> = ({ label, value, onChange }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-300 mb-2">{label}</label>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {([['yes', 'In place'], ['partial', 'Partly in place'], ['no', 'Needs work']] as const).map(([id, text]) => (
        <button key={id} type="button" onClick={() => onChange(id)} className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${value === id ? 'bg-sky-500/20 border-sky-400 text-sky-200' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}>{text}</button>
      ))}
    </div>
  </div>
);
