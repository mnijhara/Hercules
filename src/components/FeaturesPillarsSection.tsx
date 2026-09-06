import React from 'react';
import { FEATURE_PILLARS } from '../data/herculesData';
import { Rocket, Sparkles, Shield, Check, ArrowRight, TrendingUp } from 'lucide-react';

interface FeaturesPillarsSectionProps {
  onOpenAddSlackModal: () => void;
}

export const FeaturesPillarsSection: React.FC<FeaturesPillarsSectionProps> = ({ onOpenAddSlackModal }) => {
  return (
    <section id="features" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>CORE CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Handle hiring, retention, and compliance <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600">in seconds.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Hercules AI automates every critical stage of the employee lifecycle so founders stay focused on growth.
          </p>
        </div>

        {/* 3 Pillar Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {FEATURE_PILLARS.map((pillar) => {
            const Icon = pillar.iconName === 'Rocket' ? Rocket : pillar.iconName === 'Sparkles' ? Sparkles : Shield;

            return (
              <div
                key={pillar.id}
                className="bg-white border border-slate-200/90 hover:border-sky-300 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-sky-700 font-mono font-semibold mb-4">
                    {pillar.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="space-y-3 mb-8 pt-4 border-t border-slate-100">
                    {pillar.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        <span className="font-normal">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metric Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700">
                    <TrendingUp className="w-4 h-4" />
                    <span>{pillar.metrics}</span>
                  </div>

                  <button
                    onClick={onOpenAddSlackModal}
                    className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Deploy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
