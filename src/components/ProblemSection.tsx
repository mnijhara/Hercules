import React from 'react';
import { AlertCircle, Clock, Shield, Users } from 'lucide-react';

const problems = [
  { number: '01', title: 'Hiring', text: 'Critical hires need senior judgement on role, compensation, culture and trade-offs.', icon: Clock, tone: 'text-sky-600' },
  { number: '02', title: 'People operations', text: 'Recurring requests, onboarding, manager support and follow-ups should not live on the founder’s desk.', icon: Users, tone: 'text-rose-600' },
  { number: '03', title: 'People & risk', text: 'Sensitive people decisions need consistent attention, clear preparation and human oversight.', icon: Shield, tone: 'text-indigo-600' },
];

export const ProblemSection: React.FC = () => (
  <section id="the-problem" className="border-b border-slate-200 bg-slate-50 py-8 sm:py-14">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 max-w-3xl sm:mb-9"><div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-sky-700"><AlertCircle className="h-4 w-4 text-sky-600" />The problem</div><h2 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">People work becomes founder work.</h2><p className="mt-3 max-w-2xl text-[15px] leading-6 text-slate-600 sm:text-lg sm:leading-relaxed">Before a company is ready for a full-time senior HR function, people decisions still land on the founder. Hercules gives that work a senior owner and an execution layer.</p></div>
      <div className="grid gap-3 md:grid-cols-3 md:gap-4">{problems.map(({ number, title, text, icon: Icon, tone }) => <article key={number} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7"><div className={`mb-4 flex items-center justify-between ${tone}`}><span className="font-mono text-xl font-black sm:text-2xl">{number}</span><Icon className="h-5 w-5" /></div><h3 className="text-lg font-extrabold text-slate-900 sm:text-xl">{title}</h3><p className="mt-1.5 text-[13px] leading-5.5 text-slate-600 sm:text-sm sm:leading-6">{text}</p></article>)}</div>
    </div>
  </section>
);
