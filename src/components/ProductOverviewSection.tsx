import React from 'react';
import { ArrowRight, Bot, Check, Rocket, Shield, Sparkles, UserRound, Users } from 'lucide-react';

interface ProductOverviewSectionProps {
  onOpenAddSlackModal: () => void;
  onOpenBookModal: () => void;
}

const capabilities = [
  { icon: Rocket, label: 'HIRING', title: 'Hire with an AI workforce behind you', text: 'Structure hiring work, prepare candidates and keep the process moving while senior decisions stay human-led.' },
  { icon: Sparkles, label: 'PEOPLE OPERATIONS', title: 'Keep people work moving', text: 'Handle employee requests, onboarding, manager support, recurring follow-ups and workflow coordination.' },
  { icon: Shield, label: 'PEOPLE & RISK', title: 'Run people risk with oversight', text: 'Organize policies, documentation and review workflows, escalating consequential decisions to your Fractional CHRO.' },
];

export const ProductOverviewSection: React.FC<ProductOverviewSectionProps> = ({ onOpenAddSlackModal, onOpenBookModal }) => (
  <section id="model" className="border-b border-slate-800 bg-slate-950 py-14 text-white sm:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-[0.2em] text-sky-300">
          <Sparkles className="h-3.5 w-3.5" />
          The Hercules model
        </div>
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          One HR team. <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400">Human judgement + AI execution.</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
          Your Fractional CHRO owns strategy, leadership and consequential decisions. Hercules AI handles the repeatable work between those decisions.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl rounded-[28px] border border-slate-800 bg-slate-900/80 p-4 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-5 text-center">
            <UserRound className="mx-auto h-6 w-6 text-indigo-300" />
            <p className="mt-3 font-extrabold">Fractional CHRO</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">Strategy · judgement · decisions</p>
          </div>
          <div className="hidden text-sky-400 sm:block">→</div>
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-5 text-center">
            <Bot className="mx-auto h-6 w-6 text-sky-300" />
            <p className="mt-3 font-extrabold">Hercules AI</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">Workflows · follow-ups · execution</p>
          </div>
          <div className="hidden text-sky-400 sm:block">→</div>
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
            <Users className="mx-auto h-6 w-6 text-emerald-300" />
            <p className="mt-3 font-extrabold">Your workspace</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">The tools your team already uses</p>
          </div>
        </div>
        <p className="mt-5 text-center font-mono text-xs font-bold text-sky-300">AI prepares · CHRO decides · approved work gets executed</p>
      </div>

      <div id="capabilities" className="mt-14 sm:mt-16">
        <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-sky-300">What Hercules handles</p>
            <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">The work that keeps people moving.</h3>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-400">Three operating areas. One team. No extra HR layer to manage.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {capabilities.map(({ icon: Icon, label, title, text }) => (
            <article key={label} className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-sky-500/40 sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/10 text-sky-300"><Icon className="h-5 w-5" /></div>
                <span className="rounded-full border border-slate-700 px-3 py-1 font-mono text-[9px] font-bold tracking-widest text-slate-400">{label}</span>
              </div>
              <h4 className="text-lg font-extrabold leading-snug">{title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              <div className="mt-5 flex items-center gap-2 border-t border-slate-800 pt-4 text-xs font-semibold text-sky-300"><Check className="h-4 w-4" /> Human-led, AI-powered execution</div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button type="button" onClick={onOpenAddSlackModal} className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-950 transition hover:bg-slate-100">
          Explore the AI workforce <ArrowRight className="h-4 w-4 text-sky-600" />
        </button>
        <button type="button" onClick={onOpenBookModal} className="flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white transition hover:border-sky-500/50">
          Talk to a Fractional CHRO <ArrowRight className="h-4 w-4 text-sky-400" />
        </button>
      </div>
    </div>
  </section>
);
