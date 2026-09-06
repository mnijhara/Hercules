import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, UserCheck, HelpCircle } from 'lucide-react';

interface HrAuditSectionProps {
  onOpenBookModal: () => void;
  onOpenSlackModal: () => void;
}

export const HrAuditSection: React.FC<HrAuditSectionProps> = ({ onOpenBookModal, onOpenSlackModal }) => {
  const [headcount, setHeadcount] = useState<number>(18);
  const [hasPosh, setHasPosh] = useState<string>('no');
  const [hasNoticePolicy, setHasNoticePolicy] = useState<string>('informal');
  const [hasLeveling, setHasLeveling] = useState<string>('no');

  // Calculate Risk Score
  let riskScore = 20; // base risk

  if (headcount >= 10 && hasPosh === 'no') {
    riskScore += 35; // POSH Act legally mandatory at 10+ employees
  } else if (hasPosh === 'internal-only') {
    riskScore += 15; // External ICC member required
  }

  if (hasNoticePolicy === 'informal') {
    riskScore += 20;
  } else if (hasNoticePolicy === 'standard') {
    riskScore += 5;
  }

  if (hasLeveling === 'no' && headcount > 12) {
    riskScore += 25;
  }

  riskScore = Math.min(95, riskScore);

  const getRiskLabel = (score: number) => {
    if (score >= 65) return { label: 'HIGH RISK', color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/30' };
    if (score >= 40) return { label: 'MODERATE RISK', color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/30' };
    return { label: 'HEALTHY HR FOUNDATION', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
  };

  const riskInfo = getRiskLabel(riskScore);

  return (
    <section id="hr-audit" className="py-16 sm:py-24 bg-slate-900 border-t border-slate-800 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>INTERACTIVE HR RISK AUDIT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Is your startup exposed to <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-sky-300 to-indigo-300">
              hidden HR & compliance risks?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Select your current team metrics below to calculate your HR compliance risk score and receive personalized recommendations from your Fractional CHRO & Hercules AI.
          </p>
        </div>

        {/* Audit Tool Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 text-sky-400">
              <Sparkles className="w-4 h-4" />
              <span>1. Your Team Parameters</span>
            </h3>

            {/* Input 1: Headcount Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300">Total Team Headcount:</label>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  {headcount} Employees
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="80"
                value={headcount}
                onChange={(e) => setHeadcount(parseInt(e.target.value))}
                className="w-full accent-sky-400 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
              {headcount >= 10 && (
                <p className="text-[11px] text-amber-400 mt-1 font-mono">
                  ⚡ Legal Threshold: 10+ employees requires formal POSH ICC Committee & DRDA statutory registration.
                </p>
              )}
            </div>

            {/* Input 2: POSH Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                POSH Act ICC Committee Status:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'no', label: 'No POSH Setup' },
                  { id: 'internal-only', label: 'Internal Only (No External Chair)' },
                  { id: 'complete', label: '100% Compliant + External Chair' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setHasPosh(item.id)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      hasPosh === item.id
                        ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Notice Period & Buyout Agreements */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Notice Period & Offer Letter Structure:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'informal', label: 'Ad-hoc offer emails without standard CTC breakups' },
                  { id: 'standard', label: 'Standard offer letters with 30-60 day notice clause' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setHasNoticePolicy(item.id)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      hasNoticePolicy === item.id
                        ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 4: Leveling & Career Bands */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Org Leveling Matrix & Career Bands:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'no', label: 'No formal levels (Ad-hoc salary & designations)' },
                  { id: 'yes', label: 'Defined career bands & compensation philosophy' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setHasLeveling(item.id)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      hasLeveling === item.id
                        ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                AUDIT RESULT & RISK SCORE
              </span>
              <div className="flex items-center justify-between">
                <span className={`text-3xl font-extrabold font-mono ${riskInfo.color}`}>
                  {riskScore}% RISK
                </span>
                <span className={`px-3 py-1 rounded-full border text-[11px] font-bold font-mono ${riskInfo.bg} ${riskInfo.color}`}>
                  {riskInfo.label}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden relative">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    riskScore >= 65 ? 'bg-red-500' : riskScore >= 40 ? 'bg-amber-500' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${riskScore}%` }}
                />
              </div>
            </div>

            {/* Action Items */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                Recommended Action Plan:
              </h4>

              <ul className="space-y-2.5 text-xs text-slate-300">
                {headcount >= 10 && hasPosh !== 'complete' && (
                  <li className="flex items-start gap-2 bg-slate-900 p-3 rounded-xl border border-red-500/20">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Constitute POSH ICC:</strong> Legally required at 10+ team members. Your Fractional CHRO will serve as External ICC Chair.
                    </span>
                  </li>
                )}

                {hasNoticePolicy === 'informal' && (
                  <li className="flex items-start gap-2 bg-slate-900 p-3 rounded-xl border border-amber-500/20">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Deploy Standardized CTC Offers:</strong> Hercules AI auto-generates tax-optimized CTC offer letters with 60-day notice buyout clauses.
                    </span>
                  </li>
                )}

                {hasLeveling === 'no' && (
                  <li className="flex items-start gap-2 bg-slate-900 p-3 rounded-xl border border-sky-500/20">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Build Career Leveling Matrix:</strong> Your Lead Fractional CHRO will co-design IC vs Manager tracks and compensation bands.
                    </span>
                  </li>
                )}

                <li className="flex items-start gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">24/7 Workspace Monitoring:</strong> Hercules AI tracks EPF/ESI statutory dates, ESOP vesting cliffs, and team sentiment in Slack.
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5">
              <button
                onClick={onOpenBookModal}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
              >
                <UserCheck className="w-4 h-4" />
                <span>Discuss Audit with Lead Fractional CHRO</span>
              </button>

              <button
                onClick={onOpenSlackModal}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 border border-slate-700"
              >
                <span>Deploy Hercules AI Co-Pilot Free</span>
                <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
