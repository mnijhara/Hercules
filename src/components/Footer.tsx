import React from 'react';
import { MessageSquare } from 'lucide-react';

interface FooterProps { onOpenAddSlackModal: () => void; }

const footerLinks = [
  ['#how-it-works', 'How it works'],
  ['#model', 'The model'],
  ['#capabilities', 'Capabilities'],
  ['#workspace-ai', 'See it work'],
  ['#calculator', 'Founder calculator'],
  ['#pricing', 'Pricing'],
];

export const Footer: React.FC<FooterProps> = ({ onOpenAddSlackModal }) => (
  <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-900 pb-10 pt-12 text-slate-400 sm:pt-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 border-b border-slate-800 pb-10 md:grid-cols-2 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 p-0.5 shadow-sm"><div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 text-sm font-black text-white">H</div></div>
            <span className="text-xl font-extrabold tracking-tight text-white">HERCULES HR</span>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-400">Fractional CHRO leadership with an AI HR workforce for hiring, people operations, manager support and follow-through across your existing workspace.</p>
          <span className="inline-flex rounded border border-slate-700 bg-slate-800 px-2.5 py-1 font-mono text-[10px] text-sky-400">HUMAN JUDGEMENT · AI EXECUTION</span>
        </div>

        <div className="space-y-3 lg:col-span-3">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-sky-400">Explore</h4>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            {footerLinks.map(([href, label]) => <li key={href}><a href={href} className="transition-colors hover:text-white">{label}</a></li>)}
          </ul>
        </div>

        <div className="space-y-3 lg:col-span-3">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-sky-400">Stay focused on growth</h4>
          <p className="text-xs leading-5 text-slate-400">Stop losing founder time to people problems. Start with a Fractional CHRO and add the AI workforce behind them.</p>
          <button type="button" onClick={onOpenAddSlackModal} className="flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-xs font-extrabold text-slate-950 shadow-sm transition hover:bg-sky-400"><MessageSquare className="h-3.5 w-3.5" /> Request workspace setup</button>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-7 font-mono text-[10px] text-slate-500 md:flex-row md:items-center md:justify-between">
        <span>© 2026 Hercules HR · Fractional CHRO + AI workforce</span>
        <span>Workflow integrations can be configured for your team</span>
      </div>
    </div>
  </footer>
);
