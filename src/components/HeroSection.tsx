import React from 'react';
import { ArrowRight, Calculator, Play, Sparkles, UserRound } from 'lucide-react';

interface HeroSectionProps {
  onOpenVideoDemo: () => void;
  onOpenBookModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenVideoDemo, onOpenBookModal }) => (
  <section id="how-it-works" className="relative overflow-hidden border-b border-slate-200 bg-white pb-10 pt-[76px] sm:pb-14 sm:pt-24">
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] [background-size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    <div className="pointer-events-none absolute left-1/2 top-1/4 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-sky-200/40 via-blue-200/30 to-indigo-200/20 blur-[120px]" />
    <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
      <div className="mb-3.5 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-[11px] font-semibold text-sky-800 shadow-sm">
        <Sparkles className="h-3.5 w-3.5 text-sky-600" />
        <span>FRACTIONAL CHRO</span>
        <span className="text-slate-300">•</span>
        <span className="font-bold text-sky-900">AMPLIFIED BY HERCULES AI</span>
      </div>
      <h1 className="mb-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
        Stop losing founder time <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">to people problems.</span>
      </h1>
      <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:mb-8 sm:text-xl">
        Get a senior Fractional CHRO as your strategic HR partner — backed by an AI HR workforce that handles the everyday work across your existing workspace.
      </p>
      
      <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:mb-8 sm:flex-row">
        {onOpenBookModal ? (
          <button
            type="button"
            onClick={onOpenBookModal}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-900/15 transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] sm:w-auto"
          >
            <UserRound className="h-4 w-4 text-sky-400" />
            <span>Talk to a Fractional CHRO</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : null}

        <button
          type="button"
          onClick={onOpenVideoDemo}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] sm:w-auto"
        >
          <Play className="h-3.5 w-3.5 fill-sky-600 text-sky-600" />
          <span>Watch 60s Demo</span>
        </button>

        <a
          href="#calculator"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-sky-200/80 bg-sky-50/70 px-5 py-3.5 text-sm font-bold text-sky-900 shadow-sm transition hover:bg-sky-100/80 active:scale-[0.98] sm:w-auto"
        >
          <Calculator className="h-4 w-4 text-sky-600" />
          <span>Time Calculator</span>
        </a>
      </div>

      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 border-t border-slate-200/80 pt-5 sm:grid-cols-4 sm:gap-6 sm:pt-6">
        <div>
          <div className="text-xl font-black text-slate-900 sm:text-2xl">On-demand</div>
          <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">AI workforce</div>
        </div>
        <div>
          <div className="text-xl font-black text-sky-600 sm:text-2xl">1 team</div>
          <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">CHRO + AI</div>
        </div>
        <div>
          <div className="text-xl font-black text-slate-900 sm:text-2xl">Human + AI</div>
          <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Judgement + execution</div>
        </div>
        <div>
          <div className="text-xl font-black text-emerald-600 sm:text-2xl">Designed for</div>
          <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Your workflow</div>
        </div>
      </div>
    </div>
  </section>
);
