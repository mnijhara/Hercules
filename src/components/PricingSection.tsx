import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/herculesData';
import { Check, Zap, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onOpenAddSlackModal: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenAddSlackModal }) => {
  const [annualBilling, setAnnualBilling] = useState(true);

  return (
    <section id="pricing" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold mb-4">
            <Zap className="w-3.5 h-3.5 text-sky-600" />
            <span>PRICING</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            One monthly subscription. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              Priced by team size.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8">
            Every plan includes the full Hercules: hiring pipeline, onboarding, DRDA & statutory compliance monitoring, retention signals, and coaching — inside Slack, WhatsApp, Google Meet & Email.
          </p>

          {/* Monthly / Annual Billing Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-slate-200/80 border border-slate-300">
            <button
              onClick={() => setAnnualBilling(false)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                !annualBilling ? 'bg-slate-900 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnualBilling(true)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                annualBilling ? 'bg-slate-900 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-mono font-bold border border-sky-200">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = annualBilling ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.highlighted
                    ? 'bg-white border-2 border-sky-600 shadow-xl shadow-sky-500/10 -translate-y-2'
                    : 'bg-white border border-slate-200/90 shadow-sm hover:border-slate-300'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-sky-600 text-white font-extrabold text-[10px] uppercase tracking-widest shadow-md">
                    {plan.badge || 'Most Popular'}
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                    {plan.name}
                  </h3>

                  <p className="text-xs text-slate-600 font-normal mb-6 min-h-[36px]">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-slate-900 font-mono">
                        {price === 0 ? '₹0' : `₹${price.toLocaleString()}`}
                      </span>
                      <span className="text-xs text-slate-500">/ month</span>
                    </div>
                    <span className="text-[10px] font-mono text-sky-700 block mt-1 font-bold">
                      {plan.teamSizeLimit}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[10px] uppercase tracking-wider text-sky-800 font-bold font-mono block">
                      Included Privileges
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-700">
                      {plan.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                          <span className="font-normal">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={onOpenAddSlackModal}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-sky-500" />
                  <span>Start 14-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
