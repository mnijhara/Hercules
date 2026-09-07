import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, BarChart3, UserRound, Bot, MessageSquare } from 'lucide-react';

interface ProductOverviewSectionProps {
  onOpenAddSlackModal: () => void;
  onOpenBookModal: () => void;
}

export const ProductOverviewSection: React.FC<ProductOverviewSectionProps> = ({ onOpenAddSlackModal, onOpenBookModal }) => {
  return (
    <section id="the-product" className="py-12 sm:py-16 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-sky-800 text-xs font-mono font-bold uppercase tracking-[0.2em] mb-3 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>THE HERCULES MODEL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Your Fractional CHRO — with an AI workforce behind them.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Your CHRO brings the judgement, leadership and strategy. Hercules AI handles the everyday execution through the HR workflows and workspace channels you choose to connect — so your HR function can move faster without adding layers of headcount.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-5">
                <UserRound className="w-5 h-5 text-sky-700 mb-3" />
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">The human layer</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Strategic HR leadership, org design, senior hiring, talent decisions and the judgement that should never be automated.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <Bot className="w-5 h-5 text-slate-800 mb-3" />
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">The AI layer</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Always-on HR execution, follow-ups, employee support, hiring workflows, offers and operational work through connected tools.</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">One HR team. Working 24/7.</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Hercules connects the strategic layer with the operating layer. Your CHRO sees the important signals; the AI workforce takes care of the repeatable work and brings the right decisions back when human judgement is needed.
              </p>
            </div>

            <ul className="space-y-3 pt-3 border-t border-slate-100">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>Strategic HR leadership without committing to a full-time CHRO</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>AI handles the operational workload between CHRO conversations</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>Designed for Slack, WhatsApp, Google Meet and Email when those channels are connected</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenAddSlackModal}
                className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md hover:scale-105"
              >
                <span>Meet the Hercules AI workforce</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#1a1d28] border border-[#2e354a] rounded-3xl p-6 sm:p-8 shadow-2xl relative text-white font-sans">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#292f44]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 p-0.5">
                    <div className="w-full h-full bg-[#0d101a] rounded-[10px] flex items-center justify-center font-bold text-sky-400 text-xs">H</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">Hercules AI</span>
                      <span className="text-[9px] font-mono bg-sky-500/20 text-sky-300 px-1.5 py-0.2 rounded font-semibold">WORKFORCE</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Working with your Fractional CHRO · 9:14 AM</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-sky-300 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-full font-bold">ILLUSTRATIVE WORKFLOW</span>
              </div>

              <p className="text-sm font-semibold text-slate-100 mb-4 leading-relaxed">
                Example: Hercules AI spots a senior-hiring decision that needs attention and prepares the benchmark, offer scenario and trade-offs for your CHRO to review.
              </p>

              <div className="bg-[#121520] border-l-4 border-sky-500 border-t border-r border-b border-[#2a3147] rounded-2xl p-5 mb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-300">Senior Backend hire · Offer decision</span>
                  <BarChart3 className="w-4 h-4 text-sky-400" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Market benchmark inputs, compensation impact and runway implications can be organized for human review before anything is sent to the candidate.
                </p>
                <div className="pt-2 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={onOpenBookModal}
                    className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                  >
                    <UserRound className="w-3.5 h-3.5" />
                    Prepare for CHRO
                  </button>
                  <button
                    type="button"
                    onClick={onOpenAddSlackModal}
                    className="px-3.5 py-2 rounded-xl bg-[#1e2538] hover:bg-[#28324a] text-slate-200 border border-[#333e5c] font-semibold text-xs transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Explore AI workflow
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>AI prepares · CHRO decides · Hercules executes approved work</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
