import React, { useState } from 'react';
import { FOUNDER_CHRO_NOTE, AI_HUMAN_HANDOVER_MATRIX, HUMAN_CHRO_PARTNERS } from '../data/herculesData';
import { Sparkles, UserCheck, Bot, ArrowRight, ShieldCheck, Rocket, Users, CheckCircle2, MessageSquare, Briefcase, Zap } from 'lucide-react';

interface HumanHandoverSectionProps {
  onOpenAddSlackModal: () => void;
}

export const HumanHandoverSection: React.FC<HumanHandoverSectionProps> = ({ onOpenAddSlackModal }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const currentCategory = AI_HUMAN_HANDOVER_MATRIX[activeCategoryIndex];

  return (
    <section id="human-chro" className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-sky-500/10 via-blue-500/15 to-indigo-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-300 text-xs font-mono font-bold mb-4 shadow-inner">
            <UserCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>STRATEGIC CHRO & FRACTIONAL HRBP LEADERSHIP</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            AI handles 24/7 execution. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300">
              I act as your Strategic Fractional CHRO & HRBP.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            Software excels at 24/7 workspace monitoring, offer drafting, and statutory math. But organizational design, talent strategy, executive compensation, and culture demand a real Fractional HRBP.
          </p>
        </div>

        {/* Founder / CHRO Manifesto Quote Box */}
        <div className="mb-16 bg-gradient-to-r from-slate-800/80 via-slate-800/50 to-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="shrink-0 text-center md:text-left">
              <img
                src={FOUNDER_CHRO_NOTE.avatar}
                alt={FOUNDER_CHRO_NOTE.author}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-sky-400/50 shadow-xl mx-auto md:mx-0"
              />
              <div className="mt-3">
                <div className="text-sm font-bold text-white">{FOUNDER_CHRO_NOTE.author}</div>
                <div className="text-xs text-sky-400 font-medium">{FOUNDER_CHRO_NOTE.role}</div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-widest font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>FOUNDER STATEMENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                "{FOUNDER_CHRO_NOTE.headline}"
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed italic">
                "{FOUNDER_CHRO_NOTE.quote}"
              </p>
            </div>
          </div>
        </div>

        {/* AI + Human Handover Interactive Matrix */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              The AI-to-Human Handover Matrix
            </h3>
            <p className="text-sm text-slate-400">
              See how Hercules AI flags high-stakes situations and seamlessly transfers context to your Fractional CHRO.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {AI_HUMAN_HANDOVER_MATRIX.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeCategoryIndex === idx
                    ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/25 scale-105'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                }`}
              >
                <span>{item.category}</span>
              </button>
            ))}
          </div>

          {/* Matrix Card */}
          <div className="bg-slate-800/50 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {/* Left: AI Autonomous Zone */}
            <div className="md:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-sky-400 uppercase tracking-wider font-bold">
                  <Bot className="w-4 h-4 text-sky-400" />
                  <span>24/7 AI AUTONOMOUS LAYER</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-3">What Hercules AI Handles</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {currentCategory.aiTask}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Zero latency • 100% data precision</span>
              </div>
            </div>

            {/* Middle: Handover Trigger */}
            <div className="md:col-span-2 flex flex-col items-center justify-center text-center p-4 bg-slate-950/80 rounded-2xl border border-sky-500/30">
              <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-400 mb-2 animate-pulse">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-mono font-bold text-sky-300 uppercase tracking-wider mb-1">
                SMART HANDOVER TRIGGER
              </div>
              <p className="text-[11px] text-slate-300 font-medium leading-tight">
                {currentCategory.handoverTrigger}
              </p>
            </div>

            {/* Right: Human Fractional CHRO Zone */}
            <div className="md:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border border-indigo-500/30 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-indigo-300 uppercase tracking-wider font-bold">
                  <UserCheck className="w-4 h-4 text-indigo-400" />
                  <span>HUMAN FRACTIONAL CHRO EXECUTION</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-3">What Your Fractional CHRO Executes</h4>
                <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-normal">
                  {currentCategory.humanTask}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-indigo-900/60 flex items-center gap-2 text-[11px] font-mono text-sky-300">
                <Briefcase className="w-3.5 h-3.5 shrink-0" />
                <span>Senior HR Leaders & Fractional VPs on demand</span>
              </div>
            </div>
          </div>
        </div>

        {/* Meet our Human CHRO Partners */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Why Human HR is Essential for HRBP & Strategy
            </h3>
            <p className="text-sm text-slate-400">
              Hercules AI powers your daily operations — while I serve as your Lead Fractional CHRO & HRBP for high-leverage strategic initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-12">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-sky-500/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Org Design & Career Bands</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Designing job families, IC vs Manager tracks, leveling matrices, and scalable reporting structures for 10 → 200+ teams.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-sky-500/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
                <Rocket className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Executive Closing & Board Comp</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Structuring VP & C-level equity grants, leading candidate closing calls, and preparing board compensation committee decks.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-sky-500/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Founder Coaching & Culture</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Co-founder alignment, executive conflict resolution, leadership performance appraisals, and core cultural principles.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-sky-500/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Scalable Fractional HR Network</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Adding specialized Fractional HR partners (recruiters, POSH ICC chairs, labor attorneys) seamless as your company expands.
              </p>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-1">
              Your Dedicated Fractional CHRO & HRBP Team
            </h3>
            <p className="text-xs text-slate-400">
              Senior Tech HR Leaders & VPs of People working as your fractional strategic partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HUMAN_CHRO_PARTNERS.map((partner, idx) => (
              <div key={idx} className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 hover:border-sky-500/50 transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={partner.avatar}
                    alt={partner.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-sky-400/40"
                  />
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                      {partner.name}
                    </h4>
                    <p className="text-xs font-semibold text-sky-400">{partner.exCompany}</p>
                    <p className="text-[11px] text-slate-400">{partner.title}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-normal leading-relaxed mb-4">
                  <strong>Specialization:</strong> {partner.expertise}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {partner.badges.map((b, bi) => (
                    <span key={bi} className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-300">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Box */}
        <div className="text-center pt-8 border-t border-slate-800">
          <button
            onClick={onOpenAddSlackModal}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-sky-500/20 hover:scale-105 inline-flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Connect Hercules AI & Book Fractional CHRO Intro</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
