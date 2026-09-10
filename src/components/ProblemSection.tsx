import React from 'react';
import { AlertCircle, ArrowRight, Clock, Shield, Users } from 'lucide-react';

interface ProblemSectionProps {
  onOpenAddSlackModal: () => void;
}

const problems = [
  {
    number: '01',
    title: 'Hiring',
    text: 'Critical hires need senior judgement on role, compensation, culture and trade-offs.',
    icon: Clock,
    tone: 'text-sky-600',
  },
  {
    number: '02',
    title: 'People operations',
    text: 'Recurring requests, onboarding, manager support and follow-ups should not live on the founder’s desk.',
    icon: Users,
    tone: 'text-rose-600',
  },
  {
    number: '03',
    title: 'People & risk',
    text: 'Sensitive people decisions need consistent attention, clear preparation and human oversight.',
    icon: Shield,
    tone: 'text-indigo-600',
  },
];

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenAddSlackModal }) => (
  <section id="the-problem" className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl sm:mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
          <AlertCircle className="h-4 w-4 text-sky-600" />
          The problem
        </div>
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          People work becomes founder work.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Before a company is ready for a full-time senior HR function, people decisions still land on the founder. Hercules gives that work a senior owner and an execution layer.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {problems.map(({ number, title, text, icon: Icon, tone }) => (
          <article key={number} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div className={`mb-5 flex items-center justify-between ${tone}`}>
              <span className="font-mono text-2xl font-black">{number}</span>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-3xl bg-slate-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <p className="text-lg font-extrabold">You need leverage, not another layer.</p>
          <p className="mt-1 text-sm text-slate-300">Fractional CHRO judgement with an AI workforce keeping the work moving.</p>
        </div>
        <button type="button" onClick={onOpenAddSlackModal} className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-900 transition hover:bg-slate-100">
          See the model <ArrowRight className="h-4 w-4 text-sky-600" />
        </button>
      </div>
    </div>
  </section>
);
