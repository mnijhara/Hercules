import React, { useState } from 'react';
import { Sparkles, Zap, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, Layers, BarChart3, Check } from 'lucide-react';

interface ProductOverviewSectionProps {
  onOpenAddSlackModal: () => void;
}

export const ProductOverviewSection: React.FC<ProductOverviewSectionProps> = ({ onOpenAddSlackModal }) => {
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleAction = (message: string) => {
    setActionFeedback(message);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  return (
    <section id="the-product" className="py-12 sm:py-16 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-sky-800 text-xs font-mono font-bold uppercase tracking-[0.2em] mb-3 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>THE PRODUCT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Hercules lives in Slack, WhatsApp & Google Meet and acts before founders ask.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            It connects to your hiring stack and HRIS, then runs continuously — surfacing the right call at the right moment, with the action one click away.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                Proactive, not on-demand.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Hercules watches headcount, comp, runway, and statutory & DRDA compliance 24/7. The first time a founder hears about a problem is when Hercules has already drafted the next move.
              </p>
            </div>

            <ul className="space-y-3 pt-3 border-t border-slate-100">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>Pulls live data from Gusto, Rippling, Keka, and RazorpayX Payroll</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>Flags issues against runway, budget, and hiring velocity</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>Every alert ships with one-click actions — no slash commands to remember</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenAddSlackModal}
                className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md hover:scale-105"
              >
                <span>Connect your HRIS to Slack & WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </button>
            </div>
          </div>

          {/* Right Slack Card Graphic matching Screenshot 4 */}
          <div className="lg:col-span-7">
            <div className="bg-[#1a1d28] border border-[#2e354a] rounded-3xl p-6 sm:p-8 shadow-2xl relative text-white font-sans">
              {/* Top Slack Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#292f44]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 p-0.5">
                    <div className="w-full h-full bg-[#0d101a] rounded-[10px] flex items-center justify-center font-bold text-sky-400 text-xs">
                      @
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">Hercules</span>
                      <span className="text-[9px] font-mono bg-sky-500/20 text-sky-300 px-1.5 py-0.2 rounded font-semibold">
                        APP
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Direct message · 9:14 AM</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-full font-bold">
                  RUNWAY ALERT
                </span>
              </div>

              {/* Message Content */}
              <p className="text-sm font-semibold text-slate-100 mb-4 leading-relaxed">
                Heads up — the Senior Backend offer you're about to send pushes Q3 burn past your runway target.
              </p>

              {/* Red Impact Card */}
              <div className="bg-[#121520] border-l-4 border-rose-500 border-t border-r border-b border-[#2a3147] rounded-2xl p-5 mb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-rose-400">
                    Runway impact: 14.2 months → 11.8 months
                  </span>
                  <BarChart3 className="w-4 h-4 text-rose-400" />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Base ₹1.5 Cr ($185K) + equity 0.4% on a ₹35 Cr ($4.2M) post is ~22% above market for a Series Seed at your stage. Two adjustments below would keep the candidate competitive and protect 2.4 months of runway.
                </p>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap gap-2.5">
                  <button
                    onClick={() => handleAction('✓ Adjusted CTC offer generated with protected 2.4 month runway!')}
                    className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs transition-all shadow-md active:scale-95"
                  >
                    Show adjusted offer
                  </button>
                  <button
                    onClick={() => handleAction('✓ Fetched live Series Seed CTC benchmarks for Bengaluru & NCR.')}
                    className="px-3.5 py-2 rounded-xl bg-[#1e2538] hover:bg-[#28324a] text-slate-200 border border-[#333e5c] font-semibold text-xs transition-all active:scale-95"
                  >
                    See market data
                  </button>
                  <button
                    onClick={() => handleAction('✓ Original offer dispatched as-is to candidate.')}
                    className="px-3.5 py-2 rounded-xl bg-[#1e2538] hover:bg-[#28324a] text-slate-400 border border-[#333e5c] font-medium text-xs transition-all active:scale-95"
                  >
                    Send as-is
                  </button>
                </div>
              </div>

              {actionFeedback && (
                <div className="p-3 mb-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{actionFeedback}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Pushed from Gusto / RazorpayX Runway Sync</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
