import React, { useState } from 'react';
import { Calculator, Clock, DollarSign, ArrowRight } from 'lucide-react';

interface FounderCalculatorSectionProps {
  onOpenAddSlackModal: () => void;
}

export const FounderCalculatorSection: React.FC<FounderCalculatorSectionProps> = ({ onOpenAddSlackModal }) => {
  const [teamSize, setTeamSize] = useState<number>(12);
  const [hourlyRate, setHourlyRate] = useState<number>(2500);

  // Illustrative planning model only: 1.5 founder hours per employee/month plus 10 baseline hours.
  const hoursWastedPerMonth = Math.round(teamSize * 1.5 + 10);
  const monthlyCost = hoursWastedPerMonth * hourlyRate;
  const annualCost = monthlyCost * 12;

  return (
    <section id="calculator" className="py-12 sm:py-16 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold">
              <Calculator className="w-3.5 h-3.5 text-sky-600" />
              <span>FOUNDER TIME CALCULATOR</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Estimate the founder time HR can consume.
            </h2>

            <p className="text-sm text-slate-600 font-normal leading-relaxed">
              Adjust your team size and the value you place on founder time. This is an illustrative planning model, not a measurement of your actual HR workload or a guaranteed savings calculation.
            </p>

            <div className="space-y-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700 uppercase tracking-wider font-mono">Current Team Size</span>
                <span className="text-sky-700 font-mono text-base">{teamSize} Employees</span>
              </div>
              <input aria-label="Current team size" type="range" min={2} max={100} value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))} className="w-full accent-sky-600 cursor-pointer" />
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700 uppercase tracking-wider font-mono">Founder Hourly Value (₹/hr)</span>
                <span className="text-emerald-700 font-mono text-base">₹{hourlyRate.toLocaleString()}/hr</span>
              </div>
              <input aria-label="Founder hourly value in rupees" type="range" min={500} max={10000} step={250} value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} className="w-full accent-emerald-600 cursor-pointer" />
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-500 font-bold border-b border-slate-100 pb-3">
              ILLUSTRATIVE FOUNDER HR COST
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">Estimated Time / Mo</span>
                <div className="flex items-baseline gap-1"><span className="text-2xl font-extrabold text-slate-900 font-mono">{hoursWastedPerMonth}</span><span className="text-xs text-rose-600 font-bold">hours</span></div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">Illustrative Annual Value</span>
                <div className="flex items-baseline gap-1"><span className="text-2xl font-extrabold text-rose-600 font-mono">₹{annualCost.toLocaleString()}</span></div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-700" />
                <span className="text-xs font-bold text-sky-800 font-mono">USE THIS AS A BASELINE</span>
              </div>
              <p className="text-sm text-slate-700 font-normal leading-relaxed">
                The model estimates the founder time currently represented by routine HR work. Use it as a conversation starter; actual workload depends on your team, processes and stage.
              </p>
            </div>

            <button type="button" onClick={onOpenAddSlackModal} className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2">
              <span>Explore Hercules</span><ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
