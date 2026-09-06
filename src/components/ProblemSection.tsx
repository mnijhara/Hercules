import React, { useState, useEffect } from 'react';
import { VIDEO_DEMO_SLIDES, FOUNDER_TIME_TRAPS } from '../data/herculesData';
import { Play, Pause, ChevronRight, ChevronLeft, Clock, Users, ShieldAlert, Sparkles, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProblemSectionProps {
  onOpenVideoDemo: () => void;
  onOpenAddSlackModal: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({
  onOpenVideoDemo,
  onOpenAddSlackModal,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % VIDEO_DEMO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentSlide = VIDEO_DEMO_SLIDES[activeSlideIndex];

  return (
    <section id="the-problem" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header from Screenshot */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-sky-700 text-xs font-bold uppercase tracking-[0.2em] mb-3 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            <AlertCircle className="w-4 h-4 text-sky-600" />
            <span>THE PROBLEM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Founders are stuck doing the one job they don't want to outsource.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Software ate finance, sales, marketing, and engineering. People decisions still land on the founder — and the only "help" available is hiring the very thing founders are trying to avoid.
          </p>
        </div>

        {/* Interactive Video Showcase reproducing the exact video sequence! */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl mb-10 relative text-white">
          {/* Top Player Header */}
          <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-3 font-mono text-xs text-slate-400 hidden sm:inline">
                Hercules_HR_Product_Overview.mp4
              </span>
            </div>

            {/* Slide step indicator */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-sky-300 bg-sky-900/50 px-2.5 py-1 rounded-full border border-sky-700">
                SLIDE {currentSlide.id} OF {VIDEO_DEMO_SLIDES.length}
              </span>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-sky-400" /> : <Play className="w-3.5 h-3.5 text-sky-400" />}
                <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
            </div>
          </div>

          {/* Player Main Screen */}
          <div className={`p-8 sm:p-14 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between bg-gradient-to-br ${currentSlide.videoPlaceholderBg} relative transition-all duration-500`}>
            {/* Subtle Overlay Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

            {/* Slide Header / Badge */}
            <div className="relative z-10 flex items-center justify-between mb-8">
              <span className="text-xs font-mono font-bold tracking-widest text-sky-300 uppercase bg-slate-900/80 border border-sky-500/30 px-3.5 py-1 rounded-full">
                {currentSlide.caption}
              </span>
              <span className="text-xs font-medium text-slate-300 font-mono hidden sm:inline">
                {currentSlide.activeFeature}
              </span>
            </div>

            {/* Slide Dynamic Content */}
            <div className="relative z-10 max-w-2xl my-auto space-y-6">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                "{currentSlide.title}"
              </h3>

              <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed">
                {currentSlide.subtitle}
              </p>

              {/* Special rendering for Slide 2 time cards as seen in video! */}
              {currentSlide.id === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 animate-in fade-in">
                  <div className="p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-[10px] font-mono text-sky-300 font-bold block mb-1">01</span>
                    <span className="text-sm font-bold text-white block">Recruiting</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-[10px] font-mono text-sky-300 font-bold block mb-1">02</span>
                    <span className="text-sm font-bold text-white block">Onboarding</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <span className="text-[10px] font-mono text-sky-300 font-bold block mb-1">03</span>
                    <span className="text-sm font-bold text-white block">Employee Management</span>
                  </div>
                </div>
              )}

              {/* Special rendering for Slide 5 CTA as seen in video! */}
              {currentSlide.id === 5 && (
                <div className="pt-4">
                  <button
                    onClick={onOpenAddSlackModal}
                    className="px-8 py-3.5 rounded-full bg-sky-400 hover:bg-sky-300 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/30 hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    <span>See how it works</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Slide Controls & Progress Bar */}
            <div className="relative z-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {VIDEO_DEMO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveSlideIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      activeSlideIndex === idx
                        ? 'w-10 bg-sky-400 shadow-md shadow-sky-400/50'
                        : 'w-3 bg-slate-700 hover:bg-slate-500'
                    }`}
                    title={`Jump to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <button
                  onClick={() => setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : VIDEO_DEMO_SLIDES.length - 1))}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span>{activeSlideIndex + 1} / {VIDEO_DEMO_SLIDES.length}</span>
                <button
                  onClick={() => setActiveSlideIndex((prev) => (prev + 1) % VIDEO_DEMO_SLIDES.length)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-sky-300 shadow-sm transition-all flex flex-col justify-between group">
            <div>
              <div className="text-3xl font-black font-mono text-sky-600 mb-4 group-hover:scale-105 transition-transform">
                01
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                Hiring is high-stakes and lonely.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Every offer is a ₹2.5 Cr+ ($300K+) commitment with runway implications. Founders make these calls between investor meetings, with no second opinion that understands the business.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-mono font-bold text-sky-700">
              <Clock className="w-4 h-4" />
              <span>High Runway Stake</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-sky-300 shadow-sm transition-all flex flex-col justify-between group">
            <div>
              <div className="text-3xl font-black font-mono text-rose-600 mb-4 group-hover:scale-105 transition-transform">
                02
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                Compliance breaks silently.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                One remote hire in California or Bengaluru can trigger four new obligations (DRDA, POSH Act, EDD, PF/ESI). Most founders learn about them from a legal advisor's invoice or a state agency letter, not in time to act.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-mono font-bold text-rose-600">
              <ShieldAlert className="w-4 h-4" />
              <span>DRDA & POSH Risks</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-sky-300 shadow-sm transition-all flex flex-col justify-between group">
            <div>
              <div className="text-3xl font-black font-mono text-indigo-600 mb-4 group-hover:scale-105 transition-transform">
                03
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                The existing options don't fit.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                An HR hire is a ₹1.5 Cr ($180K) bet. Fractional CHROs send slide decks. Legal advisors bill by the hour and only show up after something has already gone wrong.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-mono font-bold text-indigo-600">
              <Users className="w-4 h-4" />
              <span>Unfit Legacy HR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
