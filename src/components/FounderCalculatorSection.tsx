import React, { useState } from 'react';
import { ArrowRight, Calculator, Clock } from 'lucide-react';

interface FounderCalculatorSectionProps {
  onOpenAddSlackModal: () => void;
}

export const FounderCalculatorSection: React.FC<FounderCalculatorSectionProps> = ({ onOpenAddSlackModal }) => {
  const [teamSize, setTeamSize] = useState(31);
  const [hourlyRate, setHourlyRate] = useState(6000);

  // Illustrative planning model only: 1.5 founder hours per employee/month plus 10 baseline hours.
  const hoursPerMonth = Math.round(teamSize * 1.5 + 10);
  const annualValue = hoursPerMonth * hourlyRate * 12;

  return (
    <section id="calculator" className="relative overflow-hidden border-y border-slate-200 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-6 sm:p-9 lg:p-11">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-800 shadow-sm">
                <Calculator className="h-3.5 w-3.5 text-sky-600" />
                Founder time calculator
              </div>
              <h2 className="max-w-lg text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                See what routine HR work is costing your time.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                A simple planning model to make the hidden founder workload visible. Adjust two inputs and use the result as a conversation starter.
              </p>

              <div className="mt-8 space-y-4">
                <label className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Team size</span>
                    <span className="font-mono text-sm font-extrabold text-sky-700">{teamSize} people</span>
                  </div>
                  <input
                    aria-label="Current team size"
                    type="range"
                    min={2}
                    max={100}
                    value={teamSize}
                    onChange={(event) => setTeamSize(Number(event.target.value))}
                    className="mt-4 h-1.5 w-full cursor-pointer accent-sky-600"
                  />
                </label>

                <label className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Founder time value</span>
                    <span className="font-mono text-sm font-extrabold text-emerald-700">₹{hourlyRate.toLocaleString()}/hr</span>
                  </div>
                  <input
                    aria-label="Founder hourly value in rupees"
                    type="range"
                    min={500}
                    max={10000}
                    step={250}
                    value={hourlyRate}
                    onChange={(event) => setHourlyRate(Number(event.target.value))}
                    className="mt-4 h-1.5 w-full cursor-pointer accent-emerald-600"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col justify-between border-t border-slate-200 bg-white p-6 sm:p-9 lg:border-l lg:border-t-0 lg:p-11">
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Illustrative founder time value</span>
                  <Clock className="h-4 w-4 shrink-0 text-sky-600" aria-hidden="true" />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500">Estimated time / month</span>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-mono text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{hoursPerMonth}</span>
                      <span className="text-xs font-bold text-rose-600">hrs</span>
                    </div>
                  </div>
                  <div className="min-w-0 rounded-2xl bg-slate-50 p-4 sm:p-5">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500">Illustrative annual value</span>
                    <div className="mt-2 min-w-0">
                      <span className="block truncate font-mono text-[clamp(1.45rem,5vw,2.25rem)] font-black tracking-tight text-rose-600" title={`₹${annualValue.toLocaleString()}`}>
                        ₹{annualValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 p-4 sm:p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-800">Planning baseline</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Illustrative value of founder time currently represented by routine HR work — not projected savings or guaranteed ROI.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenAddSlackModal}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-xs font-extrabold uppercase tracking-[0.14em] text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800 active:scale-[0.99]"
              >
                Explore Hercules <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
