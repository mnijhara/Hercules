import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, Sparkles, FileText, ArrowRight, ExternalLink, Check } from 'lucide-react';

interface ComplianceSectionProps {
  onOpenAddSlackModal: () => void;
}

export const ComplianceSection: React.FC<ComplianceSectionProps> = ({ onOpenAddSlackModal }) => {
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleAction = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  return (
    <section id="compliance" className="py-12 sm:py-16 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column matching Screenshot 6 */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-sky-800 text-xs font-mono font-bold uppercase tracking-[0.2em] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-200">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>STATUTORY & DRDA COMPLIANCE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Compliance comes to the founder, not the other way around.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Hercules is wired into your PEO and HRIS, so the moment a new hire enters the system Hercules already knows the state, the role, and the obligations (DRDA, POSH Act 2013, CA EDD, EPF/ESI). The founder learns about it because Hercules told them — and Hercules already started the work.
            </p>

            <ul className="space-y-3.5 pt-2">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>Detects new hires, location changes, and headcount triggers in real time</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>Built on verified federal & Indian statutes, state law, DRDA guidelines, POSH Act 2013, EEOC decisions, and live case law</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>Anti-hallucination guardrails — every answer cites the underlying statute</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>Sources: GovInfo, CourtListener, Cornell LII, Brave Search, Indian Code & Labour Gazettes</span>
              </li>
            </ul>

            <div className="pt-4">
              <button
                onClick={onOpenAddSlackModal}
                className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md hover:scale-105"
              >
                <span>Automate DRDA & POSH Compliance</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </button>
            </div>
          </div>

          {/* Right Slack Compliance Card Graphic matching Screenshot 7 */}
          <div className="lg:col-span-7">
            <div className="bg-[#1a1d28] border border-[#2e354a] rounded-3xl p-6 sm:p-8 shadow-2xl relative text-white font-sans">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#292f44]">
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
                    <span className="text-[10px] font-mono text-slate-400">Direct message · 11:42 AM</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">
                  DRDA & COMPLIANCE
                </span>
              </div>

              {/* Message text */}
              <p className="text-xs sm:text-sm text-slate-200 mb-5 leading-relaxed font-normal">
                Heads up — I just saw Sarah Kim move into onboarding in Gusto / Keka with a California/Karnataka address. That's your first CA/KA employee, which triggers four new compliance requirements. I've started two of them already.
              </p>

              {/* Green Box: Hercules is handling these now */}
              <div className="bg-[#12181d] border-l-4 border-emerald-500 border-t border-r border-b border-[#1f2d35] rounded-2xl p-4 mb-4 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400 block">
                  Hercules is handling these now
                </span>
                <div className="text-xs text-slate-300 space-y-1.5 font-normal">
                  <p className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>CA EDD payroll registration & DRDA filing — submitted, ~5 day turnaround</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Wage notice per Cal. Labor Code § 2810.5 / KA Shops Act Form 11 — drafted and ready to send with her offer</span>
                  </p>
                </div>
              </div>

              {/* Yellow Box: Needs your call */}
              <div className="bg-[#1c1a16] border-l-4 border-amber-500 border-t border-r border-b border-[#362e21] rounded-2xl p-4 mb-6 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 block">
                  Needs your call
                </span>
                <div className="text-xs text-slate-300 space-y-2 font-normal">
                  <p>
                    <span className="font-bold text-white">1. Workers' comp policy / DRDA & POSH ICC committee setup</span> — strict liability if missed. I can pull quotes & draft ICC docs.
                  </p>
                  <p>
                    <span className="font-bold text-white">2. Harassment & DRDA compliance training plan</span> kicks in once you have 5+ CA/KA employees in 2026. Want me to set the reminder?
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => handleAction('✓ Pulling Workers Compensation & DRDA quotes from top providers...')}
                  className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs transition-all shadow-md active:scale-95"
                >
                  Pull workers' comp quotes
                </button>
                <button
                  onClick={() => handleAction('✓ Training calendar reminder set for 5+ employee threshold!')}
                  className="px-3.5 py-2 rounded-xl bg-[#1e2538] hover:bg-[#28324a] text-slate-200 border border-[#333e5c] font-semibold text-xs transition-all active:scale-95"
                >
                  Set the training reminder
                </button>
                <button
                  onClick={() => handleAction('✓ Cal. Labor Code § 2810.5 / KA Shops Act Form 11 notice loaded!')}
                  className="px-3.5 py-2 rounded-xl bg-[#1e2538] hover:bg-[#28324a] text-slate-300 border border-[#333e5c] font-medium text-xs transition-all active:scale-95"
                >
                  Show me the wage notice
                </button>
              </div>

              {actionFeedback && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{actionFeedback}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
