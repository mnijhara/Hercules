import React, { useState } from 'react';
import { Calculator, Clock, DollarSign, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface FounderCalculatorSectionProps {
  onOpenAddSlackModal: () => void;
}

export const FounderCalculatorSection: React.FC<FounderCalculatorSectionProps> = ({ onOpenAddSlackModal }) => {
  const [teamSize, setTeamSize] = useState<number>(12);
  const [hourlyRate, setHourlyRate] = useState<number>(2500); // INR per hour

  // Time wasted per employee roughly 1.5 hrs/month founder time
  const hoursWastedPerMonth = Math.round(teamSize * 1.5 + 10);
  const monthlyCost = hoursWastedPerMonth * hourlyRate;
  const annualCost = monthlyCost * 12;

  // With Hercules, 85% time saved
  const hoursSavedWithHercules = Math.round(hoursWastedPerMonth * 0.85);
  const annualSavingsWithHercules = Math.round(annualCost * 0.85);

  return (
    <section id="calculator" className="py-12 sm:py-16 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Inputs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold">
              <Calculator className="w-3.5 h-3.5 text-sky-600" />
              <span>FOUNDER TIME CALCULATOR</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Calculate how much founder time you lose to HR & legal.
            </h2>

            <p className="text-sm text-slate-600 font-normal leading-relaxed">
              Adjust your team size and founder hourly rate (₹) to calculate the exact time and money Hercules reclaims for your product velocity.
            </p>

            {/* Range Slider 1: Team Size */}
            <div className="space-y-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700 uppercase tracking-wider font-mono">Current Team Size</span>
                <span className="text-sky-700 font-mono text-base">{teamSize} Employees</span>
              </div>
              <input
                type="range"
                min={2}
                max={100}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            {/* Range Slider 2: Hourly Rate */}
            <div className="space-y-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700 uppercase tracking-wider font-mono">Founder Hourly Value (₹/hr)</span>
                <span className="text-emerald-700 font-mono text-base">₹{hourlyRate.toLocaleString()}/hr</span>
              </div>
              <input
                type="range"
                min={500}
                max={10000}
                step={250}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Right Results Dashboard */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-500 font-bold border-b border-slate-100 pb-3">
              YOUR ANNUAL FOUNDER HR LEAKAGE
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">Time Lost / Mo</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-slate-900 font-mono">{hoursWastedPerMonth}</span>
                  <span className="text-xs text-rose-600 font-bold">hours</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">Annual Cost Lost</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-rose-600 font-mono">₹{annualCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Reclaimed with Hercules Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border border-sky-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-800 font-mono flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-sky-600 fill-sky-600" />
                  <span>RECLAIMED WITH HERCULES</span>
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                  85% RECOVERY
                </span>
              </div>

              <div className="text-3xl font-black text-slate-900 font-mono pt-1">
                +{hoursSavedWithHercules * 12} Hours <span className="text-base text-slate-600 font-normal">/ yr saved</span>
              </div>

              <p className="text-xs text-slate-700 font-normal">
                Reclaim <strong className="text-emerald-700">₹{annualSavingsWithHercules.toLocaleString()}</strong> in founder value every single year.
              </p>
            </div>

            <button
              onClick={onOpenAddSlackModal}
              className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Stop Wasting Time — Deploy Hercules</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
