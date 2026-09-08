import React from 'react';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenVideoDemo: () => void;
  onOpenAddSlackModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenVideoDemo, onOpenAddSlackModal }) => {
  return (
    <section id="how-it-works" className="relative pt-20 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-white border-b border-slate-200">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-sky-200/40 via-blue-200/30 to-indigo-200/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold mb-6 shadow-sm flex-wrap justify-center">
          <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
          <span>FRACTIONAL CHRO</span>
          <span className="text-slate-300">•</span>
          <span className="text-sky-900 font-bold">AMPLIFIED BY HERCULES AI</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-4">
          Stop losing founder time <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600">to people problems.</span>
        </h1>

        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          Get a senior Fractional CHRO as your strategic HR partner — backed by an AI HR workforce that handles the everyday work across your existing workspace.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button onClick={onOpenVideoDemo} className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all duration-200 shadow-xl shadow-slate-900/15 hover:shadow-slate-900/25 flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-[0.98]" id="hero-watch-works-btn">
            <span>See how Hercules works</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          <button onClick={onOpenAddSlackModal} className="w-full sm:w-auto px-7 py-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm">
            <MessageSquare className="w-4 h-4 text-sky-600" />
            <span>Set up your AI HR workforce</span>
          </button>
        </div>

        <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div>
            <div className="text-2xl font-black text-slate-900">Always-on</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">AI workforce</div>
          </div>
          <div>
            <div className="text-2xl font-black text-sky-600">1 team</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">CHRO + AI workforce</div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">Human + AI</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Judgement + execution</div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-600">Your workflow</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Designed around your stack</div>
          </div>
        </div>
      </div>
    </section>
  );
};
