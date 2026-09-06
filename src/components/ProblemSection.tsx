import React, { useState, useEffect } from 'react';
import { VIDEO_DEMO_SLIDES } from '../data/herculesData';
import { Play, Pause, ChevronRight, ChevronLeft, Clock, Users, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

interface ProblemSectionProps {
  onOpenVideoDemo: () => void;
  onOpenAddSlackModal: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenAddSlackModal }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || VIDEO_DEMO_SLIDES.length === 0) return;
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % VIDEO_DEMO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentSlide = VIDEO_DEMO_SLIDES[activeSlideIndex];

  if (!currentSlide) return null;

  return (
    <section id="the-problem" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-sky-700 text-xs font-bold uppercase tracking-[0.2em] mb-3 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            <AlertCircle className="w-4 h-4 text-sky-600" />
            <span>THE PROBLEM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Founders are stuck doing the one job they don't want to outsource.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Finance, sales, marketing, and engineering have specialist systems and leaders. People decisions still land on the founder — often before the company is ready for a full-time senior HR function.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl mb-10 relative text-white">
          <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-3 font-mono text-xs text-slate-400 hidden sm:inline">
                Hercules interactive walkthrough
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-sky-300 bg-sky-900/50 px-2.5 py-1 rounded-full border border-sky-700">
                STEP {currentSlide.id} OF {VIDEO_DEMO_SLIDES.length}
              </span>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause walkthrough' : 'Play walkthrough'}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-sky-400" /> : <Play className="w-3.5 h-3.5 text-sky-400" />}
                <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
            </div>
          </div>

          <div className={`p-8 sm:p-14 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between bg-gradient-to-br ${currentSlide.videoPlaceholderBg} relative transition-all duration-500`}>
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between mb-8">
              <span className="text-xs font-mono font-bold tracking-widest text-sky-300 uppercase bg-slate-900/80 border border-sky-500/30 px-3.5 py-1 rounded-full">
                {currentSlide.caption}
              </span>
              <span className="text-xs font-medium text-slate-300 font-mono hidden sm:inline">
                {currentSlide.activeFeature}
              </span>
            </div>

            <div className="relative z-10 max-w-2xl my-auto space-y-6">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                {currentSlide.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed">
                {currentSlide.subtitle}
              </p>

              {currentSlide.id === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 animate-in fade-in">
                  {['Recruiting', 'Onboarding', 'Employee management'].map((item, index) => (
                    <div key={item} className="p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                      <span className="text-[10px] font-mono text-sky-300 font-bold block mb-1">0{index + 1}</span>
                      <span className="text-sm font-bold text-white block">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {currentSlide.id === 5 && (
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={onOpenAddSlackModal}
                    className="px-8 py-3.5 rounded-full bg-sky-400 hover:bg-sky-300 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/30 hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    <span>Explore the AI workforce</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="relative z-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto" role="tablist" aria-label="Walkthrough steps">
                {VIDEO_DEMO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => {
                      setActiveSlideIndex(idx);
                      setIsPlaying(false);
                    }}
                    aria-label={`Show walkthrough step ${idx + 1}`}
                    aria-current={activeSlideIndex === idx ? 'step' : undefined}
                    className={`h-2 rounded-full transition-all ${
                      activeSlideIndex === idx
                        ? 'w-10 bg-sky-400 shadow-md shadow-sky-400/50'
                        : 'w-3 bg-slate-700 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <button
                  type="button"
                  aria-label="Previous walkthrough step"
                  onClick={() => setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : VIDEO_DEMO_SLIDES.length - 1))}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span>{activeSlideIndex + 1} / {VIDEO_DEMO_SLIDES.length}</span>
                <button
                  type="button"
                  aria-label="Next walkthrough step"
                  onClick={() => setActiveSlideIndex((prev) => (prev + 1) % VIDEO_DEMO_SLIDES.length)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-sky-300 shadow-sm transition-all flex flex-col justify-between group">
            <div>
              <div className="text-3xl font-black font-mono text-sky-600 mb-4">01</div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">Hiring needs senior judgement.</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Critical hires affect runway, team design, compensation, and culture. Founders need an experienced HR partner who can make the trade-offs with them — not another dashboard.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-mono font-bold text-sky-700">
              <Clock className="w-4 h-4" />
              <span>Strategic hiring support</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-sky-300 shadow-sm transition-all flex flex-col justify-between group">
            <div>
              <div className="text-3xl font-black font-mono text-rose-600 mb-4">02</div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">People risk grows quietly.</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Employee relations, manager issues, documentation, policy questions, and local employment requirements create work that needs consistent attention. Hercules helps surface and execute that work while the CHRO handles sensitive judgement.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-mono font-bold text-rose-600">
              <span>People risk & operations</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-sky-300 shadow-sm transition-all flex flex-col justify-between group">
            <div>
              <div className="text-3xl font-black font-mono text-indigo-600 mb-4">03</div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">You need leverage, not another layer.</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                A full-time senior HR hire can be premature, while a traditional advisor may only appear for scheduled conversations. Hercules combines Fractional CHRO judgement with an AI workforce that keeps the work moving between those conversations.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-mono font-bold text-indigo-600">
              <Users className="w-4 h-4" />
              <span>CHRO + AI leverage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
