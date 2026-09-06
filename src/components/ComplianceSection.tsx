import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';

interface ComplianceSectionProps {
  onOpenAddSlackModal: () => void;
}

export const ComplianceSection: React.FC<ComplianceSectionProps> = ({ onOpenAddSlackModal }) => {
  return (
    <section id="risk" className="py-12 sm:py-16 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-sky-800 text-xs font-mono font-bold uppercase tracking-[0.2em] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-200">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>PEOPLE & RISK</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Risk work should run in the background — not on the founder's desk.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Hercules AI keeps recurring people-operations and risk work organized, surfaces items that need attention, and prepares the next action for your team. Your Fractional CHRO owns the judgement on sensitive or high-impact decisions.
            </p>

            <ul className="space-y-3.5 pt-2">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>Track people events, policy work, documentation and follow-ups in one operating flow</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>Surface potential people and risk issues before they become founder fire drills</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>Prepare drafts, checklists and handover briefs while keeping consequential decisions human-led</span>
              </li>
            </ul>

            <div className="pt-4">
              <button
                type="button"
                onClick={onOpenAddSlackModal}
                className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md hover:scale-105"
              >
                <MessageSquare className="w-4 h-4 text-sky-400" />
                <span>Explore the AI workforce</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#1a1d28] border border-[#2e354a] rounded-3xl p-6 sm:p-8 shadow-2xl relative text-white font-sans">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#292f44] gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 p-0.5">
                    <div className="w-full h-full bg-[#0d101a] rounded-[10px] flex items-center justify-center font-bold text-sky-400 text-xs">@</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">Hercules AI</span>
                      <span className="text-[9px] font-mono bg-sky-500/20 text-sky-300 px-1.5 py-0.2 rounded font-semibold">WORKFORCE</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Example workflow · human review included</span>
                  </div>
                </div>

                <span className="hidden sm:inline-flex text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">
                  ACTION READY
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 mb-5 leading-relaxed font-normal">
                A people event creates follow-up work. Hercules AI can organize the context, prepare the checklist and flag what needs your Fractional CHRO's judgement.
              </p>

              <div className="bg-[#12181d] border-l-4 border-emerald-500 border-t border-r border-b border-[#1f2d35] rounded-2xl p-4 mb-4 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400 block">AI prepares</span>
                <div className="text-xs text-slate-300 space-y-1.5 font-normal">
                  <p className="flex items-start gap-2"><span className="text-emerald-400 font-bold">✓</span><span>Collect the relevant employee, policy and workflow context.</span></p>
                  <p className="flex items-start gap-2"><span className="text-emerald-400 font-bold">✓</span><span>Draft the next-step checklist and handover brief.</span></p>
                </div>
              </div>

              <div className="bg-[#1c1a16] border-l-4 border-amber-500 border-t border-r border-b border-[#362e21] rounded-2xl p-4 mb-6 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 block">CHRO decides</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sensitive employee relations, policy exceptions and consequential people decisions are reviewed by the Fractional CHRO before action is taken.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <span className="px-3.5 py-2 rounded-xl bg-[#1e2538] text-slate-300 border border-[#333e5c] font-semibold text-xs">Context gathered</span>
                <span className="px-3.5 py-2 rounded-xl bg-[#1e2538] text-slate-300 border border-[#333e5c] font-semibold text-xs">Next action drafted</span>
                <span className="px-3.5 py-2 rounded-xl bg-[#1e2538] text-slate-300 border border-[#333e5c] font-semibold text-xs">Human review</span>
              </div>

              <div className="mt-5 pt-4 border-t border-[#292f44] text-[11px] text-slate-500">
                AI prepares · CHRO decides · Hercules executes approved work
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
