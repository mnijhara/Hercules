import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/herculesData';
import { Check, Zap, MessageSquare, ArrowRight, ChevronDown } from 'lucide-react';

interface PricingSectionProps { onOpenAddSlackModal: () => void; }
export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenAddSlackModal }) => {
  const [annualBilling, setAnnualBilling] = useState(true);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [showComparison, setShowComparison] = useState(false);

  return (
    <section id="pricing" className="relative border-b border-slate-200 bg-slate-50 py-9 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-9">
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-[11px] font-mono font-bold text-sky-800">
            <Zap className="h-3.5 w-3.5 text-sky-600" />PRICING
          </div>
          <h2 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">
            Senior HR leadership. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">AI-powered execution.</span>
          </h2>
          <p className="mb-5 mt-2.5 text-[15px] font-normal leading-6 text-slate-600 sm:mb-7 sm:text-lg sm:leading-relaxed">
            Every Hercules plan combines Fractional CHRO leadership with an AI HR workforce. Choose the level of support that fits your team today, then scale as you grow.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <div className="inline-flex items-center rounded-full border border-slate-300 bg-slate-200/80 p-1 shadow-inner">
              <button
                type="button"
                onClick={() => setAnnualBilling(false)}
                className={`rounded-full px-4 py-1.5 text-[11px] font-bold transition-all ${!annualBilling ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'}`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setAnnualBilling(true)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-bold transition-all ${annualBilling ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'}`}
              >
                <span>Annual</span>
                <span className="rounded-full border border-sky-200 bg-sky-100 px-1.5 py-0.5 font-mono text-[9px] font-bold text-sky-800">Save 20%</span>
              </button>
            </div>

            <div className="inline-flex items-center rounded-full border border-slate-300 bg-slate-200/80 p-1 shadow-inner">
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold transition-all ${currency === 'INR' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'}`}
              >
                ₹ INR
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold transition-all ${currency === 'USD' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'}`}
              >
                $ USD
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:gap-5">
          {PRICING_PLANS.map((plan) => {
            const isUsd = currency === 'USD';
            const price = isUsd
              ? (annualBilling ? (plan.priceAnnualUsd || 0) : (plan.priceMonthlyUsd || 0))
              : (annualBilling ? plan.priceAnnual : plan.priceMonthly);
            const isCustomPricing = price === 0;
            const priceDisplay = isCustomPricing
              ? 'Custom'
              : (isUsd ? `$${price.toLocaleString()}` : `₹${price.toLocaleString()}`);

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 sm:rounded-3xl sm:p-7 ${
                  plan.highlighted
                    ? 'border-2 border-sky-600 bg-white shadow-xl shadow-sky-500/10 lg:-translate-y-1.5'
                    : 'border border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-sky-600 px-4 py-1 text-[9px] font-extrabold uppercase tracking-widest text-white shadow-md">
                    {plan.badge || 'Most Popular'}
                  </div>
                )}
                <div>
                  <h3 className="mb-1 text-xl font-extrabold text-slate-900 sm:text-2xl">{plan.name}</h3>
                  <p className="mb-3.5 min-h-[36px] text-xs leading-5 text-slate-600">{plan.tagline}</p>
                  <div className="mb-5 rounded-xl border border-slate-200/90 bg-slate-50 p-4 sm:rounded-2xl">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono text-3xl font-extrabold text-slate-900 sm:text-4xl">{priceDisplay}</span>
                      {!isCustomPricing && <span className="text-xs font-semibold text-slate-500">/ month</span>}
                    </div>
                    <span className="mt-1 block font-mono text-[10px] font-bold text-sky-700">
                      {plan.teamSizeLimit}{annualBilling && !isCustomPricing ? ' · billed annually' : ''}
                    </span>
                  </div>
                  <div className="mb-5 space-y-2.5">
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-sky-800">What you get</span>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {plan.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenAddSlackModal}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-extrabold uppercase tracking-wider transition-all ${
                    plan.highlighted
                      ? 'bg-slate-900 text-white shadow-md hover:bg-slate-800 active:scale-[0.98]'
                      : 'border border-slate-300 bg-slate-100 text-slate-900 hover:bg-slate-200 active:scale-[0.98]'
                  }`}
                >
                  <MessageSquare className="h-4 w-4 text-sky-500" />
                  <span>Start with Hercules</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Matrix Toggle */}
        <div className="mt-8 text-center sm:mt-12">
          <button
            type="button"
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            <span>{showComparison ? 'Hide feature comparison' : 'Compare all plan features'}</span>
            <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${showComparison ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expandable Comparison Table */}
        {showComparison && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl sm:mt-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                    <th className="p-4 font-bold sm:p-5">Feature Breakdown</th>
                    <th className="p-4 font-extrabold text-slate-900 sm:p-5">Fractional CHRO</th>
                    <th className="p-4 font-extrabold text-sky-700 sm:p-5">CHRO + AI Workforce</th>
                    <th className="p-4 font-extrabold text-slate-900 sm:p-5">Enterprise CHRO + AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr className="bg-slate-50/50 font-bold text-slate-900">
                    <td colSpan={4} className="px-4 py-2 text-[11px] uppercase tracking-wider text-sky-800 sm:px-5">
                      Strategic Leadership
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5">Dedicated Fractional CHRO</td>
                    <td className="p-4 font-semibold text-slate-900 sm:p-5">Strategic Advisory</td>
                    <td className="p-4 font-semibold text-sky-800 sm:p-5">Active Leadership Partner</td>
                    <td className="p-4 font-semibold text-slate-900 sm:p-5">Dedicated Executive Suite</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5">Founder Strategy Syncs</td>
                    <td className="p-4 sm:p-5">Bi-weekly</td>
                    <td className="p-4 font-semibold text-slate-900 sm:p-5">Weekly priority sync</td>
                    <td className="p-4 sm:p-5">On-demand executive access</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5">Org Design & Career Bands</td>
                    <td className="p-4 text-sky-600 sm:p-5"><Check className="h-4 w-4" /></td>
                    <td className="p-4 text-sky-600 sm:p-5"><Check className="h-4 w-4" /></td>
                    <td className="p-4 text-sky-600 sm:p-5"><Check className="h-4 w-4" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5">Executive Comp & Equity Benchmarks</td>
                    <td className="p-4 sm:p-5">Standard</td>
                    <td className="p-4 text-sky-600 sm:p-5"><Check className="h-4 w-4" /></td>
                    <td className="p-4 font-semibold text-slate-900 sm:p-5">Bespoke 409A & Pool Modeling</td>
                  </tr>

                  <tr className="bg-slate-50/50 font-bold text-slate-900">
                    <td colSpan={4} className="px-4 py-2 text-[11px] uppercase tracking-wider text-sky-800 sm:px-5">
                      Autonomous AI HR Workforce
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5">Slack & Teams AI Concierge</td>
                    <td className="p-4 sm:p-5">Core workflows</td>
                    <td className="p-4 text-sky-600 sm:p-5"><Check className="h-4 w-4" /></td>
                    <td className="p-4 font-semibold text-slate-900 sm:p-5">Custom Fine-Tuned Agents</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5">Automated Onboarding Workflows</td>
                    <td className="p-4 sm:p-5">Templates</td>
                    <td className="p-4 text-sky-600 sm:p-5"><Check className="h-4 w-4" /></td>
                    <td className="p-4 font-semibold text-slate-900 sm:p-5">Multi-Department Workflows</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5">HR Policy & Handbook Drafting</td>
                    <td className="p-4 text-sky-600 sm:p-5"><Check className="h-4 w-4" /></td>
                    <td className="p-4 text-sky-600 sm:p-5"><Check className="h-4 w-4" /></td>
                    <td className="p-4 text-sky-600 sm:p-5"><Check className="h-4 w-4" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5">HRIS & Payroll Integration</td>
                    <td className="p-4 sm:p-5">Self-serve</td>
                    <td className="p-4 text-sky-600 sm:p-5"><Check className="h-4 w-4" /></td>
                    <td className="p-4 font-semibold text-slate-900 sm:p-5">Full API & SSO Integration</td>
                  </tr>

                  <tr className="bg-slate-50/50 font-bold text-slate-900">
                    <td colSpan={4} className="px-4 py-2 text-[11px] uppercase tracking-wider text-sky-800 sm:px-5">
                      Oversight & Support SLA
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5">Sensitive Issue Escalation</td>
                    <td className="p-4 text-sky-600 sm:p-5"><Check className="h-4 w-4" /></td>
                    <td className="p-4 text-sky-600 sm:p-5"><Check className="h-4 w-4" /></td>
                    <td className="p-4 text-sky-600 sm:p-5"><Check className="h-4 w-4" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5">SLA Response Window</td>
                    <td className="p-4 sm:p-5">&lt; 24 hours</td>
                    <td className="p-4 font-semibold text-sky-800 sm:p-5">&lt; 4 hours priority</td>
                    <td className="p-4 font-semibold text-slate-900 sm:p-5">Immediate / VIP Escalation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
