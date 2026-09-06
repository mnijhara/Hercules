import React from 'react';
import { Sparkles, Star, ShieldCheck, TrendingUp, Building, Award } from 'lucide-react';
import { FAKE_CLIENT_LOGOS, FAKE_TESTIMONIALS, FAKE_METRICS } from '../data/herculesData';

export const TestimonialsAndLogosSection: React.FC = () => {
  return (
    <section id="proof" className="py-16 sm:py-20 bg-white border-b border-slate-200 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {FAKE_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1 shadow-sm hover:border-sky-300 transition-all"
            >
              <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900 tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs font-bold font-mono text-sky-800 uppercase tracking-wider">
                {metric.label}
              </div>
              <p className="text-[11px] text-slate-500 font-normal">
                {metric.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Fake Client Logo Strip */}
        <div className="mb-16 text-center space-y-6">
          <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            TRUSTED BY FOUNDERS AT HIGH-GROWTH STARTUPS
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
            {FAKE_CLIENT_LOGOS.map((company, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center hover:bg-sky-50/50 hover:border-sky-200 transition-all group"
              >
                <span className="font-extrabold text-sm tracking-widest font-mono text-slate-700 group-hover:text-sky-900">
                  {company.logoText}
                </span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {company.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold mb-3">
            <Award className="w-3.5 h-3.5 text-sky-600" />
            <span>FOUNDER TESTIMONIALS & CASE STUDIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved by founders who value their time & peace of mind.
          </h2>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FAKE_TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-6 shadow-sm hover:border-sky-300 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-300"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.authorName}</h4>
                    <p className="text-[11px] text-slate-500 font-normal">{t.authorTitle}</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-bold">
                  {t.metrics}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
