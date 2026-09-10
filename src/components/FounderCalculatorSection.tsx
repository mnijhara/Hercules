import React, { useState } from 'react';
import { ArrowRight, Calculator, Clock } from 'lucide-react';

interface FounderCalculatorSectionProps { onOpenAddSlackModal: () => void; }

export const FounderCalculatorSection: React.FC<FounderCalculatorSectionProps> = ({ onOpenAddSlackModal }) => {
  const [teamSize, setTeamSize] = useState(31);
  const [hourlyRate, setHourlyRate] = useState(6000);
  const hoursPerMonth = Math.round(teamSize * 1.5 + 10);
  const annualValue = hoursPerMonth * hourlyRate * 12;

  return (
    <section id="calculator" className="border-b border-slate-200 bg-slate-50 py-9 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)] sm:rounded-[28px]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-slate-50 p-5 sm:p-8 lg:p-9">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-800 shadow-sm"><Calculator className="h-3.5 w-3.5 text-sky-600" /> Founder time calculator</div>
              <h2 className="max-w-lg text-2xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">How much founder time is HR taking?</h2>
              <p className="mt-2.5 max-w-xl text-[13px] leading-5.5 text-slate-600 sm:text-base sm:leading-6">Make the hidden workload visible. Adjust two inputs and use the result as a conversation starter.</p>
              <div className="mt-5 space-y-2.5">
                <label className="block rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm sm:rounded-2xl sm:p-4"><div className="flex items-center justify-between gap-4"><span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Team size</span><span className="font-mono text-sm font-extrabold text-sky-700">{teamSize} people</span></div><input aria-label="Current team size" type="range" min={2} max={100} value={teamSize} onChange={(event) => setTeamSize(Number(event.target.value))} className="mt-3 h-1.5 w-full cursor-pointer accent-sky-600" /></label>
                <label className="block rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm sm:rounded-2xl sm:p-4"><div className="flex items-center justify-between gap-4"><span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Founder time value</span><span className="font-mono text-sm font-extrabold text-emerald-700">₹{hourlyRate.toLocaleString()}/hr</span></div><input aria-label="Founder hourly value in rupees" type="range" min={500} max={10000} step={250} value={hourlyRate} onChange={(event) => setHourlyRate(Number(event.target.value))} className="mt-3 h-1.5 w-full cursor-pointer accent-emerald-600" /></label>
              </div>
            </div>
            <div className="flex flex-col justify-between border-t border-slate-200 p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-9">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5"><span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Illustrative founder time value</span><Clock className="h-4 w-4 text-sky-600" /></div>
                <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3"><div className="rounded-xl bg-slate-50 p-3.5 sm:rounded-2xl sm:p-4"><span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500">Estimated time / month</span><div className="mt-1.5 flex items-baseline gap-1"><span className="font-mono text-2xl font-black tracking-tight text-slate-950 sm:text-4xl">{hoursPerMonth}</span><span className="text-xs font-bold text-rose-600">hrs</span></div></div><div className="min-w-0 rounded-xl bg-slate-50 p-3.5 sm:rounded-2xl sm:p-4"><span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500">Illustrative annual value</span><div className="mt-1.5 min-w-0 overflow-hidden"><span className="block whitespace-nowrap font-mono text-[clamp(1.15rem,5.5vw,2.25rem)] font-black tracking-[-0.04em] text-rose-600" title={`₹${annualValue.toLocaleString()}`}>₹{annualValue.toLocaleString()}</span></div></div></div>
                <div className="mt-2.5 rounded-xl border border-sky-200 bg-sky-50 p-3.5 sm:rounded-2xl sm:p-4"><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-sky-800">Planning baseline</p><p className="mt-1 text-[11px] leading-5 text-slate-600 sm:text-xs">Illustrative value of founder time currently represented by routine HR work — not projected savings or guaranteed ROI.</p></div>
              </div>
              <button type="button" onClick={onOpenAddSlackModal} className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white shadow-lg transition hover:bg-slate-800 active:scale-[0.99] sm:rounded-2xl sm:py-3.5 sm:text-xs">Talk to Hercules <ArrowRight className="h-4 w-4 text-sky-400" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
