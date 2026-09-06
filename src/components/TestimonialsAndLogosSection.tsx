import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

const OUTCOMES = [
  'Senior HR judgement without hiring a full-time CHRO',
  'AI-powered execution between strategic conversations',
  'One connected HR experience across your existing workspace',
  'Clear escalation when a decision needs human judgement',
];

export const TestimonialsAndLogosSection: React.FC = () => {
  return (
    <section id="proof" className="py-16 sm:py-20 bg-white border-b border-slate-200 text-slate-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold mb-5">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>THE HERCULES DIFFERENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              You get a CHRO. Your team gets an AI workforce.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Hercules combines senior HR leadership with always-on execution, so founders get strategic judgement without creating another layer of HR headcount.
            </p>
          </div>

          <div className="grid gap-3">
            {OUTCOMES.map((outcome) => (
              <div key={outcome} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800 leading-relaxed">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
            Built for founders who need senior HR before they need a full HR department.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700">
            <span>Human judgement. AI execution.</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
};
