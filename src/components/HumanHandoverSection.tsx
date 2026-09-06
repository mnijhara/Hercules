import React, { useState } from 'react';
import { Sparkles, UserCheck, Bot, ArrowRight, ShieldCheck, Rocket, Users, CheckCircle2, MessageSquare, Briefcase, Zap } from 'lucide-react';

interface HumanHandoverSectionProps {
  onOpenAddSlackModal: () => void;
}

const HANDOVER_MATRIX = [
  {
    category: 'Org design & people strategy',
    aiTask: 'Hercules AI keeps headcount requests, hiring workflows, manager follow-ups and people data organized so your CHRO can focus on the decisions that shape the team.',
    handoverTrigger: 'Org changes, leadership planning, leveling, compensation philosophy or a decision with material business impact.',
    humanTask: 'Your Fractional CHRO works with the founder and leadership team on org design, talent strategy, leadership decisions and the trade-offs behind them.',
  },
  {
    category: 'Executive hiring & offers',
    aiTask: 'Hercules AI prepares candidate summaries, interview workflows, offer drafts and follow-ups, then surfaces the decisions that need experienced HR judgement.',
    handoverTrigger: 'Executive candidates, sensitive negotiations, material compensation decisions or a leadership closing conversation.',
    humanTask: 'Your Fractional CHRO helps shape the offer, calibrate the role, coach the founder and handle the high-stakes candidate conversation.',
  },
  {
    category: 'Employee relations & people risk',
    aiTask: 'Hercules AI organizes employee questions, documentation, manager follow-ups and recurring people operations while flagging situations that need human attention.',
    handoverTrigger: 'Sensitive employee relations, investigations, exits, conflicts or matters requiring legal or specialist advice.',
    humanTask: 'Your Fractional CHRO provides context, judgement and a clear path forward, bringing in the appropriate specialist when a matter goes beyond HR leadership.',
  },
];

export const HumanHandoverSection: React.FC<HumanHandoverSectionProps> = ({ onOpenAddSlackModal }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const currentCategory = HANDOVER_MATRIX[activeCategoryIndex];

  return (
    <section id="human-chro" className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-sky-500/10 via-blue-500/15 to-indigo-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-300 text-xs font-mono font-bold mb-4 shadow-inner">
            <UserCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>THE HUMAN + AI MODEL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            AI handles the work between decisions. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300">Your Fractional CHRO handles the decisions.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            Hercules is deliberately designed around a human owner. AI prepares, executes and follows up; your Fractional CHRO brings context, judgement and leadership when the decision matters.
          </p>
        </div>

        <div className="mb-16 bg-gradient-to-r from-slate-800/80 via-slate-800/50 to-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest mb-3">AI WORKFORCE</div>
              <div className="text-lg font-bold text-white mb-2">Always-on execution</div>
              <p className="text-sm text-slate-300 leading-relaxed">Keeps workflows moving, prepares information, drafts routine outputs and follows up across the tools your team already uses.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-400 mx-auto mb-3"><Zap className="w-5 h-5" /></div>
              <div className="text-xs font-mono font-bold text-sky-300 uppercase tracking-wider">SMART HANDOVER</div>
              <p className="text-xs text-slate-400 mt-2">Escalate when context, judgement or accountability matters.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border border-indigo-500/30">
              <div className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-widest mb-3">FRACTIONAL CHRO</div>
              <div className="text-lg font-bold text-white mb-2">Strategic ownership</div>
              <p className="text-sm text-indigo-100 leading-relaxed">Provides senior HR judgement, coaches leaders and owns the people decisions that should not be delegated to software.</p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">The AI-to-Human Handover</h3>
            <p className="text-sm text-slate-400">A clear boundary between what AI can execute and what your CHRO should own.</p>
          </div>

          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {HANDOVER_MATRIX.map((item, idx) => (
              <button type="button" key={item.category} onClick={() => setActiveCategoryIndex(idx)} aria-pressed={activeCategoryIndex === idx} className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${activeCategoryIndex === idx ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/25 scale-105' : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'}`}>
                <span>{item.category}</span>
              </button>
            ))}
          </div>

          <div className="bg-slate-800/50 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <div className="md:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-sky-400 uppercase tracking-wider font-bold"><Bot className="w-4 h-4" /> <span>AI WORKFORCE</span></div>
                <h4 className="text-lg font-bold text-white mb-3">What Hercules AI handles</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{currentCategory.aiTask}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-[11px] font-mono text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5 shrink-0" /><span>Always-on support layer</span></div>
            </div>

            <div className="md:col-span-2 flex flex-col items-center justify-center text-center p-4 bg-slate-950/80 rounded-2xl border border-sky-500/30">
              <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-400 mb-2"><Zap className="w-5 h-5" /></div>
              <div className="text-[11px] font-mono font-bold text-sky-300 uppercase tracking-wider mb-1">HANDOVER TRIGGER</div>
              <p className="text-[11px] text-slate-300 font-medium leading-tight">{currentCategory.handoverTrigger}</p>
            </div>

            <div className="md:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border border-indigo-500/30 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-indigo-300 uppercase tracking-wider font-bold"><UserCheck className="w-4 h-4 text-indigo-400" /><span>FRACTIONAL CHRO</span></div>
                <h4 className="text-lg font-bold text-white mb-3">What your CHRO owns</h4>
                <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">{currentCategory.humanTask}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-indigo-900/60 flex items-center gap-2 text-[11px] font-mono text-sky-300"><Briefcase className="w-3.5 h-3.5 shrink-0" /><span>Senior judgement and accountability</span></div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Where the human layer adds the most value</h3>
            <p className="text-sm text-slate-400">The offer is not “AI instead of HR”. It is senior HR leadership with dramatically more execution capacity.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              ['Org design & career architecture', 'Designing scalable roles, levels, reporting structures and decision rights as the company grows.', Briefcase],
              ['Executive hiring & compensation', 'Calibrating leadership roles, offers and closing strategy with the founder and leadership team.', Rocket],
              ['Founder coaching & culture', 'Helping leaders navigate alignment, performance, conflict and the people decisions that carry context.', Users],
              ['Specialist support when needed', 'Bringing in the right recruiting, employee-relations, legal or other specialist capability when the situation requires it.', ShieldCheck],
            ].map(([title, description, Icon]) => {
              const CardIcon = Icon as React.ComponentType<{ className?: string }>;
              return <div key={String(title)} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-sky-500/40 transition-all">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-3"><CardIcon className="w-5 h-5" /></div>
                <h4 className="text-sm font-bold text-white mb-1.5">{String(title)}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{String(description)}</p>
              </div>;
            })}
          </div>
        </div>

        <div className="text-center pt-8 border-t border-slate-800">
          <button type="button" onClick={onOpenAddSlackModal} className="px-8 py-4 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-sky-500/20 hover:scale-105 inline-flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /><span>Explore the Hercules AI workforce</span><ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
