import React, { useState } from 'react';
import { ArrowRight, Calculator, Clock, Copy, Check } from 'lucide-react';
import { track } from '../analytics';

interface FounderCalculatorSectionProps { onOpenAddSlackModal: () => void; }

export const FounderCalculatorSection: React.FC<FounderCalculatorSectionProps> = ({ onOpenAddSlackModal }) => {
  const [teamSize, setTeamSize] = useState(25);
  const [hourlyRate, setHourlyRate] = useState(6000);
  const [copied, setCopied] = useState(false);

  const updateTeamSize = (value: number) => { setTeamSize(value); track('calculator_interaction', 'team size'); };
  const updateHourlyRate = (value: number) => { setHourlyRate(value); track('calculator_interaction', 'founder time value'); };

  // Illustrative planning model: 1.5 founder-hours per employee/month + 10 fixed hours.
  const hoursPerMonth = Math.round(teamSize * 1.5 + 10);
  const annualValue = hoursPerMonth * hourlyRate * 12;
  const currencySymbol = '₹';

  const hiringHours = Math.round(hoursPerMonth * 0.4);
  const onboardingHours = Math.round(hoursPerMonth * 0.3);
  const opsHours = hoursPerMonth - hiringHours - onboardingHours;

  const copySummary = async () => {
    const summary = `Hercules Executive People ROI Summary
• Team Size: ${teamSize} people
• Modeled Founder Time Reclaimed: ~${hoursPerMonth} hrs/month
• Projected Annual Value: ₹${annualValue.toLocaleString('en-IN')}/yr (at ₹${hourlyRate.toLocaleString('en-IN')}/hr)
• Time Allocation:
  - Hiring & Screening: ~${hiringHours} hrs/mo (40%)
  - Onboarding & Documentation: ~${onboardingHours} hrs/mo (30%)
  - Everyday People Ops & Reviews: ~${opsHours} hrs/mo (30%)
• Learn more: https://herculeshr.online`;

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      track('calculator_interaction', 'copied summary');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="calculator" className="border-b border-slate-200 bg-slate-50 py-9 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)] sm:rounded-[28px]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-slate-50 p-6 sm:p-8 lg:p-9">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-800 shadow-sm">
                  <Calculator className="h-3.5 w-3.5 text-sky-600" /> Founder time calculator
                </div>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-bold text-slate-700 shadow-sm">
                  ₹ INR
                </span>
              </div>

              <h2 className="mt-3 max-w-lg text-2xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">How much founder time is HR taking?</h2>
              <p className="mt-2.5 max-w-xl text-[13px] leading-5.5 text-slate-600 sm:text-base sm:leading-6">Make the hidden workload visible. Adjust two inputs and use the result as a conversation starter.</p>

              <div className="mt-5 space-y-5">
                <label className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Team size</span>
                    <span className="font-mono text-sm font-extrabold text-sky-700">{teamSize} people</span>
                  </div>
                  <input
                    aria-label="Team size"
                    type="range"
                    min={5}
                    max={120}
                    value={teamSize}
                    onChange={(event) => updateTeamSize(Number(event.target.value))}
                    className="mt-3.5 h-2 w-full cursor-pointer accent-sky-600"
                  />
                </label>

                <label className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Founder time value</span>
                    <span className="font-mono text-sm font-extrabold text-emerald-700">
                      ₹{hourlyRate.toLocaleString('en-IN')}/hr
                    </span>
                  </div>
                  <input
                    aria-label="Founder hourly value"
                    type="range"
                    min={1000}
                    max={15000}
                    step={250}
                    value={hourlyRate}
                    onChange={(event) => updateHourlyRate(Number(event.target.value))}
                    className="mt-3.5 h-2 w-full cursor-pointer accent-emerald-600"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col justify-between border-t border-slate-200 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-9">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Illustrative founder time value</span>
                  <Clock className="h-4 w-4 text-sky-600" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="rounded-xl bg-slate-50 p-4 sm:rounded-2xl">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500">Modeled time / month</span>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="font-mono text-2xl font-black tracking-tight text-slate-950 sm:text-4xl">{hoursPerMonth}</span>
                      <span className="text-xs font-bold text-rose-600">hrs</span>
                    </div>
                  </div>
                  <div className="min-w-0 rounded-xl bg-slate-50 p-4 sm:rounded-2xl">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500">Illustrative annual value</span>
                    <div className="mt-2 min-w-0 overflow-hidden">
                      <span className="block whitespace-nowrap font-mono text-[clamp(1.25rem,5vw,2.25rem)] font-black tracking-[-0.04em] text-rose-600" title={`${currencySymbol}${annualValue.toLocaleString()}`}>
                        {currencySymbol}{annualValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Time Allocation Breakdown */}
                <div className="mt-3.5 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm sm:rounded-2xl sm:p-4">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    Modeled Time Allocation
                  </span>
                  <div className="mt-2 space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                        <span>Hiring & Candidate Screening (40%)</span>
                        <span className="font-mono font-bold text-slate-900">~{hiringHours} hrs</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-sky-500" style={{ width: '40%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                        <span>Onboarding & Documentation (30%)</span>
                        <span className="font-mono font-bold text-slate-900">~{onboardingHours} hrs</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-blue-500" style={{ width: '30%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                        <span>Everyday People Ops & Reviews (30%)</span>
                        <span className="font-mono font-bold text-slate-900">~{opsHours} hrs</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-indigo-500" style={{ width: '30%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 rounded-xl border border-sky-200 bg-sky-50 p-3 sm:rounded-2xl sm:p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-800">Planning baseline</p>
                  <p className="mt-0.5 text-[11px] leading-4 text-slate-600">
                    Illustrative model assumes 1.5 founder-hours per employee per month plus 10 fixed hours.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={onOpenAddSlackModal}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-xs font-extrabold uppercase tracking-[0.14em] text-white shadow-lg transition hover:bg-slate-800 active:scale-[0.99] sm:rounded-2xl"
                >
                  Talk to Hercules <ArrowRight className="h-4 w-4 text-sky-400" />
                </button>
                <button
                  type="button"
                  onClick={copySummary}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-xs font-bold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 active:scale-[0.99] sm:rounded-2xl"
                  title="Copy Executive Summary to Clipboard"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-slate-500" />}
                  <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
